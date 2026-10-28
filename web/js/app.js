import { $, $$, esc, rub, mln, pct, dateRu, dateShort, days, plural, toast, download, diffDays, addDays } from './util.js';
import { analyzeInvoice, nextSteps, portfolio, cashflow, factoring, CAUSE_KEYS, NEW_SALES } from './engine.js';
import { classifyText } from './rules.js';
import { reconcile, applyMatches, parse1C, to1C } from './reconcile.js';
import { letterTemplate, claimText, interest395 } from './documents.js';
import { parseCsv, exportCsv, SAMPLE } from './csv.js';

const KEY = 'oplata-v2';
const S = { demo: null, model: null, evalData: null, today: '', invoices: [], tasks: [], applied: [], statement: [], live: false, filter: 'late', q: '', open: null, imported: false };

// ---------- Состояние ----------
function save() {
  try { localStorage.setItem(KEY, JSON.stringify({ invoices: S.invoices, tasks: S.tasks, applied: S.applied, statement: S.statement, imported: S.imported, edits: S.edits, noAI: S.noAI })); } catch { /* приватный режим */ }
}
function restore() {
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s?.invoices?.length) Object.assign(S, s); } catch { /* ignore */ }
}
function resetDemo() {
  S.invoices = structuredClone(S.demo.invoices); S.statement = structuredClone(S.demo.statement);
  S.tasks = []; S.applied = []; S.imported = false; S.edits = {};
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}

const ctx = () => ({
  today: S.today, clients: S.clients, registry: S.demo.registry, analysis: S.noAI ? {} : S.imported ? S.liveAnalysis : { ...S.demo.analysis, ...S.liveAnalysis },
  model: S.model, causes: S.demo.causes, supplier: S.demo.supplier, outflows: S.demo.outflows,
});
let LIST = [];
function compute() {
  const c = ctx();
  LIST = S.invoices.map(i => analyzeInvoice(i, c)).sort((a, b) => b.priority - a.priority);
  for (const a of LIST) a.next = nextSteps(a, c)[0]?.t || (a.state === 'paid' ? 'Оплачено' : '');
  return LIST;
}
const byId = id => LIST.find(a => a.inv.id === id);
const C = k => S.demo.causes[k] || { ru: k === 'none' ? 'Срок не наступил' : k === 'closed' ? 'Оплачено' : 'Не определена', short: k === 'none' ? 'В срок' : k === 'closed' ? 'Оплачено' : '—' };
const causePill = (k, short = true) => `<span class="pill cause" style="--c:var(--c-${k})">${esc(short ? C(k).short : C(k).ru)}</span>`;
const srcTag = s => s === 'jev' ? '<span class="tag jev" title="Ответ decision-модели Jev">Jev</span>' : s === 'rules' ? '<span class="tag rules" title="Разбор правилами в браузере">правила</span>' : '';

// ---------- Загрузка ----------
async function boot() {
  const [demo, model, ev] = await Promise.all(['demo', 'forecast_model', 'eval'].map(n => fetch(`web/data/${n}.json`).then(r => r.json())));
  S.demo = demo; S.model = model; S.evalData = ev; S.today = demo.meta.demo_date; S.liveAnalysis = {}; S.edits = {};
  S.clients = { ...demo.clients };
  resetDemo(); restore();
  for (const i of S.invoices) if (!S.clients[i.inn]) S.clients[i.inn] = { name: i.client || 'Клиент', inn: i.inn, history: { late_share: 0.3, avg_delay: 7, invoices: 0 }, contact: '' };
  try { if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) throw 0; const r = await fetch('api/health', { cache: 'no-store' }); if (r.ok) S.live = (await r.json()).jev; } catch { /* статическое демо */ }
  $('#company').innerHTML = `<b>${esc(demo.supplier.name)}</b>${esc(demo.supplier.sector)}`;
  $('#asof').textContent = dateRu(S.today) + ' 2026';
  $('#mode-badge').className = 'mode' + (S.live ? ' live' : '');
  $('#mode-badge').innerHTML = S.live ? 'Живой режим: Jev + GigaChat через локальный сервер' : 'Демо: ответы Jev и GigaChat<br>сохранены заранее';
  $('#import-btn').onclick = importDialog;
  $('#reset-btn').onclick = () => { if (confirm('Вернуть демонстрационные данные? Ваши изменения будут удалены.')) { resetDemo(); render(); toast('Демо-данные восстановлены'); } };
  $('#noai').checked = !!S.noAI;
  $('#noai').onchange = e => { S.noAI = e.target.checked; save(); render(); toast(S.noAI ? 'ИИ выключен: разбор правилами, письма по шаблонам' : 'ИИ включён'); };
  $('#menu-btn').onclick = () => $('#sidebar').classList.toggle('open');
  $('#scrim').onclick = closeDrawer;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.open) closeDrawer(); });
  window.addEventListener('hashchange', render);
  render();
}

// ---------- Маршрутизация ----------
const VIEWS = { today: viewToday, invoices: viewInvoices, reconcile: viewReconcile, money: viewMoney, tasks: viewTasks, quality: viewQuality, bank: viewBank, how: viewHow };
const TITLES = { today: 'Сегодня', invoices: 'Счета', reconcile: 'Сверка выписки', money: 'Деньги сейчас', tasks: 'Мои действия', quality: 'Качество ИИ', bank: 'Для банка', how: 'Как это работает' };
function render() {
  compute();
  const [, view = 'today', arg] = location.hash.split('/');
  const v = VIEWS[view] ? view : 'today';
  $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.view === v));
  $('#crumbs').textContent = TITLES[v];
  const p = portfolio(LIST, ctx());
  $('#nav-late').textContent = p.lateN || '';
  const rec = reconcile(S.statement, S.invoices).filter(r => r.status !== 'posted' && !S.applied.includes(r.p.num) && r.match.length);
  $('#nav-rec').textContent = rec.length || '';
  $('#nav-tasks').textContent = S.tasks.filter(t => !t.done).length || '';
  $('#demo-strip').innerHTML = S.imported ? 'Загружены ваши данные. Причины определяются правилами в браузере' + (S.live ? ' и моделью Jev через локальный сервер.' : '. Данные не покидают браузер.')
    : '<b>Демонстрация.</b> Компании, суммы и переписка вымышлены. Ответы моделей Jev и GigaChat получены заранее — ключи в демо не хранятся.';
  $('#view').innerHTML = VIEWS[v](arg);
  bind(v);
  $('#sidebar').classList.remove('open');
  if (arg && v === 'invoices') openDrawer(arg);
  else { S.open = null; $('#drawer').hidden = true; $('#scrim').hidden = true; }
}

// ---------- Сегодня ----------
function viewToday() {
  const c = ctx(), p = portfolio(LIST, c), cf = cashflow(LIST, c), gap = cf.find(w => w.closing < 0);
  const queue = LIST.filter(a => a.bal > 0 && (a.late > 0 || a.inv.docs?.act === 'not_sent')).slice(0, 6);
  const lateCauses = Object.entries(p.byCause).sort((a, b) => b[1].sum - a[1].sum);
  const recN = reconcile(S.statement, S.invoices).filter(r => r.status === 'auto' && !S.applied.includes(r.p.num));
  return `
  <div class="page-head"><div><div class="eyebrow">${dateRu(S.today)}</div><h1>Деньги, которые пора получить</h1>
    <p>${p.lateN} ${plural(p.lateN, 'счёт просрочен', 'счёта просрочено', 'счетов просрочено')} на ${mln(p.lateSum)}. Из них <b>${mln(p.fixableSum)}</b> держат причины, которые вы можете устранить сами.</p></div>
    <div class="row"><a class="btn" href="#/invoices">Все счета</a>${recN.length ? `<a class="btn primary" href="#/reconcile">Сверить ${recN.length} ${recN.length === 1 ? 'платёж' : 'платежа'}</a>` : ''}</div></div>
  <div class="card kpis">
    <div class="kpi"><span>Ждём от клиентов</span><strong>${mln(p.total)}</strong><small>${p.openN} открытых счетов</small></div>
    <div class="kpi"><span>Просрочено</span><strong class="bad">${mln(p.lateSum)}</strong><small>${pct(p.lateSum / (p.total || 1))} дебиторки</small></div>
    <div class="kpi"><span>Можно устранить самим</span><strong class="ok">${mln(p.fixableSum)}</strong><small>документы, реквизиты, сверка, ответ</small></div>
    <div class="kpi"><span>Прогноз на 14 дней</span><strong>${mln(p.exp14)}</strong><small>ожидаемые поступления</small></div>
    <div class="kpi"><span>Срок оборота (DSO)</span><strong>${Math.round(p.dso)} дн.</strong><small>дебиторка / выручка × 30</small></div>
  </div>
  ${gap ? `<div class="alert bad mt"><b>Кассовый разрыв ${gap.week === 0 ? 'на этой неделе' : gap.week === 1 ? 'через неделю' : `через ${gap.week} ${plural(gap.week, 'неделю', 'недели', 'недель')}`}</b> (${dateRu(gap.from)}–${dateRu(gap.to)}): остаток уйдёт в ${rub(gap.closing)}. <a href="#/money">Как закрыть →</a></div>` : ''}
  <div class="grid g-main mt">
    <div class="card"><div class="pad" style="padding:20px 20px 6px"><h3>Что сделать сегодня</h3><p class="sub">Отсортировано по деньгам под риском: остаток × вероятность не получить его за 14 дней, с поправкой на срочность и на то, можете ли вы устранить причину сами.</p></div>
      <ul class="queue">${queue.map((a, i) => `<li data-open="${a.inv.id}"><span class="rank">${i + 1}</span>
        <div><div class="what">${esc(nextSteps(a, c)[0]?.t || 'Связаться с клиентом')}</div>
        <div class="meta">${esc(a.client.name)} · счёт ${esc(a.inv.id)} · ${a.late ? `<span class="bad">просрочка ${days(a.late)}</span>` : `срок ${dateShort(a.inv.due)}`} ${causePill(a.cause)} ${srcTag(a.src)}${a.brokenPromise ? '<span class="pill nodot" style="background:var(--bad-soft);color:var(--bad)">обещание нарушено</span>' : ''}</div></div>
        <div class="money">${rub(a.bal)}<small>${a.fc ? 'P(14 дн.) ' + pct(a.fc.p14) : ''}</small></div></li>`).join('')}</ul></div>
    <div class="grid" style="align-content:start">
      <div class="card pad"><h3>Почему не платят</h3><p class="sub">Просроченные счета по причинам из переписки</p>
        <div class="stack">${lateCauses.map(([k, v]) => `<i style="width:${(v.sum / p.lateSum) * 100}%;background:var(--c-${k})" title="${esc(C(k).ru)}"></i>`).join('')}</div>
        <div class="cause-rows mt">${lateCauses.map(([k, v]) => `<div class="cause-row" style="--c:var(--c-${k})"><span>${esc(C(k).ru)} <span class="mute">· ${v.n}</span></span><b>${rub(v.sum)}</b><div class="bar"><i style="width:${(v.sum / lateCauses[0][1].sum) * 100}%"></i></div></div>`).join('')}</div></div>
      <div class="card pad"><h3>Поступления и платежи, 8 недель</h3><p class="sub">Ожидаемые поступления по прогнозу против плановых платежей</p>${cashChart(cf)}</div>
    </div>
  </div>`;
}

function cashChart(rows) {
  const W = 520, H = 210, pl = 8, pb = 26, max = Math.max(...rows.map(r => Math.max(r.inflow, r.outflow)), 1);
  const minC = Math.min(0, ...rows.map(r => r.closing)), maxC = Math.max(...rows.map(r => r.closing), 1);
  const bw = (W - pl * 2) / rows.length, y = v => (H - pb) - (v / max) * (H - pb - 14);
  const yc = v => (H - pb) - ((v - minC) / (maxC - minC || 1)) * (H - pb - 14);
  const line = rows.map((r, i) => `${pl + bw * i + bw / 2},${yc(r.closing)}`).join(' ');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Прогноз денежного потока">
    ${rows.map((r, i) => { const x = pl + bw * i; return `
      <rect x="${x + bw * .14}" y="${y(r.inflow)}" width="${bw * .34}" height="${H - pb - y(r.inflow)}" rx="3" fill="var(--accent)"><title>Поступления ${rub(r.inflow)}</title></rect>
      <rect x="${x + bw * .52}" y="${y(r.outflow)}" width="${bw * .34}" height="${H - pb - y(r.outflow)}" rx="3" fill="#c9d0db"><title>Платежи ${rub(r.outflow)}${r.items.map(o => ' · ' + o.what).join('')}</title></rect>
      <text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle">${dateShort(r.from)}</text>`; }).join('')}
    ${minC < 0 ? `<line x1="0" x2="${W}" y1="${yc(0)}" y2="${yc(0)}" stroke="var(--bad)" stroke-dasharray="4 4" stroke-width="1"/>` : ''}
    <polyline points="${line}" fill="none" stroke="var(--ink)" stroke-width="2"/>
    ${rows.map((r, i) => `<circle cx="${pl + bw * i + bw / 2}" cy="${yc(r.closing)}" r="3.5" fill="${r.closing < 0 ? 'var(--bad)' : 'var(--ink)'}"><title>Остаток ${rub(r.closing)}</title></circle>`).join('')}
  </svg><div class="legend"><span><i style="background:var(--accent)"></i>Поступления</span><span><i style="background:#c9d0db"></i>Платежи</span><span><i style="background:var(--ink);height:2px"></i>Остаток на счёте</span></div>`;
}

// ---------- Счета ----------
function viewInvoices() {
  const f = S.filter, q = S.q.trim().toLowerCase();
  const rows = LIST.filter(a => (f === 'all' || (f === 'late' ? a.late > 0 : f === 'open' ? a.state === 'open' : a.state === 'paid')))
    .filter(a => !q || (a.client.name + ' ' + a.inv.id + ' ' + C(a.cause).ru).toLowerCase().includes(q));
  const cnt = k => LIST.filter(a => (k === 'late' ? a.late > 0 : k === 'open' ? a.state === 'open' : k === 'paid' ? a.state === 'paid' : true)).length;
  return `<div class="page-head"><div><div class="eyebrow">Реестр</div><h1>Счета</h1><p>По каждому счёту — причина задержки с основанием из переписки, прогноз оплаты и следующий шаг.</p></div>
    <div class="row"><button class="btn" id="export">Выгрузить CSV</button></div></div>
  <div class="card"><div class="toolbar"><div class="seg" role="group">${[['late', 'Просрочены'], ['open', 'В срок'], ['paid', 'Оплачены'], ['all', 'Все']].map(([k, l]) => `<button data-f="${k}" class="${f === k ? 'on' : ''}">${l} ${cnt(k)}</button>`).join('')}</div>
    <input class="search" id="q" placeholder="Клиент, номер счёта или причина" value="${esc(S.q)}"></div>
  <div class="table-wrap"><table><thead><tr><th>Клиент / счёт</th><th class="r">Остаток</th><th>Срок</th><th>Причина</th><th class="hide-sm">Оплата за 14 дн.</th><th class="hide-sm">Следующий шаг</th></tr></thead>
  <tbody>${rows.map(a => `<tr class="click" data-open="${a.inv.id}"><td><div class="t1">${esc(a.client.name)}</div><div class="t2">№ ${esc(a.inv.id)} · ${esc(a.inv.owner || '')}</div></td>
    <td class="r"><div class="t1">${rub(a.bal)}</div>${a.inv.paid ? `<div class="t2">из ${rub(a.inv.amount)}</div>` : ''}</td>
    <td><div>${dateShort(a.inv.due)}</div><div class="t2 ${a.late ? 'bad' : ''}">${a.late ? '+' + days(a.late) : a.state === 'paid' ? 'закрыт' : 'через ' + days(Math.max(0, diffDays(a.inv.due, S.today)))}</div></td>
    <td>${causePill(a.cause)} ${srcTag(a.src)}</td>
    <td class="hide-sm">${a.fc ? `<div class="row" style="gap:8px;flex-wrap:nowrap"><div class="bar" style="width:70px"><i style="width:${a.fc.p14 * 100}%;background:${a.fc.p14 < .3 ? 'var(--bad)' : a.fc.p14 < .6 ? 'var(--warn)' : 'var(--ok)'}"></i></div><span class="num">${pct(a.fc.p14)}</span></div>` : '—'}</td>
    <td class="hide-sm" style="max-width:260px">${esc(a.next)}</td></tr>`).join('')}</tbody></table>
  ${rows.length ? '' : '<div class="empty">Нет счетов по этому фильтру</div>'}</div></div>`;
}

// ---------- Карточка счёта ----------
function openDrawer(id) {
  const a = byId(id); if (!a) return;
  S.open = id;
  const c = ctx(), steps = nextSteps(a, c), d = $('#drawer');
  const probs = a.probs ? Object.entries(a.probs).filter(([k]) => CAUSE_KEYS.includes(k)).sort((x, y) => y[1] - x[1]) : [];
  const letter = S.edits?.[id] || (a.llm?.body && !S.noAI ? { subject: a.llm.subject, body: a.llm.body, src: 'llm' } : { ...letterTemplate(a, S.demo.supplier), src: 'template' });
  const bad = a.llm?.invalid_numbers?.length && !S.edits?.[id] ? a.llm.invalid_numbers : [];
  const showClaim = a.bal > 0 && (a.late >= 30 || (a.cause === 'liquidity' && a.late > 14));
  const j = a.jev;
  d.innerHTML = `
  <div class="drawer-head"><div style="flex:1"><div class="eyebrow">Счёт № ${esc(a.inv.id)} · ${esc(a.inv.owner || '')}</div><h2>${esc(a.client.name)}</h2>
    <div class="note">${esc(a.client.sector || '')}${a.client.contact ? ' · ' + esc(a.client.contact) : ''}</div></div><button class="icon-btn" id="close-d" aria-label="Закрыть">×</button></div>
  <div class="drawer-body">
    <div class="facts"><div><span>Остаток</span><b>${rub(a.bal)}</b></div><div><span>Срок оплаты</span><b>${dateRu(a.inv.due)}</b></div><div><span>${a.late ? 'Просрочка' : 'Статус'}</span><b class="${a.late ? 'bad' : ''}">${a.late ? days(a.late) : a.state === 'paid' ? 'оплачен' : 'в срок'}</b></div>
      <div><span>Акт / УПД</span><b>${{ signed: 'подписан', sent: 'отправлен', not_sent: 'не отправлен', rejected: 'отклонён' }[a.inv.docs?.act] || '—'}</b></div><div><span>ЭДО</span><b>${a.inv.docs?.edo ? 'да' : 'нет'}</b></div>
      <div><span>История клиента</span><b>${a.client.history ? pct(a.client.history.late_share) + ' с просрочкой' : '—'}</b></div></div>

    ${a.bal > 0 ? `<div class="card pad"><div class="row between"><h3>Почему не платят</h3>${srcTag(a.src)}</div>
      ${a.cause !== 'none' ? `<p style="margin:6px 0 12px"><b style="font-size:18px">${esc(C(a.cause).ru)}</b><br><span class="note">${esc(C(a.cause).why || '')}</span></p>` : '<p class="note">Срок оплаты не наступил, переписки по оплате нет.</p>'}
      ${probs.length ? `<div class="probs">${probs.slice(0, 4).map(([k, v], i) => `<div class="prob ${i ? '' : 'top'}" style="--c:var(--c-${k})"><span>${esc(C(k).short)}</span><div class="bar"><i style="width:${v * 100}%"></i></div><span class="num">${pct(v)}</span></div>`).join('')}</div>
      <p class="note" style="margin:8px 0 0">${a.src === 'jev' ? `Вероятности — ответ decision-модели ${esc(S.demo.meta.jev_model)} на вопрос о переписке. Модель не видит правильный ответ.` : 'Оценка правилами: точной вероятности нет, это эвристика.'}</p>` : ''}
      ${a.evidence ? `<div class="quote mt"><small>Основание · письмо клиента ${dateRu(a.evidence.date)}</small>${esc(a.evidence.text)}</div>` : ''}
      ${j ? `<div class="row mt" style="gap:6px">${[['fixable', 'Можно устранить самим'], ['promise', 'Есть обещание оплаты'], ['docs_ok', 'Документы приняты'], ['insolvency', 'Признаки неплатёжеспособности']].map(([k, l]) => `<span class="pill nodot" title="Ответ Jev: ${pct(j[k].noul)}" style="background:${j[k].noul > .5 ? (k === 'insolvency' ? 'var(--bad-soft)' : 'var(--ok-soft)') : 'var(--line2)'};color:${j[k].noul > .5 ? (k === 'insolvency' ? 'var(--bad)' : 'var(--ok)') : 'var(--mute)'}">${l}: ${pct(j[k].noul)}</span>`).join('')}</div>` : ''}
      ${a.brokenPromise ? `<div class="alert bad mt">Клиент обещал оплатить ${dateRu(a.promised)}, платёж не поступил.</div>` : a.promised ? `<div class="alert info mt">Клиент назвал дату: ${dateRu(a.promised)}.</div>` : ''}
      ${a.reg.flags?.length ? `<div class="alert warn mt"><b>Сигналы по открытым реестрам</b><ul class="flags">${a.reg.flags.map(f => `<li>${esc(f)}</li>`).join('')}</ul><span class="note">В демо — заданные значения. В пилоте — ФНС, Федресурс, картотека арбитражных дел.</span></div>` : ''}
    </div>

    <div class="card pad"><h3>Что сделать</h3><p class="sub">${esc(C(a.cause).action || 'Подготовиться к сроку оплаты')}</p>
      <ol class="steps">${steps.map(s => `<li><div>${esc(s.t)}<small>${esc(s.d)}</small></div></li>`).join('')}</ol>
      <div class="row mt"><button class="btn primary" id="add-task">В мои действия</button>${showClaim ? '<button class="btn" id="claim">Подготовить претензию</button>' : ''}<button class="btn" id="pay-btn">Учесть поступление</button></div></div>

    ${a.fc ? `<div class="card pad"><h3>Прогноз оплаты</h3><p class="sub">Модель на признаках клиента и причины. Обучена на синтетической истории — в пилоте переобучается на ваших данных.</p>
      <div class="grid g3"><div><span class="note">За 7 дней</span><div class="big">${pct(a.fc.p7)}</div></div><div><span class="note">За 14 дней</span><div class="big">${pct(a.fc.p14)}</div></div><div><span class="note">За 30 дней</span><div class="big">${pct(a.fc.p30)}</div></div></div>
      <p class="note">Если клиент заплатит, медианный срок — около ${days(Math.max(1, Math.round(a.fc.median)))} от сегодня. Деньги под риском: <b>${rub(a.atRisk)}</b>.</p></div>` : ''}

    <div class="card pad"><div class="row between"><h3>Письмо клиенту</h3>${letter.src === 'llm' ? `<span class="tag llm" title="Текст сгенерирован ИИ">Сгенерировано ИИ · ${esc(a.llm.model || 'GigaChat')}</span>` : letter.src === 'edit' ? '<span class="tag">изменено вами</span>' : '<span class="tag">шаблон</span>'}</div>
      <p class="sub">Черновик. Сервис ничего не отправляет сам — проверьте и отправьте из своей почты.</p>
      ${bad.length ? `<div class="alert warn">Проверка фактов: в письме есть ${bad.length === 1 ? 'число' : 'числа'} <b>${bad.map(esc).join(', ')}</b>, которых нет в счёте и переписке. Модель могла это придумать — поправьте перед отправкой.</div>` : letter.src === 'llm' ? '<div class="alert ok">Проверка фактов: все суммы, даты и номера в письме есть в счёте или переписке.</div>' : ''}
      <input type="text" id="l-subj" value="${esc(letter.subject)}" class="mt" aria-label="Тема письма">
      <textarea id="l-body" class="mt" rows="8" aria-label="Текст письма">${esc(letter.body)}</textarea>
      <div class="row mt"><button class="btn primary" id="copy">Скопировать</button><button class="btn" id="save-l">Сохранить правки</button>${letter.src !== 'template' ? '<button class="btn ghost" id="tpl">Шаблон вместо модели</button>' : ''}</div></div>` : `<div class="alert ok">Счёт оплачен полностью.</div>`}

    <div class="card pad"><div class="row between"><h3>Переписка</h3><button class="btn sm" id="add-msg">+ Добавить письмо клиента</button></div>
      <div class="thread mt">${(a.inv.messages || []).map((m, i) => `<div class="msg ${m.from === 'us' ? 'us' : ''} ${a.evidence?.index === i ? 'hl' : ''}"><small>${m.from === 'us' ? 'Мы' : esc(a.client.name)} · ${dateRu(m.date)}</small>${esc(m.text)}</div>`).join('') || '<p class="note">Переписки нет.</p>'}</div>
      <div id="msg-form" hidden class="mt"><textarea id="msg-text" rows="4" placeholder="Вставьте текст письма или сообщения клиента"></textarea><div class="row mt"><button class="btn primary" id="msg-save">Добавить и разобрать</button></div></div></div>
  </div>`;
  d.hidden = false; $('#scrim').hidden = false;
  $('#close-d').onclick = closeDrawer;
  const on = (s, fn) => { const el = $(s, d); if (el) el.onclick = fn; };
  on('#add-task', () => { const s = steps[0]; if (!s) return; S.tasks.push({ id: Date.now(), inv: a.inv.id, t: s.t, client: a.client.name, amount: a.bal, due: addDays(S.today, 2), done: false }); save(); render(); toast('Добавлено в «Мои действия»'); });
  on('#copy', () => { navigator.clipboard?.writeText($('#l-subj').value + '\n\n' + $('#l-body').value); toast('Письмо скопировано'); });
  on('#save-l', () => { S.edits[id] = { subject: $('#l-subj').value, body: $('#l-body').value, src: 'edit' }; save(); openDrawer(id); toast('Правки сохранены'); });
  on('#tpl', () => { S.edits[id] = { ...letterTemplate(a, S.demo.supplier), src: 'edit' }; save(); openDrawer(id); });
  on('#claim', () => claimDialog(a));
  on('#pay-btn', () => paymentDialog(a));
  on('#add-msg', () => { $('#msg-form', d).hidden = false; $('#msg-text', d).focus(); });
  on('#msg-save', () => addMessage(a, $('#msg-text', d).value));
}
function closeDrawer() { S.open = null; $('#drawer').hidden = true; $('#scrim').hidden = true; if (location.hash.split('/')[2]) history.replaceState(null, '', '#/' + location.hash.split('/')[1]); }

async function addMessage(a, text) {
  text = text.trim(); if (!text) return;
  const inv = S.invoices.find(i => i.id === a.inv.id && i.inn === a.inv.inn);
  inv.messages = [...(inv.messages || []), { date: S.today, from: 'client', text: text.slice(0, 5000) }];
  delete S.demo.analysis[inv.id]; // старый ответ модели больше не относится к переписке
  delete S.edits[inv.id];
  if (S.live) {
    try {
      toast('Спрашиваем Jev и GigaChat…');
      const r = await fetch('api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoice: inv, client: S.clients[inv.inn], today: S.today }) });
      if (r.ok) S.liveAnalysis[inv.id] = await r.json();
    } catch { toast('Сервер недоступен — разбор правилами'); }
  }
  save(); render(); openDrawer(inv.id);
  toast(S.live ? 'Разобрано моделью Jev' : 'Разобрано правилами: ' + C(classifyText(text).cause).ru);
}

// ---------- Диалоги ----------
function dialog(html, onReady) {
  const dlg = $('#dlg'); $('#dlg-body').innerHTML = html; dlg.showModal();
  $$('[data-close]', dlg).forEach(b => b.onclick = () => dlg.close());
  onReady?.(dlg);
}
function claimDialog(a) {
  const text = claimText(a, S.demo.supplier, S.today), pr = interest395(a.bal, addDays(a.inv.due, 1), S.today);
  dialog(`<div class="dlg-head"><h3>Претензия по счёту № ${esc(a.inv.id)}</h3><button class="icon-btn" data-close>×</button></div>
    <div class="dlg-body"><div class="alert info">Долг ${rub(a.bal)} + проценты по ст. 395 ГК РФ ${rub(pr.total)}. Собрано шаблоном, без генеративной модели: юридический текст должен быть точным. Проверьте условия договора о неустойке.</div><pre class="doc">${esc(text)}</pre></div>
    <div class="dlg-foot"><button class="btn" data-close>Закрыть</button><button class="btn primary" id="dl-claim">Скачать .txt</button></div>`,
    () => { $('#dl-claim').onclick = () => download(`pretenziya_${a.inv.id}.txt`, text); });
}
function paymentDialog(a) {
  dialog(`<form id="pf"><div class="dlg-head"><h3>Поступление по счёту № ${esc(a.inv.id)}</h3><button type="button" class="icon-btn" data-close>×</button></div>
    <div class="dlg-body"><p class="note">Остаток ${rub(a.bal)}. Ручная отметка. Чтобы сверить автоматически, загрузите выписку в разделе «Сверка выписки».</p>
    <input type="number" id="pa" min="1" max="${a.bal}" step="0.01" required placeholder="Сумма, ₽" aria-label="Сумма поступления"></div>
    <div class="dlg-foot"><button type="button" class="btn" data-close>Отмена</button><button class="btn primary">Сохранить</button></div></form>`,
    dlg => { $('#pf').onsubmit = e => { e.preventDefault(); const v = Number($('#pa').value); if (!(v > 0 && v <= a.bal)) return toast('Сумма должна быть не больше остатка'); const inv = S.invoices.find(i => i.id === a.inv.id && i.inn === a.inv.inn); inv.paid = Math.round(((inv.paid || 0) + v) * 100) / 100; save(); dlg.close(); render(); openDrawer(inv.id); toast('Поступление учтено'); }; });
}
function importDialog() {
  dialog(`<div class="dlg-head"><h3>Загрузить свои данные</h3><button class="icon-btn" data-close>×</button></div>
    <div class="dlg-body"><p>Реестр счетов в CSV (выгрузка из 1С, Excel, CRM). Обязательные колонки: <code>invoice_id, client, amount, due_date</code>; дополнительно <code>inn, paid, owner, act, context</code> — в <code>context</code> можно вставить текст переписки. Данные остаются в вашем браузере.</p>
    <div class="row"><label class="btn">Выбрать CSV<input type="file" id="csvf" accept=".csv,text/csv" hidden></label><button class="btn ghost" id="sample">Скачать образец</button></div>
    <textarea id="csvt" rows="6" placeholder="Или вставьте таблицу текстом"></textarea><div id="ierr" class="alert bad" hidden></div></div>
    <div class="dlg-foot"><button class="btn" data-close>Отмена</button><button class="btn primary" id="do-import">Загрузить</button></div>`, dlg => {
    $('#sample').onclick = () => download('oplata_obrazec.csv', '﻿' + SAMPLE, 'text/csv;charset=utf-8');
    $('#csvf').onchange = async e => { const f = e.target.files[0]; if (!f) return; if (f.size > 2e6) return showErr('Файл больше 2 МБ'); const buf = await f.arrayBuffer(); let t = new TextDecoder('utf-8').decode(buf); if (t.includes('�')) t = new TextDecoder('windows-1251').decode(buf); $('#csvt').value = t; };
    const showErr = m => { $('#ierr').hidden = false; $('#ierr').textContent = m; };
    $('#do-import').onclick = () => {
      try {
        const rows = parseCsv($('#csvt').value, S.today);
        for (const i of rows) if (!S.clients[i.inn]) S.clients[i.inn] = { name: i.client, inn: i.inn, history: { late_share: 0.3, avg_delay: 7, invoices: 0 }, contact: '' };
        S.invoices = rows; S.statement = []; S.tasks = []; S.applied = []; S.imported = true; S.edits = {}; S.liveAnalysis = {};
        save(); dlg.close(); location.hash = '#/invoices'; render(); toast(`Загружено счетов: ${rows.length}`);
      } catch (e) { showErr(e.message); }
    };
  });
}

// ---------- Сверка ----------
function viewReconcile() {
  const res = reconcile(S.statement, S.invoices);
  const st = { auto: ['Найден счёт', 'ok'], check: ['Проверьте', 'warn'], unmatched: ['Не найден', 'mute'], posted: ['Уже учтён', 'mute'] };
  return `<div class="page-head"><div><div class="eyebrow">Выписка по счёту</div><h1>Сверка поступлений</h1>
    <p>Сервис сопоставляет платежи из выписки со счетами: по ИНН плательщика, номерам счетов в назначении платежа и сумме. Каждое совпадение объяснено. Так находятся счета, которые клиент уже оплатил, а у вас они висят как долг.</p></div>
    <div class="row"><label class="btn">Загрузить выписку 1С<input type="file" id="f1c" accept=".txt" hidden></label><button class="btn ghost" id="dl1c">Пример файла 1С</button></div></div>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Платёж</th><th class="r">Сумма</th><th>Назначение</th><th>Результат</th><th></th></tr></thead><tbody>
  ${res.map(r => { const applied = S.applied.includes(r.p.num); return `<tr><td><div class="t1">${esc(r.p.payer)}</div><div class="t2">п/п ${esc(r.p.num)} · ${dateShort(r.p.date)} · ИНН ${esc(r.p.payer_inn)}</div></td>
    <td class="r t1">${rub(r.p.amount)}</td><td style="max-width:280px;font-size:13px">${esc(r.p.purpose)}</td>
    <td><span class="pill ${st[r.status][1]}" style="background:var(--${st[r.status][1] === 'mute' ? 'line2' : st[r.status][1] + '-soft'})">${applied ? 'Учтено' : st[r.status][0]}</span>${r.match.length ? ` → ${r.match.map(m => `<a href="#/invoices/${m.id}">№ ${esc(m.id)}</a>`).join(', ')}` : ''}<div class="t2">${esc(r.why.join(' · '))}${r.status !== 'posted' && r.match.length ? ` · уверенность ${pct(r.conf)}` : ''}</div></td>
    <td class="r">${r.match.length && r.status !== 'posted' && !applied ? `<button class="btn sm ${r.status === 'auto' ? 'primary' : ''}" data-apply="${esc(r.p.num)}">Учесть</button>` : ''}</td></tr>`; }).join('') || '<tr><td colspan="5" class="empty">Выписка не загружена</td></tr>'}
  </tbody></table></div></div>
  <p class="note mt">Формат 1CClientBankExchange выгружает любой российский банк. Внутри банка сервис получает выписку напрямую — без файлов.</p>`;
}

// ---------- Деньги сейчас ----------
function viewMoney() {
  const c = ctx(), cf = cashflow(LIST, c), gap = cf.find(w => w.closing < 0), minW = cf.reduce((m, w) => w.closing < m.closing ? w : m, cf[0]);
  const fx = factoring(LIST, c).sort((a, b) => b.ok - a.ok || a.cost / a.amount - b.cost / b.amount);
  const okList = fx.filter(x => x.ok), need = gap ? -minW.closing : 0;
  let acc = 0; const pick = [];
  for (const x of okList) { if (acc >= need) break; pick.push(x.a.inv.id); acc += x.amount; }
  const pickCost = okList.filter(x => pick.includes(x.a.inv.id)).reduce((s, x) => s + x.cost, 0);
  return `<div class="page-head"><div><div class="eyebrow">Кассовый разрыв и финансирование</div><h1>Деньги сейчас</h1>
    <p>Прогноз остатка на 8 недель: ожидаемые поступления по каждому счёту против плановых платежей. Если впереди разрыв, сервис подбирает счета, которые можно профинансировать через факторинг, и считает цену денег.</p></div></div>
  <div class="grid g-main"><div class="card pad"><h3>Остаток на счёте по неделям</h3><p class="sub">На сегодня ${rub(S.demo.supplier.cash_on_hand)}. Поступления — ожидаемое значение по прогнозу оплаты каждого счёта; с ${NEW_SALES.startWeek + 1}-й недели добавлены новые счета по плану выручки (допущение: ${pct(NEW_SALES.share)} оплачиваются в срок).</p>${cashChart(cf)}
    <div class="table-wrap mt"><table><thead><tr><th>Неделя</th><th class="r">Поступления</th><th class="r">Платежи</th><th class="r">Остаток</th></tr></thead><tbody>${cf.map(w => `<tr><td>${dateShort(w.from)}–${dateShort(w.to)}<div class="t2">${esc(w.items.map(o => o.what).join(', '))}</div></td><td class="r">${rub(w.inflow)}${w.sales ? `<div class="t2">в т.ч. новые счета ${rub(w.sales)}</div>` : ''}</td><td class="r">${rub(w.outflow)}</td><td class="r t1 ${w.closing < 0 ? 'bad' : ''}">${rub(w.closing)}</td></tr>`).join('')}</tbody></table></div></div>
  <div class="grid" style="align-content:start">
    ${gap ? `<div class="card pad" style="border-color:var(--bad)"><div class="eyebrow" style="color:var(--bad)">Разрыв ${dateRu(gap.from)}–${dateRu(gap.to)}</div><div class="big bad">${rub(minW.closing)}</div><p class="note">не хватит на неделе ${dateShort(minW.from)}: ${esc(minW.items.map(o => o.what).join(', ') || 'платежи')}. При этом клиенты должны вам ${mln(portfolio(LIST, c).lateSum)} просроченных денег.</p>
      <div class="alert ok"><b>Решение:</b> профинансировать ${pick.length} ${pick.length === 1 ? 'счёт' : pick.length < 5 ? 'счёта' : 'счетов'} через факторинг — получить до <b>${rub(acc)}</b> сегодня. Ориентировочная стоимость ${rub(pickCost)}.</div>
      <button class="btn primary mt" id="fx-req">Отправить заявку на факторинг</button><p class="note">Демо: заявка не отправляется. В пилоте — реестр уступки в факторинговую компанию банка по подписанным УПД.</p></div>`
      : '<div class="card pad"><h3>Разрыва не видно</h3><p class="note">На 8 недель остаток положительный при текущем прогнозе.</p></div>'}
    <div class="card pad"><h3>Почему не всё можно профинансировать</h3><p class="sub">Фактор берёт счета с подписанным актом, без спора и без признаков неплатёжеспособности дебитора. Это те же сигналы, что сервис достаёт из переписки.</p>
      <ul class="flags">${fx.filter(x => !x.ok).slice(0, 6).map(x => `<li>№ ${esc(x.a.inv.id)} ${esc(x.a.client.name)} — ${esc(x.reasons.join(', '))}</li>`).join('')}</ul></div>
  </div></div>
  <div class="card mt"><div class="pad" style="padding:20px 20px 0"><h3>Счета, доступные для факторинга</h3><p class="sub">Аванс 90%, ставка — ключевая 14% + 5 п.п., комиссия 0,5%. Ставка условная: реальные условия определяет факторинговая компания.</p></div>
  <div class="table-wrap"><table><thead><tr><th>Счёт</th><th class="r">Остаток</th><th class="r">Можно получить</th><th class="r">Ожидаем оплату через</th><th class="r">Стоимость</th></tr></thead><tbody>
  ${okList.map(x => `<tr class="click" data-open="${x.a.inv.id}"><td><div class="t1">${esc(x.a.client.name)}</div><div class="t2">№ ${esc(x.a.inv.id)} ${pick.includes(x.a.inv.id) ? '· <b class="ok">в заявке</b>' : ''}</div></td><td class="r">${rub(x.a.bal)}</td><td class="r t1">${rub(x.amount)}</td><td class="r">${days(x.daysToPay)}</td><td class="r">${rub(x.cost)} <span class="t2">(${pct(x.cost / x.amount, 1)})</span></td></tr>`).join('')}
  </tbody></table></div></div>`;
}

// ---------- Мои действия ----------
function viewTasks() {
  const open = S.tasks.filter(t => !t.done), done = S.tasks.filter(t => t.done);
  const row = t => `<tr><td><div class="t1">${esc(t.t)}</div><div class="t2"><a href="#/invoices/${esc(t.inv)}">${esc(t.client)} · № ${esc(t.inv)}</a></div></td><td class="r">${rub(t.amount)}</td><td>${dateShort(t.due)}</td><td class="r"><button class="btn sm" data-task="${t.id}">${t.done ? 'Вернуть' : 'Готово'}</button></td></tr>`;
  return `<div class="page-head"><div><div class="eyebrow">Задачи</div><h1>Мои действия</h1><p>Шаги, которые вы взяли в работу из карточек счетов. Время от появления сигнала до действия — одна из главных метрик продукта.</p></div></div>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Действие</th><th class="r">Сумма</th><th>Срок</th><th></th></tr></thead><tbody>${open.map(row).join('') || '<tr><td colspan="4" class="empty">Пока пусто. Откройте счёт и нажмите «В мои действия».</td></tr>'}${done.length ? `<tr><th colspan="4">Выполнено</th></tr>${done.map(row).join('')}` : ''}</tbody></table></div></div>`;
}

// ---------- Качество ИИ ----------
function viewQuality() {
  const rows = S.evalData.rows.filter(r => !r.excluded), excl = S.evalData.rows.filter(r => r.excluded);
  const pred = rows.map(r => ({ r, jev: r.jev.pred, rules: classifyText(r.text).cause }));
  const acc = k => pred.filter(p => p[k] === p.r.label).length;
  const per = k => CAUSE_KEYS.map(c => { const tp = pred.filter(p => p[k] === c && p.r.label === c).length, fp = pred.filter(p => p[k] === c && p.r.label !== c).length, fn = pred.filter(p => p[k] !== c && p.r.label === c).length; return { c, p: tp / (tp + fp || 1), rc: tp / (tp + fn || 1), n: tp + fn }; });
  const cm = k => CAUSE_KEYS.map(t => CAUSE_KEYS.map(p => pred.filter(x => x.r.label === t && x[k] === p).length));
  const inv = S.demo.invoices.filter(i => i.label !== 'none' && S.demo.analysis[i.id]?.jev);
  const invHit = inv.filter(i => S.demo.analysis[i.id].jev.answers.cause.choice === i.label).length;
  const invRules = inv.filter(i => classifyText([...i.messages].reverse().find(m => m.from === 'client')?.text || '').cause === i.label).length;
  const lat = Object.values(S.demo.analysis).map(a => a.jev?.latency_ms).filter(Boolean);
  const letters = Object.values(S.demo.analysis).filter(a => a.llm);
  const flagged = letters.filter(a => a.llm.invalid_numbers?.length);
  const m = S.model.metrics;
  const cmTable = k => `<table class="cm"><tr><th></th>${CAUSE_KEYS.map(c => `<th title="${esc(C(c).ru)}">${esc(C(c).short.slice(0, 6))}</th>`).join('')}</tr>${cm(k).map((r, i) => `<tr><th style="text-align:right">${esc(C(CAUSE_KEYS[i]).short)}</th>${r.map((v, j) => `<td style="background:${v ? (i === j ? `rgba(19,138,91,${0.15 + v / 20})` : `rgba(194,65,45,${0.15 + v / 8})`) : 'var(--line2)'};font-weight:${v ? 800 : 400}">${v || ''}</td>`).join('')}</tr>`).join('')}</table><p class="note">Строки — правильная причина, столбцы — ответ.</p>`;
  return `<div class="page-head"><div><div class="eyebrow">Контроль качества</div><h1>Насколько можно доверять разбору</h1>
    <p>ИИ используется в двух местах: decision-модель Jev определяет причину по переписке, GigaChat пишет черновик письма. Суммы, сроки, проценты и сверка считаются обычным кодом. Ниже — проверка на размеченных письмах.</p></div></div>
  <div class="grid g4">
    <div class="card pad"><span class="note">Jev, причина по письму</span><div class="big ok">${pct(acc('jev') / rows.length)}</div><span class="note">${acc('jev')} из ${rows.length} писем</span></div>
    <div class="card pad"><span class="note">Правила (без ИИ), то же</span><div class="big warn">${pct(acc('rules') / rows.length)}</div><span class="note">${acc('rules')} из ${rows.length} — базовая линия</span></div>
    <div class="card pad"><span class="note">Jev, причина по всей истории счёта</span><div class="big ok">${invHit} / ${inv.length}</div><span class="note">правила по последнему письму: ${invRules} / ${inv.length}</span></div>
    <div class="card pad"><span class="note">Время ответа Jev</span><div class="big">${(lat.sort((a, b) => a - b)[Math.floor(lat.length / 2)] / 1000 || 0).toFixed(1).replace('.', ',')} с</div><span class="note">медиана, ${lat.length} запросов</span></div>
  </div>
  <div class="alert warn mt"><b>Ограничение.</b> Все письма синтетические: ${rows.filter(r => r.source === 'hand').length} написаны вручную с намеренно трудными формулировками, ${rows.filter(r => r.source === 'gigachat').length} сгенерированы GigaChat. ${excl.length} сгенерированных писем исключены при ручной проверке до подсчёта метрик (написаны от лица поставщика или противоречивы). На реальной переписке точность будет ниже — её мы измерим в пилоте на обезличенных письмах.</div>
  <div class="grid g2 mt">
    <div class="card pad"><h3>Jev: матрица ошибок</h3><p class="sub">Модель ${esc(S.evalData.model)} · ответ «причина не названа» считается классом «молчит»</p>${cmTable('jev')}</div>
    <div class="card pad"><h3>Правила: матрица ошибок</h3><p class="sub">Регулярные выражения в браузере — работают без сети</p>${cmTable('rules')}</div>
  </div>
  <div class="card mt"><div class="table-wrap"><table><thead><tr><th>Причина</th><th class="r">Писем</th><th class="r">Jev точность</th><th class="r">Jev полнота</th><th class="r">Правила точность</th><th class="r">Правила полнота</th></tr></thead><tbody>
  ${per('jev').map((x, i) => { const y = per('rules')[i]; return `<tr><td>${causePill(x.c, false)}</td><td class="r">${x.n}</td><td class="r">${pct(x.p)}</td><td class="r">${pct(x.rc)}</td><td class="r">${pct(y.p)}</td><td class="r">${pct(y.rc)}</td></tr>`; }).join('')}</tbody></table></div></div>
  <div class="grid g2 mt">
    <div class="card pad"><h3>Проверка писем GigaChat</h3><p class="sub">Каждое число в черновике сверяется с данными счёта и перепиской</p>
      <div class="big">${letters.length - flagged.length} / ${letters.length}</div><p class="note">писем прошли проверку фактов. ${flagged.length ? `В ${flagged.length} модель добавила число, которого нет во входных данных (${flagged.map(a => `№ ${a.id}: «${a.llm.invalid_numbers.join(', ')}»`).join('; ')}) — интерфейс показывает предупреждение.` : ''} Письма не отправляются без человека.</p></div>
    <div class="card pad"><h3>Прогноз оплаты</h3><p class="sub">Логистическая + логнормальная модель срока, ${m.train_rows} / ${m.test_rows} счетов (синтетика)</p>
      <div class="grid g3"><div><span class="note">ROC AUC</span><div class="big">${String(m.auc_pay).replace('.', ',')}</div></div><div><span class="note">ECE</span><div class="big">${String(m.ece_pay).replace('.', ',')}</div></div><div><span class="note">Медиана ошибки</span><div class="big">${String(m.median_abs_err_days).replace('.', ',')} дн.</div></div></div>
      ${calibChart(m.calibration)}<p class="note">${esc(m.note)}</p></div>
  </div>
  <div class="card pad mt"><h3>Примеры трудных случаев</h3><p class="sub">Где правила ошибаются, а Jev — нет</p>
    <div class="table-wrap"><table><thead><tr><th>Письмо</th><th>Верно</th><th>Jev</th><th>Правила</th></tr></thead><tbody>${pred.filter(p => p.rules !== p.r.label).slice(0, 8).map(p => `<tr><td style="max-width:420px;font-size:13px">${esc(p.r.text)}</td><td>${causePill(p.r.label)}</td><td>${causePill(p.jev)}</td><td>${causePill(p.rules)}</td></tr>`).join('')}</tbody></table></div></div>`;
}
function calibChart(cal) {
  const W = 260, H = 160, p = 24, s = v => p + v * (W - p * 2);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" style="max-width:320px;margin-top:14px" role="img" aria-label="Калибровка"><line x1="${p}" y1="${H - p}" x2="${W - p}" y2="${H - p}" stroke="var(--line)"/><line x1="${p}" y1="${H - p}" x2="${p}" y2="${p - 10}" stroke="var(--line)"/>
  <line x1="${s(0)}" y1="${H - p}" x2="${s(1)}" y2="${p - 10 + 0}" stroke="var(--mute)" stroke-dasharray="3 3"/>
  ${cal.map(c => `<circle cx="${s(c.pred)}" cy="${H - p - c.obs * (H - p * 2 + 10)}" r="4" fill="var(--accent)"><title>прогноз ${pct(c.pred)} · факт ${pct(c.obs)} · n=${c.n}</title></circle>`).join('')}
  <text x="${W / 2}" y="${H - 4}" text-anchor="middle">прогноз</text><text x="6" y="${p - 14}">факт</text></svg>`;
}

// ---------- Для банка ----------
function viewBank() {
  const P = S.demo.bank_portfolio;
  const sum = k => P.reduce((s, x) => s + x[k], 0);
  const leads = P.filter(x => !x.uses_factoring && x.factorable > 1.5e6).sort((a, b) => b.factorable - a.factorable);
  const alerts = P.filter(x => x.debtor_alerts >= 2).sort((a, b) => b.overdue - a.overdue);
  const mix = Object.fromEntries(CAUSE_KEYS.map(k => [k, P.reduce((s, x) => s + x.mix[k] * x.overdue, 0)]));
  const mixTot = Object.values(mix).reduce((a, b) => a + b, 0);
  return `<div class="page-head"><div><div class="eyebrow">Экран менеджера банка · синтетический портфель</div><h1>Что видит банк, если сервис встроен в интернет-банк</h1>
    <p>Клиент получает помощника по дебиторке бесплатно в интернет-банке. Банк — обезличенную картину дебиторки клиентов МСБ, заявки на факторинг по подписанным документам и ранние сигналы риска. Данные клиента используются только с его согласия.</p></div></div>
  <div class="card kpis"><div class="kpi"><span>Клиентов МСБ в выборке</span><strong>${P.length}</strong><small>синтетические данные</small></div>
    <div class="kpi"><span>Дебиторка клиентов</span><strong>${mln(sum('ar'))}</strong><small>по выпискам и ЭДО</small></div>
    <div class="kpi"><span>Просрочено</span><strong class="bad">${mln(sum('overdue'))}</strong><small>${pct(sum('overdue') / sum('ar'))}</small></div>
    <div class="kpi"><span>Можно профинансировать</span><strong class="ok">${mln(leads.reduce((s, x) => s + x.factorable, 0))}</strong><small>${leads.length} клиентов без факторинга</small></div>
    <div class="kpi"><span>Пользуются факторингом</span><strong>${P.filter(x => x.uses_factoring).length}</strong><small>из ${P.length}</small></div></div>
  <div class="grid g2 mt">
    <div class="card"><div class="pad" style="padding:20px 20px 0"><h3>Кандидаты на факторинг</h3><p class="sub">Подписанные документы, нет спора, дебиторы без сигналов риска</p></div>
      <div class="table-wrap"><table><thead><tr><th>Клиент</th><th class="r">Выручка/мес</th><th class="r">DSO</th><th class="r">Можно финансировать</th></tr></thead><tbody>${leads.slice(0, 8).map(x => `<tr><td><div class="t1">${esc(x.id)}</div><div class="t2">${esc(x.sector)}</div></td><td class="r">${mln(x.revenue_month)}</td><td class="r">${x.dso} дн.</td><td class="r t1">${mln(x.factorable)}</td></tr>`).join('')}</tbody></table></div></div>
    <div class="grid" style="align-content:start">
      <div class="card pad"><h3>Причины просрочки в портфеле</h3><p class="sub">Взвешено по сумме просрочки</p><div class="cause-rows">${CAUSE_KEYS.sort((a, b) => mix[b] - mix[a]).map(k => `<div class="cause-row" style="--c:var(--c-${k})"><span>${esc(C(k).ru)}</span><b>${pct(mix[k] / mixTot)}</b><div class="bar"><i style="width:${mix[k] / mixTot * 100 * 2.5}%"></i></div></div>`).join('')}</div></div>
      <div class="card pad"><h3>Ранние сигналы</h3><p class="sub">У клиента 2+ дебитора с признаками неплатёжеспособности — риск для его кредита</p>
        <ul class="flags">${alerts.slice(0, 5).map(x => `<li><b>${esc(x.id)}</b> ${esc(x.sector)}: просрочка ${mln(x.overdue)}, проблемных дебиторов ${x.debtor_alerts}</li>`).join('')}</ul></div>
    </div></div>
  <div class="alert info mt">Как банк зарабатывает: факторинг и кредит под дебиторку, удержание расчётного счёта и оборотов, снижение риска кредитного портфеля МСБ. Модель расчёта — в docs/product/financial_model.md.</div>`;
}

// ---------- Как это работает ----------
function viewHow() {
  return `<div class="page-head"><div><div class="eyebrow">Архитектура</div><h1>Как это работает</h1><p>ИИ только там, где без него задача не решается: понять смысл письма и написать черновик. Всё, где важна точность, — обычный проверяемый код.</p></div></div>
  <div class="arch"><div><b>1. Данные</b>Реестр счетов (1С, CSV), выписка (1С: Клиент-банк), статус документов в ЭДО, переписка</div>
    <div><b>2. Причина</b>Decision-модель Jev отвечает вероятностями на атомарные вопросы о переписке. Без сети — правила</div>
    <div><b>3. Прогноз</b>Вероятность и срок оплаты: логистическая и логнормальная модели, веса считаются в браузере</div>
    <div><b>4. Действие</b>Следующий шаг по таблице решений, письмо GigaChat с проверкой фактов, претензия по шаблону</div>
    <div><b>5. Деньги</b>Сверка выписки, прогноз кассового разрыва, подбор счетов для факторинга</div></div>
  <div class="grid g2 mt">
    <div class="card pad"><h3>Защита данных</h3><ul class="flags">
      <li>Демо работает в браузере: загруженные файлы никуда не отправляются.</li>
      <li>В банке сервис разворачивается в контуре (on-prem): Jev и генеративная модель — локально (GigaChat on-prem, T-Pro или Qwen через совместимый API).</li>
      <li>Иностранные облачные модели не используются: требование 152-ФЗ о локализации и передаче данных за рубеж.</li>
      <li>Банк — оператор данных, команда — обработчик по поручению. Переписка с контактными лицами — персональные данные, обрабатываются по согласию клиента.</li>
      <li>Человек подтверждает каждое внешнее действие: письмо, претензию, заявку на факторинг (рекомендации Банка России по этике ИИ, 2025).</li></ul></div>
    <div class="card pad"><h3>Что дальше</h3><ul class="flags">
      <li>Пилот: 10–20 клиентов МСБ, обезличенная переписка, измерение точности причин и срока оплаты.</li>
      <li>Интеграции: почта (IMAP), ЭДО (Диадок, СБИС), выписка из интернет-банка, 1С.</li>
      <li>Платёжная ссылка СБП в каждом напоминании.</li>
      <li>Проверка контрагента по ФНС, Федресурсу и картотеке арбитражных дел.</li>
      <li>Заявка на факторинг в один клик по подписанным УПД.</li></ul>
      <p class="note">Код, ресерч и методология: <a href="https://github.com/Krackenhell/oplata-vovremya" target="_blank" rel="noopener">github.com/Krackenhell/oplata-vovremya</a></p></div></div>`;
}

// ---------- События ----------
function bind(v) {
  $$('[data-open]').forEach(el => el.onclick = () => { location.hash = `#/invoices/${el.dataset.open}`; });
  if (v === 'invoices') {
    $$('[data-f]').forEach(b => b.onclick = () => { S.filter = b.dataset.f; render(); });
    const q = $('#q'); q.oninput = () => { S.q = q.value; const pos = q.selectionStart; render(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); };
    $('#export').onclick = () => download('oplata_reestr.csv', exportCsv(LIST), 'text/csv;charset=utf-8');
  }
  if (v === 'reconcile') {
    $$('[data-apply]').forEach(b => b.onclick = () => {
      const res = reconcile(S.statement, S.invoices).filter(r => r.p.num === b.dataset.apply);
      S.invoices = applyMatches(S.invoices, res); S.applied.push(b.dataset.apply); save(); render();
      toast(`Учтено: ${res[0].match.map(m => '№ ' + m.id).join(', ')}`);
    });
    $('#dl1c').onclick = () => download('vypiska_1c_demo.txt', to1C(S.demo.statement, S.demo.supplier.inn));
    $('#f1c').onchange = async e => {
      const f = e.target.files[0]; if (!f) return;
      const buf = await f.arrayBuffer(); let t = new TextDecoder('utf-8').decode(buf); if (t.includes('�')) t = new TextDecoder('windows-1251').decode(buf);
      try { S.statement = parse1C(t); S.applied = []; save(); render(); toast(`Платежей в выписке: ${S.statement.length}`); } catch (err) { toast(err.message); }
    };
  }
  if (v === 'tasks') $$('[data-task]').forEach(b => b.onclick = () => { const t = S.tasks.find(x => String(x.id) === b.dataset.task); t.done = !t.done; save(); render(); });
  if (v === 'money') { const b = $('#fx-req'); if (b) b.onclick = () => toast('Демо: заявка сформирована, но не отправлена'); }
}

boot().catch(e => { $('#view').innerHTML = `<div class="alert bad">Не удалось загрузить данные демо: ${esc(e.message)}. Откройте через локальный сервер (npm start).</div>`; });
