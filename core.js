export const DEMO_DATE = '2026-10-11';
export const DEMO = [
  {id:'1042',client:'Северный проект',amount:184000,paid:0,due:'2026-10-04',owner:'Анна',email:'',context:'Переписка, 7 октября\nНе получили подписанный акт за сентябрь. Пришлите, пожалуйста, повторно: без него бухгалтерия не сможет провести оплату.'},
  {id:'1038',client:'Бюро Кедр',amount:96000,paid:30000,due:'2026-10-07',owner:'Михаил',email:'',context:'Переписка, 9 октября\nПервую часть 30 000 рублей перечислили. Остаток оплатим 15.10.2026. Пожалуйста, подтвердите получение.'},
  {id:'1045',client:'Линия пространства',amount:245000,paid:0,due:'2026-10-09',owner:'Анна',email:'',context:'Переписка, 10 октября\nВ счёте указано 245 000 рублей, а в договоре 240 000. Уточните сумму и пришлите исправленный счёт.'},
  {id:'1031',client:'Форма',amount:72000,paid:0,due:'2026-10-01',owner:'Иван',email:'',context:'Переписка, 8 октября\nУ нас временный кассовый разрыв. Сейчас оплатить не можем. Вернёмся с предложением по графику.'},
  {id:'1048',client:'Мастерская 12',amount:128000,paid:0,due:'2026-10-15',owner:'Михаил',email:'',context:''},
  {id:'1029',client:'Атлас',amount:54000,paid:54000,due:'2026-10-02',owner:'Иван',email:'',context:'Переписка, 3 октября\nСпасибо, платёж получили. Все документы закрыты.'}
];
export function validDate(value) {
  const s=String(value||'').trim();
  const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s)||/^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s)?.map((v,i,a)=>i===0?v:i===1?a[3]:i===3?a[1]:v);
  if(!match) return null;
  const iso=`${match[1]}-${match[2]}-${match[3]}`;
  const d=new Date(iso+'T00:00:00Z');
  return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===iso?iso:null;
}
export function amount(value) {
  if(typeof value==='number') return Number.isFinite(value)&&value>=0?Math.round(value*100)/100:null;
  const s=String(value??'').replace(/[\s\u00a0₽]/g,'').replace(/руб\.?/gi,'').replace(',','.');
  if(!/^\d+(?:\.\d{1,2})?$/.test(s)) return null;
  const n=Number(s);return Number.isSafeInteger(Math.round(n*100))?n:null;
}
export const rub=n=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:2}).format(n);
export const shortDate=s=>validDate(s)?new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(s+'T00:00:00Z')):s;
export const balance=row=>Math.round(Math.max(0,row.amount-row.paid)*100)/100;
export function daysLate(row,asOf=DEMO_DATE){return balance(row)>0?Math.max(0,Math.floor((Date.parse(asOf+'T00:00:00Z')-Date.parse(row.due+'T00:00:00Z'))/86400000)):0;}
export function parseCsv(text) {
  text=text.replace(/^\uFEFF/,'');
  const first=text.split(/\r?\n/)[0];const separator=first.includes(';')?';':',';
  const rows=[];let row=[],cell='',quoted=false,closed=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(ch==='"'){
      if(quoted&&text[i+1]==='"'){cell+='"';i++;}
      else if(quoted){quoted=false;closed=true;}
      else if(cell===''&&!closed){quoted=true;}
      else throw new Error('Некорректные кавычки в CSV. Скачайте образец и проверьте формат.');
    } else if(!quoted&&(ch===separator||ch==='\n'||ch==='\r')){
      row.push(cell);cell='';closed=false;
      if(ch!==separator){if(ch==='\r'&&text[i+1]==='\n')i++;if(row.some(x=>x.trim()))rows.push(row);row=[];}
    }else{if(closed&&!/\s/.test(ch))throw new Error('После закрывающей кавычки ожидается разделитель.');if(!closed)cell+=ch;}
  }
  if(quoted)throw new Error('В CSV не закрыты кавычки.');
  row.push(cell);if(row.some(x=>x.trim()))rows.push(row);
  if(rows.length<2)throw new Error('В файле нужны заголовки и хотя бы один счёт.');
  const aliases={invoice_id:'id',номер:'id',счет:'id',счёт:'id',client:'client',клиент:'client',amount:'amount',сумма:'amount',paid:'paid',оплачено:'paid',due_date:'due',срок:'due',owner:'owner',ответственный:'owner',email:'email',context:'context',контекст:'context'};
  const headers=rows.shift().map(s=>aliases[s.trim().toLowerCase()]);
  if(!['id','client','amount','due'].every(k=>headers.includes(k)))throw new Error('Нужны колонки invoice_id, client, amount, due_date. Скачайте образец CSV.');
  if(headers.filter(Boolean).length!==new Set(headers.filter(Boolean)).size)throw new Error('В CSV повторяются колонки.');
  if(rows.length>2000)throw new Error('Для MVP можно загрузить до 2 000 счетов.');
  const seen=new Set();
  return rows.map((cells,i)=>{
    if(cells.length!==headers.length)throw new Error(`Строка ${i+2}: число полей не совпадает с заголовками.`);
    const out={paid:0,owner:'Не назначен',email:'',context:''};headers.forEach((key,j)=>{if(key)out[key]=cells[j].trim();});
    out.amount=amount(out.amount);out.paid=out.paid===''?0:amount(out.paid);out.due=validDate(out.due);
    if(!out.id||!out.client||out.amount===null||out.paid===null||!out.due||out.paid>out.amount)throw new Error(`Строка ${i+2}: проверьте номер, клиента, сумму, оплату и дату. Оплата не может превышать сумму счёта.`);
    const key=out.client.toLowerCase()+'\0'+out.id;
    if(seen.has(key))throw new Error(`Строка ${i+2}: повтор счёта ${out.id} у того же клиента.`);seen.add(key);
    out.context=out.context.slice(0,20000);return out;
  });
}
export function analyze(row,asOf=DEMO_DATE){
  const context=row.context||'';const lines=context.split(/\n/).map(s=>s.trim()).filter(Boolean);
  const patterns=[
    {key:'cash',re:/кассовый разрыв|сейчас оплатить не можем|нет (?:сейчас )?(?:денег|средств)/i,label:'У клиента нет средств',action:'Обсудить график оплаты',description:'В переписке есть сообщение о нехватке средств. Уточните реалистичный график. Отправка документов сама по себе эту задержку не устранит.'},
    {key:'amount',re:/уточните сумму|исправленн[а-я]* сч[её]т|расхождени[а-я]* (?:в |по )?сумм/i,label:'Нужно уточнить сумму',action:'Проверить счёт и договор',description:'Клиент просит уточнить или исправить счёт. Сверьте сумму с договором и согласуйте корректный документ.'},
    {key:'document',re:/не получили.{0,35}акт|без (?:него|акта)|пришлите.{0,35}(?:акт|документ)|не хватает.{0,35}(?:акт|документ)/i,label:'Клиент запросил документ',action:'Проверить и передать документ',description:'В тексте найден запрос документа. Уточните, актуален ли запрос, и передайте нужный файл клиенту.'},
    {key:'promise',re:/оплатим|перечислим|обеща[а-я]* оплат/i,label:'Есть обещание об оплате',action:'Подтвердить срок оплаты',description:'Клиент сообщил о планируемой оплате. Зафиксируйте дату и проверьте поступление денег после этого срока.'}
  ];
  const found=patterns.map(p=>({...p,evidence:lines.find(line=>p.re.test(line))})).filter(p=>p.evidence);
  let result=found[0]||{key:'unknown',label:'Причина пока неизвестна',action:'Уточнить причину задержки',description:'В загруженном тексте нет подходящего сигнала. Уточните у клиента статус счёта. Сервис не делает вывод об отсутствии денег или документов без основания.',evidence:''};
  if(balance(row)===0)result={key:'paid',label:'Счёт оплачен',action:'Проверить закрывающие документы',description:'По данным реестра остаток равен нулю. Напоминать об оплате не требуется.',evidence:''};
  const promise=found.find(p=>p.key==='promise')?.evidence?.match(/\b\d{2}\.\d{2}\.\d{4}\b/)?.[0];
  return {...result,evidence:result.evidence?.slice(0,800)||'',signals:found,promiseDate:validDate(promise),late:daysLate(row,asOf),balance:balance(row)};
}
export function draft(row,asOf=DEMO_DATE){
  const a=analyze(row,asOf),intro=`Здравствуйте!\n\nПо счёту № ${row.id} осталась оплата ${rub(balance(row))}. Срок оплаты по нашему реестру: ${shortDate(row.due)}.`;
  const body={document:'В переписке есть запрос закрывающего документа. Подскажите, пожалуйста, какой документ ещё нужен и кому его направить. Проверим комплект и вернёмся с ответом.',amount:'Вы обращали внимание на сумму счёта. Мы проверим её по договору. Уточните, пожалуйста, какое расхождение нужно согласовать.',promise:`Спасибо за информацию о планируемой оплате${a.promiseDate?' '+shortDate(a.promiseDate):''}. Подтвердите, пожалуйста, что договорённость остаётся в силе.`,cash:'Понимаем, что возникла задержка. Предложите, пожалуйста, посильный график оплаты и дату первого платежа.',unknown:'Подскажите, пожалуйста, статус оплаты. Если для неё не хватает документов или согласования, сообщите, что нужно с нашей стороны.',paid:'По нашему реестру счёт полностью оплачен. Спасибо!'};
  return `${a.key==='paid'?'Здравствуйте!':intro}\n\n${body[a.key]}\n\nСпасибо!`;
}
export function csvCell(value){let s=String(value??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function exportCsv(rows){const headers=['invoice_id','client','amount','paid','due_date','owner','email','context'];return '\uFEFF'+[headers.join(';'),...rows.map(r=>[r.id,r.client,r.amount,r.paid,r.due,r.owner,r.email,r.context].map(csvCell).join(';'))].join('\r\n');}
