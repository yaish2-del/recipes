/* Recipes — single-user PWA. Data lives on this device (IndexedDB). */
(function () {
'use strict';

/* ---------- icons (flat silhouettes, detail cut from the shape) ---------- */
const ICONS = {
  bread:   { tb:'#F9CDBD', ti:'#0259DD', svg:'<path d="M4.2 10.6A3.6 3.6 0 0 1 5.6 4C7 2.8 9.4 2 12 2s5 .8 6.4 2a3.6 3.6 0 0 1 1.4 6.6V19a2 2 0 0 1-2 2H6.2a2 2 0 0 1-2-2z"/><path class="cut" d="M9.2 12.5v6M14.8 12.5v6"/>', kw:['focaccia','bread','sourdough','bagel','pita','loaf','bun','roll','baguette','challah','naan','flatbread','ciabatta','brioche','pretzel','crumpet','dough'] },
  cake:    { tb:'#FF6648', ti:'#FFE1D7', svg:'<path d="M4 20v-7.5L20 5v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path class="cut" d="M4 16.5h16M12 9.2V21"/><circle cx="15" cy="4" r="1.8"/>', kw:['cake','cheesecake','cupcake','brownie','tiramisu','frosting','buttercream','loaf cake','muffin','tart','pie','sponge','ladyfinger','mousse','pudding','custard','trifle','babka'] },
  cookie:  { tb:'#0259DD', ti:'#FFE1D7', svg:'<path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.2-3 3 3 0 0 1-2.8-2.8A3 3 0 0 1 12 3z"/><circle class="dot" cx="8.5" cy="9.5" r="1.3"/><circle class="dot" cx="9.5" cy="15.5" r="1.3"/><circle class="dot" cx="15" cy="15" r="1.3"/><circle class="dot" cx="13.5" cy="10.5" r="1.1"/>', kw:['cookie','biscuit','shortbread','granola','bar','flapjack','cracker','biscotti','energy ball','bliss ball'] },
  pancake: { tb:'#CADDFB', ti:'#FF6648', svg:'<rect x="3.5" y="7" width="17" height="4.2" rx="2.1"/><rect x="3.5" y="12.2" width="17" height="4.2" rx="2.1"/><rect x="3.5" y="17.4" width="17" height="4.2" rx="2.1"/><rect x="9.8" y="3.2" width="4.4" height="3" rx=".6"/>', kw:['pancake','waffle','crepe','crêpe','french toast','porridge','oatmeal','overnight oats','breakfast'] },
  icecream:{ tb:'#FFC3B3', ti:'#0259DD', svg:'<circle cx="12" cy="8" r="5.2"/><path d="M6.8 12h10.4L12 22.5z"/><path class="cut" d="M6.8 12h10.4"/>', kw:['ice cream','nice cream','sorbet','frozen','popsicle','gelato','smoothie bowl'] },
  noodles: { tb:'#84AFFB', ti:'#0259DD', svg:'<path d="M2 11.5h20a10 10 0 0 1-5.2 8.8V22H7.2v-1.7A10 10 0 0 1 2 11.5z"/><path d="M13.4 10.4l6.3-8.6 1.3.9-6.1 8.4zM16.8 10.9l4.4-5.8 1.2.9-4.1 5.6z"/><path class="cut" d="M7.5 12v-4.5M11 12V6.5"/>', kw:['noodle','ramen','pasta','udon','spaghetti','linguine','pad thai','lo mein','soba','pho','lasagne','lasagna','mac and cheese','orzo','gnocchi','biang'] },
  rice:    { tb:'#FFF6F1', ti:'#0259DD', svg:'<path d="M12 3c4.8 0 9 8.2 9 13.2A3 3 0 0 1 18 19H6a3 3 0 0 1-3-2.8C3 11.2 7.2 3 12 3z"/><rect class="dot" x="8.6" y="12.6" width="6.8" height="6.4" rx="1"/><rect x="9.8" y="13.8" width="4.4" height="5.2" rx=".6"/>', kw:['rice','risotto','sushi','onigiri','pilaf','biryani','fried rice','grain','quinoa','bowl','אורז'] },
  curry:   { tb:'#0259DD', ti:'#84AFFB', svg:'<path d="M3.5 13.5h17a8.5 8.5 0 0 1-17 0z"/><path d="M12 5.5c3 0 5.5 2.4 6 5.5H6c.5-3.1 3-5.5 6-5.5z"/><path class="cut" d="M3.5 13.5h17"/><path d="M7.5 20h9v1.8h-9z"/>', kw:['curry','dal','dahl','daal','masala','stew','chili','chilli','tagine','korma','goulash','casserole','ragu','bolognese'] },
  soup:    { tb:'#84AFFB', ti:'#FF6648', svg:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 19.5h8v2H8z"/><path class="ln" d="M8.5 7.5c0-1.6 1.6-1.6 1.6-3.2M12 7.5c0-1.6 1.6-1.6 1.6-3.2M15.5 7.5c0-1.6 1.6-1.6 1.6-3.2"/>', kw:['soup','broth','chowder','bisque','minestrone','laksa','miso'] },
  dumpling:{ tb:'#CADDFB', ti:'#0259DD', svg:'<path d="M2.5 15.5C2.5 9.5 6.6 6 12 6s9.5 3.5 9.5 9.5a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z"/><path class="cut" d="M6.5 14.5c.4-3 1-4.5 1.8-6M10 14c.2-3 .5-4.8 1-6.4M14 14c-.2-3-.5-4.8-1-6.4M17.5 14.5c-.4-3-1-4.5-1.8-6"/>', kw:['dumpling','gyoza','wonton','bao','momo','pierogi','ravioli','empanada','samosa','spring roll'] },
  tofu:    { tb:'#FFF6F1', ti:'#FF6648', svg:'<path d="M3.5 8.2L12 4l8.5 4.2v8L12 20.5 3.5 16.2z"/><path class="cut" d="M3.5 8.2L12 12.4l8.5-4.2M12 12.4v8"/>', kw:['tofu','tempeh','seitan','paneer','halloumi','טופו'] },
  salad:   { tb:'#0259DD', ti:'#FF6648', svg:'<path d="M20.5 3.5C10.5 3.5 4 10 4 20.5c10.5 0 16.5-6.5 16.5-17z"/><path class="cut" d="M5 19.5L19.5 5"/>', kw:['salad','slaw','greens','tabbouleh','kale','veg','vegetable','roasted','broccoli','cauliflower','aubergine','eggplant','courgette','zucchini','סלט'] },
  drink:   { tb:'#FF6648', ti:'#0259DD', svg:'<path d="M5.2 3.5h13.6l-1.1 14.2a3.2 3.2 0 0 1-3.2 3H9.5a3.2 3.2 0 0 1-3.2-3z"/><path class="cut" d="M6.2 9.5h11.6"/>', kw:['smoothie','shake','latte','drink','juice','lemonade','cocktail','tea','coffee','milk','yogurt','yoghurt','kefir'] },
  sauce:   { tb:'#F9CDBD', ti:'#FF6648', svg:'<path d="M9 2.5h6v3.2l2.2 3.3V20a2 2 0 0 1-2 2H8.8a2 2 0 0 1-2-2V9l2.2-3.3z"/><path class="cut" d="M9 12.5h6M9 15.5h6"/>', kw:['sauce','dressing','pesto','hummus','dip','butter','spread','jam','chutney','salsa','tahini','mayo','aioli','marinade','relish','harissa','sambal','gravy','cream','frosting'] }
};
const ICON_NAMES = Object.keys(ICONS);
const CATEGORIES = ['Bread','Bakes','Desserts','Breakfast','Mains','Sides','Salads','Soups','Sauces','Snacks','Drinks'];
const CUISINES = ['Asian','Italian','Middle Eastern','Indian','Mexican','Mediterranean'];
const TAGS = ['Sweet','Savoury','Quick','Weeknight','No-bake','High-protein','Gluten-free','To try','Favourite'];
const BAKING_CATS = ['Bread','Bakes','Desserts'];
const UNITS = ['', 'g','kg','ml','l','tsp','tbsp','cup','oz','lb','pinch','clove','can','piece'];

function svgIcon(name){ const ic = ICONS[name] || ICONS.rice; return '<svg viewBox="0 0 24 24">'+ic.svg+'</svg>'; }
function tileStyle(name){ const ic = ICONS[name] || ICONS.rice; return '--tb:'+ic.tb+';--ti:'+ic.ti; }
function guessIcon(title, cats){
  const t = (title||'').toLowerCase();
  let best = null, bestLen = 0;
  for (const n of ICON_NAMES) for (const k of ICONS[n].kw) if (t.includes(k) && k.length > bestLen) { best = n; bestLen = k.length; }
  if (best) return best;
  cats = cats || [];
  if (cats.includes('Bread')) return 'bread';
  if (cats.includes('Bakes') || cats.includes('Desserts')) return 'cake';
  if (cats.includes('Soups')) return 'soup';
  if (cats.includes('Salads')) return 'salad';
  if (cats.includes('Sauces')) return 'sauce';
  if (cats.includes('Drinks')) return 'drink';
  if (cats.includes('Breakfast')) return 'pancake';
  return 'rice';
}

/* ---------- storage ---------- */
const DB_NAME = 'recipes-app', DB_VER = 1;
let db;
function openDB(){
  return new Promise((res, rej) => {
    const q = indexedDB.open(DB_NAME, DB_VER);
    q.onupgradeneeded = () => { const d = q.result; if (!d.objectStoreNames.contains('recipes')) d.createObjectStore('recipes', { keyPath:'id' }); if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv'); };
    q.onsuccess = () => { db = q.result; res(db); };
    q.onerror = () => rej(q.error);
  });
}
function tx(store, mode, fn){ return new Promise((res, rej) => { const t = db.transaction(store, mode); const s = t.objectStore(store); const r = fn(s); t.oncomplete = () => res(r && r.result !== undefined ? r.result : r); t.onerror = () => rej(t.error); }); }
const store = {
  allRecipes(){ return new Promise((res, rej) => { const r = db.transaction('recipes').objectStore('recipes').getAll(); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
  putRecipe(r){ return tx('recipes','readwrite', s => s.put(r)); },
  delRecipe(id){ return tx('recipes','readwrite', s => s.delete(id)); },
  clearRecipes(){ return tx('recipes','readwrite', s => s.clear()); },
  get(k){ return new Promise((res, rej) => { const r = db.transaction('kv').objectStore('kv').get(k); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
  set(k, v){ return tx('kv','readwrite', s => s.put(v, k)); }
};

/* ---------- state ---------- */
const S = {
  recipes: [], settings: null, shopping: null, timers: [], route: { name:'library' }, hist: [],
  lib: { tab:'All', q:'' }
};
const DEFAULT_SETTINGS = { sort:'az', wheel:'recent', openInYair:true, tempC:true, bakingGrams:true, savouryAsWritten:true, rounding:true, backupEvery:'weekly', lastBackup:null, sampleLoaded:false };
const uid = () => Math.random().toString(36).slice(2,10) + Date.now().toString(36);

/* ---------- units, densities, Yair mode ---------- */
const DENSITY = [ // grams per US cup, longest match wins
  ['bread flour',127],['strong flour',127],['plain flour',120],['all-purpose flour',120],['all purpose flour',120],['wholemeal flour',120],['whole wheat flour',120],['spelt flour',120],['rye flour',102],['rice flour',158],['almond flour',96],['ground almonds',96],['chickpea flour',92],['gram flour',92],['buckwheat flour',120],['oat flour',90],['self-raising flour',120],['flour',120],
  ['icing sugar',120],['powdered sugar',120],['caster sugar',200],['brown sugar',220],['coconut sugar',150],['sugar',200],['maple syrup',320],['agave',320],['honey',340],['golden syrup',340],['date syrup',340],
  ['cocoa',85],['cacao',85],['chocolate chips',170],['chocolate',170],['cornflour',128],['cornstarch',128],['baking powder',230],['baking soda',220],['bicarbonate',220],['instant yeast',150],['dried yeast',150],['yeast',150],['salt',288],['flaky salt',150],
  ['rolled oats',90],['oats',90],['desiccated coconut',80],['shredded coconut',80],['coconut flakes',80],['breadcrumbs',100],['panko',60],['semolina',170],['polenta',160],['cornmeal',160],['rice',185],['quinoa',170],['lentils',190],['chickpeas',165],['couscous',175],['bulgur',140],
  ['butter',227],['vegan butter',227],['margarine',227],['coconut oil',218],['olive oil',216],['oil',218],['tahini',250],['peanut butter',260],['almond butter',250],['nut butter',255],
  ['water',240],['oat milk',240],['soy milk',245],['almond milk',240],['coconut milk',240],['coconut cream',240],['milk',245],['oat cream',240],['cream',240],['yogurt',245],['yoghurt',245],['cream cheese',230],['silken tofu',250],['tofu',250],['aquafaba',240],['vinegar',240],['soy sauce',255],['tamari',255],['lemon juice',240],['juice',240],['vanilla extract',208],['vanilla',208],
  ['ground flaxseed',112],['flaxseed',150],['flax',150],['chia seeds',160],['chia',160],['sesame seeds',144],['pumpkin seeds',130],['sunflower seeds',140],['seeds',140],['walnuts',100],['pecans',100],['almonds',140],['cashews',130],['hazelnuts',135],['pistachios',125],['nuts',130],['dates',150],['raisins',150],['sultanas',150],['dried fruit',150],['blueberries',150],['berries',150],['banana',225],['pumpkin puree',245],['applesauce',245]
];
const CUPS = { cup:1, tbsp:1/16, tsp:1/48, ml:1/240, l:1000/240 };
function densityFor(name){
  const n = (name||'').toLowerCase();
  let best = null;
  for (const [k, g] of DENSITY) if (n.includes(k) && (!best || k.length > best[0].length)) best = [k, g];
  return best ? { g: best[1], est:false } : { g: 240, est:true };
}
const FRACS = [[0.125,'⅛'],[0.25,'¼'],[0.333,'⅓'],[0.5,'½'],[0.667,'⅔'],[0.75,'¾']];
function fmtQty(q){
  if (q == null || isNaN(q)) return '';
  const whole = Math.floor(q), frac = q - whole;
  let fs = '';
  for (const [v, s] of FRACS) if (Math.abs(frac - v) < 0.07) { fs = s; break; }
  if (fs) return (whole ? whole : '') + fs;
  if (Math.abs(frac) < 0.05) return String(whole);
  return String(Math.round(q*10)/10);
}
function parseQty(s){
  if (s == null) return null; s = String(s).trim();
  if (!s) return null;
  const map = { '¼':.25,'½':.5,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125 };
  let total = 0, found = false;
  s = s.replace(/[¼½¾⅓⅔⅛]/g, m => ' ' + map[m] + ' ');
  s = s.replace(/(\d+)\s*[-–]\s*\d+/, '$1');
  for (const p of s.split(/\s+/)) {
    if (!p) continue;
    if (/^\d+\/\d+$/.test(p)) { const [a,b] = p.split('/').map(Number); total += a/b; found = true; }
    else if (!isNaN(parseFloat(p))) { total += parseFloat(p); found = true; }
  }
  return found ? total : null;
}
function isBakingRecipe(r){ return r.baking != null ? !!r.baking : (r.cats||[]).some(c => BAKING_CATS.includes(c)); }
function roundGrams(g, on){
  if (!on) return Math.round(g*10)/10;
  if (g >= 1000) return Math.round(g/10)*10;
  if (g >= 20) return Math.round(g);
  return Math.round(g*2)/2;
}
function fmtGrams(g){ if (g >= 1000) return (Math.round(g/10)/100) + ' kg'; return fmtQty(g) + ' g'; }
// Returns { text, note } for an ingredient line under current mode
function displayIng(ing, recipe, factor, yair, settings){
  const qty = ing.qty != null ? ing.qty * factor : null;
  const unit = ing.unit || '';
  const name = ing.name || '';
  const baking = isBakingRecipe(recipe);
  const nameL = name.toLowerCase();
  if (qty == null) return { text: unit ? unit + ' ' + name : name, amt:'' };
  if (yair && baking && settings.bakingGrams && CUPS[unit] !== undefined) {
    const spoon = unit === 'tsp' || unit === 'tbsp';
    const origTbsp = spoon ? (unit === 'tbsp' ? ing.qty : ing.qty/3) : 99;
    const forceGrams = /yeast/.test(nameL) || (/salt/.test(nameL) && (recipe.cats||[]).includes('Bread'));
    if (spoon && origTbsp < 2 && !forceGrams) return { text:name, amt: fmtQty(Math.round(qty*4)/4) + ' ' + unit };
    const d = densityFor(name);
    const g = roundGrams(qty * CUPS[unit] * d.g, settings.rounding);
    return { text:name, amt: fmtGrams(g), note: d.est ? 'estimated' : null };
  }
  if (yair && (unit === 'oz' || unit === 'lb')) {
    const g = roundGrams(qty * (unit === 'oz' ? 28.35 : 453.6), settings.rounding);
    return { text:name, amt: fmtGrams(g) };
  }
  if (unit === 'g') { const g = baking && !yair ? Math.round(qty*10)/10 : roundGrams(qty, settings.rounding); return { text:name, amt: fmtGrams(g) }; }
  if (unit === 'kg') return { text:name, amt: fmtGrams(roundGrams(qty*1000, settings.rounding)) };
  if (unit === 'ml') return { text:name, amt: (qty >= 1000 ? (Math.round(qty/10)/100) + ' l' : Math.round(qty) + ' ml') };
  if (unit === 'l') return { text:name, amt: fmtQty(qty) + ' l' };
  if (unit === 'tsp' || unit === 'tbsp') return { text:name, amt: fmtQty(Math.round(qty*4)/4) + ' ' + unit };
  if (unit === 'cup') return { text:name, amt: fmtQty(Math.round(qty*8)/8) + (qty > 1 ? ' cups' : ' cup') };
  return { text:name, amt: fmtQty(Math.round(qty*4)/4) + (unit ? ' ' + unit : '') };
}
function convertTempsInText(t, toC){
  if (!toC) return t;
  return t.replace(/(\d{2,3})\s*(?:°|º|deg(?:rees)?)?\s*F\b/gi, (m, f) => { const c = Math.round((Number(f) - 32) * 5/9 / 5) * 5; return c + ' °C'; })
          .replace(/gas mark\s*(\d)/gi, (m, g) => { const map = {1:140,2:150,3:160,4:180,5:190,6:200,7:220,8:230,9:240}; return (map[g] || 180) + ' °C'; });
}

/* ---------- text parser (rule based) ---------- */
const UNIT_RX = /^(\d[\d\s\/.,¼½¾⅓⅔⅛-]*|[¼½¾⅓⅔⅛])\s*(kg|g|grams?|ml|l|litres?|liters?|tsp|teaspoons?|tbsp|tablespoons?|cups?|oz|ounces?|lbs?|pounds?|pinch|cloves?|cans?|tins?|pieces?|slices?|handful|bunch)?\.?\s+(?:of\s+)?(.+)$/i;
const UNIT_NORM = { gram:'g', grams:'g', litre:'l', liter:'l', litres:'l', liters:'l', teaspoon:'tsp', teaspoons:'tsp', tablespoon:'tbsp', tablespoons:'tbsp', cups:'cup', ounce:'oz', ounces:'oz', lbs:'lb', pound:'lb', pounds:'lb', cloves:'clove', cans:'can', tin:'can', tins:'can', pieces:'piece', slices:'piece', slice:'piece', handful:'', bunch:'' };
function parseIngLine(line){
  line = line.replace(/^[-•*·\d]+[.)]?\s+(?=\D)/, '').trim();
  const m = line.match(UNIT_RX);
  if (!m) return { qty:null, unit:'', name:line };
  let unit = (m[2]||'').toLowerCase(); unit = UNIT_NORM[unit] !== undefined ? UNIT_NORM[unit] : unit;
  return { qty: parseQty(m[1]), unit, name: m[3].trim() };
}
function parseText(text){
  const lines = text.split(/\r?\n/).map(l => l.trim());
  const out = { title:'', ings:[], steps:[], notes:'', source:'' };
  let mode = 'start';
  const url = text.match(/https?:\/\/\S+/); if (url) out.source = url[0];
  for (let l of lines) {
    if (!l) continue;
    const lo = l.toLowerCase().replace(/[:*#_]/g,'').trim();
    if (/^(ingredients?)$/.test(lo)) { mode = 'ing'; continue; }
    if (/^(method|instructions?|directions?|steps?|preparation)$/.test(lo)) { mode = 'steps'; continue; }
    if (/^(notes?|tips?)$/.test(lo)) { mode = 'notes'; continue; }
    if (mode === 'start') { if (!out.title && !/^https?:/.test(l)) { out.title = l.replace(/^#+\s*/, '').replace(/\*/g,''); mode = 'auto'; } continue; }
    if (/^https?:/.test(l)) continue;
    if (mode === 'notes') { out.notes += (out.notes ? '\n' : '') + l; continue; }
    if (mode === 'steps') { out.steps.push(l.replace(/^(\d+[.)]|step\s*\d+[:.]?|[-•*])\s*/i, '')); continue; }
    const looksIng = /^[-•*]?\s*(\d|[¼½¾⅓⅔⅛])/.test(l) || (l.split(' ').length <= 5 && mode !== 'steps');
    if (mode === 'ing' || (mode === 'auto' && looksIng)) { out.ings.push(parseIngLine(l)); if (mode === 'auto') mode = 'ing'; }
    else { out.steps.push(l.replace(/^(\d+[.)]|step\s*\d+[:.]?|[-•*])\s*/i, '')); mode = 'steps'; }
  }
  return out;
}
function detectDuration(text){
  const m = (text||'').match(/(\d+(?:[.,]\d+)?)\s*(?:-|–|to)?\s*(\d+(?:[.,]\d+)?)?\s*(hours?|hrs?|h\b|minutes?|mins?|min\b|seconds?|secs?)/i);
  if (!m) return null;
  const n = parseFloat((m[2] || m[1]).replace(',', '.'));
  const u = m[3].toLowerCase();
  const secs = /^h/.test(u) ? n*3600 : /^s/.test(u) ? n : n*60;
  if (secs < 20 || secs > 48*3600) return null;
  return Math.round(secs);
}
function fmtDur(s){ s = Math.max(0, Math.round(s)); const h = Math.floor(s/3600), m = Math.floor(s%3600/60), sec = s%60; if (h) return h + ':' + String(m).padStart(2,'0') + ':' + String(sec).padStart(2,'0'); return m + ':' + String(sec).padStart(2,'0'); }
function fmtDurShort(s){ if (s >= 3600) { const h = s/3600; return (Math.round(h*10)/10) + ' h'; } return Math.round(s/60) + ' min'; }

/* ---------- helpers ---------- */
const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(msg, ms){ const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms || 2200); }
function photoStyle(r){ const c = r.crop || { x:0, y:0, s:1 }; return 'transform:translate(' + c.x + '%,' + c.y + '%) scale(' + c.s + ')'; }
function hostOf(url){ try { return new URL(url).hostname.replace(/^www\./,''); } catch(e){ return ''; } }
function sourceLabel(r){ return r.sourceName || (r.source ? hostOf(r.source) : ''); }
function catLabel(r){ return (r.cats||[]).join(', '); }
function sortRecipes(list){
  const s = S.settings.sort;
  return list.slice().sort((a,b) => s === 'rating' ? ((b.rating||0) - (a.rating||0)) || a.title.localeCompare(b.title) : s === 'newest' ? (b.created||0) - (a.created||0) : a.title.localeCompare(b.title, undefined, { sensitivity:'base' }));
}
async function saveRecipe(r){ r.updated = Date.now(); await store.putRecipe(r); const i = S.recipes.findIndex(x => x.id === r.id); if (i >= 0) S.recipes[i] = r; else S.recipes.push(r); }
async function saveSettings(){ await store.set('settings', S.settings); }
async function saveShopping(){ await store.set('shopping', S.shopping); }
async function saveTimers(){ await store.set('timers', S.timers); }

/* ---------- routing ---------- */
function go(name, params, replace){
  if (!replace) S.hist.push(S.route);
  S.route = Object.assign({ name }, params || {});
  render();
  $('#view').scrollTop = 0;
}
function back(){ const prev = S.hist.pop(); S.route = prev || { name:'library' }; render(); }
function render(){
  const v = $('#view');
  const r = S.route;
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.go === r.name || (b.dataset.go === 'library' && r.name === 'recipe')));
  if (r.name === 'library') renderLibrary(v);
  else if (r.name === 'recipe') renderRecipe(v, r.id);
  else if (r.name === 'edit') renderEdit(v, r.id, r.draft);
  else if (r.name === 'shopping') renderShopping(v);
  else if (r.name === 'settings') renderSettings(v);
  else if (r.name === 'add') { S.route = S.hist.pop() || { name:'library' }; render(); openAddSheet(); }
  renderPin();
}
document.querySelectorAll('#nav button').forEach(b => b.addEventListener('click', () => { if (b.dataset.go === 'add') openAddSheet(); else go(b.dataset.go, null, true); }));

/* ---------- library ---------- */
function renderLibrary(v){
  const q = S.lib.q.trim().toLowerCase();
  let list = S.recipes.filter(r => !r.deleted);
  if (S.lib.tab !== 'All') list = list.filter(r => (r.cats||[]).includes(S.lib.tab) || (r.tags||[]).includes(S.lib.tab));
  if (q) list = list.filter(r => [r.title, (r.ings||[]).map(i => i.name).join(' '), (r.cats||[]).join(' '), (r.tags||[]).join(' '), r.notes, sourceLabel(r)].join(' ').toLowerCase().includes(q));
  list = sortRecipes(list);
  let wheel = S.recipes.filter(r => !r.deleted);
  if (S.settings.wheel === 'recent') wheel = wheel.slice().sort((a,b) => (b.updated||0) - (a.updated||0)).slice(0, 12);
  else if (S.settings.wheel === 'totry') wheel = wheel.filter(r => (r.tags||[]).includes('To try')).slice(0, 20);
  else wheel = sortRecipes(wheel);
  const tabs = ['All', ...CATEGORIES, 'To try', 'Favourite'];
  v.innerHTML = '<div class="top"><h1>Recipes</h1><button class="rbtn" id="btnSearch" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></button></div>'
    + (S.lib.showSearch || q ? '<div class="search"><input id="q" placeholder="Search recipes, ingredients, tags" value="' + esc(S.lib.q) + '"><button class="rbtn" style="border:0" id="qx">✕</button></div>' : '')
    + (!q && wheel.length ? '<div class="car" id="car">' + wheel.map(r => '<button class="slide' + (r.photo ? '' : ' noimg') + '" style="' + tileStyle(r.icon) + '" data-id="' + r.id + '">' + (r.photo ? '<img src="' + r.photo + '" alt="" style="' + photoStyle(r) + '">' : '<div class="tile big" style="--tb:' + ICONS[r.icon].ti + ';--ti:' + ICONS[r.icon].tb + '">' + svgIcon(r.icon) + '</div>') + '<div class="cap"><h3>' + esc(r.title) + '</h3></div></button>').join('') + '</div>' : '')
    + '<div class="tabs">' + tabs.map(t => '<button class="' + (S.lib.tab === t ? 'on' : '') + '" data-tab="' + t + '">' + t + '</button>').join('') + '</div>'
    + (list.length ? list.map(r => '<button class="row" data-id="' + r.id + '"><div class="tile" style="' + tileStyle(r.icon) + '">' + svgIcon(r.icon) + '</div><div><h3>' + esc(r.title) + '</h3><p>' + esc([sourceLabel(r), r.time, r.servings ? 'serves ' + r.servings : ''].filter(Boolean).join(' · ')) + '</p></div>' + (r.rating ? '<div class="sc">' + r.rating + '</div>' : '') + '</button>').join('')
       : '<div class="empty"><b>' + (S.recipes.length ? 'Nothing here' : 'No recipes yet') + '</b>' + (S.recipes.length ? 'Try another tab or search.' : 'Tap Add to bring one in, or load the sample set from Settings.') + '</div>');
  v.querySelector('#btnSearch').onclick = () => { S.lib.showSearch = !S.lib.showSearch; if (!S.lib.showSearch) S.lib.q = ''; render(); if (S.lib.showSearch) { const i = $('#q'); i && i.focus(); } };
  const qi = v.querySelector('#q'); if (qi) { qi.oninput = () => { S.lib.q = qi.value; const pos = qi.selectionStart; render(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); }; v.querySelector('#qx').onclick = () => { S.lib.q = ''; S.lib.showSearch = false; render(); }; }
  v.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { S.lib.tab = b.dataset.tab; render(); });
  v.querySelectorAll('[data-id]').forEach(b => b.onclick = () => go('recipe', { id: b.dataset.id }));
  const car = v.querySelector('#car'); if (car) initWheel(car);
}
function initWheel(car){
  const slides = [].slice.call(car.querySelectorAll('.slide'));
  function update(){
    const rect = car.getBoundingClientRect(), mid = rect.left + rect.width/2;
    slides.forEach(s => { const r = s.getBoundingClientRect(), d = (r.left + r.width/2 - mid)/r.width, a = Math.min(Math.abs(d), 1); s.style.transform = 'translateX(' + (-d*32) + 'px) scale(' + (1 - 0.22*a) + ')'; s.style.opacity = 1 - 0.55*a; s.style.zIndex = String(100 - Math.round(a*40)); });
  }
  car.addEventListener('scroll', () => requestAnimationFrame(update), { passive:true });
  const first = slides[Math.min(1, slides.length - 1)];
  if (first) car.scrollLeft = first.offsetLeft - (car.clientWidth - first.offsetWidth)/2;
  update();
}

/* ---------- recipe ---------- */
const view = { yair: null, factor: 1, tab: 'ing', done: {} };
function renderRecipe(v, id){
  const r = S.recipes.find(x => x.id === id);
  if (!r) { go('library', null, true); return; }
  if (view.id !== id) { view.id = id; view.yair = S.settings.openInYair; view.factor = 1; view.tab = 'ing'; view.done = {}; }
  const ic = ICONS[r.icon] || ICONS.rice;
  const serv = r.servings ? Math.round(r.servings * view.factor * 10)/10 : null;
  const ings = (r.ings||[]).map(i => displayIng(i, r, view.factor, view.yair, S.settings));
  v.innerHTML = '<div class="rtop" style="' + tileStyle(r.icon) + '">'
    + '<button class="rbtn b1" id="bk">‹</button><button class="rbtn b2" id="fav">' + ((r.tags||[]).includes('Favourite') ? '♥' : '♡') + '</button><button class="edit" id="ed">Edit</button>'
    + '<div class="photo">' + (r.photo ? '<img src="' + r.photo + '" alt="" style="' + photoStyle(r) + '">' : '<div class="ph">' + svgIcon(r.icon) + '</div>') + '</div>'
    + '<div class="tile badge">' + svgIcon(r.icon) + '</div></div>'
    + '<div class="r"><h1>' + esc(r.title) + '</h1>'
    + '<div class="meta">' + [r.time, r.servings ? 'serves ' + r.servings : '', r.rating ? '<b>' + r.rating + '</b> / 10' : '', catLabel(r).toLowerCase(), (r.tags||[]).filter(t => t !== 'Favourite').join(', ').toLowerCase()].filter(Boolean).join(' · ') + '</div>'
    + (r.source ? '<a class="src" href="' + esc(r.source) + '" target="_blank" rel="noopener">' + esc(sourceLabel(r) || 'Source') + ' ↗</a>' : (r.sourceName ? '<div class="src" style="text-decoration:none">' + esc(r.sourceName) + '</div>' : ''))
    + '<div class="seg"><button class="' + (view.yair ? '' : 'on') + '" data-mode="orig">Original</button><button class="' + (view.yair ? 'on' : '') + '" data-mode="yair">Yair mode</button></div>'
    + '<div class="seg" style="margin-top:8px"><button class="' + (view.tab === 'ing' ? 'on' : '') + '" data-tab="ing">Ingredients</button><button class="' + (view.tab === 'steps' ? 'on' : '') + '" data-tab="steps">Method</button><button class="' + (view.tab === 'notes' ? 'on' : '') + '" data-tab="notes">Notes</button></div>'
    + (view.tab === 'ing' ? '<div class="serv"><span>' + (view.yair && isBakingRecipe(r) ? 'Grams where it matters' : 'As written') + '</span><span class="st">' + (r.servings ? '<button id="sm">−</button><span>' + serv + '</span><button id="sp">+</button>' : '<button id="sm">−</button><span>' + view.factor + '×</button><button id="sp">+</button>') + '</span></div>'
        + '<div class="ing">' + ings.map(i => '<div><span>' + esc(i.text) + (i.note ? '<small>' + i.note + '</small>' : '') + '</span><b>' + esc(i.amt) + '</b></div>').join('') + (ings.length ? '' : '<div class="empty">No ingredients yet — tap Edit.</div>') + '</div>' : '')
    + (view.tab === 'steps' ? '<div style="margin-top:8px">' + (r.steps||[]).map((s, i) => { const d = view.done[i]; const dur = (r.stepTimers && r.stepTimers[i] != null) ? r.stepTimers[i] : detectDuration(s); const run = S.timers.find(t => t.recipeId === r.id && t.step === i); return '<div class="step' + (d ? ' done' : '') + '"><i data-done="' + i + '">' + (d ? '✓' : i+1) + '</i><div class="txt">' + esc(convertTempsInText(s, view.yair && S.settings.tempC)) + (run ? '<br><button class="chip run" data-stop="' + run.id + '">▮▮ <b>' + fmtDur((run.end - Date.now())/1000) + '</b> · stop</button>' : dur ? '<br><button class="chip" data-timer="' + i + '" data-secs="' + dur + '">▷ ' + fmtDurShort(dur) + '</button>' : '') + '</div></div>'; }).join('') + ((r.steps||[]).length ? '' : '<div class="empty">No method yet — tap Edit.</div>') + '</div>' : '')
    + (view.tab === 'notes' ? '<div class="lbl">My notes</div><div class="notes">' + (r.notes ? esc(r.notes) : '<span style="color:var(--mute)">Nothing yet. Add notes from Edit — what you changed, what to try next time.</span>') + '</div>'
        + (r.oven || r.tin ? '<div class="lbl">Oven and tin</div><div class="notes">' + esc([r.oven ? convertTempsInText(r.oven, view.yair && S.settings.tempC) : '', r.tin].filter(Boolean).join(' · ')) + '</div>' : '')
        + '<div class="lbl">Rating</div><div class="rate">' + [1,2,3,4,5,6,7,8,9,10].map(n => '<button class="' + (r.rating === n ? 'on' : '') + '" data-rate="' + n + '">' + n + '</button>').join('') + '</div>'
        + '<div class="lbl">Source</div><div class="notes">' + (r.source ? '<a href="' + esc(r.source) + '" target="_blank" rel="noopener" style="word-break:break-all">' + esc(r.source) + '</a>' : esc(r.sourceName || 'Your own recipe')) + '</div>'
        + '<div style="margin-top:22px"><button class="pill danger" id="del">Delete recipe</button></div>' : '')
    + '<div style="height:24px"></div></div>';
  v.querySelector('#bk').onclick = back;
  v.querySelector('#ed').onclick = () => go('edit', { id });
  v.querySelector('#fav').onclick = async () => { r.tags = r.tags || []; const i = r.tags.indexOf('Favourite'); if (i >= 0) r.tags.splice(i, 1); else r.tags.push('Favourite'); await saveRecipe(r); render(); };
  v.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { view.yair = b.dataset.mode === 'yair'; render(); });
  v.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { view.tab = b.dataset.tab; render(); });
  const sm = v.querySelector('#sm'), sp = v.querySelector('#sp');
  if (sm) { const step = r.servings ? 1/r.servings : 0.5; sm.onclick = () => { view.factor = Math.max(step, Math.round((view.factor - step)*1000)/1000); render(); }; sp.onclick = () => { view.factor = Math.round((view.factor + step)*1000)/1000; render(); }; }
  v.querySelectorAll('[data-done]').forEach(b => b.onclick = () => { const i = b.dataset.done; view.done[i] = !view.done[i]; render(); });
  v.querySelectorAll('[data-timer]').forEach(b => b.onclick = () => startTimer(r, Number(b.dataset.timer), Number(b.dataset.secs)));
  v.querySelectorAll('[data-stop]').forEach(b => b.onclick = () => stopTimer(b.dataset.stop));
  v.querySelectorAll('[data-rate]').forEach(b => b.onclick = async () => { r.rating = r.rating === Number(b.dataset.rate) ? null : Number(b.dataset.rate); await saveRecipe(r); render(); });
  const del = v.querySelector('#del'); if (del) del.onclick = async () => { if (!confirm('Delete "' + r.title + '"? It goes to the bin for 30 days.')) return; r.deleted = Date.now(); await saveRecipe(r); toast('Moved to bin'); go('library', null, true); };
}

/* ---------- timers ---------- */
function startTimer(r, step, secs){
  const label = (r.steps[step] || '').slice(0, 40);
  S.timers.push({ id: uid(), recipeId: r.id, step, title: r.title, icon: r.icon, end: Date.now() + secs*1000, secs, label, fired:false });
  saveTimers();
  if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  render();
}
function stopTimer(id){ S.timers = S.timers.filter(t => t.id !== id); saveTimers(); render(); }
let audioCtx;
function beep(){
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); const now = audioCtx.currentTime; for (let i = 0; i < 4; i++) { const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.type = 'sine'; o.frequency.value = 880; g.gain.setValueAtTime(0, now + i*0.35); g.gain.linearRampToValueAtTime(0.4, now + i*0.35 + 0.03); g.gain.linearRampToValueAtTime(0, now + i*0.35 + 0.28); o.connect(g); g.connect(audioCtx.destination); o.start(now + i*0.35); o.stop(now + i*0.35 + 0.3); } } catch(e){}
  if (navigator.vibrate) navigator.vibrate([300,150,300,150,600]);
}
function renderPin(){
  const p = $('#pin');
  if (!S.timers.length) { p.innerHTML = ''; return; }
  p.innerHTML = S.timers.map(t => { const left = (t.end - Date.now())/1000; return '<button class="tm' + (left <= 0 ? ' over' : '') + '" style="' + tileStyle(t.icon) + '" data-open="' + t.recipeId + '" data-step="' + t.step + '"><div class="tile">' + svgIcon(t.icon) + '</div><div class="what">' + esc(t.title) + '<small>Step ' + (t.step+1) + (t.label ? ' · ' + esc(t.label) : '') + '</small></div><b>' + (left <= 0 ? 'Done' : fmtDur(left)) + '</b><span class="x" data-x="' + t.id + '">✕</span></button>'; }).join('');
  p.querySelectorAll('[data-open]').forEach(b => b.onclick = e => { if (e.target.dataset.x) { stopTimer(e.target.dataset.x); return; } view.id = null; go('recipe', { id: b.dataset.open }); view.tab = 'steps'; render(); });
}
function tick(){
  if (!S.timers.length) return;
  let changed = false;
  S.timers.forEach(t => { if (!t.fired && t.end <= Date.now()) { t.fired = true; changed = true; beep(); notify(t); } });
  if (changed) saveTimers();
  renderPin();
  document.querySelectorAll('[data-stop]').forEach(b => { const t = S.timers.find(x => x.id === b.dataset.stop); const bb = b.querySelector('b'); if (t && bb) bb.textContent = t.end > Date.now() ? fmtDur((t.end - Date.now())/1000) : 'Done'; });
}
setInterval(tick, 1000);
function notify(t){ try { if ('Notification' in window && Notification.permission === 'granted') { const n = new Notification(t.title + ' — timer done', { body: 'Step ' + (t.step+1) + (t.label ? ': ' + t.label : ''), tag: t.id }); n.onclick = () => { window.focus(); view.id = null; go('recipe', { id: t.recipeId }); view.tab = 'steps'; render(); }; } } catch(e){} }
let wakeLock = null;
async function keepAwake(){ try { if ('wakeLock' in navigator && !wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); } } catch(e){} }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { if (S.timers.length) keepAwake(); tick(); } });

/* ---------- add ---------- */
function openAddSheet(){
  closeSheet();
  const dim = document.createElement('div'); dim.className = 'dim'; dim.id = 'dim';
  const sh = document.createElement('div'); sh.className = 'sheet'; sh.id = 'sheet';
  sh.innerHTML = '<div class="grab"></div><h2>Add a recipe</h2>'
    + '<button class="opt" data-add="link"><div class="tile" style="' + tileStyle('noodles') + '">↗</div><div>Paste a link<small>Saves the title and link now; paste the recipe text to fill it in</small></div></button>'
    + '<button class="opt" data-add="text"><div class="tile" style="' + tileStyle('bread') + '">¶</div><div>Paste text<small>An Instagram caption, a message, anything typed</small></div></button>'
    + '<button class="opt" data-add="scratch"><div class="tile" style="' + tileStyle('tofu') + '">+</div><div>Start from scratch<small>Your own recipe</small></div></button>'
    + '<div id="addbody"></div>';
  document.body.appendChild(dim); document.body.appendChild(sh);
  dim.onclick = closeSheet;
  sh.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
    const body = sh.querySelector('#addbody');
    if (b.dataset.add === 'scratch') { closeSheet(); go('edit', { id: null, draft: newRecipe({}) }); return; }
    if (b.dataset.add === 'link') body.innerHTML = '<div class="lbl">Link</div><input class="fld" id="addUrl" placeholder="https://…" inputmode="url"><div class="lbl">Recipe text (optional — copy it from the page)</div><textarea class="fld" id="addText" placeholder="Title\n\nIngredients\n500 g bread flour\n…\n\nMethod\n1. …"></textarea><div style="margin-top:12px"><button class="primary" id="addGo">Continue</button></div>';
    else body.innerHTML = '<div class="lbl">Recipe text</div><textarea class="fld" id="addText" style="min-height:160px" placeholder="Title on the first line, then ingredients (one per line), then the method. Headings like Ingredients / Method help but aren\'t needed."></textarea><div style="margin-top:12px"><button class="primary" id="addGo">Continue</button></div>';
    body.querySelector('#addGo').onclick = () => {
      const url = (body.querySelector('#addUrl') || {}).value || '';
      const text = body.querySelector('#addText').value || '';
      const parsed = parseText(text);
      const draft = newRecipe({ title: parsed.title || (url ? hostOf(url) : ''), source: url.trim() || parsed.source, ings: parsed.ings, steps: parsed.steps, notes: parsed.notes });
      closeSheet(); go('edit', { id: null, draft });
    };
    setTimeout(() => { const f = body.querySelector('input,textarea'); f && f.focus(); }, 50);
  });
}
function closeSheet(){ const d = $('#dim'), s = $('#sheet'); d && d.remove(); s && s.remove(); }
function newRecipe(o){
  const r = Object.assign({ id: uid(), title:'', cats:[], tags:[], ings:[], steps:[], notes:'', source:'', sourceName:'', servings:null, time:'', oven:'', tin:'', rating:null, photo:null, crop:{ x:0, y:0, s:1 }, created: Date.now(), updated: Date.now() }, o);
  r.icon = r.icon || guessIcon(r.title, r.cats);
  return r;
}

/* ---------- edit ---------- */
function renderEdit(v, id, draft){
  const orig = id ? S.recipes.find(x => x.id === id) : null;
  const r = draft || (orig ? JSON.parse(JSON.stringify(orig)) : newRecipe({}));
  S.route.draft = r;
  r.ings = r.ings || []; r.steps = r.steps || []; r.crop = r.crop || { x:0, y:0, s:1 };
  const iconAuto = !r.iconManual;
  v.innerHTML = '<div class="hd"><button class="rbtn" id="cancel">‹</button><h1>' + (orig ? 'Edit recipe' : 'New recipe') + '</h1><button class="pill" id="save">Save</button></div><div class="p">'
    + '<div class="lbl">Title</div><input class="fld" id="fTitle" value="' + esc(r.title) + '" placeholder="Recipe name">'
    + '<div class="lbl">Photo — drag to position, slider to zoom</div><div class="crop" id="crop">' + (r.photo ? '<img id="cropImg" src="' + r.photo + '" style="' + photoStyle(r) + '">' : '<div class="ph">No photo yet</div>') + '</div>'
    + '<div class="cropctl"><input type="range" id="zoom" min="1" max="3" step="0.02" value="' + (r.crop.s||1) + '"' + (r.photo ? '' : ' disabled') + '><label class="pill ghost" style="cursor:pointer">Choose photo<input type="file" id="fPhoto" accept="image/*" style="display:none"></label>' + (r.photo ? '<button class="pill ghost" id="rmPhoto">Remove</button>' : '') + '</div>'
    + '<div class="lbl">Icon' + (iconAuto ? ' (chosen from the title — tap to override)' : '') + '</div><div class="icons">' + ICON_NAMES.map(n => '<button class="tile' + (r.icon === n ? ' sel' : '') + '" style="' + tileStyle(n) + '" data-icon="' + n + '" aria-label="' + n + '">' + svgIcon(n) + '</button>').join('') + '</div>'
    + '<div class="lbl">Categories</div><div class="chips" id="cats">' + CATEGORIES.map(c => '<button class="' + ((r.cats||[]).includes(c) ? 'on' : '') + '" data-cat="' + c + '">' + c + '</button>').join('') + '</div>'
    + '<div class="lbl">Cuisine and tags</div><div class="chips" id="tags">' + [...CUISINES, ...TAGS].map(c => '<button class="' + ((r.tags||[]).includes(c) ? 'on' : '') + '" data-tag="' + c + '">' + c + '</button>').join('') + '</div>'
    + '<div class="lbl">Yair mode treats this as</div><div class="seg"><button class="' + (isBakingRecipe(r) ? 'on' : '') + '" data-bake="1">Baking — grams</button><button class="' + (isBakingRecipe(r) ? '' : 'on') + '" data-bake="0">Savoury — as written</button></div>'
    + '<div class="lbl">Ingredients — quantity, unit, name</div><div id="ings"></div><button class="ghostbtn" id="addIng">Add ingredient</button>'
    + '<div class="lbl">Method — one step per box</div><div id="steps"></div><button class="ghostbtn" id="addStep">Add step</button>'
    + '<div class="lbl">Time and servings</div><div class="irow"><input class="fld" id="fTime" style="flex:1" placeholder="1 h 10" value="' + esc(r.time) + '"><input class="fld" id="fServ" style="flex:1" placeholder="Serves" inputmode="decimal" value="' + (r.servings ?? '') + '"></div>'
    + '<div class="lbl">Oven and tin</div><div class="irow"><input class="fld" id="fOven" style="flex:1" placeholder="220 °C fan" value="' + esc(r.oven) + '"><input class="fld" id="fTin" style="flex:1" placeholder="20 cm round" value="' + esc(r.tin) + '"></div>'
    + '<div class="lbl">Source</div><input class="fld" id="fSrc" placeholder="https://… or a name" value="' + esc(r.source) + '"><input class="fld" id="fSrcName" style="margin-top:6px" placeholder="Shown as (e.g. Nora Cooks)" value="' + esc(r.sourceName) + '">'
    + '<div class="lbl">My notes</div><textarea class="fld" id="fNotes" placeholder="What you changed, what to try next time">' + esc(r.notes) + '</textarea>'
    + '<div class="lbl">Rating</div><div class="rate">' + [1,2,3,4,5,6,7,8,9,10].map(n => '<button class="' + (r.rating === n ? 'on' : '') + '" data-rate="' + n + '">' + n + '</button>').join('') + '</div>'
    + '<div style="height:30px"></div></div>';
  // ingredients
  const ingsEl = v.querySelector('#ings');
  function drawIngs(){
    ingsEl.innerHTML = r.ings.map((i, k) => '<div class="irow" data-k="' + k + '"><span class="h" draggable="true">⠿</span><input class="fld q" value="' + (i.qty == null ? '' : fmtQty(i.qty)) + '" placeholder="qty" inputmode="decimal" data-f="qty"><select class="fld u" data-f="unit">' + UNITS.map(u => '<option value="' + u + '"' + (i.unit === u ? ' selected' : '') + '>' + (u || '—') + '</option>').join('') + '</select><input class="fld n" value="' + esc(i.name) + '" placeholder="ingredient" data-f="name"><button class="del" data-del="' + k + '">✕</button></div>').join('');
    ingsEl.querySelectorAll('[data-f]').forEach(inp => inp.onchange = inp.oninput = () => { const k = Number(inp.closest('.irow').dataset.k); const f = inp.dataset.f; r.ings[k][f] = f === 'qty' ? parseQty(inp.value) : inp.value; });
    ingsEl.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { r.ings.splice(Number(b.dataset.del), 1); drawIngs(); });
    let dragFrom = null;
    ingsEl.querySelectorAll('.h').forEach(h => {
      h.addEventListener('pointerdown', e => { dragFrom = Number(h.closest('.irow').dataset.k); h.setPointerCapture(e.pointerId); });
      h.addEventListener('pointermove', e => { if (dragFrom == null) return; const el = document.elementFromPoint(e.clientX, e.clientY); const row = el && el.closest('.irow'); if (!row) return; const to = Number(row.dataset.k); if (to !== dragFrom) { const [it] = r.ings.splice(dragFrom, 1); r.ings.splice(to, 0, it); dragFrom = to; drawIngs(); const nh = ingsEl.querySelector('.irow[data-k="' + to + '"] .h'); if (nh) { nh.setPointerCapture(e.pointerId); nh.dispatchEvent(new PointerEvent('pointerdown', e)); } } });
      h.addEventListener('pointerup', () => { dragFrom = null; });
    });
  }
  drawIngs();
  v.querySelector('#addIng').onclick = () => { r.ings.push({ qty:null, unit:'', name:'' }); drawIngs(); const last = ingsEl.querySelector('.irow:last-child .n'); last && last.focus(); };
  // steps
  const stepsEl = v.querySelector('#steps');
  function drawSteps(){
    stepsEl.innerHTML = r.steps.map((s, k) => '<div class="steprow"><i>' + (k+1) + '</i><textarea class="fld" data-s="' + k + '" rows="2">' + esc(s) + '</textarea><button class="del" data-ds="' + k + '">✕</button></div>').join('');
    stepsEl.querySelectorAll('[data-s]').forEach(t => { t.oninput = () => { r.steps[Number(t.dataset.s)] = t.value; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; });
    stepsEl.querySelectorAll('[data-ds]').forEach(b => b.onclick = () => { r.steps.splice(Number(b.dataset.ds), 1); drawSteps(); });
  }
  drawSteps();
  v.querySelector('#addStep').onclick = () => { r.steps.push(''); drawSteps(); const last = stepsEl.querySelector('.steprow:last-child textarea'); last && last.focus(); };
  // fields
  const bind = (sel, key, tr) => { const el = v.querySelector(sel); el.oninput = () => { r[key] = tr ? tr(el.value) : el.value; if (key === 'title' && !r.iconManual) { r.icon = guessIcon(r.title, r.cats); v.querySelectorAll('[data-icon]').forEach(b => b.classList.toggle('sel', b.dataset.icon === r.icon)); } }; };
  bind('#fTitle','title'); bind('#fTime','time'); bind('#fServ','servings', x => x.trim() ? parseQty(x) : null); bind('#fOven','oven'); bind('#fTin','tin'); bind('#fSrc','source'); bind('#fSrcName','sourceName'); bind('#fNotes','notes');
  v.querySelectorAll('[data-icon]').forEach(b => b.onclick = () => { r.icon = b.dataset.icon; r.iconManual = true; v.querySelectorAll('[data-icon]').forEach(x => x.classList.toggle('sel', x === b)); });
  v.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { const c = b.dataset.cat; const i = r.cats.indexOf(c); if (i >= 0) r.cats.splice(i,1); else r.cats.push(c); b.classList.toggle('on'); if (!r.iconManual) { r.icon = guessIcon(r.title, r.cats); v.querySelectorAll('[data-icon]').forEach(x => x.classList.toggle('sel', x.dataset.icon === r.icon)); } if (r.baking == null) v.querySelectorAll('[data-bake]').forEach(x => x.classList.toggle('on', (x.dataset.bake === '1') === isBakingRecipe(r))); });
  v.querySelectorAll('[data-tag]').forEach(b => b.onclick = () => { const c = b.dataset.tag; const i = r.tags.indexOf(c); if (i >= 0) r.tags.splice(i,1); else r.tags.push(c); b.classList.toggle('on'); });
  v.querySelectorAll('[data-bake]').forEach(b => b.onclick = () => { r.baking = b.dataset.bake === '1'; v.querySelectorAll('[data-bake]').forEach(x => x.classList.toggle('on', x === b)); });
  v.querySelectorAll('[data-rate]').forEach(b => b.onclick = () => { r.rating = r.rating === Number(b.dataset.rate) ? null : Number(b.dataset.rate); v.querySelectorAll('[data-rate]').forEach(x => x.classList.toggle('on', Number(x.dataset.rate) === r.rating)); });
  // photo
  v.querySelector('#fPhoto').onchange = async e => { const f = e.target.files[0]; if (!f) return; r.photo = await shrinkImage(f, 900); r.crop = { x:0, y:0, s:1 }; S.route.draft = r; renderEdit(v, id, r); };
  const rm = v.querySelector('#rmPhoto'); if (rm) rm.onclick = () => { r.photo = null; renderEdit(v, id, r); };
  const crop = v.querySelector('#crop'), img = v.querySelector('#cropImg'), zoom = v.querySelector('#zoom');
  if (img) {
    zoom.oninput = () => { r.crop.s = Number(zoom.value); img.style.cssText = photoStyle(r); };
    let drag = null;
    crop.addEventListener('pointerdown', e => { drag = { x:e.clientX, y:e.clientY, cx:r.crop.x, cy:r.crop.y }; crop.setPointerCapture(e.pointerId); });
    crop.addEventListener('pointermove', e => { if (!drag) return; const w = crop.clientWidth; r.crop.x = Math.max(-60, Math.min(60, drag.cx + (e.clientX - drag.x)/w*100)); r.crop.y = Math.max(-60, Math.min(60, drag.cy + (e.clientY - drag.y)/w*100)); img.style.cssText = photoStyle(r); });
    crop.addEventListener('pointerup', () => { drag = null; });
  }
  v.querySelector('#cancel').onclick = () => { if (confirm('Discard changes?')) back(); };
  v.querySelector('#save').onclick = async () => {
    r.title = r.title.trim(); if (!r.title) { toast('Give it a title first'); v.querySelector('#fTitle').focus(); return; }
    r.ings = r.ings.filter(i => (i.name||'').trim()); r.steps = r.steps.map(s => s.trim()).filter(Boolean);
    if (!r.icon) r.icon = guessIcon(r.title, r.cats);
    await saveRecipe(r);
    toast('Saved');
    S.hist = S.hist.filter(h => h.name !== 'edit');
    view.id = null;
    go('recipe', { id: r.id }, true);
  };
}
function shrinkImage(file, max){
  return new Promise(res => { const img = new Image(); const url = URL.createObjectURL(file); img.onload = () => { const sc = Math.min(1, max/Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width*sc); c.height = Math.round(img.height*sc); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.82)); }; img.src = url; });
}

/* ---------- shopping ---------- */
const AISLES = [['Fresh',['onion','garlic','ginger','lemon','lime','tomato','pepper','chilli','chili','herb','basil','coriander','parsley','mint','spinach','kale','lettuce','cucumber','carrot','potato','sweet potato','courgette','zucchini','aubergine','eggplant','mushroom','broccoli','cauliflower','cabbage','leek','spring onion','scallion','avocado','apple','banana','berries','mango','fruit','celery','fennel','beetroot','pumpkin','squash','corn','peas','beans','greens']],
  ['Chilled',['tofu','tempeh','seitan','yogurt','yoghurt','cream cheese','cream','milk','butter','cheese','kefir','hummus','pastry','dough']],
  ['Baking and dry',['flour','sugar','yeast','baking','bicarbonate','cocoa','cacao','chocolate','vanilla','oats','cornflour','cornstarch','salt','syrup','honey','nuts','almond','cashew','walnut','pecan','seed','date','raisin','coconut','rice','pasta','noodle','lentil','chickpea','bean','quinoa','couscous','bulgur','polenta','semolina','breadcrumb','panko','stock','bouillon','spice','flakes','dried','ground','cumin','paprika','turmeric','cinnamon','oregano','curry','pepper','oil','vinegar','soy','tamari','miso','tahini','peanut butter','maple','agave','extract','chia','flax']],
  ['Tins and jars',['can','tin','jar','passata','tomato paste','tomato purée','coconut milk','coconut cream','olives','capers','sun-dried','pickled','chipotle','harissa','sriracha','ketchup','mustard','mayo']],
  ['Frozen',['frozen','ice']]];
function aisleFor(name){ const n = name.toLowerCase(); if (/frozen|\bice\b/.test(n)) return 'Frozen'; for (const a of ['Tins and jars','Baking and dry','Chilled','Fresh']) { const kws = AISLES.find(x => x[0] === a)[1]; if (kws.some(k => n.includes(k))) return a; } return 'Other'; }
function normName(name){ return name.toLowerCase().replace(/\(.*?\)/g,'').replace(/,.*$/,'').replace(/\b(fresh|large|small|medium|ripe|chopped|diced|sliced|minced|grated|finely|roughly|peeled|crushed|to taste|optional|plus extra|extra|for serving|for garnish|about|roughly)\b/g,'').replace(/\s+/g,' ').trim().replace(/s$/,''); }
function buildList(){
  const sel = S.shopping.sel || {};
  const merged = {};
  for (const id in sel) {
    const r = S.recipes.find(x => x.id === id); if (!r || r.deleted) continue;
    const cfg = sel[id];
    for (const ing of (r.ings||[])) {
      if (!(ing.name||'').trim() || /^(water|tap water|ice)\b/.test(normName(ing.name))) continue;
      const d = displayIng(ing, r, cfg.mult, cfg.yair, S.settings);
      // canonicalise to grams / ml where we can, otherwise keep the display amount
      let key = normName(ing.name), base = null, unit = ing.unit || '';
      const q = ing.qty != null ? ing.qty * cfg.mult : null;
      if (q != null) {
        if (unit === 'g' || unit === 'kg') base = { g: unit === 'g' ? q : q*1000 };
        else if (unit === 'oz' || unit === 'lb') base = { g: q * (unit === 'oz' ? 28.35 : 453.6) };
        else if (unit === 'ml' || unit === 'l') base = { ml: unit === 'ml' ? q : q*1000 };
        else if (CUPS[unit] !== undefined && (cfg.yair && isBakingRecipe(r))) base = { g: q * CUPS[unit] * densityFor(ing.name).g };
        else base = { other: q, unit };
      }
      const k = key + '|' + (base ? (base.g != null ? 'g' : base.ml != null ? 'ml' : 'o:' + base.unit) : 'x');
      if (!merged[k]) merged[k] = { name: ing.name, key: k, g:0, ml:0, other:0, unit, from:[], text:[] };
      const m = merged[k];
      if (base) { if (base.g != null) m.g += base.g; else if (base.ml != null) m.ml += base.ml; else m.other += base.other; } else m.text.push(d.amt);
      if (!m.from.includes(r.title)) m.from.push(r.title);
    }
  }
  const items = Object.values(merged).map(m => {
    let amt = '';
    if (m.g) amt = fmtGrams(roundGrams(m.g, true));
    else if (m.ml) amt = m.ml >= 1000 ? (Math.round(m.ml/10)/100) + ' l' : Math.round(m.ml) + ' ml';
    else if (m.other) amt = fmtQty(Math.round(m.other*4)/4) + (m.unit ? ' ' + m.unit + (m.unit === 'cup' && m.other > 1 ? 's' : '') : '');
    else amt = m.text.filter(Boolean).join(' + ');
    return { id: m.key, name: m.name.replace(/^./, c => c.toUpperCase()), amt, aisle: aisleFor(m.name), from: m.from, done: !!(S.shopping.done||{})[m.key] };
  });
  items.sort((a,b) => a.aisle.localeCompare(b.aisle) || a.name.localeCompare(b.name));
  return items;
}
function renderShopping(v){
  S.shopping = S.shopping || { sel:{}, done:{}, stage:'pick' };
  const sel = S.shopping.sel;
  const recipes = sortRecipes(S.recipes.filter(r => !r.deleted && (r.ings||[]).length));
  if (S.shopping.stage === 'list') {
    const items = buildList();
    const aisles = ['Fresh','Chilled','Baking and dry','Tins and jars','Frozen','Other'].filter(a => items.some(i => i.aisle === a));
    v.innerHTML = '<div class="hd"><button class="rbtn" id="bk">‹</button><h1>List · ' + Object.keys(sel).length + ' recipe' + (Object.keys(sel).length === 1 ? '' : 's') + '</h1></div><div class="p">'
      + (items.length ? aisles.map(a => '<div class="grp">' + a + '</div>' + items.filter(i => i.aisle === a).map(i => '<button class="li' + (i.done ? ' done' : '') + '" data-tick="' + esc(i.id) + '"><div class="cb' + (i.done ? ' on' : '') + '">' + (i.done ? '✓' : '') + '</div><span>' + esc(i.name) + (i.from.length > 1 ? '<small>merged from ' + i.from.length + '</small>' : '') + '</span><b>' + esc(i.amt) + '</b></button>').join('')).join('') : '<div class="empty">Nothing to buy — the chosen recipes have no ingredients yet.</div>')
      + '</div><div class="foot"><button class="ghostbtn" id="clear">Clear ticked</button><button class="ghostbtn" id="copy">Copy as text</button></div>';
    v.querySelector('#bk').onclick = () => { S.shopping.stage = 'pick'; saveShopping(); render(); };
    v.querySelectorAll('[data-tick]').forEach(b => b.onclick = () => { S.shopping.done = S.shopping.done || {}; const k = b.dataset.tick; S.shopping.done[k] = !S.shopping.done[k]; saveShopping(); render(); });
    v.querySelector('#clear').onclick = () => { S.shopping.done = {}; saveShopping(); render(); };
    v.querySelector('#copy').onclick = async () => { const txt = aisles.map(a => a + '\n' + items.filter(i => i.aisle === a).map(i => (i.done ? '☑ ' : '☐ ') + i.name + (i.amt ? ' — ' + i.amt : '')).join('\n')).join('\n\n'); try { await navigator.clipboard.writeText(txt); toast('Copied'); } catch(e) { toast('Could not copy'); } };
    return;
  }
  v.innerHTML = '<div class="hd"><h1>Shopping</h1>' + (Object.keys(sel).length ? '<button class="pill ghost" id="none">Clear</button>' : '') + '</div><div class="p"><div class="lbl">Choose recipes — tap the amount to scale</div>'
    + (recipes.length ? recipes.map(r => { const c = sel[r.id]; return '<div class="pick"><button class="cb' + (c ? ' on' : '') + '" data-sel="' + r.id + '">' + (c ? '✓' : '') + '</button><div class="tile" style="' + tileStyle(r.icon) + '">' + svgIcon(r.icon) + '</div><div><h3>' + esc(r.title) + '</h3><small>' + (c ? (c.yair ? 'Yair mode' : 'Original') + (r.servings ? ' · serves ' + Math.round(r.servings*c.mult*10)/10 : '') : (r.servings ? 'serves ' + r.servings : '')) + '</small></div>' + (c ? '<div class="mult"><button data-m="' + r.id + '" data-d="-1">−</button><span>' + c.mult + '×</span><button data-m="' + r.id + '" data-d="1">+</button></div>' : '') + '</div>'; }).join('') : '<div class="empty">No recipes with ingredients yet.</div>')
    + '</div><div class="foot"><button class="primary" id="build"' + (Object.keys(sel).length ? '' : ' disabled style="opacity:.5"') + '>Build list' + (Object.keys(sel).length ? ' · ' + Object.keys(sel).length : '') + '</button></div>';
  v.querySelectorAll('[data-sel]').forEach(b => b.onclick = () => { const id = b.dataset.sel; if (sel[id]) delete sel[id]; else sel[id] = { mult:1, yair: S.settings.openInYair }; saveShopping(); render(); });
  v.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const c = sel[b.dataset.m]; const r = S.recipes.find(x => x.id === b.dataset.m); const step = r.servings ? Math.round(1/r.servings*100)/100 : 0.5; c.mult = Math.max(step, Math.round((c.mult + Number(b.dataset.d)*step)*100)/100); saveShopping(); render(); });
  const none = v.querySelector('#none'); if (none) none.onclick = () => { S.shopping.sel = {}; S.shopping.done = {}; saveShopping(); render(); };
  v.querySelector('#build').onclick = () => { if (!Object.keys(sel).length) return; S.shopping.stage = 'list'; saveShopping(); render(); };
}

/* ---------- settings and backup ---------- */
function renderSettings(v){
  const s = S.settings;
  const bin = S.recipes.filter(r => r.deleted);
  const seg = (key, opts) => '<div class="seg sm">' + opts.map(([val, lab]) => '<button class="' + (s[key] === val ? 'on' : '') + '" data-set="' + key + '" data-val="' + val + '">' + lab + '</button>').join('') + '</div>';
  const sw = key => '<button class="sw' + (s[key] ? '' : ' off') + '" data-sw="' + key + '" aria-label="' + key + '"></button>';
  v.innerHTML = '<div class="hd"><h1>Settings</h1></div><div class="p">'
    + '<div class="sec">Recipes</div>'
    + '<div class="srow"><div>Sort "All" by</div>' + seg('sort', [['az','A–Z'],['rating','Rating'],['newest','Newest']]) + '</div>'
    + '<div class="srow"><div>Top strip shows<small>What the wheel on the main page cycles through</small></div>' + seg('wheel', [['recent','Recent'],['totry','To try'],['all','All']]) + '</div>'
    + '<div class="srow"><div>Open recipes in Yair mode</div>' + sw('openInYair') + '</div>'
    + '<div class="sec">Yair mode</div>'
    + '<div class="srow"><div>Temperatures<small>°F in the method shown as °C</small></div>' + seg('tempC', [[true,'°C'],[false,'As written']]) + '</div>'
    + '<div class="srow"><div>Baking in grams<small>Cups and spoons converted; under 2 tbsp stays in spoons; yeast and bread salt always grams</small></div>' + sw('bakingGrams') + '</div>'
    + '<div class="srow"><div>Round scaled amounts<small>Whole grams above 20 g, halves below</small></div>' + sw('rounding') + '</div>'
    + '<div class="sec">Backup</div>'
    + '<div class="srow"><div>Last backup<small>' + (s.lastBackup ? new Date(s.lastBackup).toLocaleString() : 'Never') + ' · ' + S.recipes.filter(r => !r.deleted).length + ' recipes</small></div><button class="pill" id="bk">Back up now</button></div>'
    + '<div class="srow"><div>Remind me to back up</div>' + seg('backupEvery', [['daily','Daily'],['weekly','Weekly'],['off','Off']]) + '</div>'
    + '<div class="srow"><div>Restore or import<small>A backup file from this app</small></div><label class="pill ghost" style="cursor:pointer">Choose file<input type="file" id="imp" accept="application/json,.json" style="display:none"></label></div>'
    + '<div class="srow"><div>Bin<small>' + bin.length + ' recipe' + (bin.length === 1 ? '' : 's') + ' · kept 30 days</small></div>' + (bin.length ? '<button class="pill ghost" id="binOpen">Open</button>' : '') + '</div>'
    + '<div id="bin"></div>'
    + '<div class="sec">Data</div>'
    + '<div class="srow"><div>Load sample recipes<small>A handful to try the app with</small></div><button class="pill ghost" id="sample">Load</button></div>'
    + '<div class="srow"><div>Storage<small id="quota">…</small></div><button class="pill ghost" id="persist">Protect</button></div>'
    + '<div style="height:20px"></div></div>';
  v.querySelectorAll('[data-set]').forEach(b => b.onclick = async () => { let val = b.dataset.val; if (val === 'true') val = true; if (val === 'false') val = false; s[b.dataset.set] = val; await saveSettings(); render(); });
  v.querySelectorAll('[data-sw]').forEach(b => b.onclick = async () => { s[b.dataset.sw] = !s[b.dataset.sw]; await saveSettings(); render(); });
  v.querySelector('#bk').onclick = exportBackup;
  v.querySelector('#imp').onchange = e => importBackup(e.target.files[0]);
  v.querySelector('#sample').onclick = async () => { if (!confirm('Add the sample recipes to your library?')) return; await loadSamples(); toast('Sample recipes added'); go('library', null, true); };
  const bo = v.querySelector('#binOpen'); if (bo) bo.onclick = () => { v.querySelector('#bin').innerHTML = bin.map(r => '<div class="srow"><div>' + esc(r.title) + '<small>deleted ' + new Date(r.deleted).toLocaleDateString() + '</small></div><button class="pill ghost" data-restore="' + r.id + '">Restore</button></div>').join(''); v.querySelectorAll('[data-restore]').forEach(b => b.onclick = async () => { const r = S.recipes.find(x => x.id === b.dataset.restore); delete r.deleted; await saveRecipe(r); toast('Restored'); render(); }); };
  v.querySelector('#persist').onclick = async () => { if (navigator.storage && navigator.storage.persist) { const ok = await navigator.storage.persist(); toast(ok ? 'Storage protected from clean-up' : 'Android declined — install the app to home screen first'); } else toast('Not supported here'); };
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then(async e => { const q = v.querySelector('#quota'); if (!q) return; const p = navigator.storage.persisted ? await navigator.storage.persisted() : false; q.textContent = (Math.round((e.usage||0)/1e5)/10) + ' MB used · ' + (p ? 'protected' : 'not yet protected'); });
}
function exportBackup(){
  const data = { app:'recipes', version:1, exported: Date.now(), settings: S.settings, recipes: S.recipes };
  const blob = new Blob([JSON.stringify(data)], { type:'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'recipes-backup-' + new Date().toISOString().slice(0,10) + '.json'; document.body.appendChild(a); a.click(); a.remove();
  S.settings.lastBackup = Date.now(); saveSettings(); toast('Backup saved to Downloads'); render();
}
async function importBackup(file){
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!data || !Array.isArray(data.recipes)) throw new Error('bad');
    const mode = S.recipes.length ? (confirm('Merge with what is already here? OK = merge (newer wins), Cancel = replace everything') ? 'merge' : 'replace') : 'replace';
    if (mode === 'replace') { await store.clearRecipes(); S.recipes = []; }
    let n = 0;
    for (const r of data.recipes) { const ex = S.recipes.find(x => x.id === r.id); if (!ex || (r.updated||0) > (ex.updated||0)) { await saveRecipe(r); n++; } }
    if (data.settings && mode === 'replace') { S.settings = Object.assign({}, DEFAULT_SETTINGS, data.settings); await saveSettings(); }
    toast(n + ' recipes ' + (mode === 'replace' ? 'restored' : 'imported'));
    go('library', null, true);
  } catch(e) { toast('That file could not be read'); }
}

/* ---------- samples ---------- */
async function loadSamples(){
  const now = Date.now();
  const mk = (o, i) => newRecipe(Object.assign({ created: now - i*60000, updated: now - i*60000 }, o));
  const list = [
    mk({ title:'Big bubble no-knead focaccia', cats:['Bread'], tags:['Savoury','To try'], source:'https://www.emmafontanella.com/no-knead-focaccia', sourceName:'Emma Fontanella', servings:8, time:'18 h incl. proof', oven:'230 °C fan', tin:'33 × 23 cm tray',
      ings:[{qty:4,unit:'cup',name:'bread flour'},{qty:2,unit:'tsp',name:'fine salt'},{qty:0.5,unit:'tsp',name:'instant yeast'},{qty:2,unit:'cup',name:'water, room temperature'},{qty:4,unit:'tbsp',name:'olive oil, for the tray and top'},{qty:1,unit:'tsp',name:'flaky salt'},{qty:null,unit:'',name:'rosemary, cherry tomatoes or olives'}],
      steps:['Mix flour, salt and yeast in a large bowl. Add the water and stir until no dry flour remains. Cover and leave at room temperature for 12 to 18 hours until bubbly and tripled.','Oil the tray generously. Tip the dough in, fold it over itself twice, turn seam side down and let it relax for 30 minutes.','Stretch the dough to the corners, cover and proof for 2 hours until puffy and full of bubbles.','Heat the oven to 450 °F. Oil your fingers and dimple the dough all over, then add flaky salt and toppings.','Bake for 25 minutes until deep golden. Cool on a rack for 10 minutes before cutting.'], notes:'' }, 0),
    mk({ title:'Vegan burnt Basque cheesecake', cats:['Desserts','Bakes'], tags:['Sweet'], source:'https://addictedtodates.com/vegan-basque-cheesecake/', sourceName:'Addicted to Dates', servings:10, time:'1 h 10 plus chilling', oven:'220 °C fan', tin:'20 cm round', rating:9,
      ings:[{qty:600,unit:'g',name:'silken tofu'},{qty:450,unit:'g',name:'vegan cream cheese'},{qty:1,unit:'cup',name:'caster sugar'},{qty:45,unit:'g',name:'cornflour'},{qty:1,unit:'cup',name:'oat cream'},{qty:1,unit:'tbsp',name:'vanilla extract'},{qty:0.5,unit:'tsp',name:'fine salt'},{qty:1,unit:'tbsp',name:'lemon juice'}],
      steps:['Heat the oven to 220 °C fan. Line a 20 cm tin with two overlapping sheets of parchment that come well above the rim.','Blend tofu, cream cheese and sugar until completely smooth, scraping down twice.','Add cornflour, cream, vanilla, salt and lemon juice. Blend again and pour into the tin.','Bake for 50 minutes until the top is deeply browned and the centre still wobbles.','Cool in the tin, then chill for at least 4 hours before slicing.'], notes:'Bake 5 min longer than stated for a darker top. Halved the sugar the second time — better.' }, 1),
    mk({ title:"Xi'an biang biang noodles", cats:['Mains'], tags:['Asian','Savoury','Spicy'], source:'https://redhousespice.com/biang-biang-noodles/', sourceName:'Red House Spice', servings:2, time:'45 min', rating:8,
      ings:[{qty:2,unit:'tbsp',name:'neutral oil'},{qty:0.25,unit:'tsp',name:'MSG'},{qty:0.25,unit:'tsp',name:'chilli flakes'},{qty:2,unit:'clove',name:'garlic, finely grated'},{qty:1,unit:'tbsp',name:'minced ginger'},{qty:0.5,unit:'tsp',name:'ground Sichuan pepper'},{qty:2,unit:'tbsp',name:'spring onion, green parts, finely chopped'},{qty:1,unit:'tbsp',name:'soy sauce'},{qty:1,unit:'tbsp',name:'Chinese black vinegar'},{qty:1,unit:'',name:'head broccoli'},{qty:300,unit:'g',name:'Taiwanese wide noodles'},{qty:1,unit:'tbsp',name:'sesame seeds'}],
      steps:['Put garlic, ginger, chilli flakes, Sichuan pepper, spring onion and MSG in a heatproof bowl.','Cook the noodles and broccoli together according to the packet, about 4 minutes.','Heat the oil until smoking and pour it over the aromatics. Add soy sauce and vinegar.','Drain the noodles, toss with the sauce and top with sesame seeds.'], notes:'My version of the sauce — from the Keep note.' }, 2),
    mk({ title:'Mango banana ice cream', cats:['Desserts'], tags:['Sweet','Quick','No-bake'], sourceName:'Your recipe', servings:4, time:'10 min', rating:7, baking:false,
      ings:[{qty:0.5,unit:'',name:'pack frozen mango'},{qty:3,unit:'',name:'frozen bananas'},{qty:1,unit:'',name:'date'},{qty:2,unit:'tbsp',name:'chia seeds'},{qty:1,unit:'pinch',name:'salt'},{qty:null,unit:'',name:'almond milk, a splash'}],
      steps:['Blend everything with a tamper, adding just enough almond milk to get it moving.','Serve straight away, or freeze for 30 minutes for a firmer scoop.'], notes:'' }, 3),
    mk({ title:'Pumpkin seed butter', cats:['Sauces'], tags:['Savoury'], sourceName:'Your recipe', servings:null, time:'20 min', baking:false,
      ings:[{qty:4,unit:'cup',name:'pumpkin seeds'},{qty:1,unit:'tsp',name:'olive oil'},{qty:0.5,unit:'tsp',name:'coarse salt'},{qty:1,unit:'tsp',name:'maple syrup'}],
      steps:['Toast the seeds at 155 °C fan for 10 to 12 minutes, stirring halfway.','Blend the seeds with the tamper for about 3 minutes, stopping every minute to scrape down.','Add the oil, salt and maple syrup and blend until glossy.'], notes:'' }, 4),
    mk({ title:'Marry me tofu', cats:['Mains'], tags:['Weeknight','Savoury','Italian'], source:'https://schoolnightvegan.com/home/marry-me-tofu/', sourceName:'School Night Vegan', servings:4, time:'35 min',
      ings:[{qty:600,unit:'g',name:'firm tofu'},{qty:2,unit:'tbsp',name:'cornflour'},{qty:3,unit:'tbsp',name:'olive oil'},{qty:4,unit:'clove',name:'garlic, sliced'},{qty:120,unit:'g',name:'sun-dried tomatoes in oil, chopped'},{qty:1,unit:'tbsp',name:'tomato purée'},{qty:1,unit:'tsp',name:'chilli flakes'},{qty:400,unit:'ml',name:'oat cream'},{qty:1,unit:'',name:'bunch fresh basil'},{qty:null,unit:'',name:'salt and pepper'}],
      steps:['Press the tofu, tear into chunks and toss with cornflour and a pinch of salt.','Fry in the oil over high heat for 8 minutes, turning, until golden. Set aside.','Soften the garlic in the same pan for 1 minute, add the sun-dried tomatoes, purée and chilli, then pour in the cream.','Simmer for 5 minutes, return the tofu, season and finish with torn basil.'], notes:'' }, 5)
  ];
  for (const r of list) await saveRecipe(r);
  S.settings.sampleLoaded = true; await saveSettings();
}

/* ---------- boot ---------- */
async function boot(){
  await openDB();
  S.recipes = await store.allRecipes();
  S.settings = Object.assign({}, DEFAULT_SETTINGS, (await store.get('settings')) || {});
  S.shopping = (await store.get('shopping')) || { sel:{}, done:{}, stage:'pick' };
  S.timers = (await store.get('timers')) || [];
  // purge bin older than 30 days
  for (const r of S.recipes.filter(r => r.deleted && Date.now() - r.deleted > 30*86400000)) { await store.delRecipe(r.id); S.recipes = S.recipes.filter(x => x.id !== r.id); }
  if (!S.recipes.length && !S.settings.sampleLoaded) { await loadSamples(); }
  render();
  if (S.timers.length) keepAwake();
  if (S.settings.backupEvery !== 'off') { const gap = S.settings.backupEvery === 'daily' ? 1 : 7; const n = S.recipes.filter(r => !r.deleted).length; if ((S.settings.lastBackup && Date.now() - S.settings.lastBackup > gap*86400000) || (!S.settings.lastBackup && n > 10)) setTimeout(() => toast('Time for a backup — Settings › Back up now', 4000), 1500); }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
window.addEventListener('popstate', e => { if (S.hist.length) { e.preventDefault(); back(); history.pushState(null, ''); } });
history.pushState(null, '');
boot();
})();
