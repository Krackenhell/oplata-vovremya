# Глобальные (не российские) конкуренты в автоматизации дебиторской задолженности (AR), collections и dunning для B2B-счетов, включая решения, встроенные в банки (по состоянию на конец 2026)

> Контекст: заметки для «Оплата вовремя» (трек ВТБ). Дата сбора: 28.10.2026. Ограничение: около 28 поисковых запросов и загрузок страниц, поэтому часть игроков (Sidetrade, Esker, Emagia, Growfin, Bectran, Invoiced, Paystand, Satago, Taulia, C2FO, Gaviti, Versapay, YayPay, Peakflow) в этой сессии не проверялась по первоисточникам; они вынесены в Gaps.
> Пометки: **[вендор]** — цифра от самого вендора, независимой проверки нет; **[вторичный]** — цифра из агрегатора или блога, а не из первоисточника; **[конкурент-блог]** — негатив о продукте из блога его конкурента (предвзято).

---

## 1. SaaS-игроки AR: кто использует LLM и агентный AI в 2025–2026 и как

### Takeaway
К 2026 году «агентный AI» в AR стал мейнстримом маркетинга: Tesorio, Upflow, HighRadius, Kolleno, Paidnice, Genpact и новые игроки (Daylit) продают агентов, которые читают ответы клиентов, классифицируют письма (оплата / спор / вопрос), извлекают обещания оплаты и пишут черновики ответов. Классификация писем и promise-to-pay уже стали стандартом в mid-market и enterprise. **Диагностика причины неоплаты** на уровне «нет акта / спор по сумме / нет денег / согласование / неверные реквизиты / уже оплачено» как отдельная функция, а не как метка «dispute», ни у кого явно не описана. Цены почти везде «по запросу» и рассчитаны на компании с выручкой от $10M.

### Cited Findings

**Рамка рынка**
- Forrester выпустил отчёт «Top Agentic AI Use Cases In Accounts Receivable Automation In 2026». По пересказу в поиске, ближе всего к массовому внедрению четыре сценария: collections management, cash application, credit management и deduction management — [Forrester](https://www.forrester.com/report/top-agentic-ai-use-cases-in-accounts-receivable-automation-in-2026/RES202572) (полный текст закрыт, видели только аннотацию).
- Вендоры ссылаются на IDC MarketScape по AI-enabled AR automation на 2026 год. HighRadius заявляет статус «Leader»; содержание отчёта в этой сессии не проверено — [TreviPay](https://www.trevipay.com/resource-center/blog/what-finance-leaders-need-to-know-about-ai-driven-accounts-receivable/); [HighRadius](https://www.highradius.com/resources/Blog/ai-in-accounts-receivable/).

**Tesorio** (US, mid-market и enterprise, ERP-центричный)
- Collections Agent:
  - приоритизирует счета по истории платежей, риску, просрочке и поведенческим сигналам;
  - классифицирует входящие AR-письма на «подтверждение оплаты / спор / вопрос / эскалация»;
  - пишет черновики ответов в тоне и по правилам команды (отправка в один клик или после проверки человеком);
  - извлекает из ответов клиентов даты оплаты, обязательства (promise-to-pay) и «dispute signals» и отслеживает их на дашборде;
  - даёт аналитику: contact rate, конверсия promise-to-pay, DSO по портфелю.

  Механика распознавания спора и работы с ним на странице не раскрыта — [Tesorio Collections](https://www.tesorio.com/product/collections).
- Метрики **[вендор]**: −30% DSO, в среднем −33 дня DSO, −40% просрочки, производительность коллектора ×3, −90% счетов старше 90 дней. Отзыв Veeva Systems: −50% дебиторки старше 90 дней. Рейтинг G2 — 4.7/5 по 238 отзывам — [Tesorio](https://www.tesorio.com/product/collections).
- Интеграции: NetSuite, Sage Intacct, Salesforce, Slack, Nylas; в футере также Workday, Stripe, QuickBooks — [Tesorio](https://www.tesorio.com/product/collections).
- Цена не публикуется. Сторонние оценки противоречат друг другу: ~$400/мес по [thinklazarus](https://thinklazarus.com/en/use-cases/ai-collections-agent) против $2,000+/мес по [ledgerup](https://www.ledgerup.ai/resources/top-5-ai-powered-collections-automation-tools-b2b-saas) **[вторичный]**.

**Upflow** (Франция и US, mid-market B2B/SaaS)
- Тарифы зависят от годового выставленного оборота, все цены «по запросу», места пользователей не ограничены:
  - Starter — до $10M;
  - Grow — до $25M;
  - Scale — до $50M;
  - Accelerate — до $100M;
  - Enterprise — свыше $100M.

  [Upflow Pricing](https://upflow.io/pricing)
- AI-агенты:
  - Insights Agent (вопросы к данным AR) — на всех тарифах;
  - Collections Agent («autonomous collection agent») и AP Portal Agent — от Scale;
  - Cash Application Agent — от Accelerate; разносит офлайн-платежи и в реальном времени записывает их в ERP (NetSuite, Sage Intacct).

  [Upflow Pricing](https://upflow.io/pricing)
- Платёжный модуль: карты 3.5% + $0.30, ACH 0.8% (не более $5), платформенная плата $390/мес — [Upflow Pricing](https://upflow.io/pricing). Это пример монетизации через платежи поверх SaaS.
- Сторонние оценки цены: Grow ~$440, Scale ~$880 по [TrustRadius](https://www.trustradius.com/products/upflow/pricing); оценки пользователей ~$599–3,500+/мес по [checkthat.ai](https://checkthat.ai/brands/upflow) **[вторичный, противоречиво]**.
- Кейсы **[вендор]**: ActivTrak — 85% писем follow-up обрабатываются автоматически; Invicti — −68% счетов с просрочкой 31+ дней (ноябрь 2023 → ноябрь 2024); Productboard — −75% времени на сбор денег. Прямого заявления о снижении DSO на странице нет — [Upflow Pricing](https://upflow.io/pricing).
- По обзору Q4 2026, Collections Agent обучается на истории AR и работает с настраиваемым уровнем автономности — [HackerNoon](https://hackernoon.com/a-breakdown-of-the-top-accounts-receivable-ar-automation-software-companies-q4-2026) **[вторичный]**.
- Слабые места: ограниченная гибкость отчётов и кастомных полей, нет нативного кредитного контроля — [Chaser blog](https://www.chaserhq.com/blog/upflow-alternatives); [Lunos](https://www.lunos.ai/blog/best-upflow-alternatives) **[конкурент-блог]**. Рейтинг G2 — 4.8/5 (231 отзыв) — [G2 compare](https://www.g2.com/compare/highradius-corporation-vs-upflow-upflow).

**HighRadius** (US, enterprise, order-to-cash)
- В материалах 2026 года: «autonomous collections processing» и «smart dunning», где агент сам выбирает время, канал и тон. Кейс Ferrero: −28% DSO **[вендор]** — [HighRadius blog](https://www.highradius.com/resources/Blog/ai-in-accounts-receivable/).
- Главная жалоба — внедрение: 6–12 месяцев и тяжёлое участие IT [Alguna](https://blog.alguna.com/highradius-alternatives/) **[конкурент-блог]**; по отзывам на Software Advice — 3–6 месяцев. Доработки после запуска занимают 6+ месяцев — [Chaser blog](https://www.chaserhq.com/blog/highradius-alternatives) **[конкурент-блог]**.
- Рейтинг G2 — 4.3/5 (~233 отзыва). Хвалят автоматизацию cash application — [G2 compare](https://www.g2.com/compare/highradius-corporation-vs-upflow-upflow).

**Billtrust** (US, mid-market и enterprise, платёжная инфраструктура и e-invoicing)
- Сильна в платёжной инфраструктуре, а collections, коммуникации и follow-up в основном остаются ручными. Жалобы: задержки обновления инвойсов, некорректное отображение частичных оплат, ограниченное управление спорами. Capterra — 4.7/5 (33 отзыва) — [Chaser blog](https://www.chaserhq.com/blog/best-billtrust-alternatives-for-mid-market-ar-teams); [Lunos](https://www.lunos.ai/blog/highradius-vs-billtrust) **[конкурент-блог]**.

**Chaser** (UK, SME и mid-market, надстройка над Xero, QuickBooks, Sage)
- По сути инструмент напоминаний: email, SMS, авто-звонки — [ledgerup](https://www.ledgerup.ai/resources/top-5-ai-powered-collections-automation-tools-b2b-saas).
- Цена по сторонним данным: от $49/мес [thinklazarus](https://thinklazarus.com/en/use-cases/ai-collections-agent) или $180/мес при оплате за год [Lunos](https://www.lunos.ai/blog/best-ar-automation-software) **[вторичный, противоречиво]**. Официальная страница цен в этой сессии вернула 404.
- Позиционируется как продукт, который запускают без IT за неделю. Жалобы: ограниченные отчёты, дорогой add-on Collections — [Chaser blog](https://www.chaserhq.com/blog/highradius-alternatives) (собственный блог Chaser, предвзято).

**Paidnice** (Австралия и UK, SME на Xero и QuickBooks)
- AI читает ответы клиентов и готовит черновики, решение об отправке принимает человек; AI ищет причину спора и готовит действия на одобрение.
- Клиентский портал: все открытые счета с оплатой; клиент может «поднять вопрос» (query) по счёту.
- Политика «Skip while a query is open» ставит на паузу напоминания и пени по счёту со спором.
- Автоматические late fees и проценты.

[Paidnice blog](https://www.paidnice.com/blog/invoice-discrepancy). **Это ближайший функциональный аналог идеи «понять причину и не давить, пока есть спор» в SME-сегменте.**

**Kolleno** (UK, mid-market): продвигает «Agentic Workflows» для collections и сверки и подчёркивает необходимость надзора человека — [Kolleno](https://www.kolleno.com/ai-agents-for-accounts-receivable-feature-checklist-for-finance-teams-in-2026/).

**Новые игроки и BPO с агентным AI, 2026**
- **Genpact Agentic AR Suite** (GA 14.10.2026). Включает AR Resolution Center, который фиксирует, маршрутизирует, отслеживает и эскалирует споры. Заявлено «до 30% быстрее разрешение споров» **[вендор]** — [Yahoo Finance / Genpact](https://finance.yahoo.com/technology/ai/articles/genpact-launches-agentic-accounts-receivable-120500775.html).
- **Daylit** — AR-агенты ведут follow-up по email, телефону и SMS с учётом истории счетов и прежних обязательств клиента — [Financial IT](https://financialit.net/news/artificial-intelligence/daylit-launches-ai-agents-accounts-receivable-bringing-autonomous).
- **ChatFin** — агенты для collections, cash application и dispute resolution поверх ERP **[вендор, промо]** — [ChatFin](https://chatfin.ai/blog/best-10-ai-agents-for-accounts-receivable/).

### Inferences
- **Table stakes** в mid-market и enterprise в 2026 году:
  - сегментированные dunning-цепочки;
  - классификация входящих писем;
  - извлечение promise-to-pay;
  - AI-черновики писем;
  - клиентский портал с оплатой;
  - cash application с записью в ERP;
  - дашборды DSO и aging.
- Как правило, игроки ориентированы на компании с оборотом от $10M и интеграцию с NetSuite, SAP или Sage. Цены непрозрачные («по запросу»). Внедрение у enterprise-игроков занимает месяцы.
- «Спор» у большинства — это одна бинарная метка (dispute или нет), а не таксономия причин с разной стратегией действий. Явная работа с причинами описана только у Paidnice («ищет причину спора») и Genpact (Resolution Center), но и там без публичной таксономии вроде «нет акта / неверные реквизиты / ждёт согласования».
- Все метрики эффекта (−28…−30% DSO и т. п.) — вендорские кейсы с отбором удачных клиентов; независимых исследований нет.

### Gaps
- В этой сессии по первоисточникам не проверены: Sidetrade (Aimie), Esker, Emagia, Growfin, Bectran, Invoiced, Paystand, Versapay, YayPay (Quadient), Gaviti, Satago, Peakflow, Taulia (SAP), C2FO. По памяти модели (не проверено): Sidetrade продвигает AI-агента «Aimie»; Versapay делает ставку на «collaborative AR» (портал, где клиент оспаривает строки счёта); Satago совмещает напоминания и invoice finance для SME в UK (ранее работал с банками, в том числе с Lloyds); Taulia (SAP) и C2FO — платформы раннего финансирования (dynamic discounting, SCF), а не collections. Всё это нужно проверить отдельно.
- Официальные цены Chaser, Kolleno, Gaviti, Paidnice не получены.
- Нет независимых данных о точности классификации споров и причин у любого вендора.

---

## 2. Учётные и платёжные платформы: Xero, Intuit QuickBooks, Stripe, FreshBooks, Sage

### Takeaway
Учётные платформы уже встроили «AI-напоминания» и «агентов платежей». Intuit публично считает эффект: оплата на 4–5 дней быстрее, но это собственные данные Intuit. Stripe продаёт скорость оплаты и Smart Retries для карт. Эти продукты закрывают случай «клиент забыл или молчит», но не диагностируют причины B2B-неоплаты (спор, нет документов) и не ведут переписку по сути спора.

### Cited Findings
- **Intuit Assist for QuickBooks** (пресс-релиз о запуске): AI-напоминания по просроченным счетам дают оплату «на 45% быстрее, в среднем на 5 дней раньше», а просроченные счета на 10% чаще оплачиваются полностью **[вендор]** — [Intuit IR](https://investors.intuit.com/news-events/press-releases/detail/1222/intuit-launches-ai-powered-intuit-assist-for-quickbooks-giving-millions-of-businesses-a-competitive-edge).
- Более свежий анализ Intuit (март 2025 — март 2026): пользователи уведомлений о неоплаченных счетах и AI-напоминаний получают деньги в среднем на 4 дня быстрее, чем сопоставимые клиенты со стандартными напоминаниями **[вендор]**. Payments Agent прогнозирует просрочку, отслеживает счета, создаёт и отправляет счета и напоминания — [Intuit blog](https://www.intuit.com/blog/innovative-thinking/delivering-done-for-you/); [usecarly](https://www.usecarly.com/blog/quickbooks-ai/) (цифра «4 дня» из поисковой выдачи, страница целиком не загружалась). Независимого аудита этих цифр нет — [usecarly](https://www.usecarly.com/blog/quickbooks-ai/).
- **Intuit QuickBooks Small Business Late Payments Report 2026** (US):
  - 59% малых бизнесов имеют счета с просрочкой 30+ дней (годом ранее — 47%); в среднем им должны $17.7K;
  - среди бизнесов без просрочек 64% требуют оплату сразу, среди бизнесов с просрочками — 34%;
  - 53% бизнесов с просрочками сами задерживают платежи поставщикам (против 26% у бизнесов без просрочек);
  - 38% стали больше полагаться на кредитные карты (против 21%).

  Источник — ежеквартальный опрос QuickBooks Small Business Insights — [QuickBooks Late Payments Report 2026](https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/); 2025 год: [отчёт 2025](https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/). Intuit UK: малые и средние компании, по их данным, должны в среднем £21k — [QuickBooks UK press](https://quickbooks.intuit.com/uk/press/smes-owed-late-payments). Есть и policy-документ Intuit «Calling time on late payments» (09.2025) — [Intuit public policy PDF](https://publicpolicy.intuit.com/wp-content/uploads/2025/09/calling-time-on-late-payments.pdf) (не загружался).
- **Xero**:
  - автоматические напоминания до и после срока оплаты; они прекращаются, как только приходит платёж. Маркетинговое заявление «get paid up to twice as fast» без методологии — [Xero invoicing](https://www.xero.com/us/accounting-software/send-invoices/);
  - **JAX (Just Ask Xero)** сообщает о просроченных счетах и позволяет отправить напоминание в один тап — [Xero guide: AI agent](https://www.xero.com/uk/guides/ai-agent-accounting/);
  - по анонсу 2026 года (в пересказе поиска) JAX строит план взыскания по истории платежей каждого клиента, консолидирует счета и переключается на SMS для неотвечающих. Это заявления о продукте, не измеренный эффект;
  - позиционирование: JAX в основном готовит черновики и предлагает действия, а не публикует их без надзора — [Glivent](https://glivent.com.au/questions/what-is-jax-just-ask-xero-and-what-can-it-do-for-your-bookkeeping).
- **Stripe Invoicing**:
  - «87% инвойсов Stripe оплачиваются в течение 24 часов»; Smart Retries (AI-логика повторных списаний) возвращают в среднем 38% неудачных платежей **[вендор]**;
  - есть hosted invoice page и несколько напоминаний до, в день и после срока оплаты.

  [Stripe Invoicing](https://stripe.com/invoicing); [Stripe docs](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection)
- Ограничения Stripe по мнению стороннего вендора Trove: нет ответов на реплики клиента, нет смены тона по мере старения долга, нет пеней и досудебного письма. Данные Trove: половину счетов оплачивают после первого напоминания, около 75% — после второго **[конкурент]** — [Trove](https://trove.works/best-invoice-chasing-software-stripe-users/); аналогичная критика у [PayRequest](https://payrequest.io/blog/stripe-invoice-reminders-limitations-2026).

### Inferences
- Для SME базовый уровень уже бесплатен внутри учётной системы: напоминания, ссылка на оплату, автосверка по банковскому фиду. Ценность нужно создавать выше этого уровня: понять, почему не платят, и сделать правильный следующий шаг.
- Самая сильная публичная метрика из крупных источников — «на 4–5 дней быстрее» у Intuit. Это полезный ориентир для пилотного KPI «Оплата вовремя», но это вендорская и неэкспериментальная цифра: сравнивают «сопоставимых» клиентов, что даёт смещение отбора.
- 87% у Stripe относится преимущественно к карточным и онлайн-платежам и не переносится на B2B по безналу с актами и согласованиями.

### Gaps
- FreshBooks и Sage (Sage Copilot) по первоисточникам не проверялись.
- Не найдено, распознаёт ли Intuit или Xero причины неоплаты (спор, нет документов) в переписке; публичных описаний такой функции нет.
- Методология опроса Intuit 2026 (размер выборки) не уточнена; по вторичным данным, выборка 2025 года — 2,487 респондентов из US.

---

## 3. Решения, встроенные в банки: что банки встраивают для receivables и как монетизируют

### Takeaway
Банки для SME массово встраивают простые инструменты «Get Paid»: выставление счетов, ссылки на оплату, QR, трекинг статуса, автоматические напоминания, автосверку. Обычно это бесплатно и служит удержанию клиента и остатков на счёте. Монетизация идёт косвенно: остатки на счетах, эквайринг и платёжные комиссии, кросс-продажа кредитов (invoice finance, овердрафт, маркетплейсы кредиторов). AI в банковских инструментах для SME публично почти не заявлен. В корпоративном сегменте AI применяют для сверки (JPMorgan). **AI-диагностики причин неоплаты во встроенных банковских продуктах для SME не найдено.**

### Cited Findings
- **Lloyds × BankiFi «Get Paid»** (анонс сентября 2026, запуск «позже в этом году»): выставление счетов, безопасные платёжные ссылки, трекинг оплаченных и неоплаченных счетов, автонапоминания в приложении Lloyds и интернет-банке. **Бесплатно**, позиционируется как «embedded accounting» вместо отдельного ПО. AI-функций в анонсе нет. BankiFi ранее делал для Lloyds функциональность Making Tax Digital — [FinTech Global](https://fintech.global/2026/09/28/lloyds-launches-get-paid-invoicing-tool-with-bankifi/); обзор рынка: [Sterlinx](https://sterlinxglobal.com/sme-banking-fintech-review-tokenised-sterling-goes-live-free-invoicing-from-lloyds-and-fintechs-take-68-of-sme-lending-september-2026/).
- **iFAST Global Bank (UK), «Get Paid»** (сентябрь 2026): платёжные ссылки, QR, инвойсы; деньги приходят на мультивалютный счёт; неограниченное число запросов без подписки; пока только GBP — [CFOtech](https://cfotech.co.uk/story/ifast-global-bank-launches-payment-collection-tool-for-smes).
- **NatWest / Mettle**: цифровой банк для SME с инвойсами и напоминаниями для взыскания, запущен в 2018 — [FF News](https://ffnews.com/newsarticle/natwest-launches-innovative-digital-business-banking-proposition-for-smes/). Источники расходятся, бесплатны ли инвойсы или нужен Mettle+ за £4/мес; Mettle+ превращает квоты в счета и шлёт напоминания. Сверка идёт через FreeAgent (банковский фид сопоставляется с инвойсами) — [Money to the Masses](https://moneytothemasses.com/banking/mettle-business-account-review); [Business Expert](https://www.businessexpert.co.uk/business-banking/mettle-review/) **[вторичный, противоречиво]**.
- **Tide (UK, India, Germany)**: встроенные инвойсы с автосопоставлением оплат в приложении; интеграции с Sage, Xero, QuickBooks, FreeAgent — [Tide vs Mettle](https://www.tide.co/business-current-account/compare-tide-vs-mettle/); [BusinessComparison](https://www.businesscomparison.com/blog/banking-finance/tide-vs-mettle). Монетизация кредитами:
  - маркетплейс кредиторов Funding Options (куплен в 2023), где есть invoice finance (factoring, discounting) — [Tide Invoice Finance](https://www.tide.co/business-loans/invoice-finance/);
  - собственная краткосрочная линия Credit Flex;
  - секьюритизационный долговой фонд £100M от Fasanara Capital на кредитование оборотного капитала SME — [IBS Intelligence](https://ibsintelligence.com/ibsi-news/tide-secures-100m-debt-facility-from-fasanara-capital/).

  Tide заявляет 1.5M+ клиентов — [Financial IT](https://financialit.net/news/banking/tide-now-supports-over-15-million-small-businesses-globally).
- **Qonto (FR, DE, ES, IT)**: инвойсинг с мая 2022 (с тарифа Smart); дашборд статусов и сроков, напоминания из приложения, повторяющиеся счета как add-on, e-invoicing во всех тарифах, ссылки на оплату в инвойсе — [Qonto invoicing](https://qonto.com/en/invoicing); [Crowdfund Insider, 2022](https://www.crowdfundinsider.com/2022/05/191441-qonto-is-introducing-invoicing-to-allow-clients-to-seamlessly-generate-share-manage-invoices/) (дата запуска — данные 2022 года).
- **J.P. Morgan**:
  - AI-сервис сверки инвойсов (invoice reconciliation) для сложных B2B-потоков у крупных компаний (healthcare, industrials), запуск на Филиппинах в 2025 — [CDO Magazine](https://www.cdomagazine.tech/aiml/j-p-morgan-to-launch-ai-invoice-reconciliation-service-in-the-philippines); [Marketing-Interactive](https://www.marketing-interactive.com/j-p-morgan-bets-on-the-philippines-in-regional-ai-payments-push). Кейс клиента из Индии: cash conversion cycle улучшился на 50% **[вендор/пресса]** — [NoypiGeeks](https://www.noypigeeks.com/?p=242763);
  - AI-робот в lockbox (совместно с Ripcord), точность выше 99.9% — [Pulse](https://www.pulse.bot/fintech/news/jpmorgan-taps-ai-to-process-checks-bf74e9bb-c999-4dc2-a7bf-c3ca5f7384d2/);
  - партнёрство BILL через JPMorgan wallet для сверки платежей — [American Banker](https://www.americanbanker.com/payments/news/what-bill-holdings-gets-from-the-jpmorgan-wallet).

### Inferences
- Банковская модель на Западе: базовый AR для SME бесплатный, это инструмент удержания и сбора данных о денежном потоке. Деньги банк зарабатывает на остатках, эквайринге (ссылки, QR) и кредитах (invoice finance, овердрафт). Данные по выставленным и неоплаченным счетам — готовый скоринговый сигнал для кредита под дебиторку.
- Банки-инкумбенты часто строят это через вендоров white-label (BankiFi у Lloyds), а не сами. Для ВТБ это значит, что «AI-диагностика причины неоплаты» — модуль, которого нет даже у UK-банков, только что запустивших Get Paid. Это потенциальное отличие, если ВТБ встроит его поверх собственных данных о платежах (видно, что оплата пришла / не пришла / пришла с другими реквизитами).
- AI у банков сосредоточен на сверке и cash application для корпоративных клиентов (JPM), а не на коммуникации с должником для SME.

### Gaps
- Не найдены первоисточники по продуктам receivables для SME у HSBC, Barclays, Santander, BBVA, ING, Revolut Business, Nubank PJ, Kaspi Business, Brex и Ramp; поиск в этой сессии их не вернул. По памяти модели (не проверено): у Revolut Business есть инвойсы и платёжные ссылки; у Kaspi есть экосистема QR и B2B-счетов; Brex и Ramp сфокусированы на расходах и AP, а не на AR.
- Нет данных о том, какую долю выручки банки получают от кросс-продажи invoice finance через инструменты инвойсинга.
- NatWest Invoice Finance (отдельный продукт) не проверялся.

---

## 4. Исследования просрочек: какая доля вызвана спорами, документами и админ-ошибками против ликвидности (ключевой вопрос для гипотезы)

### Takeaway
Жёсткие цифры есть, и они **поддерживают гипотезу «Оплата вовремя» частично**:
- **со стороны плательщика** (почему мы платим поздно) админ-ошибки (36%), спорные счета (31%) и технические проблемы вроде потерянного инвойса (23%) доминируют над нехваткой денег (UK DBT, 2024);
- **со стороны поставщика** (почему нам платят поздно) лидирует ликвидность клиента: 45% в US по Atradius 2025, 40% в UK DBT («клиенты сами платят поздно»). Но «процессные» причины тоже велики: задержки в процессе оплаты у клиента — 33%, споры — 23%, админ-ошибки — 24% (у крупных компаний 36%).

Вывод: неденежные, устранимые причины — это существенная треть или больше случаев, а с точки зрения самого плательщика — большинство.

### Cited Findings

**UK Department for Business and Trade, «Late payments research»** (опубликовано 19.09.2024; 300 телефонных интервью, январь 2024; данные 2024 года) — [GOV.UK](https://www.gov.uk/government/publications/late-payments-research-performance-and-practices-across-business/late-payments-research-understanding-variations-in-payment-performance-and-practices-across-business-sectors-and-sizes-html-executive-summary). Это главный первоисточник по структуре причин.
- Почему бизнесу **платят поздно** (взгляд поставщика):
  - клиенты сами получают оплату поздно — 40%;
  - ухудшение экономических условий — 29%;
  - административные ошибки (незарегистрированные или неверные инвойсы) — 24% в целом, 36% у крупных компаний;
  - клиент сознательно тянет оплату как «бесплатное финансирование» — 18% (в сфере товаров 30%, у микробизнеса 24%).
- Почему бизнес **сам платит поздно** (взгляд плательщика):
  - административные ошибки — 36%;
  - спорные счета — 31%;
  - технические проблемы (потерянный инвойс, сбой доставки) — 23%;
  - собственные клиенты платят поздно — 20% (у микробизнеса 32%);
  - экономические условия — 5% (у микробизнеса 12%);
  - сознательная задержка — 1%.

**Atradius Payment Practices Barometer**
- US 2025 (240 компаний, конец Q2 — середина Q3 2025): топ причин просрочки —
  - ликвидность клиента — 45%;
  - задержки в процессе оплаты у клиента — 33%;
  - сбои цепочек поставок — 26%;
  - споры по счетам — 23%.

  Также 43% B2B-счетов по стоимости просрочены, 5% списаны — [Lonely Entrepreneur](https://lonelyentrepreneur.com/founder-days-to-get-paid/); [FXBaogao (копия отчёта Atradius US 2025)](https://www.fxbaogao.com/detail/5302634) **[вторичный: оригинальный PDF Atradius не открывался; страница Atradius по Северной Америке процентов причин не даёт]**.
- Северная Америка 2025 (официальная страница, 17.09.2025): просрочено 43% B2B-продаж в кредит в US, 44% в Canada, 41% в Mexico; безнадёжные долги около 5% в US. Названные причины: в US — давление на денежный поток клиентов; в Canada — неэффективность процессов оплаты у клиентов и временная нехватка ликвидности — [Atradius NA 2025](https://group.atradius.com/knowledge-and-research/reports/b2b-payment-practices-trends-in-north-america-2025).
- UK 2025 (27.05.2025): 51% B2B-инвойсов просрочены, 7% безнадёжные долги, 49% B2B-продаж идут в кредит; 3 из 5 компаний закрывают разрыв ликвидности банковскими кредитами. Процентной разбивки причин на странице нет — [Atradius UK 2025](https://group.atradius.com/knowledge-and-research/reports/b2b-payment-practices-trends-united-kingdom-2025).
- Позиция Atradius в целом: основная причина — проблемы денежного потока клиента, вторая типичная — коммерческие споры (цена, качество, поставка, условия контракта), которые не обязательно означают ухудшение кредитного качества — [Atradius: 20 years of payment data](https://atradius.us/knowledge-and-research/news/what-20-years-of-payment-data-tell-us-about-credit-risk). Western Europe: около 47% просроченных инвойсов, CEE: около 53% — [einvoicegenerator (агрегатор)](https://www.einvoicegenerator.com/blog/late-payment-statistics) **[вторичный]**.
- Встречается утверждение, что по Atradius 2024 админ-узкие места (нет номера PO, неверное юрлицо, нет VAT ID) дают около 35% случаев. Первоисточник не найден **[вторичный, не проверено]** — пересказ в поисковой выдаче без надёжного URL; не использовать без проверки.

**Intrum European Payment Report**
- EPR 2025 (апрель 2025; около 10,000 руководителей, 25 стран): 11% выручки обычно оплачивается с опозданием; более трети говорят, что задержки так и не вернулись к допандемийному уровню — [Inderes / Intrum release](https://www.inderes.dk/en/releases/intrums-european-payment-report-2025-ai-can-play-a-critical-role-in-economic-recovery-urgently-needed-across-europe); [Working Capital Hub](https://www.workingcapitalhub.com/market-insights/navigating-cash-flow-risk-key-takeaways-from-intrums-european-payment-report-2025/); [PDF EPR 2025](https://attachment.news.eu.nasdaq.com/a550c80555282b7e3845e8721e8f8274c) (не открывался).
- EPR 2026: 62% компаний говорят, что задержки входящих платежей заставляют их самих платить поставщикам поздно (цепная реакция) — [Intrum press 2026](https://www.intrum.com/press/press-releases/press-release-article/?id=3a52db9f-c792-4738-a5e5-36c89a72f1e8).
- Intrum (качественно, без процентов): неверный режим VAT, отсутствие номера PO, неверная ссылка на контракт и арифметические ошибки — частые причины, по которым инвойс «паркуется», а не оплачивается — [Intrum guide](https://www.intrum.com/insights/guides-and-articles/how-do-you-handle-a-customer-who-doesn-t-pay/).
- Пресс-релиз Intrum: взыскание просрочек стоит европейскому бизнесу €275 млрд в год, в среднем на разрешение уходит 74 дня — [Intrum press](https://www.intrum.com/press/press-releases/press-release-article/?id=1e4c441e-c9f4-467e-a3a8-f5d0fbc8dc6e) (год публикации не установлен; возможно, данные до 2024 года).

**Прочие опросы по спорам**
- Опрос 300 AR-специалистов B2B-платёжной компании: 39% говорят, что более четверти их просрочек вызваны спорами по инвойсам — [Vertex](https://www.vertexinc.com/resources/resource-library/three-ways-reduce-b2b-invoice-errors) **[вторичный; название компании-заказчика и год не установлены]**.
- Широко цитируемая цифра «39% инвойсов содержат ошибку» не прослеживается до первоисточника — [NetSuite](https://www.netsuite.com/portal/resource/articles/accounting/invoice-dispute.shtml) **[не проверено, не использовать]**.

**Регулирование**
- **EU Late Payment Regulation** (предложение 2023 года с потолком 30 дней): Европарламент принял версию в апреле 2024, но Совет ЕС заблокировал её. Компромисс польского председательства в 1П2025 был отвергнут, датское председательство дальше не продвигало. К началу 2026 года статус в Legislative Train — «withdrawn». Действует директива 2011/7/EU (60 дней, если иное не согласовано и не «грубо несправедливо»; €40 фиксированной компенсации и законные проценты) — [Embat](https://www.embat.io/blog/eu-late-payment-regulation-blocked); [Trade Treasury Payments](https://tradetreasurypayments.com/news/eu-indicates-it-will-abandon-late-payment-reform-as-member-states-reject-uniform-terms); [ICISA](https://icisa.org/news/update-on-late-payment-regulation-2/); [PrimeRevenue](https://primerevenue.com/resources/blog/lessons-learned-from-the-stalled-eu-late-payment-regulation/).

### Inferences
- Для питча: «до трети и более B2B-просрочек вызваны неденежными, устранимыми причинами». Опора: Atradius US 2025 — задержки процесса оплаты у клиента 33% и споры 23%; UK DBT 2024 — админ-ошибки 24% (у крупных 36%). Сильнейший аргумент — взгляд самих плательщиков: 36% админ-ошибки, 31% споры, 23% технические проблемы против 5% экономических причин (UK DBT 2024). Респонденты называют несколько причин, поэтому проценты не складываются в 100%.
- Ликвидность остаётся причиной №1 со стороны поставщика (40–45%). Значит, продукт должен уметь отличать «не может» от «не хочет / не может технически»: это разные действия (рассрочка или факторинг против отправки акта). Это прямое обоснование функции диагностики причины.
- Цепная реакция (62% по Intrum 2026; 53% против 26% у Intuit) — аргумент для банка: решая просрочки у одного клиента, банк снижает риски по цепочке.

### Gaps
- Оригинальный PDF Atradius US 2025 с разбивкой причин не открыт: цифры 45/33/26/23 подтверждены только вторичными источниками.
- Глобальная (не региональная) разбивка причин Atradius 2025/2026 и разбивка Intrum EPR 2025/2026 по причинам не найдены.
- Данных Xero Small Business Insights по late payments 2025–2026 в этой сессии не найдено.
- UK: статус законодательства о максимальных сроках оплаты (60 дней), обязательных процентах и усилении Small Business Commissioner (по памяти модели — анонс правительства UK в июле 2025) по первоисточникам не проверен; отчётность UK Payment Practices Reporting тоже не проверялась.
- Нет надёжных данных о доле случаев «уже оплачено, но не сверено» и «неверные реквизиты».

---

## 5. Table stakes против дифференциаторов; пробелы рынка

### Takeaway
Table stakes — напоминания, ссылки на оплату, портал, автосверка, AI-черновики, классификация писем и promise-to-pay в mid-market. Слабые места рынка:
- (а) нет **таксономии причин неоплаты** с разными стратегиями действий, плюс диагностика по неструктурированной переписке и документам (акты, УПД, сверки);
- (б) цена и внедрение не подходят SME: цены «по запросу», пороги от $10M оборота, внедрение месяцами;
- (в) банковские Get Paid-модули без AI;
- (г) метрики эффекта почти полностью вендорские.

### Cited Findings
- **Table stakes, SME-уровень** (бесплатно или почти бесплатно в банке или учётной системе): инвойсы, ссылки на оплату, напоминания, трекинг статуса, автосопоставление — [Lloyds/BankiFi](https://fintech.global/2026/09/28/lloyds-launches-get-paid-invoicing-tool-with-bankifi/); [Xero](https://www.xero.com/us/accounting-software/send-invoices/); [Qonto](https://qonto.com/en/invoicing); [Tide](https://www.tide.co/business-current-account/compare-tide-vs-mettle/).
- **Table stakes, mid-market и enterprise**: классификация писем, извлечение promise-to-pay, AI-черновики, приоритизация, cash application в ERP — [Tesorio](https://www.tesorio.com/product/collections); [Upflow](https://upflow.io/pricing); [HighRadius](https://www.highradius.com/resources/Blog/ai-in-accounts-receivable/).
- **Частичные дифференциаторы, найденные у конкурентов**:
  - пауза напоминаний и пеней при открытом споре и поиск причины спора AI — [Paidnice](https://www.paidnice.com/blog/invoice-discrepancy);
  - Resolution Center для споров — [Genpact](https://finance.yahoo.com/technology/ai/articles/genpact-launches-agentic-accounts-receivable-120500775.html);
  - кредит и invoice finance в том же приложении — [Tide](https://www.tide.co/business-loans/invoice-finance/).
- **Барьеры конкурентов**:
  - пороги Upflow — от $10M оборота, агенты collections от $50M-тарифа Scale, платформенный сбор $390/мес за платежи — [Upflow Pricing](https://upflow.io/pricing);
  - внедрение HighRadius — 3–12 месяцев — [Alguna](https://blog.alguna.com/highradius-alternatives/); [Chaser blog](https://www.chaserhq.com/blog/highradius-alternatives);
  - Billtrust слаб в collections и споров — [Chaser blog](https://www.chaserhq.com/blog/best-billtrust-alternatives-for-mid-market-ar-teams);
  - у Stripe нет ответов клиенту и эскалации — [Trove](https://trove.works/best-invoice-chasing-software-stripe-users/);
  - эффект Intuit не аудирован независимо — [usecarly](https://www.usecarly.com/blog/quickbooks-ai/).
- Рынок сам подчёркивает обязательный надзор человека за AI-агентами — [Kolleno](https://www.kolleno.com/ai-agents-for-accounts-receivable-feature-checklist-for-finance-teams-in-2026/); [Glivent о Xero JAX](https://glivent.com.au/questions/what-is-jax-just-ask-xero-and-what-can-it-do-for-your-bookkeeping).

### Inferences
- **Позиционирование «Оплата вовремя»**:
  1. **Диагностика причины** по 7 классам (нет акта/документа, спор по сумме, ликвидность, молчание, согласование, неверные реквизиты, уже оплачено) с разной «next best action» на каждый класс. Это прямо закрывает пробел, который в лучшем случае покрыт меткой «dispute» (Tesorio) или «query» (Paidnice).
  2. **Встроенность в банк** (как Lloyds/BankiFi, Tide), но с AI-слоем, которого у западных банковских Get Paid нет.
  3. **Банковские данные** как преимущество над SaaS: классы «уже оплачено» и «неверные реквизиты» можно определять по фактическим поступлениям и выпискам банка, а SaaS-игрокам нужен импорт выписок или Open Banking.
  4. **Монетизация по западному образцу**: бесплатный базовый модуль, деньги на остатках, эквайринге, СБП/QR и кросс-продаже факторинга. Класс «ликвидность клиента» — естественный триггер оффера факторинга или кредитной линии.
- Таблица «table stakes против дифференциаторов» (суждение аналитика на основе найденного выше):
  - **Table stakes**: напоминания по расписанию, ссылки на оплату и QR, статус счёта, автосверка оплат, шаблоны писем, дашборд просрочки.
  - **Почти стандарт в mid-market**: AI-черновики, классификация ответов, извлечение promise-to-pay, приоритизация.
  - **Дифференциаторы**: многоклассовая диагностика причины с опорой на документы (наличие подписанного акта или УПД), переписку и банковские данные; разные плейбуки по причинам; пауза давления при споре; оффер финансирования при причине «ликвидность»; объяснимость («почему AI решил, что это спор по сумме»); прозрачная цена для SME.
- Риски: Intuit и Xero могут быстро добавить классификацию причин, раз агенты у них уже есть. Защита — банковские данные и локальная документная специфика (акты, УПД, ЭДО), которой у западных игроков нет.

### Gaps
- Не найдено ни одного публичного продукта, который явно заявлял бы распознавание «отсутствует акт или закрывающий документ» как причину неоплаты. Это может быть следствием ограниченного поиска, а не доказательством отсутствия.
- Нет независимых (не вендорских) исследований эффекта AI-collections на DSO для SME.
- Не проверены Sidetrade, Esker, Emagia, Growfin, Versapay, YayPay, Gaviti, Invoiced, Paystand, Bectran, Satago, Peakflow, Taulia и C2FO. Особенно важно проверить, есть ли у Versapay (collaborative AR и споры) и Sidetrade (Aimie) таксономия причин.
