"""Локальный сервер «живого режима»: то же демо + живые вызовы Jev и GigaChat.

Запуск:  pip install -r requirements.txt  →  python -m server.app  →  http://127.0.0.1:8000
Ключи — в .env (см. .env.example). Без ключей сервер отвечает правилами (как статическое демо).

В банке этот же сервер разворачивается в закрытом контуре: Jev — on-prem, генеративная модель —
GigaChat on-prem / T-Pro / Qwen3 через OpenAI-совместимый API (vLLM). Наружу данные не уходят.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from pipeline.build_demo import LETTER_SYSTEM, letter_prompt, validate_letter
from pipeline.causes import INVOICE_QUESTIONS, MESSAGE_QUESTIONS, invoice_state
from pipeline.clients import GigaChat, Jev

ROOT = Path(__file__).resolve().parent.parent
app = FastAPI(title="Оплата вовремя", version="2.0")
JEV, GIGA = Jev(), GigaChat()


class Message(BaseModel):
    date: str
    text: str = Field(max_length=5000)
    model_config = {"extra": "allow"}


class Invoice(BaseModel):
    id: str
    inn: str
    amount: float
    paid: float = 0
    due: str
    issued: str | None = None
    docs: dict = {}
    messages: list[dict] = Field(default_factory=list, max_length=50)


class AnalyzeRequest(BaseModel):
    invoice: Invoice
    client: dict
    today: str


@app.get("/api/health")
def health():
    return {"ok": True, "jev": JEV.available, "llm": GIGA.available, "jev_model": JEV.model, "llm_model": GIGA.model}


@app.post("/api/analyze")
def analyze(req: AnalyzeRequest):
    """Ответ в том же формате, что и записи demo.json → analysis[id]: интерфейс не различает источники."""
    if not JEV.available:
        raise HTTPException(503, "Jev недоступна: нет TYPESAFE_API_KEY")
    inv = req.invoice.model_dump()
    inv.setdefault("issued", inv["due"])
    client = {"name": req.client.get("name", "Клиент"), "sector": req.client.get("sector", ""), "contact": req.client.get("contact", "")}
    r = JEV.ask(invoice_state(inv, client, req.today), INVOICE_QUESTIONS)
    out = {"id": inv["id"], "jev": {"model": r.get("model"), "latency_ms": r.get("latency_ms"), "answers": r["answers"]}, "messages": []}
    for i, m in enumerate(inv["messages"]):
        if m.get("from") != "client":
            continue
        a = JEV.ask(f"MESSAGE from client to supplier about an unpaid invoice:\n{m['text']}", MESSAGE_QUESTIONS)["answers"]["cause"]
        out["messages"].append({"index": i, "choice": a["choice"], "confidence": a.get("confidence"), "p": a.get("probabilities")})
    if GIGA.available:
        try:
            raw = GIGA.chat(LETTER_SYSTEM, letter_prompt(inv, client, r["answers"]["cause"]["choice"]))
            m = re.search(r"\{.*\}", raw, re.S)
            llm = json.loads(m.group(0)) if m else {}
            if llm.get("body"):
                llm["invalid_numbers"] = validate_letter(llm["body"], inv)
                llm["model"] = GIGA.model
                out["llm"] = llm
        except Exception:  # письмо — не критичная часть ответа: без него интерфейс покажет шаблон
            pass
    return out


@app.get("/")
def index():
    return FileResponse(ROOT / "index.html")


for sub in ("web", "assets"):
    app.mount(f"/{sub}", StaticFiles(directory=ROOT / sub), name=sub)


@app.get("/favicon.svg")
def favicon():
    return FileResponse(ROOT / "favicon.svg")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
