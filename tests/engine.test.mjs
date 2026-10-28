import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { analyzeInvoice, nextSteps, portfolio, cashflow, factoring, forecast, balance, daysLate } from '../web/js/engine.js';
import { classifyText, analyzeRules, promiseDate } from '../web/js/rules.js';
import { reconcile, applyMatches, parse1C, to1C } from '../web/js/reconcile.js';
import { interest395, claimText, letterTemplate } from '../web/js/documents.js';
import { parseCsv, exportCsv, csvCell, SAMPLE } from '../web/js/csv.js';
import { validDate, amount } from '../web/js/util.js';

const read = p => JSON.parse(fs.readFileSync(new URL('../web/data/' + p, import.meta.url), 'utf8'));
const demo = read('demo.json'), model = read('forecast_model.json'), ev = read('eval.json');
const ctx = { today: demo.meta.demo_date, clients: demo.clients, registry: demo.registry, analysis: demo.analysis, model, causes: demo.causes, supplier: demo.supplier, outflows: demo.outflows };
const list = demo.invoices.map(i => analyzeInvoice(i, ctx));
const get = id => list.find(a => a.inv.id === id);

test('Jev определяет причину по всей истории счёта для всех размеченных демо-счетов', () => {
  const labeled = list.filter(a => a.inv.label !== 'none' && a.src === 'jev');
  assert.ok(labeled.length >= 18);
  for (const a of labeled) assert.equal(a.cause, a.inv.label, `счёт ${a.inv.id}`);
});

test('трудные случаи: отрицание и устаревший сигнал', () => {
  assert.equal(get('1067').cause, 'approval');   // «Деньги есть, дело не в этом»
  assert.equal(get('1069').cause, 'liquidity');  // сначала просили акт, потом «банк заморозил линию»
  assert.equal(get('1069').evidence.index, 2);   // основание — последнее письмо, а не запрос акта
});

test('правила — базовая линия не хуже 75% на размеченной выборке, Jev не хуже правил', () => {
  const rows = ev.rows.filter(r => !r.excluded);
  const rules = rows.filter(r => classifyText(r.text).cause === r.label).length / rows.length;
  const jev = rows.filter(r => r.jev.pred === r.label).length / rows.length;
  assert.ok(rules >= 0.75, `rules=${rules}`);
  assert.ok(jev >= rules, `jev=${jev} rules=${rules}`);
});

test('правила: кириллические границы слов и отрицания', () => {
  assert.equal(classifyText('У вас в счёте БИК, которого нет в справочнике.').cause, 'details');
  assert.equal(classifyText('Акт получили, вопросов по документам нет.').cause, 'silence');
  assert.equal(analyzeRules({ messages: [{ from: 'client', text: 'Пришлите акт' }, { from: 'client', text: 'Оплатили вчера, п/п 12' }] }).cause, 'paid');
});

test('дата обещания — только из предложения с будущей оплатой и не раньше письма', () => {
  assert.equal(promiseDate('Остаток оплатим 15.10.2026.', '2026-10-09'), '2026-10-15');
  assert.equal(promiseDate('Платёж от 18 октября вернулся банком.', '2026-10-21'), null);
  assert.equal(promiseDate('КПП изменился с 1 сентября. Поставим оплату в ближайший платёжный день.', '2026-10-12'), null);
  assert.equal(get('1039').brokenPromise, true);
});

test('прогноз: вероятности монотонны и в [0,1], нет денег < документы', () => {
  for (const a of list.filter(x => x.fc)) {
    assert.ok(a.fc.p7 <= a.fc.p14 && a.fc.p14 <= a.fc.p30 && a.fc.p30 <= a.fc.pPay + 1e-9);
    assert.ok(a.fc.p7 >= 0 && a.fc.pPay <= 1);
  }
  const base = { late_share: 0.3, avg_delay: 7, days_overdue: 10, amount: 2e5, promise: 0, fixable: 1, insolvency: 0.05, registry_risk: 0 };
  assert.ok(forecast(model, { ...base, cause: 'documents' }).p14 > forecast(model, { ...base, cause: 'liquidity', fixable: 0, insolvency: 0.9 }).p14);
});

test('портфель и кассовый разрыв считаются', () => {
  const p = portfolio(list, ctx);
  assert.ok(p.total > p.lateSum && p.lateSum > p.fixableSum && p.fixableSum > 0);
  const cf = cashflow(list, ctx);
  assert.equal(cf.length, 8);
  assert.ok(cf.some(w => w.closing < 0), 'в демо есть разрыв');
  assert.ok(Math.abs(cf[0].opening - demo.supplier.cash_on_hand) < 1);
});

test('факторинг не берёт спор, неподписанный акт и проблемного дебитора', () => {
  const fx = factoring(list, ctx);
  for (const x of fx.filter(y => y.ok)) {
    assert.equal(x.a.inv.docs.act, 'signed');
    assert.notEqual(x.a.cause, 'dispute');
    assert.ok(!['high', 'critical'].includes(x.a.reg.level));
  }
  assert.equal(fx.find(x => x.a.inv.id === '1045').ok, false);
});

test('сверка: несколько счетов в одном платеже, номер договора вместо счёта, учтённые платежи не дублируются', () => {
  const r = reconcile(demo.statement, demo.invoices);
  const by = n => r.find(x => x.p.num === n);
  assert.deepEqual(by('7781').match.map(m => m.id).sort(), ['1044', '1047']);
  assert.equal(by('7781').status, 'auto');
  assert.deepEqual(by('4412').match.map(m => m.id), ['1056']);
  assert.equal(by('2290').status, 'posted');
  assert.equal(by('5120').status, 'unmatched');
  const after = applyMatches(demo.invoices, r.filter(x => x.status === 'auto'));
  for (const id of ['1044', '1047', '1056']) assert.equal(balance(after.find(i => i.id === id)), 0);
  assert.equal(after.find(i => i.id === '1066').paid, 210000); // не задвоено
});

test('файл 1С: Клиент-банк — запись и разбор туда-обратно', () => {
  const p = parse1C(to1C(demo.statement, demo.supplier.inn));
  assert.equal(p.length, demo.statement.length);
  assert.equal(p[0].amount, demo.statement[0].amount);
  assert.equal(p[0].date, demo.statement[0].date);
  assert.throws(() => parse1C('not a bank file'));
});

test('проценты по ст. 395 ГК и претензия', () => {
  const r = interest395(365000, '2026-08-01', '2026-08-11');
  assert.equal(Math.round(r.total), 1400); // 365 000 × 14% × 10 / 365
  const a = get('1049');
  const t = claimText(a, demo.supplier, ctx.today);
  assert.match(t, /ПРЕТЕНЗИЯ/);
  assert.match(t, /395/);
  assert.match(t, /158\s000/);
});

test('шаблон письма не утверждает, что документ уже отправлен', () => {
  for (const a of list.filter(x => x.bal > 0)) assert.doesNotMatch(letterTemplate(a, demo.supplier).body, /акт (уже )?отправлен/i);
});

test('письма GigaChat: проверка фактов ловит выдуманное число', () => {
  assert.deepEqual(demo.analysis['1066'].llm.invalid_numbers, ['17']);
});

test('следующий шаг есть для каждого открытого счёта', () => {
  for (const a of list.filter(x => x.bal > 0)) assert.ok(nextSteps(a, ctx).length > 0, a.inv.id);
});

test('CSV: образец, кириллица, отказ на ошибках, защита от формул', () => {
  const rows = parseCsv(SAMPLE, '2026-10-28');
  assert.equal(rows.length, 3);
  assert.equal(rows[2].inn, 'csv:ип смирнов');
  for (const s of ['invoice_id;client;amount;due_date\n1;A;100;2026-02-30', 'invoice_id;client;amount;paid;due_date\n1;A;100;101;2026-01-01', 'invoice_id;client;amount;due_date\n1;"A;100;2026-01-01'])
    assert.throws(() => parseCsv(s, '2026-10-28'));
  assert.equal(csvCell('=1+1'), '"\'=1+1"');
  assert.match(exportCsv(list.slice(0, 2)), /invoice_id;client/);
});

test('даты и суммы', () => {
  assert.equal(validDate('2026-02-30'), null);
  assert.equal(validDate('11.10.2026'), '2026-10-11');
  assert.equal(amount('30 000,50 ₽'), 30000.5);
  assert.equal(amount('-1'), null);
  assert.equal(daysLate({ amount: 10, paid: 0, due: '2026-10-20' }, '2026-10-28'), 8);
});
