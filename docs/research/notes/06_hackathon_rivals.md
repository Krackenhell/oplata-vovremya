# Соперники по треку ВТБ «Финтех без границ» (Академия Финтеха 2026): разбор GitHub-репозиториев

Дата среза: 28.10.2026, до дедлайна спринта 1 (1.11.2026) осталось 4 дня. Репозитории клонированы с `--depth 1` в `D:\ВТБШКА\research_notes\_untrusted_repos\<owner>__<repo>`. Их код только читался, ничего не запускалось и не устанавливалось. Все баллы ниже — **наша экспертная оценка** по опубликованной рубрике, не оценка жюри. Репозитории могут измениться до 1 ноября.

Официальная рубрика и требования ([fintechacademy.ru/task-1](https://fintechacademy.ru/task-1); копия текста задания лежит в чужом репозитории: [kirill010106/fintech-app/problem.md](https://github.com/kirill010106/fintech-app/blob/HEAD/problem.md)):
- Спринт 1 (78): проблема/JTBD/доказательная база 20, ценность и УТП 16, аудитория и рынок 14, продуктовые метрики 12, зрелость MVP 16. Питч (22): сторителлинг 10, зоны интереса ВТБ и путь к пилоту 6, команда 6. Даты: спринт 1 — 5.10–1.11, спринт 2 — 16–29.11, спринт 3 — 3–8.12, финал — 11.12.
- Генеративный ИИ должен работать на российских и/или on-prem моделях. ИИ «не ценность сам по себе»: нужно объяснить, какую часть сценария он улучшает, на каких данных работает и как контролируется качество. Решения с клиентскими данными должны уметь работать on-prem. 152-ФЗ и 115-ФЗ учитываются как возможность внедрения.
- В загрузку входят презентация, **развёрнутое демо или видео**, код и облачная папка с аналитикой: описание, финмодель, оценка рынка, план внедрения.

---

## 1. Какие репозитории действительно относятся к хакатону (проверка списка и поиск новых)

### Takeaway
Из 14 кандидатов к треку подтверждённо или с высокой вероятностью относятся 11. Три исключены: шаблон сайта вуза, портфолио-кейс по A/B-тесту и кейс ВТБ МСБ с другого конкурса. Поиск по GitHub дал ещё 9 подтверждённых соперников и около 6 вероятных. Среди новых два самых сильных проекта трека («Старт» команды nexus и «Первый чек») и один из ближайших к нам по теме (BizHub).

### Cited Findings
**Подтверждены. Хакатон назван в README или документах, либо в репозитории есть рубрика или формат загрузки:**
- 1nc-0gn1t0/Business_AI («Business AI», команда Sab0tage). На слайдах стоит «Академия Финтеха 2026 • ВТБ». — [README](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/README.md), [Business_AI.pdf](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/Business_AI.pdf)
- kirill010106/fintech-app («Семейный банк»). Внутри лежит текст задания трека. — [problem.md](https://github.com/kirill010106/fintech-app/blob/HEAD/problem.md)
- kwjne/familyhub («ВТБ Семья / Family Hub», команда «502 Bad Gateway»). — [README](https://github.com/kwjne/familyhub/blob/HEAD/README.md)
- YoruKodama/FintechAcademy («AI-тренажёр собеседований»). — [README](https://github.com/YoruKodama/FintechAcademy/blob/HEAD/README.md)
- dmitfadye/anti-drop-mvp («АнтиДроп»). — [README](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/README.md)
- leksika1/VTB-Hack («Семейный бюджет», направление «Семейный банкинг»). — [README](https://github.com/leksika1/VTB-Hack/blob/HEAD/README.md)
- TheDucklet/SimplyLovely_hack («ГеоСтарт», команда Simply Lovely, РТУ МИРЭА). — [docs/product/survey.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/survey.md)
- avrg-carp/Customer-Service-Assistant (RAG-ассистент первой линии, направление «Собственная эффективность банка»). — [README](https://github.com/avrg-carp/Customer-Service-Assistant/blob/HEAD/README.md)
- Stasy432/vtb-orakul («ВТБ.Оракул», команда «Ставка на успех»). — [VTB_Orakul_README.md](https://github.com/Stasy432/vtb-orakul/blob/HEAD/VTB_Orakul_README.md)
- Ofrys-tech/semya-plus («Семья+», команда «Девочки и банки», Уфимский филиал). — [README](https://github.com/Ofrys-tech/semya-plus/blob/HEAD/README.md), [docs/pitch.pdf](https://github.com/Ofrys-tech/semya-plus/blob/HEAD/docs/pitch.pdf)
- NickitaBogomolov/fintech-academy («ЦФА Студия»). Документы 01–05 построены по критериям трека, отдельно описан путь к пилоту в ВТБ. — [docs/04-pilot.md](https://github.com/NickitaBogomolov/fintech-academy/blob/HEAD/docs/04-pilot.md)
- **Новые:** keshaptisa/nexus_vtb («Старт», команда nexus). Те же файлы лежат в shotmee/nexus_vtb и ariasokuss/nexus_start_for_vtb (README идентичны, 9054 байта). — [README](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/README.md)
- **Новый:** imaO0O/vtb («Первый чек», ИИ-помощник для самозанятых, направление 2 «Решения для бизнеса»). — [README](https://github.com/imaO0O/vtb/blob/HEAD/README.md)
- **Новый:** gwyn-riot/bizhub (BizHub, «соревнование от ВТБ, тема „Финтех без границ“»). — [README](https://github.com/gwyn-riot/bizhub/blob/HEAD/README.md)
- **Новый:** keepmeinyourmind/zapas («Запас — умная копилка», «Академия Финтеха 2026 (ВТБ + Финансовый университет)»). — [README](https://github.com/keepmeinyourmind/zapas/blob/HEAD/README.md)
- **Новый:** NikitaMeshDS/dvoinik («Двойник», синтетическая аудитория для проверки банковских предложений, MISIS X). — [README](https://github.com/NikitaMeshDS/dvoinik/blob/HEAD/README.md)
- **Новый:** valeriastarnov/bankvision (BankVision, оценка залогового оборудования). — [README](https://github.com/valeriastarnov/bankvision/blob/HEAD/README.md)
- **Новый:** 9w6k7hym6y-arch/start-agent («Старт-Агент», ИИ-навигатор для предпринимателей 17–25 лет). — [README](https://github.com/9w6k7hym6y-arch/start-agent/blob/HEAD/README.md)

**Вероятно относятся. Совпадают тема трека и стилистика ВТБ, но хакатон прямо не назван:**
- tikkhonn/finteckrazeb (Pay & Go: Scan & Go в приложении «ВТБ Go», Expo/React Native). — [README](https://github.com/tikkhonn/finteckrazeb/blob/HEAD/README.md)
- V01dC0Re/vtb-co-pilot («ВТБ Ко-пилот… Спринт №1 (MVP)», тренажёр бэк-офиса). — [README](https://github.com/V01dC0Re/vtb-co-pilot/blob/HEAD/README.md)
- nnneeekkkiiittt/fintech-vtb («ВТБ — конверты», фронтенд и Go API). — [README](https://github.com/nnneeekkkiiittt/fintech-vtb/blob/HEAD/README.md)
- VladlenRose/trust-beacon-protect («PAUSE / ВТБ Защитник», антифрод). README похож на промпт для генератора интерфейса. — [README](https://github.com/VladlenRose/trust-beacon-protect/blob/HEAD/README.md)
- DOPIAS/vtb-abonent (учёт пакетов занятий для репетиторов, то есть самозанятые). — [README](https://github.com/DOPIAS/vtb-abonent/blob/HEAD/README.md)
- Salamia2006/tradeops-ai (сопровождение ВЭД-сделки, сверка недоплаты). README: «ВТБ, реальные платежи, LLM и OCR не подключены». — [README](https://github.com/Salamia2006/tradeops-ai/blob/HEAD/README.md)

**Исключены:**
- 1oneegame/extra-university — шаблон Next.js для сайта вуза, последний коммит 20.04.2025, хакатон не упоминается. — [README](https://github.com/1oneegame/extra-university/blob/HEAD/README.md)
- bodi2107/ab-test-onboarding-fintech — портфолио-анализ A/B-теста на синтетике (период 2024), коммит 19.05.2026, хакатон не упоминается. — [README](https://github.com/bodi2107/ab-test-onboarding-fintech/blob/HEAD/README.md)
- ulko31/vtb-sme-referral-program — кейс «Реферальная программа для МСБ ВТБ» команды AMULET (НИУ ВШЭ СПб, 1 курс). Академия Финтеха не упоминается, формат — портфолио-кейс из PDF, а не MVP. Скорее всего, это другой кейс-чемпионат. При этом там есть 12 интервью с ИП/ООО и расчёт CAC: ИП ≈10 004 ₽, ООО ≈11 879 ₽. — [README](https://github.com/ulko31/vtb-sme-referral-program/blob/HEAD/README.md)
- Похожие, но с других соревнований: Kiboiko/cashflow-forecast и Etern1ty666/rnd-hack («хакатон РнД, осень 2026»), Svyat-Abak/reservoir-of-trust («Альфа-Хак 2026»), ArtemAweirro/CupMoscow2026-VTB_Omsk_gingerbread (Cup Moscow, кейс ВТБ), team-9392/mtb-hackathon (МТБанк). — [Kiboiko README](https://github.com/Kiboiko/cashflow-forecast/blob/HEAD/README.md), [Svyat-Abak README](https://github.com/Svyat-Abak/reservoir-of-trust/blob/HEAD/README.md)

### Inferences
- Подтверждённых соперников с кодом в открытом доступе около 20, но это малая доля участников: многие держат репозитории приватными или загрузят код к 1 ноября. Выборка смещена к командам, которые охотно публикуют код.
- По направлениям: семейный банкинг (5–6 проектов: Семья+, Семейный бюджет, Семейный банк, Family Hub, Конверты), антифрод/дропы (АнтиДроп, Старт/nexus, Trust Beacon, частично Семейный банк), SME-аналитика (Business AI, ГеоСтарт, BizHub, ВТБ.Оракул, Старт-Агент), самозанятые (Первый чек, Абонент), эффективность банка (Customer Service Assistant, тренажёр собеседований, Ко-пилот, Двойник, BankVision), ЦФА (ЦФА Студия), ритейл-платежи (Pay & Go). B2B-дебиторку с разбором причин неоплаты кроме нас не ведёт никто из найденных.

### Gaps
- REST-поиск GitHub не индексирует приватные репозитории, GitLab и Mercurial. Поиск по тексту Cyrillic-README неполный. Веб-поиск (WebSearch) по фразам трека GitHub-репозиториев не вернул.
- По «вероятным» репозиториям принадлежность к хакатону не подтверждена текстом.

---

## 2. Профили соперников и оценка по критериям жюри

### Takeaway
Лидеры по совокупности: «Старт» команды nexus (~74), «Первый чек» (~71), «ГеоСтарт» (~68), «ЦФА Студия» (~67). У каждого из них сочетаются проверяемые источники, измеренное качество и работающий MVP с on-prem-контуром. Большинство остальных — инженерно сильные, но «безлюдные» проекты (без custdev и рынка) или тонкие клик-прототипы.

### Сводная таблица (наша оценка, 100 = 78 спринт + 22 питч)

| # | Проект / репозиторий | Направление | ИИ (модель, контур) | Доказательная база | Демо | Тесты | Оценка |
|---|---|---|---|---|---|---|---|
| 1 | Старт (nexus) — keshaptisa/nexus_vtb | Молодёжь 14–22, антидроп | CatBoost и TF-IDF+логрег, по желанию Ollama qwen2.5 или GigaChat | Опрос n=231 с ДИ Уилсона, реестр источников со статусами | Docker, видео 2:54 | 3 файла pytest | **~74** |
| 2 | Первый чек — imaO0O/vtb | Самозанятые (НПД) | RAG: GigaChat 3.1 Lightning (MIT) + bge-m3 + bge-reranker, llama.cpp локально | Статистика ФНС, примеры ошибок нейросетей; custdev только запланирован | Видео 1:58, PDF на 21 слайд, xlsx-финмодель | 8 файлов pytest, eval 98 + holdout 36 | **~71** |
| 3 | ГеоСтарт — TheDucklet/SimplyLovely_hack | Геоаналитика МСБ | Без LLM, гравитационная модель Хаффа | TAM/SAM/SOM с источниками, конкуренты с датами, 14 интервью заявлены, анкета ≥30 | Docker compose.demo | 18 файлов pytest, CI | **~68** |
| 4 | ЦФА Студия — NickitaBogomolov/fintech-academy | ЦФА для эмитентов/ОИС | Правила, по желанию Qwen/GigaChat/YandexGPT через OpenAI-совместимый API | АКРА, Forbes, указание ЦБ 7315-У; интервью — гипотезы | Docker | 6 файлов pytest | **~67** |
| 5 | Business AI — 1nc-0gn1t0/Business_AI | Запуск бизнеса + продукты ВТБ | Локальная Qwen3-4B (Ollama), измерено на RTX 3050 Ti | Аналоги Сбера и Альфы; custdev нет | Docker + GPU, PDF на 12 слайдов | 53 файла, CI, e2e Playwright | **~55** |
| 6 | Семья+ — Ofrys-tech/semya-plus | Семейный банкинг | «AI-инсайты» = траты × 1,045 | Опрос 84 родителей (без сырых данных), TAM/SAM/SOM | GitHub Pages (200), PDF | нет | **~53** |
| 7 | Двойник — NikitaMeshDS/dvoinik | Синтетическая аудитория для продуктовых команд банка | Правила + OpenAI-совместимый LLM | Нет, честно отмечено | Локально, скриншоты | 19 файлов | **~45** |
| 8 | Семейный банк — kirill010106/fintech-app | Семья, со-подписание операций | Эвристический антифрод, без LLM | Статистика ЦБ в USP-документе | Docker | 1 файл + e2e-скрипты PowerShell | **~43** |
| 9 | Запас — keepmeinyourmind/zapas | Молодёжь 18–22, копилка | Нет, детерминированный движок | Нет | Docker + Swagger, без UI | 19 Go-тестов, CI | **~42** |
| 10 | АнтиДроп — dmitfadye/anti-drop-mvp | Антифрод, нерезиденты | Детерминированные правила | Реестр доказательств, честная самооценка 28/100 | Docker | 20 файлов, Playwright | **~40** |
| 11 | BankVision — valeriastarnov/bankvision | Оценка залога (станок) | OCR Tesseract, правила | Методики, синтетические фикстуры | Локально | 7 файлов | **~36** |
| 12 | Семейный бюджет — leksika1/VTB-Hack | Семейный бюджет | Нет | Нет | Docker, Dokploy | 24 файла, CI | **~35** |
| 13 | Pay & Go — tikkhonn/finteckrazeb (вероятно) | Scan & Go | Нет | Нет | Нативная сборка iOS | jest | **~33** |
| — | **Оплата вовремя (мы) — Krackenhell/oplata-vovremya** | B2B-дебиторка МСБ | Правила, LLM не подключена | РСПП II кв. 2026; интервью нет | GitHub Pages (200), PDF/PPTX | 1 файл | **~35** (калибровка) |
| 14 | Family Hub — kwjne/familyhub | Семья, квесты | Нет | «82% НАФИ» без ссылки | Docker | 2 файла | **~28** |
| 15 | Старт-Агент — 9w6k7hym6y-arch/start-agent | Молодые предприниматели | Мок-чат | Нет | Только локально | Тест маршрутов | **~25** |
| 16 | ВТБ Ко-пилот — V01dC0Re/vtb-co-pilot (вероятно) | Бэк-офис | `strings.Contains` по ключевым словам | Нет | Локально | handler_test.go | **~25** |
| 17 | ВТБ.Оракул — Stasy432/vtb-orakul | Кассовый разрыв МСБ | «Помощник» на правилах | Нет | GitHub Pages (200) | Ручная таблица в README | **~22** |
| 18 | BizHub — gwyn-riot/bizhub | Финпанель МСБ, кассовый разрыв | Нет | Нет | Только локально (Pages 404) | test.js для CSV | **~22** |
| 19 | Customer Service Assistant — avrg-carp | RAG для фронт-линии | Заявлены vLLM+Qwen/T-lite/GigaChat, но всё заглушки | Анализ рынка с пометками «(из знаний)» | Нет | 0 | **~15** |
| 20 | AI-тренажёр собеседований — YoruKodama/FintechAcademy | Обучение сотрудников | Ollama qwen2.5:7b, по умолчанию stub | Нет | Нет | 3 (LLM-заглушка, анонимизация) | **~15** |

### Cited Findings (карточки по ключевым соперникам)

**«Старт» (nexus)** — [keshaptisa/nexus_vtb](https://github.com/keshaptisa/nexus_vtb)
- Продукт — молодёжный раздел ВТБ Онлайн для 14–22 лет. Банк «перехватывает перевод», когда подростка используют как дропа, и предлагает «безопасный выход». В демо пять персонажей-сценариев. — [README](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/README.md)
- Опрос в Google Формах 8–9.10.2026: 250 анкет, в анализ взята 231. Сырой CSV лежит в репозитории, доли даны с 95% ДИ Уилсона. H2 честно помечена «НЕ ПОДТВЕРЖДЕНА». 37% получали предложения «подработки» через карту (ДИ 31–43%). — [docs/research/survey_results.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/survey_results.md), [survey.csv](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/survey.csv)
- Реестр источников устроен как «утверждение → цифра → кто/где → дата → ссылка → статус ✅/🟡/⚠️». Пересказы СМИ используются только для поиска факта, ссылаются на первоисточник. Отдельно объяснено, почему цифры ЦБ, МВД и ВТБ кажутся противоречивыми. — [docs/research/evidence.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/evidence.md)
- Финмодель в xlsx на 2027–2031 с тремя сценариями: базовый NPV +298,7 млн ₽, окупаемость 23 мес. Отдельно посчитан NPV ядра без «моста» и «Пушкинской карты». Привязка к активам ВТБ: «Детский банк» → «Старт» и «Пушкинская карта». — [docs/business/business_model.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/business/business_model.md)
- ML-метрики на синтетике с явной оговоркой. CatBoost: PR-AUC 0,997 против 0,699 у правил. Сравнение LLM на CPU: qwen2.5:7b — медиана 22,1 с, не укладывается в лимит 20 с. Есть шаблонный fallback. — [ml/reports/metrics.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/ml/reports/metrics.md), [ml/reports/llm_comparison.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/ml/reports/llm_comparison.md)
- Слабые места: интервью только запланированы (в `docs/research/interviews/` лежат `plan.md` и шаблон), модели обучены на синтетике, последний коммит 11.10.2026.

**«Первый чек»** — [imaO0O/vtb](https://github.com/imaO0O/vtb)
- RAG по 422-ФЗ, 456-ФЗ, статьям НК и 251 разъяснению ФНС (489 фрагментов). Модели GigaChat 3.1 Lightning (MIT), bge-m3 и bge-reranker-v2-m3 работают локально через llama.cpp. Ответ без подтверждённой ссылки `[n]` не показывается. При низкой оценке переранжировщика система отказывает, не вызывая модель. — [README](https://github.com/imaO0O/vtb/blob/HEAD/README.md)
- Eval: 98/98 на отладочном наборе. Честно указано, что главная цифра — отложенный набор: 31 из 36, по закону 21 из 25, «первый прогон без правок». — [README](https://github.com/imaO0O/vtb/blob/HEAD/README.md), [eval/results/holdout.md](https://github.com/imaO0O/vtb/blob/HEAD/eval/results/holdout.md)
- Видит поступления на счёт (демо-клиенты), пишет в момент поступления, ведёт по пути «самозанятый → ИП + РКО». Лиды для банка формируются только по клиентам с согласием, журнал маскирует ПДн. — [docs/pervyy_chek_prezentaciya.pdf](https://github.com/imaO0O/vtb/blob/HEAD/docs/pervyy_chek_prezentaciya.pdf)
- Слабое место: таблица custdev пустая. Цель — 15–20 интервью в «месяц 1 плана». — [docs/custdev.md](https://github.com/imaO0O/vtb/blob/HEAD/docs/custdev.md). Финмодель лежит в [docs/analytics/finansovaya_model.xlsx](https://github.com/imaO0O/vtb/blob/HEAD/docs/analytics/finansovaya_model.xlsx); мы её не открывали.

**«ГеоСтарт»** — [TheDucklet/SimplyLovely_hack](https://github.com/TheDucklet/SimplyLovely_hack)
- Сервис оценивает окупаемость кофейни или ПВЗ по ячейкам H3 на реальных данных OSM, портала открытых данных Москвы и «Работы России». Первая загрузка — 881 МБ. Три роли пользователей, включая кредитного специалиста ВТБ. — [README](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/README.md), [docs/product/problem.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/problem.md)
- Пять гипотез H1–H5 с источниками по каждой. Заявлены «14 глубинных интервью R01–R14» и анкета на ≥30 ответов к 30.10, но результатов интервью в репозитории нет. — [docs/product/survey.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/survey.md)
- TAM посчитан по формулам: 629 050 открытий в год × ARPU 60 000 ₽ ≈ 37,74 млрд ₽, SAM 452 900 с проверкой снизу вверх. Активные клиенты МСБ в ВТБ — 1,3 млн. — [docs/product/market.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/market.md). Таблица конкурентов с колонкой `source_date` — [competitors.csv](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/competitors.csv)
- North Star — подтверждённые рентабельные локации с переходом к продукту ВТБ. Качество модели: ROC AUC 0,735 для кофеен Москвы против целевых 0,75, честно оговорено, что Тула ненадёжна из-за выборки в 38 точек. — [docs/product/metrics.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/metrics.md)

**«ЦФА Студия»** — [NickitaBogomolov/fintech-academy](https://github.com/NickitaBogomolov/fintech-academy)
- Из описания на естественном языке строится одна спецификация, из неё — решение о выпуске по шаблону оператора, смарт-контракт на Solidity, график выплат и 24 проверки, включая прогон в EVM и Slither. «Значение от модели принимается, только если цитата из текста подтверждает его». — [README](https://github.com/NickitaBogomolov/fintech-academy/blob/HEAD/README.md)
- Бенчмарк разбора на 20 описаниях: полнота 96,9%, точность 100%. Пойманы 3 из 3 внесённых ошибок в коде. — [docs/03-metrics.md](https://github.com/NickitaBogomolov/fintech-academy/blob/HEAD/docs/03-metrics.md)
- Пилот в ВТБ как операторе ОИС: 2–3 недели подготовки, 4–6 недель параллельного прогона, 4 недели рабочего режима. Таблица соответствия 259-ФЗ, 115-ФЗ и 152-ФЗ. — [docs/04-pilot.md](https://github.com/NickitaBogomolov/fintech-academy/blob/HEAD/docs/04-pilot.md)

**Business AI (Sab0tage)** — [1nc-0gn1t0/Business_AI](https://github.com/1nc-0gn1t0/Business_AI)
- Цепочка: чат → геоаналитика OSM/PostGIS → финмодель → подбор продуктов ВТБ → лид с согласием (mock). Локальная `qwen3:4b-instruct-2507-q4_K_M`, LLM «не придумывает данные, вызывает проверяемые сервисы». 12 ADR, 53 тестовых файла, CI на Ubuntu и Windows. — [README](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/README.md)
- В питче нет собственных интервью. Доказательство спроса — аналоги («СберАналитика: 2–3 ч → <2 мин», «Альфа-Локация»). Экономика для ВТБ: консервативный сценарий −11,4 млн ₽, базовый +16 млн ₽. — [Business_AI.pdf, слайды 10–11](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/Business_AI.pdf)
- README начинается с предупреждений про обновление контейнеров (H-06, supply-chain), а не с ценности продукта. Для полного демо нужны Docker и NVIDIA GPU, публичного демо нет (Pages 404).

**Семья+** — [Ofrys-tech/semya-plus](https://github.com/Ofrys-tech/semya-plus)
- Хорошо отполированный фронтенд из трёх ролей на GitHub Pages ([демо](https://ofrys-tech.github.io/semya-plus/) отвечает 200). Бэкенда нет. «AI-инсайт» прогноза расходов — это `expenses * 1.045`. — [src/screens/parent/Budget.tsx, стр. 56](https://github.com/Ofrys-tech/semya-plus/blob/HEAD/src/screens/parent/Budget.tsx)
- В питче «внутренний опрос 84 родителей»: 70% ведут учёт хаотично, 84% против отдельных приложений, «экономия до 15%» — «оценка на основе опроса». Сырых данных нет. TAM 16 млн семей, SAM 3 млн, SOM 90 000. Четыре участника с ролями. — [docs/pitch.pdf](https://github.com/Ofrys-tech/semya-plus/blob/HEAD/docs/pitch.pdf)

**АнтиДроп** — [dmitfadye/anti-drop-mvp](https://github.com/dmitfadye/anti-drop-mvp)
- Детерминированные правила, PostgreSQL, обучение «Спокойные переводы», локализация RU/UZ. Сами оценивают себя в 28/100 (диапазон 18–38) и пишут, что их «узкое место — доказательство продукта». — [docs/competition-audit/JURY_SCORECARD.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition-audit/JURY_SCORECARD.md)
- Финмодель честно показывает отрицательную экономику: в базовом сценарии ROI первого года −89,06%. — [docs/competition/FINANCIAL_MODEL.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/FINANCIAL_MODEL.md). Последний коммит 11.10.2026.

**Остальные (кратко)**
- «Семейный банк» (kirill010106): Go + React, со-подписание спорных операций родственником, профиль защиты по дате рождения. Статистика ЦБ: +6,4% объёма операций без согласия, возвращено 5,9%. — [docs/01-value-and-usp-short.md](https://github.com/kirill010106/fintech-app/blob/HEAD/docs/01-value-and-usp-short.md)
- «Семейный бюджет» (leksika1): самый «production-like» семейный проект (FastAPI, Redis, 9 миграций, e2e, OIDC), но в документах нет ни проблемы, ни рынка, ни метрик. — [docs/](https://github.com/leksika1/VTB-Hack/tree/HEAD/docs)
- «Запас»: детерминированный движок `auto/ask/skip/suggest_raise`, деньги в копейках, идемпотентность, CI с прогоном сценариев. Демо «2 минуты» — только через curl, UI нет. — [README](https://github.com/keepmeinyourmind/zapas/blob/HEAD/README.md)
- «Двойник»: честный дисклеймер «проценты показывают работу продукта, а не прогноз реального спроса». Следующий шаг — интервью и опрос на 30+ человек. — [README](https://github.com/NikitaMeshDS/dvoinik/blob/HEAD/README.md)
- BankVision: явный раздел «Чем BankVision НЕ является» (не кредитное решение, не рыночная оценка). Результаты тестов зафиксированы в файле. — [README](https://github.com/valeriastarnov/bankvision/blob/HEAD/README.md), [tests/RESULTS.md](https://github.com/valeriastarnov/bankvision/blob/HEAD/tests/RESULTS.md)
- Family Hub: «более 82% школьников… менее 20%» со ссылкой на НАФИ без URL. В README есть эмодзи. — [README](https://github.com/kwjne/familyhub/blob/HEAD/README.md)
- Customer Service Assistant: «Реализован только каркас: /health»; файлы `rag/*.py` по ~40 байт. — [README](https://github.com/avrg-carp/Customer-Service-Assistant/blob/HEAD/README.md)
- AI-тренажёр: `main.py` содержит только `/health` («методы API появятся в задаче Ю2»). — [backend/app/main.py](https://github.com/YoruKodama/FintechAcademy/blob/HEAD/backend/app/main.py)
- ВТБ Ко-пилот: «интеллектуальная маршрутизация» сделана через `strings.Contains`. — [backend/internal/handler/copilot.go](https://github.com/V01dC0Re/vtb-co-pilot/blob/HEAD/backend/internal/handler/copilot.go)

### Inferences
- Планка «доказательной базы» у лидеров заметно выше, чем у нас сейчас. У nexus есть сырые данные опроса n=231 с интервалами, у «Первого чека» — измеренное качество на отложенном наборе. На критериях 1, 3 и 4 (вместе 46 баллов) мы проигрываем им по 15–25 баллов, если до 1 ноября не появятся собственные интервью и метрики.
- По зрелости MVP мы ближе к середине. Публичное демо на GitHub Pages без установки — редкость: из 20 проектов оно есть только у нас, «Семьи+» и «Оракула». Это реальное преимущество для жюри, которое не будет поднимать Docker и GPU.
- По требованию ИИ лидеры показывают локальные российские или открытые модели с измерениями: GigaChat 3.1 Lightning, Qwen. Мы называем продукт «AI-ассистентом», но LLM не подключена. Это допустимо по правилам трека, но тогда нужна прямая формулировка «ИИ на этапе 2, сейчас правила, вот почему».

### Gaps
- Баллы по критерию «команда» и по питчу почти у всех угадываются: состав и роли видны только у «Семьи+», «Первого чека», «Старт-Агента», «Двойника» и «Оракула».
- Финмодели в xlsx (nexus, «Первый чек») и PDF ulko31 мы не открывали в Excel, формулы не проверены.
- Публичные демо-стенды у Docker-проектов мы не проверяли (nexus упоминает `docs/deploy.md` для стенда жюри).

---

## 3. Кто ближе всего к «Оплате вовремя» и как отстроиться

### Takeaway
Прямых конкурентов по сценарию «почему не платят по B2B-счёту и что делать» среди найденных нет. Ближайшие соседи — инструменты прогноза кассового разрыва МСБ: ВТБ.Оракул и BizHub. Оба тонкие, без ИИ и без доказательной базы. По методу (ответ только с подтверждающей цитатой) к нам ближе всего «Первый чек» и «ЦФА Студия»: они задают планку того, как такой принцип показывают жюри.

### Cited Findings
- **ВТБ.Оракул.** Прогноз остатка на 14 или 30 дней, первый дефицит и сценарии A/B/C. Сценарий C — «моделирование более раннего поступления от клиента», оговорено, что «сценарий возможен только при согласии клиента». Данные захардкожены: остаток 1 000 000 ₽, платёж 1 500 000 ₽, поступление 800 000 ₽. Помощник работает на правилах. Один HTML-файл на 69 КБ, единственный коммит 26.10.2026. — [VTB_Orakul_README.md](https://github.com/Stasy432/vtb-orakul/blob/HEAD/VTB_Orakul_README.md), [демо](https://stasy432.github.io/vtb-orakul/)
- **BizHub.** Дашборд остатка, прогноз на 30 дней («просроченные операции учитываются в день 0»), календарь платежей и поступлений, импорт выписки CSV (UTF-8/windows-1251), сопоставление факта с планом (сумма ±1%, ±5 дней), JWT и SQLite. Около 400 строк кода, коммиты только 11.10.2026. В плане: «рекомендации банковских продуктов (например, овердрафт при риске разрыва)» и метрика «доля вовремя оплаченных обязательств». — [README](https://github.com/gwyn-riot/bizhub/blob/HEAD/README.md), [server/index.js](https://github.com/gwyn-riot/bizhub/blob/HEAD/server/index.js)
- **TradeOps AI** (принадлежность не подтверждена). Сверка ВЭД-платежа: «обязательство 380 000 CNY, зачисление 378 500 CNY, недоплата 1 500 CNY», кейс уходит в демо-очередь. — [README](https://github.com/Salamia2006/tradeops-ai/blob/HEAD/README.md)
- **Business AI и ГеоСтарт.** Тот же покупатель (МСБ и ВТБ как канал лидов), но работа клиента другая: выбор локации и запуск. Оба считают пользу для ВТБ через РКО, эквайринг и кредиты: ARPU 60 000 ₽/год у ГеоСтарта, «−11,4 / +16 / +67,2 млн ₽» у Business AI. — [market.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/market.md), [Business_AI.pdf](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/Business_AI.pdf)
- **«Первый чек» и «ЦФА Студия»** используют наш принцип «цитата как основание»: ссылка `[n]` обязана указывать на выданный фрагмент, значение от модели принимается только с подтверждающей цитатой. Оба подкрепляют принцип измерениями: отложенный набор 21/25 и бенчмарк 96,9% / 100%. — [imaO0O/vtb README](https://github.com/imaO0O/vtb/blob/HEAD/README.md), [ЦФА docs/03-metrics.md](https://github.com/NickitaBogomolov/fintech-academy/blob/HEAD/docs/03-metrics.md)
- Наш текущий MVP: CSV-реестр счетов, частичные оплаты, разбор переписки по явным правилам (запрос документа, уточнение суммы, обещание оплаты, нехватка средств), цитата, черновик письма, действия ответственным. «Реального исследования пользователей… пока нет». — [Krackenhell/oplata-vovremya README](https://github.com/Krackenhell/oplata-vovremya/blob/HEAD/README.md), [application.md](https://github.com/Krackenhell/oplata-vovremya/blob/HEAD/application.md)

### Inferences
- **Формулировка отличия.** Оракул и BizHub отвечают на вопрос «когда кончатся деньги». Мы отвечаем на вопрос «почему конкретный клиент не платит по конкретному счёту и какое действие разблокирует оплату» (не отправлен акт, спор о сумме, обещание, нехватка денег у плательщика). Это шаг раньше прогноза: мы влияем на дату поступления, которую они берут как заданную. Сценарий C Оракула («ускорить поступление при согласии клиента») — ровно тот разрыв, который закрываем мы. Это можно прямо сказать в питче.
- **Взять у соседей:** (1) мини-прогноз «что будет с остатком, если причина устранена за N дней» по образцу A/B/C Оракула и графика BizHub; (2) сопоставление реестра с выпиской (±1% / ±5 дней, как у BizHub) вместо только ручного учёта поступлений; (3) мост к продуктам ВТБ как у Business AI и ГеоСтарта: формула пользы для банка (РКО, факторинг/кредит под дебиторку — **условия ВТБ не проверены**, нужен источник), лиды только с согласием, как у «Первого чека».
- **Защита метода.** Принцип «цитата — сигнал, а не диагноз» у нас уже есть, но не измерен. За 3–4 дня реально собрать эталонный набор из 30–50 обезличенных или синтетических писем с размеченной причиной и отложенную часть «без правок». Тогда в питче будет точность и полнота по причинам, как у «Первого чека» и «ЦФА Студии».
- **Риск.** Если жюри воспримет нас как «ещё один дашборд дебиторки», мы попадём в один кластер с Оракулом и BizHub, где все слабы по доказательствам. Нужно вести нарратив от работы сотрудника, контролирующего дебиторку, и цитаты из реальной переписки, а не от графика остатка.

### Gaps
- Нет данных, подаёт ли кто-то из приватных репозиториев проект про B2B-дебиторку, факторинг или ВТБ «Оракул» для бизнеса.
- Не проверено, существует ли у ВТБ продукт с названием «Оракул» или аналог для МСБ. Команда Stasy432 использует это имя для демо и пишет, что проект «не является официальным сервисом ВТБ».

---

## 4. Общие слабости соперников (чего избегать)

### Takeaway
Типичные провалы: исследование пользователей «запланировано», но не сделано; «ИИ» на вывеске при правилах внутри; демо требует Docker или GPU; стартовые экраны README про инфраструктуру, а не про ценность; цифры без ссылок.

### Cited Findings
- **Custdev не проведён или не показан.** Таблица результатов интервью у «Первого чека» пустая ([docs/custdev.md](https://github.com/imaO0O/vtb/blob/HEAD/docs/custdev.md)). У nexus есть только план интервью и шаблон ([docs/research/interviews](https://github.com/keshaptisa/nexus_vtb/tree/HEAD/docs/research/interviews)). ГеоСтарт заявляет «14 глубинных интервью R01–R14», но результатов в репозитории нет ([problem.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/problem.md)). У АнтиДропа «нет интервью целевых пользователей» ([JURY_SCORECARD](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/JURY_SCORECARD.md)). У нас самих — «реального исследования пользователей… пока нет» ([README](https://github.com/Krackenhell/oplata-vovremya/blob/HEAD/README.md)).
- **«ИИ», которого нет.** У «Семьи+» прогноз = траты × 1,045 под иконкой Sparkles ([Budget.tsx](https://github.com/Ofrys-tech/semya-plus/blob/HEAD/src/screens/parent/Budget.tsx)). «Интеллектуальная маршрутизация» Ко-пилота сделана через `strings.Contains` ([copilot.go](https://github.com/V01dC0Re/vtb-co-pilot/blob/HEAD/backend/internal/handler/copilot.go)). У Customer Service Assistant RAG-модули — заглушки ([README](https://github.com/avrg-carp/Customer-Service-Assistant/blob/HEAD/README.md)). Трек прямо требует объяснить, что улучшает ИИ и как контролируется качество ([task-1](https://fintechacademy.ru/task-1)).
- **Тяжёлый запуск.** Business AI требует Docker Desktop с WSL2 и NVIDIA GPU для Qwen ([README](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/README.md)). BankVision — Tesseract с русским языком ([README](https://github.com/valeriastarnov/bankvision/blob/HEAD/README.md)). «Первый чек» скачивает около 8 ГБ моделей ([README](https://github.com/imaO0O/vtb/blob/HEAD/README.md)). Pay & Go нужна нативная сборка через Xcode ([README](https://github.com/tikkhonn/finteckrazeb/blob/HEAD/README.md)).
- **README про инфраструктуру, а не про ценность.** Business AI открывается предупреждениями H-06-FU про DB-volume и supply-chain ([README](https://github.com/1nc-0gn1t0/Business_AI/blob/HEAD/README.md)). Семейный бюджет (leksika1) — 1 856 строк инженерных документов и ни одного документа о проблеме или рынке ([docs](https://github.com/leksika1/VTB-Hack/tree/HEAD/docs)).
- **Цифры без источника или с непроверенными оценками.** Family Hub: «82%… НАФИ» без ссылки ([README](https://github.com/kwjne/familyhub/blob/HEAD/README.md)). «Семья+»: «экономия до 15% — оценка на основе опроса», сырых данных нет ([pitch.pdf](https://github.com/Ofrys-tech/semya-plus/blob/HEAD/docs/pitch.pdf)).
- **Каркасы вместо MVP за 4 дня до дедлайна:** AI-тренажёр ([main.py](https://github.com/YoruKodama/FintechAcademy/blob/HEAD/backend/app/main.py)) и Customer Service Assistant.
- **«Застывшие» репозитории.** Последние коммиты АнтиДропа, BizHub и nexus — 11.10.2026. Это может означать перенос работы в приватные ветки.

### Inferences
- Жюри видит много «инженерии без людей». Даже 5–7 настоящих интервью с теми, кто контролирует дебиторку (бухгалтер, финдиректор, аккаунт-менеджер), с цитатами и честным «что не подтвердилось» сразу выделят нас на критерии 1 (20 баллов).
- Слово «AI» в названии без LLM в коде — риск попасть в ту же категорию, что «Семья+» и Ко-пилот. Варианты: подключить локальную модель (GigaChat 3.1 Lightning или Qwen через OpenAI-совместимый API) с проверкой цитат, или переименовать уровень в «правила сейчас, модель — этап 2» и показать план оценки.

### Gaps
- Мы не видим приватных материалов команд (облачные папки с аналитикой), поэтому слабость «нет custdev» у части команд может быть только в репозитории.

---

## 5. Сильные практики, которые стоит взять

### Takeaway
Самые полезные заимствования: реестр доказательств со статусами (АнтиДроп, nexus), честная самооценка по рубрике (АнтиДроп), фальсифицируемые гипотезы с условиями провала и нейтральным гайдом интервью (АнтиДроп), измерение качества на отложенном наборе (Первый чек), опрос с сырыми данными и доверительными интервалами (nexus), документы, разложенные по критериям жюри (ЦФА Студия), явный раздел «чем продукт НЕ является» (BankVision).

### Cited Findings
- **EVIDENCE_REGISTER (АнтиДроп).** Таблица `ID | Claim / evidence | Confidence and limitation | Next proof`, 12 строк E01–E12. Классы доказательств разведены: наблюдаемая инженерия, внешний контекст, допущения, предлагаемые эксперименты. Пример: «E08 TP2 FP1 TN21 FN0 on 24 fixtures — handmade labels, no holdout → independent reviewed episodes». Вывод: «External sources establish context… not product efficacy. Code tests establish behavior, not demand». — [docs/competition/EVIDENCE_REGISTER.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/EVIDENCE_REGISTER.md); расширенная версия на 98 строк — [docs/competition-audit/EVIDENCE_REGISTER.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition-audit/EVIDENCE_REGISTER.md)
- **JURY_SCORECARD (АнтиДроп).** По каждому критерию рубрики три оценки (строгая / обычная / благосклонная) и прогноз «после доработок». Колонки: что подтверждено, почему снижение, что сделать. Отдельно — три причины непрохождения, три сильные стороны и пять задач с наибольшим эффектом. Итог честный: ~28/100. — [docs/competition-audit/JURY_SCORECARD.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition-audit/JURY_SCORECARD.md), [docs/competition/JURY_SCORECARD.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/JURY_SCORECARD.md)
- **PRODUCT_DISCOVERY и PILOT_PROTOCOL (АнтиДроп).** Гипотезы H1–H5 с колонкой «Failure condition». Двенадцать нейтральных вопросов интервью («Tell me about the last…», без наводящих вопросов о полезности). Охват посчитан формулой с пометкой «every input is unverified». Пилот в три этапа: синтетика → read-only shadow → контролируемое предупреждение, со stop criteria и владельцем отката. — [PRODUCT_DISCOVERY.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/PRODUCT_DISCOVERY.md), [PILOT_PROTOCOL.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/PILOT_PROTOCOL.md), [configs/pilot_stop_criteria.json](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/configs/pilot_stop_criteria.json)
- **Честная финмодель (АнтиДроп).** Формулы gross/net/ROI/payback, точка безубыточности по ключевому параметру («break-even d = 40% против допущения 5%»), вывод «Do not manufacture ROI with optimistic inputs». — [FINANCIAL_MODEL.md](https://github.com/dmitfadye/anti-drop-mvp/blob/HEAD/docs/competition/FINANCIAL_MODEL.md)
- **Реестр источников со статусами ✅/🟡/⚠️ и `slide_numbers.md` (nexus).** Каждая цифра на слайде прослеживается до первоисточника. — [docs/research/evidence.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/evidence.md), [docs/research/slide_numbers.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/slide_numbers.md)
- **Опрос как данные (nexus).** Сырой CSV, скрипт сводки, доли с ДИ Уилсона, пороги подтверждения гипотез заданы заранее, неподтверждённая гипотеза показана открыто. — [survey_results.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/survey_results.md), [scripts/survey_summary.py](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/research/scripts/survey_summary.py)
- **Измерение качества ИИ (Первый чек).** Эталон на 98 вопросов плюс отложенный набор на 36, прогнанный «один раз, без правок». Приведены разборы ошибок прошлого прогона. Медиана ответа 1,0 с на RTX 5070. Сверка базы знаний с действующими законами раз в неделю (`check_updates.py`). — [README](https://github.com/imaO0O/vtb/blob/HEAD/README.md)
- **Документы по рубрике (ЦФА Студия).** Файлы `01-problem`, `02-value-and-market`, `03-metrics`, `04-pilot`, `05-demo`, `06-test-plan` один к одному соответствуют критериям жюри. — [docs/](https://github.com/NickitaBogomolov/fintech-academy/tree/HEAD/docs)
- **TAM/SAM/SOM формулами с источниками и проверкой снизу вверх; конкуренты в CSV с `source_date` (ГеоСтарт).** — [market.md](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/market.md), [competitors.csv](https://github.com/TheDucklet/SimplyLovely_hack/blob/HEAD/docs/product/competitors.csv)
- **«Чем продукт НЕ является» (BankVision)** и дисклеймер «Демонстрационная оценка на синтетических данных». — [README](https://github.com/valeriastarnov/bankvision/blob/HEAD/README.md)
- **Видео-демо в репозитории** (nexus — 2:54, «Первый чек» — 1:58, записано Playwright-скриптом `record_demo.py`). Видео разрешено как замена развёрнутому демо. — [nexus README](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/README.md), [imaO0O/vtb README](https://github.com/imaO0O/vtb/blob/HEAD/README.md), [task-1](https://fintechacademy.ru/task-1)
- **ADR и HANDOFF (Business AI, nexus)** — решения и передача работы между сессиями, полезно для критерия «команда». — [docs/adr](https://github.com/1nc-0gn1t0/Business_AI/tree/HEAD/docs/adr), [nexus docs/HANDOFF.md](https://github.com/keshaptisa/nexus_vtb/blob/HEAD/docs/HANDOFF.md)

### Inferences (приоритет на 4 дня до 1 ноября)
1. `docs/EVIDENCE_REGISTER.md` по образцу АнтиДропа и nexus: РСПП, 1С, PlanFact и каждая цифра из презентации со статусом и следующим доказательством.
2. Пять–десять проблемных интервью по нейтральному гайду (12 вопросов «о последнем случае») плюс таблица результатов с цитатами и опровергнутыми гипотезами. Это главный рычаг на критерии 1 (20 баллов).
3. Эталонный набор писем с разметкой причин и отложенная часть; метрики «точность причины» и «доля счетов с найденной цитатой». Это закрывает критерий 4 и требование трека о контроле качества ИИ.
4. `docs/JURY_SCORECARD.md` — честная самооценка по 8 критериям с действиями. Сам документ баллов не даёт, но дисциплинирует подготовку питча.
5. Финмодель в xlsx с тремя сценариями и точкой безубыточности (как у nexus и АнтиДропа). Формула пользы: высвобождение оборотного капитала = выручка/30 × сокращение DSO. Пример из application.md (3 млн ₽/мес, −3 дня) уже есть, его нужно перенести в модель.
6. Видео на 2 минуты и один-два слайда «чем мы НЕ являемся» (не платёжный сервис, не коллектор, не подтверждаем поступления) и «почему не Оракул/BizHub».

### Gaps
- Эффект этих практик на оценку жюри не измерен: АнтиДроп при всех документах сам оценивает себя в 28/100. Документы помогают только вместе с реальными данными.
