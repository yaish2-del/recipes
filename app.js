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
const CATEGORIES = ['Bread','Bakes','Desserts','Breakfast','Mains','Sides','Salads','Soups','Sauces','Spices','Snacks','Drinks'];
const CUISINES = ['Asian','Italian','Middle Eastern','Indian','Mexican','Mediterranean'];
const TAGS = ['Sweet','Savoury','Quick','Weeknight','No-bake','High-protein','Gluten-free','To try','Favourite','Instagram','Needs details'];
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
  lib: { tab:'All', q:'', sel:null, icon:null }
};
const DEFAULT_SETTINGS = { sort:'az', wheel:'recent', openInYair:true, tempC:true, bakingGrams:true, savouryAsWritten:true, rounding:true, backupEvery:'weekly', lastBackup:null, sampleLoaded:false };
const uid = () => Math.random().toString(36).slice(2,10) + Date.now().toString(36);

/* ---------- units, densities, Yair mode ---------- */
const DENSITY = [ // grams per US cup, longest match wins
  ['bread flour',127],['strong flour',127],['plain flour',120],['all-purpose flour',120],['all purpose flour',120],['wholemeal flour',120],['whole wheat flour',120],['spelt flour',120],['rye flour',102],['rice flour',158],['almond flour',96],['ground almonds',96],['chickpea flour',92],['gram flour',92],['buckwheat flour',120],['oat flour',90],['self-raising flour',120],['flour',120],
  ['icing sugar',120],['powdered sugar',120],['caster sugar',200],['brown sugar',220],['coconut sugar',150],['sugar',200],['maple syrup',320],['agave',320],['honey',340],['golden syrup',340],['date syrup',340],
  ['cocoa',85],['cacao',85],['chocolate chips',170],['chocolate',170],['cornflour',128],['cornstarch',128],['baking powder',230],['baking soda',220],['bicarbonate',220],['nutritional yeast',60],['instant yeast',150],['dried yeast',150],['yeast',150],['salt',288],['flaky salt',150],
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
  s = s.replace(/[¼½¾⅓⅔⅛]/g, m => ' ' + map[m] + ' ').replace(/\s+and\s+/g, ' ');
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
  const isJuice = /juice|zest|extract|essence/.test(nameL);
  if (yair && baking && settings.bakingGrams && CUPS[unit] !== undefined && !isJuice) {
    const spoon = unit === 'tsp' || unit === 'tbsp';
    const origTbsp = spoon ? (unit === 'tbsp' ? ing.qty : ing.qty/3) : 99;
    const forceGrams = (/yeast/.test(nameL) && !/nutritional/.test(nameL)) || (/salt/.test(nameL) && (recipe.cats||[]).includes('Bread'));
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
const UNIT_RX = /^(\d[\d\s\/.,¼½¾⅓⅔⅛-]*|[¼½¾⅓⅔⅛])\s*(kg|g|grams?|ml|l|litres?|liters?|tsp|teaspoons?|tbsp|tablespoons?|cups?|oz|ounces?|lbs?|pounds?|pinch(?:es)?|cloves?|cans?|tins?|pieces?|slices?|handful|bunch)?\.?\s+(?:of\s+)?(.+)$/i;
const UNIT_NORM = { pinches:'pinch', gram:'g', grams:'g', litre:'l', liter:'l', litres:'l', liters:'l', teaspoon:'tsp', teaspoons:'tsp', tablespoon:'tbsp', tablespoons:'tbsp', cups:'cup', ounce:'oz', ounces:'oz', lbs:'lb', pound:'lb', pounds:'lb', cloves:'clove', cans:'can', tin:'can', tins:'can', pieces:'piece', slices:'piece', slice:'piece', handful:'', bunch:'' };
function cleanLine(l){ return l.replace(/\*{1,3}note\s*\d+\*{0,3}/gi,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/\*\*|__/g,'').replace(/\s+/g,' ').trim(); }
function parseAmount(str){ const m = str.trim().match(/^(\d[\d\s\/.,¼½¾⅓⅔⅛-]*|[¼½¾⅓⅔⅛])\s*(kg|g|grams?|ml|l|litres?|liters?|tsp|teaspoons?|tbsp|tablespoons?|cups?|oz|ounces?|lbs?|pounds?|pinch|cloves?|cans?|tins?|pieces?|slices?|handful|bunch)?\.?\s*$/i); if (!m) return null; let unit = (m[2]||'').toLowerCase(); unit = UNIT_NORM[unit] !== undefined ? UNIT_NORM[unit] : unit; return { qty: parseQty(m[1]), unit }; }
function parseIngLine(line){
  line = cleanLine(line).replace(/^[-•*·▢]+\s*/, '').replace(/^\d+[.)]\s+(?=\D)/, '').replace(/^(\d+)\s+and\s+(a\s+)?(half|quarter|\d+\/\d+|[¼½¾⅓⅔⅛])/i, (m, a, _b, f) => a + ' ' + (f === 'half' ? '1/2' : f === 'quarter' ? '1/4' : f)).trim();
  let alt = null;
  // "400 g (14 oz) tofu" or "220 g (1 cup) sugar" → keep first, remember the bracketed one
  line = line.replace(/^([^()]*?\d[^()]*?)\s*\(([^()]*?)\)/, (m0, a, b) => { const pa = parseAmount(b); if (pa && pa.qty != null) { alt = pa; return a + ' '; } return m0; });
  // "8 g / 4 tsp ground flax" → keep first
  line = line.replace(/^(\S[^\/]*?\d[^\/]*?)\s*\/\s*([^\/]+?)(?=\s+[a-zA-Z(])/, (m0, a, b) => { const pa = parseAmount(b); const pb = parseAmount(a); if (pa && pb && pb.qty != null) { alt = pa; return a + ' '; } return m0; });
  const jm = line.match(/^juice\s+(?:and\s+zest\s+)?of\s+(\d+|½|¼|a|an|one|half a)\s+(lemons?|limes?|oranges?)/i);
  if (jm) { const q = /^(a|an|one)$/i.test(jm[1]) ? 1 : /half/i.test(jm[1]) ? 0.5 : parseQty(jm[1]); return { qty:q, unit:'', name: jm[2].replace(/s$/,'') + ' juice' + (line.slice(jm[0].length).trim() ? ' ' + line.slice(jm[0].length).trim() : '') }; }
  const m = line.match(UNIT_RX);
  if (!m) return { qty:null, unit:'', name:line };
  let unit = (m[2]||'').toLowerCase(); unit = UNIT_NORM[unit] !== undefined ? UNIT_NORM[unit] : unit;
  let out = { qty: parseQty(m[1]), unit, name: m[3].replace(/^[,:\s]+/, '').trim() };
  if (alt) { const metric = u => /^(g|kg|ml|l)$/.test(u); if (metric(alt.unit) && !metric(unit)) { const sw = { qty: out.qty, unit: out.unit }; out.qty = alt.qty; out.unit = alt.unit; alt = sw; } out.alt = alt; }
  return out;
}
function parseText(text){
  const raw = String(text||'').replace(/\r/g,'');
  const lines = raw.split('\n');
  const out = { title:'', ings:[], steps:[], notes:'', source:'' };
  const url = raw.match(/https?:\/\/\S+/); if (url) out.source = url[0];
  const tm = raw.match(/^Title:\s*(.+)$/m); if (tm) out.title = cleanLine(tm[1]).replace(/\s+[-|–]\s+[^-|–]+$/, '');
  const norm = l => l.toLowerCase().replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu,'').replace(/^[#*_\s>\-•·]+|[#*_:\s]+$/g,'').trim();
  const H_ING = /^(ingredients?|you will need|what you need)( \(.*\))?$/, H_STEP = /^(method|instructions?|directions?|steps?|preparation|how to make( it)?|procedure)$/, H_NOTE = /^(notes?|tips?|recipe notes|chef'?s? notes?)$/, H_END = /^(nutrition(al)? ?(info(rmation)?|facts)?|nutrition|you may also like|share( this)?|reviews?( & questions)?|comments?|did you make this recipe\??|more recipes|related( recipes)?|leave a (reply|review)|equipment|video|keyword|storage)$/;
  const hasIngHead = lines.some(l => H_ING.test(norm(l)));
  let mode = hasIngHead ? 'skip' : 'start', seenIng = false, seenStep = false;
  for (const l0 of lines) {
    let l = l0.trim(); if (!l) continue;
    const n = norm(l);
    if (H_ING.test(n)) { if (seenIng) { out.ings = []; } seenIng = true; mode = 'ing'; continue; }
    if (H_STEP.test(n)) { if (mode === 'skip') continue; if (seenStep) out.steps = []; seenStep = true; mode = 'steps'; continue; }
    if (H_NOTE.test(n)) { if (mode === 'skip') continue; out.notes = ''; mode = 'notes'; continue; }
    if (H_END.test(n)) { if (mode !== 'skip') mode = 'end'; continue; }
    if (mode === 'skip' || mode === 'end') continue;
    if (/^https?:/.test(l) || /^!\[/.test(l) || /^\[!\[/.test(l) || /^[▢☐□\-•*·_=]+$/.test(l) || /^\d+\s*(votes?|reviews?|stars?)$/i.test(l)) continue;
    l = l.replace(/^[▢☐□]\s*/, '');
    if (mode === 'start') { if (!out.title) { out.title = cleanLine(l.replace(/^#+\s*/, '')); mode = 'auto'; } continue; }
    if (mode === 'notes') { const t = cleanLine(l.replace(/^[-•*]\s*/, '')); if (t) out.notes += (out.notes ? '\n' : '') + t; continue; }
    if (mode === 'steps') { const t = cleanLine(l.replace(/^(\d+[.)]|step\s*\d+[:.]?|[-•*])\s*/i, '')); if (t && t.length > 2) out.steps.push(t); continue; }
    if (/^#{1,6}\s/.test(l) || /^\*\*[^*]+\*\*:?$/.test(l)) { const t = cleanLine(l.replace(/^#+\s*/, '')).replace(/:$/, ''); if (mode === 'ing' && t.length < 40) out.ings.push({ qty:null, unit:'', name:t, group:true }); continue; }
    if (/^#\w/.test(l) && !/\s/.test(l.replace(/#\w+/g,'').trim())) continue;
    if (/^\*+\s*\D/.test(l) && /website|link in (my )?bio|full (method|recipe)|comment ["“]/i.test(l)) { out.notes += (out.notes ? '\n' : '') + cleanLine(l.replace(/^\*+\s*/, '')); continue; }
    const IMP = /^(sift|put|mix|roll|place|dust|freeze|bake|add|stir|whisk|heat|cook|pour|blend|combine|preheat|chill|serve|fold|cut|slice|transfer|let|allow|remove|cool|drain|rinse|toast|fry|saut[eé]|simmer|boil|bring|season|taste|top|garnish|spread|press|shape|form|scoop|line|grease|melt|beat|cream|knead|rest|proof|prove|cover|refrigerate|store|enjoy|start|begin|meanwhile|once|then|now|while|when|in a|into a|using)\b/i;
    if (mode === 'ing' && !seenIng && !/^[-•*]?\s*(\d|[¼½¾⅓⅔⅛])/.test(l) && IMP.test(l)) { const t = cleanLine(l.replace(/^[-•*]\s*/, '')); if (t) out.steps.push(t); mode = 'steps'; continue; }
    const words = l.split(/\s+/).length;
    const looksIng = /^[-•*]?\s*(\d|[¼½¾⅓⅔⅛])/.test(l) || (mode === 'ing' && words <= 10) || (mode === 'auto' && words <= 5);
    if (mode === 'ing' || (mode === 'auto' && looksIng)) { const p = parseIngLine(l); if (p.name && p.name.length < 120) out.ings.push(p); if (mode === 'auto') mode = 'ing'; }
    else { const t = cleanLine(l.replace(/^(\d+[.)]|[-•*])\s*/, '')); if (t) out.steps.push(t); mode = 'steps'; }
  }
  out.ings = out.ings.filter(i => i.name && !/^(skip to|jump to|print|pin( it| this)?|rate|save|share|prep time|cook time|total time|servings?|course|cuisine|author|calories|from \d+ votes|makes|yield)/i.test(i.name) && !(i.qty == null && /^[A-Z0-9\s&»'!?.]+$/.test(i.name) && !i.group));
  if (!out.ings.some(i => !i.group)) out.ings = [];
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
  else if (r.name === 'import') renderImport(v);
  else if (r.name === 'add') { S.route = S.hist.pop() || { name:'library' }; render(); openAddSheet(); }
  renderPin();
}
document.querySelectorAll('#nav button').forEach(b => b.addEventListener('click', () => { if (b.dataset.go === 'add') openAddSheet(); else go(b.dataset.go, null, true); }));

/* ---------- library ---------- */
function renderLibrary(v){
  const q = S.lib.q.trim().toLowerCase();
  let list = S.recipes.filter(r => !r.deleted);
  if (S.lib.tab !== 'All') list = list.filter(r => (r.cats||[]).includes(S.lib.tab) || (r.tags||[]).includes(S.lib.tab));
  if (S.lib.icon) list = list.filter(r => r.icon === S.lib.icon);
  if (q) list = list.filter(r => [r.title, (r.ings||[]).map(i => i.name).join(' '), (r.cats||[]).join(' '), (r.tags||[]).join(' '), r.notes, sourceLabel(r)].join(' ').toLowerCase().includes(q));
  list = sortRecipes(list);
  let wheel = S.recipes.filter(r => !r.deleted);
  if (S.settings.wheel === 'recent') wheel = wheel.slice().sort((a,b) => (b.updated||0) - (a.updated||0)).slice(0, 12);
  else if (S.settings.wheel === 'totry') wheel = wheel.filter(r => (r.tags||[]).includes('To try')).slice(0, 20);
  else wheel = sortRecipes(wheel);
  const tabs = ['All', ...CATEGORIES, 'To try', 'Favourite'];
  const sel = S.lib.sel;
  v.innerHTML = (sel ? '<div class="top"><h1>' + sel.length + ' selected</h1><div style="display:flex;gap:8px"><button class="pill danger" id="selDel">Delete</button><button class="pill ghost" id="selX">Done</button></div></div>'
    : '<div class="top"><h1>Recipes</h1><div style="display:flex;gap:8px"><button class="rbtn" id="btnSel" aria-label="Select"><svg viewBox="0 0 24 24"><path d="M5 12l4 4L19 6"/></svg></button><button class="rbtn" id="btnSearch" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></button></div></div>')
    + (S.lib.showSearch || q ? '<div class="search"><input id="q" placeholder="Search recipes, ingredients, tags" value="' + esc(S.lib.q) + '"><button class="rbtn" style="border:0" id="qx">✕</button></div>' : '')
    + (!q && wheel.length ? '<div class="car" id="car">' + wheel.map(r => '<button class="slide" style="' + tileStyle(r.icon) + '" data-id="' + r.id + '"><div class="disc">' + (r.photo ? '<img src="' + r.photo + '" alt="" style="' + photoStyle(r) + '" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'"><div class="ph" style="display:none">' + svgIcon(r.icon) + '</div>' : '<div class="ph">' + svgIcon(r.icon) + '</div>') + '</div><h3>' + esc(r.title) + '</h3></button>').join('') + '</div>' : '')
    + '<div class="tabs">' + tabs.map(t => '<button class="' + (S.lib.tab === t ? 'on' : '') + '" data-tab="' + t + '">' + t + '</button>').join('') + '</div>'
    + (S.lib.icon ? '<div class="ifilter"><div class="tile" style="' + tileStyle(S.lib.icon) + '">' + svgIcon(S.lib.icon) + '</div><span>' + S.lib.icon.replace('icecream', 'ice cream') + ' recipes</span><button id="ifx">✕</button></div>' : '')
    + (list.length ? list.map(r => '<div class="rw"><div class="acts"><button class="act" data-edit="' + r.id + '">Edit</button><button class="act del" data-del="' + r.id + '">Delete</button></div><button class="row" data-id="' + r.id + '">' + (sel ? '<div class="cb' + (sel.includes(r.id) ? ' on' : '') + '">' + (sel.includes(r.id) ? '✓' : '') + '</div>' : '') + '<div class="tile" style="' + tileStyle(r.icon) + '">' + svgIcon(r.icon) + '</div><div><h3>' + esc(r.title) + '</h3><p>' + esc([sourceLabel(r), r.time, r.servings ? 'serves ' + r.servings : ''].filter(Boolean).join(' · ')) + '</p></div>' + (r.rating ? '<div class="sc">' + r.rating + '</div>' : '') + '</button></div>').join('')
       : '<div class="empty"><b>' + (S.recipes.length ? 'Nothing here' : 'No recipes yet') + '</b>' + (S.recipes.length ? 'Try another tab or search.' : 'Tap Add to bring one in, or load the sample set from Settings.') + '</div>');
  const bs = v.querySelector('#btnSel'); if (bs) bs.onclick = () => { S.lib.sel = []; render(); };
  const sx = v.querySelector('#selX'); if (sx) sx.onclick = () => { S.lib.sel = null; render(); };
  const sd = v.querySelector('#selDel'); if (sd) sd.onclick = async () => { if (!sel.length) return; if (!confirm('Move ' + sel.length + ' recipe' + (sel.length === 1 ? '' : 's') + ' to the bin?')) return; for (const id of sel) { const r = S.recipes.find(x => x.id === id); if (r) { r.deleted = Date.now(); await saveRecipe(r); } } S.lib.sel = null; toast('Moved to bin'); render(); };
  v.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => go('edit', { id: b.dataset.edit }));
  v.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { const r = S.recipes.find(x => x.id === b.dataset.del); if (!r) return; if (!confirm('Move "' + r.title + '" to the bin?')) return; r.deleted = Date.now(); await saveRecipe(r); toast('Moved to bin'); render(); });
  if (!sel) v.querySelectorAll('.rw').forEach(initSwipe);
  const bsx = v.querySelector('#btnSearch'); if (bsx) bsx.onclick = () => { S.lib.showSearch = !S.lib.showSearch; if (!S.lib.showSearch) S.lib.q = ''; render(); if (S.lib.showSearch) { const i = $('#q'); i && i.focus(); } };
  const qi = v.querySelector('#q'); if (qi) { qi.oninput = () => { S.lib.q = qi.value; const pos = qi.selectionStart; render(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); }; v.querySelector('#qx').onclick = () => { S.lib.q = ''; S.lib.showSearch = false; render(); }; }
  v.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { S.lib.tab = b.dataset.tab; render(); });
  const ifx = v.querySelector('#ifx'); if (ifx) ifx.onclick = () => { S.lib.icon = null; render(); };
  v.querySelectorAll('[data-id]').forEach(b => b.onclick = () => { if (b.classList.contains('row') && b.parentNode.classList.contains('open')) { b.parentNode.classList.remove('open'); b.style.transform = ''; return; } if (sel) { const i = sel.indexOf(b.dataset.id); if (i >= 0) sel.splice(i, 1); else sel.push(b.dataset.id); render(); return; } go('recipe', { id: b.dataset.id }); });
  const car = v.querySelector('#car'); if (car) initWheel(car);
}
function initSwipe(wrap){
  const row = wrap.querySelector('.row'); let x0 = null, y0 = null, dx = 0, dragging = false, timer = null;
  row.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; dx = 0; dragging = false; row.style.transition = 'none'; timer = setTimeout(() => { if (!dragging && !S.lib.sel) { S.lib.sel = [row.dataset.id]; if (navigator.vibrate) navigator.vibrate(30); render(); } }, 550); });
  row.addEventListener('pointermove', e => { if (x0 == null) return; const mx = e.clientX - x0, my = e.clientY - y0; if (!dragging && Math.abs(mx) > 12 && Math.abs(mx) > Math.abs(my)) { dragging = true; row.setPointerCapture(e.pointerId); clearTimeout(timer); } if (Math.abs(my) > 12 && !dragging) { clearTimeout(timer); } if (!dragging) return; const open = wrap.classList.contains('open'); dx = Math.max(0, Math.min(150, (open ? 150 : 0) + mx)); row.style.transform = 'translateX(' + dx + 'px)'; });
  const end = () => { clearTimeout(timer); if (x0 == null) return; row.style.transition = 'transform .18s ease'; if (dragging) { const open = dx > 75; wrap.classList.toggle('open', open); row.style.transform = open ? 'translateX(150px)' : ''; row.dataset.swiped = '1'; setTimeout(() => { delete row.dataset.swiped; dragging = false; }, 60); } x0 = null; };
  row.addEventListener('pointerup', end); row.addEventListener('pointercancel', end);
  row.addEventListener('click', e => { if (row.dataset.swiped) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
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
  const ings = (r.ings||[]).map(i => i.group ? { text: i.name, amt:'', group:true } : displayIng(i, r, view.factor, view.yair, S.settings));
  const W = Math.max(320, v.clientWidth || window.innerWidth);
  const wrapPath = 'M0 0H' + W + 'V150C' + W + ' 150 ' + (W-28) + ' 152 ' + (W-36) + ' 176C' + (W-44) + ' 200 ' + (W-66) + ' 214 ' + (W-96) + ' 214C' + (W-128) + ' 214 ' + (W-156) + ' 208 ' + (W-178) + ' 208C' + (W-218) + ' 208 60 218 34 218C18 218 0 212 0 196Z';
  v.innerHTML = '<div class="rtop" style="' + tileStyle(r.icon) + '">'
    + '<svg class="wrap" viewBox="0 0 ' + W + ' 250" width="' + W + '" height="250" aria-hidden="true"><path fill="var(--tb)" d="' + wrapPath + '"/></svg>'
    + '<button class="rbtn b1" id="bk">‹</button><button class="rbtn b2" id="fav">' + ((r.tags||[]).includes('Favourite') ? '♥' : '♡') + '</button><button class="edit" id="ed">Edit</button>'
    + '<div class="photo">' + (r.photo ? '<img src="' + r.photo + '" alt="" style="' + photoStyle(r) + '" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'"><div class="ph" style="display:none">' + svgIcon(r.icon) + '</div>' : '<div class="ph">' + svgIcon(r.icon) + '</div>') + '</div>'
    + '<button class="tile badge" id="iconGo" aria-label="All ' + r.icon + ' recipes">' + svgIcon(r.icon) + '</button></div>'
    + '<div class="r"><h1>' + esc(r.title) + '</h1>'
    + '<div class="meta">' + [r.time, r.servings ? 'serves ' + r.servings : '', r.rating ? '<b>' + r.rating + '</b> / 10' : '', catLabel(r).toLowerCase(), (r.tags||[]).filter(t => t !== 'Favourite').join(', ').toLowerCase()].filter(Boolean).join(' · ') + '</div>'
    + (r.source ? '<a class="src" href="' + esc(r.source) + '" target="_blank" rel="noopener">' + esc(sourceLabel(r) || 'Source') + ' ↗</a>' : (r.sourceName ? '<div class="src" style="text-decoration:none">' + esc(r.sourceName) + '</div>' : ''))
    + '<div class="seg"><button class="' + (view.yair ? '' : 'on') + '" data-mode="orig">Original</button><button class="' + (view.yair ? 'on' : '') + '" data-mode="yair">Yair mode</button></div>'
    + '<div class="seg" style="margin-top:8px"><button class="' + (view.tab === 'ing' ? 'on' : '') + '" data-tab="ing">Ingredients</button><button class="' + (view.tab === 'steps' ? 'on' : '') + '" data-tab="steps">Method</button><button class="' + (view.tab === 'notes' ? 'on' : '') + '" data-tab="notes">Notes</button></div>'
    + (view.tab === 'ing' ? '<div class="serv"><span>' + (r.servings ? 'Portions' : 'Batch') + (Math.abs(view.factor - 1) > 0.001 ? ' · ' + (Math.round(view.factor*100)/100) + '× the recipe' : '') + '</span><span class="st">' + (r.servings ? '<button id="sm">−</button><button id="stv" class="stv">' + fmtQty(serv) + '</button><button id="sp">+</button>' : '<button id="sm">−</button><button id="stv" class="stv">' + fmtQty(view.factor) + '×</button><button id="sp">+</button>') + '</span></div>'
        + '<div class="ing">' + ings.map(i => i.group ? '<div class="grp" style="border:0;padding:12px 0 2px">' + esc(i.text) + '</div>' : '<div><span>' + esc(i.text) + (i.note ? '<small>' + i.note + '</small>' : '') + '</span><b>' + esc(i.amt) + '</b></div>').join('') + (ings.length ? '' : '<div class="empty">No ingredients yet — tap Edit.</div>') + '</div>' + nutritionBlock(r, view.factor) : '')
    + (view.tab === 'steps' ? '<div style="margin-top:8px">' + (r.steps||[]).map((s, i) => { const d = view.done[i]; const dur = (r.stepTimers && r.stepTimers[i] != null) ? r.stepTimers[i] : detectDuration(s); const run = S.timers.find(t => t.recipeId === r.id && t.step === i); return '<div class="step' + (d ? ' done' : '') + '"><i data-done="' + i + '">' + (d ? '✓' : i+1) + '</i><div class="txt">' + esc(convertTempsInText(s, view.yair && S.settings.tempC)) + (run ? '<br><button class="chip run" data-stop="' + run.id + '">▮▮ <b>' + fmtDur((run.end - Date.now())/1000) + '</b> · stop</button>' : dur ? '<br><button class="chip" data-timer="' + i + '" data-secs="' + dur + '">▷ ' + fmtDurShort(dur) + '</button>' : '') + '</div></div>'; }).join('') + ((r.steps||[]).length ? '' : '<div class="empty">No method yet — tap Edit.</div>') + '</div>' : '')
    + (view.tab === 'notes' ? (r.sourceNotes ? '<div class="lbl">From the source</div><div class="notes">' + esc(r.sourceNotes) + '</div>' : '') + '<div class="lbl">My notes</div><div class="notes">' + (r.notes ? esc(r.notes) : '<span style="color:var(--mute)">Nothing yet. Add notes from Edit — what you changed, what to try next time.</span>') + '</div>'
        + (r.oven || r.tin ? '<div class="lbl">Oven and tin</div><div class="notes">' + esc([r.oven ? convertTempsInText(r.oven, view.yair && S.settings.tempC) : '', r.tin].filter(Boolean).join(' · ')) + '</div>' : '')
        + '<div class="lbl">Rating</div><div class="rate">' + [1,2,3,4,5,6,7,8,9,10].map(n => '<button class="' + (r.rating === n ? 'on' : '') + '" data-rate="' + n + '">' + n + '</button>').join('') + '</div>'
        + '<div class="lbl">Source</div><div class="notes">' + (r.source ? '<a href="' + esc(r.source) + '" target="_blank" rel="noopener" style="word-break:break-all">' + esc(r.source) + '</a>' : esc(r.sourceName || 'Your own recipe')) + '</div>'
        + '<div style="margin-top:22px"><button class="pill danger" id="del">Delete recipe</button></div>' : '')
    + '<div style="height:24px"></div></div>';
  v.querySelector('#bk').onclick = back;
  v.querySelector('#iconGo').onclick = () => { S.lib.icon = r.icon; S.lib.tab = 'All'; S.lib.q = ''; S.hist = []; go('library', null, true); };
  v.querySelector('#ed').onclick = () => go('edit', { id });
  v.querySelector('#fav').onclick = async () => { r.tags = r.tags || []; const i = r.tags.indexOf('Favourite'); if (i >= 0) r.tags.splice(i, 1); else r.tags.push('Favourite'); await saveRecipe(r); render(); };
  v.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { view.yair = b.dataset.mode === 'yair'; render(); });
  v.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { view.tab = b.dataset.tab; render(); });
  const sm = v.querySelector('#sm'), sp = v.querySelector('#sp');
  if (sm) { const step = 0.5; sm.onclick = () => { view.factor = Math.max(step, Math.round((view.factor - step)*1000)/1000); render(); }; sp.onclick = () => { view.factor = Math.round((view.factor + step)*1000)/1000; render(); };
    const st = v.querySelector('#stv'); if (st) st.onclick = () => { const val = prompt(r.servings ? 'Servings' : 'Multiply by', r.servings ? serv : view.factor); const n = parseQty(val); if (n && n > 0) { view.factor = r.servings ? n/r.servings : n; render(); } }; }
  v.querySelectorAll('[data-done]').forEach(b => b.onclick = () => { const i = b.dataset.done; view.done[i] = !view.done[i]; render(); });
  v.querySelectorAll('[data-timer]').forEach(b => b.onclick = () => startTimer(r, Number(b.dataset.timer), Number(b.dataset.secs)));
  v.querySelectorAll('[data-stop]').forEach(b => b.onclick = () => stopTimer(b.dataset.stop));
  v.querySelectorAll('[data-rate]').forEach(b => b.onclick = async () => { r.rating = r.rating === Number(b.dataset.rate) ? null : Number(b.dataset.rate); await saveRecipe(r); render(); });
  const del = v.querySelector('#del'); if (del) del.onclick = async () => { if (!confirm('Delete "' + r.title + '"? It goes to the bin for 30 days.')) return; r.deleted = Date.now(); await saveRecipe(r); toast('Moved to bin'); go('library', null, true); };
}

function nutritionBlock(r, factor){
  const n = r.nutrition; if (!n || !Object.keys(n).length) return '';
  const keys = [['calories','kcal',''],['fat','Fat','g'],['saturates','Saturates','g'],['carbs','Carbs','g'],['sugars','Sugars','g'],['fibre','Fibre','g'],['protein','Protein','g']];
  const cells = keys.filter(k => n[k[0]] != null).map(k => '<div><small>' + k[1] + '</small><b>' + Math.round(n[k[0]]) + (k[2] ? ' ' + k[2] : '') + '</b></div>').join('');
  const batch = r.servings ? Math.round(r.servings*factor*10)/10 : null;
  const tot = batch ? keys.filter(k => n[k[0]] != null).map(k => '<div><small>' + k[1] + '</small><b>' + Math.round(n[k[0]]*batch) + (k[2] ? ' ' + k[2] : '') + '</b></div>').join('') : '';
  return '<div class="lbl" style="margin-top:18px">Per serving' + (n.per ? ' · ' + esc(n.per) : '') + '</div><div class="nut">' + cells + '</div>' + (tot ? '<div class="lbl">Whole batch · ' + fmtQty(batch) + ' servings' + (Math.abs(factor - 1) > 0.001 ? ' · ' + (Math.round(factor*100)/100) + '×' : '') + '</div><div class="nut">' + tot + '</div>' : '') + '<div style="font-size:11px;color:var(--mute);margin-top:6px">Source figures for the recipe as published; they scale with servings but don\'t recalculate if you change the ingredients.</div>';
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
  const cur = S.route.name === 'recipe' ? S.route.id : null;
  const full = S.timers.filter(t => t.recipeId === cur), chips = S.timers.filter(t => t.recipeId !== cur);
  const row = t => { const left = (t.end - Date.now())/1000; return '<button class="tm' + (left <= 0 ? ' over' : '') + '" style="' + tileStyle(t.icon) + '" data-open="' + t.recipeId + '" data-tid="' + t.id + '"><div class="tile">' + svgIcon(t.icon) + '</div><div class="what">' + esc(t.title) + '<small>Step ' + (t.step+1) + (t.label ? ' · ' + esc(t.label) : '') + '</small></div><b>' + (left <= 0 ? 'Done' : fmtDur(left)) + '</b><span class="x" data-x="' + t.id + '">✕</span></button>'; };
  const chip = t => { const left = (t.end - Date.now())/1000; return '<button class="tc' + (left <= 0 ? ' over' : '') + '" style="' + tileStyle(t.icon) + '" data-open="' + t.recipeId + '" data-tid="' + t.id + '"><div class="tile">' + svgIcon(t.icon) + '</div><b>' + (left <= 0 ? 'Done' : fmtDur(left)) + '</b></button>'; };
  p.innerHTML = (chips.length ? '<div class="tcs">' + chips.map(chip).join('') + '</div>' : '') + full.map(row).join('');
  p.querySelectorAll('[data-open]').forEach(b => b.onclick = e => { if (e.target.dataset.x) { stopTimer(e.target.dataset.x); return; } const t = S.timers.find(x => x.id === b.dataset.tid); if (b.classList.contains('tc') || (t && t.end <= Date.now() && !b.classList.contains('tc'))) { if (t && t.end <= Date.now() && b.classList.contains('tm')) { stopTimer(t.id); return; } } view.id = null; go('recipe', { id: b.dataset.open }); view.tab = 'steps'; render(); });
}
function tick(){
  if (!S.timers.length) return;
  let changed = false;
  S.timers.forEach(t => { if (!t.fired && t.end <= Date.now()) { t.fired = true; changed = true; beep(); notify(t); } });
  if (changed) saveTimers();
  if (changed) renderPin();
  document.querySelectorAll('.tc,.tm').forEach(b => { const t = S.timers.find(x => x.id === b.dataset.tid); const bb = b.querySelector('b'); if (t && bb) { bb.textContent = t.end > Date.now() ? fmtDur((t.end - Date.now())/1000) : 'Done'; b.classList.toggle('over', t.end <= Date.now()); } });
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
    if (b.dataset.add === 'link') body.innerHTML = '<div class="lbl">Link</div><input class="fld" id="addUrl" placeholder="https://…" inputmode="url"><div style="margin-top:12px"><button class="primary" id="addGo">Fetch recipe</button></div><div id="addStatus" style="font-size:12px;color:var(--mute);margin-top:8px"></div><details style="margin-top:12px;font-size:12px;color:var(--mute)"><summary>Or paste the recipe text as well</summary><textarea class="fld" id="addText" style="margin-top:8px" placeholder="Title\n\nIngredients\n500 g bread flour\n…\n\nMethod\n1. …"></textarea></details>';
    else body.innerHTML = '<div class="lbl">Recipe text</div><textarea class="fld" id="addText" style="min-height:160px" placeholder="Title on the first line, then ingredients (one per line), then the method. Headings like Ingredients / Method help but aren\'t needed."></textarea><div style="margin-top:12px"><button class="primary" id="addGo">Continue</button></div>';
    body.querySelector('#addGo').onclick = async () => {
      const url = ((body.querySelector('#addUrl') || {}).value || '').trim();
      const text = body.querySelector('#addText').value || '';
      const status = body.querySelector('#addStatus');
      let draft = null;
      if (url && !text.trim()) {
        const btn = body.querySelector('#addGo'); btn.textContent = 'Fetching…'; btn.disabled = true;
        try { draft = await importFromUrl(url, msg => { if (status) status.textContent = msg; }); }
        catch(e) { draft = null; }
        btn.textContent = 'Fetch recipe'; btn.disabled = false;
        if (!draft) { if (status) status.textContent = 'Couldn\'t read that page automatically. Paste the recipe text below and continue.'; body.querySelector('details').open = true; return; }
      } else {
        const parsed = parseText(text);
        draft = newRecipe({ title: parsed.title || (url ? hostOf(url) : ''), source: url || parsed.source, ings: parsed.ings, steps: parsed.steps, notes: parsed.notes });
      }
      closeSheet(); go('edit', { id: null, draft });
      if (draft.photo && /^https?:/.test(draft.photo)) cachePhoto(draft);
    };
    setTimeout(() => { const f = body.querySelector('input,textarea'); f && f.focus(); }, 50);
  });
}
/* ---------- URL import: proxies → JSON-LD → text fallback ---------- */
const PROXIES = [
  { u: u => 'https://api.allorigins.win/get?url=' + encodeURIComponent(u), json:'contents' },
  { u: u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u) },
  { u: u => 'https://corsproxy.io/?url=' + encodeURIComponent(u) },
  { u: u => 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u) },
  { u: u => 'https://r.jina.ai/' + u, headers: { 'X-Return-Format': 'html' } }
];
async function fetchVia(url, asText){
  let lastErr;
  if (url.startsWith(location.origin)) { const res = await fetch(url); return asText ? await res.text() : await res.blob(); }
  for (const p of PROXIES) {
    if (!asText && p.json) continue;
    try { const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000); const res = await fetch(p.u(url), { signal: ctl.signal, headers: p.headers || {} }); clearTimeout(t); if (!res.ok) throw new Error(res.status);
      if (!asText) return await res.blob();
      let txt = await res.text(); if (p.json) { try { txt = JSON.parse(txt)[p.json] || ''; } catch(e) { txt = ''; } }
      if (txt && txt.length > 500) return txt; throw new Error('empty'); } catch(e) { lastErr = e; }
  }
  throw lastErr || new Error('fetch failed');
}
function mdImages(md){ const out = []; const rx = /!\[[^\]]*\]\((https?:[^)\s]+)/g; let m; while ((m = rx.exec(md))) { const u = m[1]; if (/\.svg|logo|icon|avatar|gravatar|placeholder|pinterest|button|badge|emoji|1x1|spacer/i.test(u)) continue; if (!out.includes(u)) out.push(u); } return out; }
function isoDur(d){ if (!d || typeof d !== 'string') return ''; const m = d.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/i); if (!m) return ''; const h = (Number(m[1]||0)*24) + Number(m[2]||0), mi = Number(m[3]||0); return h ? h + ' h' + (mi ? ' ' + mi : '') : mi ? mi + ' min' : ''; }
function findRecipeLD(node){ if (!node) return null; if (Array.isArray(node)) { for (const n of node) { const r = findRecipeLD(n); if (r) return r; } return null; } if (typeof node !== 'object') return null; const t = node['@type']; if (t && (t === 'Recipe' || (Array.isArray(t) && t.includes('Recipe')))) return node; if (node['@graph']) return findRecipeLD(node['@graph']); if (node.mainEntity) return findRecipeLD(node.mainEntity); return null; }
function ldText(x){ if (!x) return ''; if (typeof x === 'string') return x; if (Array.isArray(x)) return x.map(ldText).join(' '); return x.text || x.name || ''; }
function ldSteps(ins){ const out = []; const walk = n => { if (!n) return; if (typeof n === 'string') { n.split(/\n+/).forEach(s => s.trim() && out.push(s.trim())); return; } if (Array.isArray(n)) { n.forEach(walk); return; } if (n['@type'] === 'HowToSection' && n.itemListElement) { walk(n.itemListElement); return; } if (n.text) out.push(String(n.text).trim()); else if (n.itemListElement) walk(n.itemListElement); }; walk(ins); return out.map(s => cleanLine(s.replace(/<[^>]+>/g, ''))).filter(Boolean); }
function ldImage(x){ if (!x) return []; if (typeof x === 'string') return [x]; if (Array.isArray(x)) return x.flatMap(ldImage); if (x.url) return [x.url]; if (x.contentUrl) return [x.contentUrl]; return []; }
function ldNutrition(n){ if (!n || typeof n !== 'object') return null; const num = v => { if (v == null) return null; const m = String(v).match(/[\d.]+/); return m ? Number(m[0]) : null; }; const out = { calories: num(n.calories), fat: num(n.fatContent), saturates: num(n.saturatedFatContent), carbs: num(n.carbohydrateContent), sugars: num(n.sugarContent), fibre: num(n.fiberContent), protein: num(n.proteinContent), per: n.servingSize ? String(n.servingSize) : '' }; Object.keys(out).forEach(k => (out[k] == null || out[k] === '') && delete out[k]); return Object.keys(out).filter(k => k !== 'per').length ? out : null; }
function yieldNum(y){ if (!y) return null; const m = ldText(Array.isArray(y) ? y[0] : y).match(/\d+(?:[.,]\d+)?/); return m ? parseFloat(m[0].replace(',', '.')) : null; }
async function importFromUrl(url, onStatus){
  onStatus && onStatus('Reading the page…');
  let html = null;
  try { html = await fetchVia(url, true); } catch(e) { html = null; }
  let draft = null;
  if (html && /<html|<body|<script/i.test(html)) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    let ld = null;
    doc.querySelectorAll('script[type="application/ld+json"]').forEach(sc => { if (ld) return; try { ld = findRecipeLD(JSON.parse(sc.textContent)); } catch(e) {} });
    const og = doc.querySelector('meta[property="og:image"]'); const ogImg = og ? og.getAttribute('content') : null;
    const site = doc.querySelector('meta[property="og:site_name"]'); const siteName = site ? site.getAttribute('content') : '';
    const bodyImgs = [].slice.call(doc.querySelectorAll('article img, .wprm-recipe img, .entry-content img, main img')).map(i => i.getAttribute('data-lazy-src') || i.getAttribute('data-src') || i.getAttribute('src') || '').filter(u => /^https?:/.test(u) && !/logo|icon|avatar|gravatar|placeholder|\.svg|pinterest|button|badge/i.test(u));
    let notes = '';
    const notesEl = doc.querySelector('.wprm-recipe-notes, .tasty-recipes-notes, .mv-create-notes, .recipe-notes, [class*="recipe-notes"], [class*="recipe__notes"]');
    if (notesEl) notes = notesEl.textContent.replace(/\s*\n\s*/g, '\n').replace(/^\s*notes?\s*/i, '').trim();
    if (!notes) { const heads = [].slice.call(doc.querySelectorAll('h2,h3,h4,p,div,span')).filter(h => /^\s*notes?\s*$/i.test(h.textContent) && h.children.length === 0); if (heads.length) { let n = heads[0].nextElementSibling; const parts = []; let guard = 0; while (n && guard++ < 6 && !/^H[1-4]$/.test(n.tagName) && !/nutrition|share/i.test(n.textContent.slice(0, 30))) { parts.push(n.textContent.trim()); n = n.nextElementSibling; } notes = parts.filter(Boolean).join('\n'); } }
    if (ld) {
      const ings = (ld.recipeIngredient || ld.ingredients || []).map(x => parseIngLine(ldText(x).replace(/<[^>]+>/g, '')));
      const steps = ldSteps(ld.recipeInstructions);
      const imgs = [...ldImage(ld.image), ogImg, ...bodyImgs].filter(Boolean);
      const uniq = imgs.filter((u, i) => imgs.indexOf(u) === i);
      const kw = (ldText(ld.keywords) + ' ' + ldText(ld.recipeCategory) + ' ' + ldText(ld.recipeCuisine)).toLowerCase();
      const cats = CATEGORIES.filter(c => kw.includes(c.toLowerCase().replace(/s$/, '')));
      const tags = CUISINES.filter(c => kw.includes(c.toLowerCase()));
      draft = newRecipe({ title: cleanLine(ldText(ld.name)).replace(/\s+[-|–]\s+[^-|–]+$/, ''), source: url, sourceName: siteName || (ld.author ? ldText(ld.author) : hostOf(url)), ings, steps, notes:'', sourceNotes: notes, servings: yieldNum(ld.recipeYield), time: isoDur(ld.totalTime) || [isoDur(ld.prepTime), isoDur(ld.cookTime)].filter(Boolean).join(' + '), nutrition: ldNutrition(ld.nutrition), photo: uniq[0] || null, photoSrc: uniq[0] || null, sourceImages: uniq.slice(0, 8), cats, tags });
    } else {
      const title = (doc.querySelector('meta[property="og:title"]') || {}).content || doc.title || '';
      doc.querySelectorAll('nav, header, footer, script, style, noscript, .comments, #comments, .sidebar, aside').forEach(e => e.remove());
      const root = doc.querySelector('.wprm-recipe, .tasty-recipes, .mv-create-card, [class*="recipe-card"], article, main') || doc.body;
      const text = root ? [].slice.call(root.querySelectorAll('h1,h2,h3,h4,li,p,div,span')).filter(e => e.children.length === 0 || /^(LI|P|H[1-4])$/.test(e.tagName)).map(e => e.textContent.trim()).filter(Boolean).join('\n') : '';
      const parsed = parseText(text);
      if (parsed.ings.length || parsed.steps.length) draft = newRecipe({ title: cleanLine(title).replace(/\s+[-|–]\s+[^-|–]+$/, ''), source: url, sourceName: siteName || hostOf(url), ings: parsed.ings, steps: parsed.steps, sourceNotes: parsed.notes, photo: ogImg, photoSrc: ogImg, sourceImages: [ogImg, ...bodyImgs].filter(Boolean).slice(0, 8) });
    }
  }
  if (!draft) {
    onStatus && onStatus('Trying a text reader…');
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20000);
      const md = await (await fetch('https://r.jina.ai/' + url, { signal: ctl.signal, headers: { 'X-Return-Format': 'markdown' } })).text(); clearTimeout(t);
      const parsed = parseText(md);
      const imgs = mdImages(md);
      if (parsed.ings.length) draft = newRecipe({ title: parsed.title, source: url, sourceName: hostOf(url), ings: parsed.ings, steps: parsed.steps, sourceNotes: parsed.notes, photo: imgs[0] || null, photoSrc: imgs[0] || null, sourceImages: imgs.slice(0, 8) });
    } catch(e) {}
  }
  if (draft) { if (!draft.title) draft.title = hostOf(url); draft.icon = guessIcon(draft.title, draft.cats); onStatus && onStatus('Got it.'); }
  return draft;
}
async function cachePhoto(r){
  if (!r.photo || !/^https?:/.test(r.photo)) return;
  try { const blob = await fetchVia(r.photo, false); if (!blob || !/^image\//.test(blob.type)) return; const data = await shrinkImage(blob, 900); if (r.photoSrc === r.photo || /^https?:/.test(r.photo)) { r.photo = data; if (S.recipes.find(x => x.id === r.id)) await saveRecipe(r); } } catch(e) {}
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
    + '<div class="cropctl"><input type="range" id="zoom" min="1" max="3" step="0.02" value="' + (r.crop.s||1) + '"' + (r.photo ? '' : ' disabled') + '><label class="pill ghost" style="cursor:pointer">My photo<input type="file" id="fPhoto" accept="image/*" style="display:none"></label>' + (r.photo ? '<button class="pill ghost" id="rmPhoto">Remove</button>' : '') + '</div>'
    + ((r.sourceImages||[]).length ? '<div class="lbl">From the recipe page</div><div class="thumbs">' + r.sourceImages.slice(0, 8).map((u, i) => '<button class="thumb' + (r.photo === u || r.photoSrc === u ? ' sel' : '') + '" data-src="' + i + '"><img src="' + esc(u) + '" alt="" loading="lazy"></button>').join('') + '</div>' : '')
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
    + (orig ? '<div style="margin-top:22px"><button class="pill danger" id="delEdit">Delete recipe</button></div>' : '') + '<div style="height:30px"></div></div>';
  const de = v.querySelector('#delEdit'); if (de) de.onclick = async () => { if (!confirm('Move "' + orig.title + '" to the bin?')) return; orig.deleted = Date.now(); await saveRecipe(orig); toast('Moved to bin'); S.hist = S.hist.filter(h => h.name !== 'edit' && h.name !== 'recipe'); go('library', null, true); };
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
  const rm = v.querySelector('#rmPhoto'); if (rm) rm.onclick = () => { r.photo = null; r.photoSrc = null; renderEdit(v, id, r); };
  v.querySelectorAll('[data-src]').forEach(b => b.onclick = async () => { const u = r.sourceImages[Number(b.dataset.src)]; r.photo = u; r.photoSrc = u; r.crop = { x:0, y:0, s:1 }; renderEdit(v, id, r); cachePhoto(r).then(() => { if (S.route.name === 'edit' && S.route.draft === r) { const im = $('#cropImg'); if (im && r.photo) im.src = r.photo; } }); });
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
  ['Baking and dry',['flour','sugar','yeast','baking','bicarbonate','cocoa','cacao','chocolate','vanilla','oats','cornflour','cornstarch','salt','syrup','honey','nuts','almond','cashew','walnut','pecan','pistachio','hazelnut','seed','date','raisin','coconut','rice','pasta','noodle','lentil','chickpea','bean','quinoa','couscous','bulgur','polenta','semolina','breadcrumb','panko','stock','bouillon','spice','flakes','dried','ground','cumin','paprika','turmeric','cinnamon','oregano','curry','pepper','oil','vinegar','soy','tamari','miso','tahini','peanut butter','maple','agave','extract','chia','flax']],
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
      if (!(ing.name||'').trim() || ing.group || /^(water|tap water|ice)\b/.test(normName(ing.name))) continue;
      const jm = (ing.name||'').toLowerCase().match(/\b(lemon|lime|orange)s?\b/);
      if (jm && /juice|zest/.test(ing.name.toLowerCase()) && ing.qty != null) {
        const fruit = jm[1]; const per = fruit === 'lemon' ? 45 : fruit === 'lime' ? 30 : 80; const u = ing.unit;
        const ml = u === 'tbsp' ? ing.qty*15 : u === 'tsp' ? ing.qty*5 : u === 'cup' ? ing.qty*240 : u === 'ml' ? ing.qty : u === '' ? ing.qty*per : null;
        const count = ml == null ? ing.qty*cfg.mult : Math.max(0.5, Math.ceil(ml*cfg.mult/per*2)/2);
        const k = fruit + 's|fruit'; if (!merged[k]) merged[k] = { name: fruit + 's', key:k, g:0, ml:0, other:0, unit:'', from:[], text:[], fruit:true };
        merged[k].other += count; if (!merged[k].from.includes(r.title)) merged[k].from.push(r.title); continue;
      }
      const d = displayIng(ing, r, cfg.mult, cfg.yair, S.settings);
      // canonicalise to grams / ml where we can, otherwise keep the display amount
      let key = normName(ing.name), base = null, unit = ing.unit || '';
      const q = ing.qty != null ? ing.qty * cfg.mult : null;
      const nm = ing.name.toLowerCase();
      const liquid = /milk|cream|water|oil|juice|vinegar|stock|broth|sauce|syrup|wine|beer|aquafaba|coffee|tea\b|brine|liquid/.test(nm);
      const dens = densityFor(ing.name);
      const small = (unit === 'tsp' || unit === 'tbsp') && (unit === 'tbsp' ? ing.qty : ing.qty/3) < 1 && dens.est;
      if (q != null) {
        if (unit === 'g' || unit === 'kg') base = { g: unit === 'g' ? q : q*1000 };
        else if (unit === 'oz' || unit === 'lb') base = { g: q * (unit === 'oz' ? 28.35 : 453.6) };
        else if (unit === 'ml' || unit === 'l') base = { g: unit === 'ml' ? q : q*1000, liquid:true };
        else if (CUPS[unit] !== undefined && !small && (liquid || !dens.est || unit === 'cup')) base = { g: q * CUPS[unit] * (liquid && dens.est ? 240 : dens.g), liquid };
        else base = { other: q, unit };
      }
      const k = key + '|' + (base ? (base.g != null ? 'g' : 'o:' + base.unit) : 'x');
      if (!merged[k]) merged[k] = { name: ing.name, key: k, g:0, ml:0, other:0, unit, from:[], text:[], liquid: !!(base && base.liquid) || liquid };
      const m = merged[k];
      if (base) { if (base.g != null) m.g += base.g; else m.other += base.other; } else m.text.push(d.amt);
      if (!m.from.includes(r.title)) m.from.push(r.title);
    }
  }
  const items = Object.values(merged).map(m => {
    let amt = '';
    if (m.g) amt = m.liquid ? (m.g >= 1000 ? (Math.round(m.g/10)/100) + ' l' : Math.round(m.g) + ' ml') : fmtGrams(roundGrams(m.g, true));
    else if (m.other) amt = m.fruit ? fmtQty(Math.ceil(m.other*2)/2) : fmtQty(Math.round(m.other*4)/4) + (m.unit ? ' ' + m.unit + (m.unit === 'cup' && m.other > 1 ? 's' : '') : '');
    else amt = m.text.filter(Boolean).join(' + ');
    return { id: m.key, name: m.name.replace(/^./, c => c.toUpperCase()), amt, aisle: aisleFor(m.name), from: m.from, done: !!(S.shopping.done||{})[m.key] };
  });
  items.sort((a,b) => a.aisle.localeCompare(b.aisle) || a.name.localeCompare(b.name));
  return items;
}
function renderShopping(v){
  S.shopping = S.shopping || { sel:{}, done:{}, stage:'pick' };
  const sel = S.shopping.sel;
  let pruned = false; for (const id of Object.keys(sel)) { const rr = S.recipes.find(x => x.id === id); if (!rr || rr.deleted) { delete sel[id]; pruned = true; } } if (pruned) saveShopping();
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
    + (recipes.length ? recipes.map(r => { const c = sel[r.id]; return '<div class="pick"><button class="cb' + (c ? ' on' : '') + '" data-sel="' + r.id + '">' + (c ? '✓' : '') + '</button><div class="tile" style="' + tileStyle(r.icon) + '">' + svgIcon(r.icon) + '</div><div><h3>' + esc(r.title) + '</h3><small>' + (c ? (c.yair ? 'Yair mode' : 'Original') + (r.servings ? ' · serves ' + Math.round(r.servings*c.mult*10)/10 : '') : (r.servings ? 'serves ' + r.servings : '')) + '</small></div>' + (c ? '<div class="mult"><button data-m="' + r.id + '" data-d="-1">−</button><button data-mi="' + r.id + '" style="font-size:12px;font-weight:700;min-width:34px;padding:4px 2px;border-radius:8px;border:1px solid var(--line)">' + c.mult + '×</button><button data-m="' + r.id + '" data-d="1">+</button></div>' : '') + '</div>'; }).join('') : '<div class="empty">No recipes with ingredients yet.</div>')
    + '</div><div class="foot"><button class="primary" id="build"' + (Object.keys(sel).length ? '' : ' disabled style="opacity:.5"') + '>Build list' + (Object.keys(sel).length ? ' · ' + Object.keys(sel).length : '') + '</button></div>';
  v.querySelectorAll('[data-sel]').forEach(b => b.onclick = () => { const id = b.dataset.sel; if (sel[id]) delete sel[id]; else sel[id] = { mult:1, yair: S.settings.openInYair }; saveShopping(); render(); });
  v.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const c = sel[b.dataset.m]; c.mult = Math.max(0.5, Math.round((c.mult + Number(b.dataset.d)*0.5)*100)/100); saveShopping(); render(); });
  v.querySelectorAll('[data-mi]').forEach(b => b.onclick = () => { const c = sel[b.dataset.mi]; const val = prompt('Multiply this recipe by', c.mult); const n = parseQty(val); if (n && n > 0) { c.mult = Math.round(n*100)/100; saveShopping(); render(); } });
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
    + '<div class="sec">Import</div>'
    + '<div class="srow"><div>From Google Keep<small>The .md export of your Keep notes — links, typed recipes and screenshots</small></div><label class="pill ghost" style="cursor:pointer">Choose file<input type="file" id="impKeep" accept=".md,text/markdown,text/plain" style="display:none"></label></div>'
    + '<div class="srow"><div>From Instagram<small>saved_posts.json from your Instagram download</small></div><label class="pill ghost" style="cursor:pointer">Choose file<input type="file" id="impIg" accept=".json,application/json" style="display:none"></label></div>'
    + '<div class="sec">Data</div>'
    + '<div class="srow"><div>Load sample recipes<small>A handful to try the app with</small></div><button class="pill ghost" id="sample">Load</button></div>'
    + '<div class="srow"><div>Storage<small id="quota">…</small></div><button class="pill ghost" id="persist">Protect</button></div>'
    + '<div style="height:20px"></div></div>';
  v.querySelectorAll('[data-set]').forEach(b => b.onclick = async () => { let val = b.dataset.val; if (val === 'true') val = true; if (val === 'false') val = false; s[b.dataset.set] = val; await saveSettings(); render(); });
  v.querySelectorAll('[data-sw]').forEach(b => b.onclick = async () => { s[b.dataset.sw] = !s[b.dataset.sw]; await saveSettings(); render(); });
  v.querySelector('#bk').onclick = exportBackup;
  v.querySelector('#imp').onchange = e => importBackup(e.target.files[0]);
  v.querySelector('#impKeep').onchange = async e => { const f = e.target.files[0]; if (!f) return; const items = parseKeep(await f.text()); if (!items.length) { toast('No notes found in that file'); return; } S.imp = { kind:'keep', items, running:false, done:0, log:[] }; go('import'); };
  v.querySelector('#impIg').onchange = async e => { const f = e.target.files[0]; if (!f) return; let items = []; try { items = parseInstagram(JSON.parse(await f.text())); } catch(err) { toast('That file could not be read'); return; } if (!items.length) { toast('No recipe-like posts found'); return; } S.imp = { kind:'ig', items, running:false, done:0, log:[] }; go('import'); };
  v.querySelector('#sample').onclick = async () => { if (!confirm('Reload the sample recipes? Existing samples are replaced.')) return; await purgeSamples(); await loadSamples(); toast('Sample recipes reloaded'); go('library', null, true); };
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

/* ---------- bulk import: Keep and Instagram ---------- */
function unmojibake(str){ try { if (/[\u00c2-\u00f4][\u0080-\u00bf]/.test(str)) return decodeURIComponent(escape(str)); } catch(e) {} return str; }
function parseKeep(md){
  const defs = {}; md.replace(/^\[(image\d+)\]:\s*<(data:image\/[^>]+)>/gm, (m, k, d) => { defs[k] = d; return ''; });
  const blocks = md.split(/^# /m).slice(1);
  const items = [];
  for (const b of blocks) {
    const lines = b.split(/\r?\n/);
    const title = cleanLine(lines[0].replace(/\\([-#*])/g, '$1')).replace(/\s+[-|–]\s+[^-|–]+$/, '').trim();
    const rest = lines.slice(1).join('\n').replace(/\\([-#*_])/g, '$1');
    const link = (rest.match(/\((https?:\/\/[^)\s]+)\)/) || rest.match(/(https?:\/\/\S+)/) || [])[1] || '';
    const imgs = []; rest.replace(/!\[\]\[(image\d+)\]/g, (m, k) => { if (defs[k]) imgs.push(defs[k]); return ''; });
    const text = rest.replace(/\[https?:[^\]]*\]\([^)]*\)/g, '').replace(/!\[\]\[image\d+\]/g, '').replace(/https?:\/\/\S+/g, '').trim();
    const lo = text.toLowerCase();
    const typed = /\d+\s*(g|ml|tsp|tbsp|cup|cups|grams?|oz)\b/i.test(text) && text.split('\n').filter(Boolean).length >= 3;
    const kind = link ? 'link' : (typed ? 'typed' : imgs.length ? 'screenshot' : 'note');
    const ex = items.find(i => link && i.link === link);
    if (ex) { if (text && !ex.text.includes(text)) ex.text += (ex.text ? '\n' : '') + text; ex.photos.push(...imgs); continue; }
    if (!title) continue;
    items.push({ title, link, text, photos: imgs, kind, on: kind !== 'note' || !!text, totry: /\btry\b/i.test(lo) && lo.length < 40, screenshotTitle: /^screenshot/i.test(title) });
  }
  return items;
}
function parseInstagram(json){
  const posts = Array.isArray(json) ? json : (json.saved_saved_media || json.saved_posts || []);
  const items = [];
  for (const p of posts) {
    const lv = p.label_values || []; const d = {}; lv.forEach(x => { if (x.label) d[x.label] = x.value || x.href || ''; });
    let cap = unmojibake(d.Caption || '').replace(/\uFFFD/g, ''); const url = d.URL || '';
    if (!cap.trim()) continue;
    const q = (cap.match(/\d+\s*(g|ml|tsp|tbsp|cup|cups|grams?|oz|cloves?)\b/gi) || []).length;
    const recipeish = q >= 3 || (/ingredients/i.test(cap) && q >= 1);
    const title = cleanLine(cap.split(/\r?\n/)[0]).replace(/[#@][\w.]+/g, '').replace(/[🍜🍪🍰🍫🥞🥗🍛✨🌱🫐🥜🍦🧈🍡🍣🥟🇻🇳🇯🇵🌯🍽️🔥👇🏻✍️🫰🏻😋🤯💪❤️]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80) || 'Instagram recipe';
    items.push({ title, link: url, text: cap, photos: [], kind: 'ig', on: recipeish, recipeish, when: p.timestamp });
  }
  items.sort((a, b) => (b.recipeish - a.recipeish) || (b.when - a.when));
  return items;
}
function renderImport(v){
  const I = S.imp; if (!I) { go('settings', null, true); return; }
  const total = I.items.filter(i => i.on).length;
  const kindLabel = { link:'link', typed:'typed recipe', screenshot:'screenshot', note:'note only', ig:'caption' };
  v.innerHTML = '<div class="hd"><button class="rbtn" id="bk">‹</button><h1>' + (I.kind === 'keep' ? 'Import from Keep' : 'Import from Instagram') + '</h1>' + (I.running ? '<button class="pill danger" id="stop">Stop</button>' : '<button class="pill" id="run"' + (total ? '' : ' disabled') + '>Import ' + total + '</button>') + '</div><div class="p">'
    + (I.running || I.done ? '<div class="prog"><div style="width:' + Math.round(100*I.done/Math.max(1,total)) + '%"></div></div><div class="lbl">' + I.done + ' of ' + total + (I.running ? ' · ' + esc(I.current || '') : ' · done') + '</div>' + (I.log.length ? '<div class="notes" style="font-size:12px;max-height:120px;overflow:auto">' + I.log.slice(-8).map(esc).join('<br>') + '</div>' : '') : '<div class="lbl">' + I.items.length + ' found · tap to untick anything you don\'t want. ' + (I.kind === 'keep' ? 'Links are fetched one by one; typed notes and screenshots are added as they are.' : 'Only captions that look like recipes are ticked. No photos come from Instagram.') + '</div>')
    + (!I.running ? '<div style="display:flex;gap:8px;margin:8px 0"><button class="pill ghost" id="all">All</button><button class="pill ghost" id="none">None</button></div>' : '')
    + I.items.map((it, k) => '<button class="pick' + (it.status ? ' ' + it.status : '') + '" data-k="' + k + '"><div class="cb' + (it.on ? ' on' : '') + '">' + (it.on ? '✓' : '') + '</div><div><h3>' + esc(it.title) + '</h3><small>' + (it.status === 'ok' ? 'imported' : it.status === 'fail' ? 'saved with link only — fetch failed' : kindLabel[it.kind]) + (it.link && it.kind === 'link' ? ' · ' + esc(hostOf(it.link)) : '') + (it.photos.length ? ' · ' + it.photos.length + ' image' + (it.photos.length > 1 ? 's' : '') : '') + '</small></div></button>').join('')
    + '<div style="height:20px"></div></div>';
  v.querySelector('#bk').onclick = () => { if (I.running && !confirm('Stop the import? What has been imported so far stays.')) return; I.running = false; go('settings', null, true); };
  v.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { if (I.running) return; const it = I.items[Number(b.dataset.k)]; if (it.status === 'ok') return; it.on = !it.on; render(); });
  const all = v.querySelector('#all'); if (all) { all.onclick = () => { I.items.forEach(i => { if (i.status !== 'ok') i.on = true; }); render(); }; v.querySelector('#none').onclick = () => { I.items.forEach(i => i.on = false); render(); }; }
  const run = v.querySelector('#run'); if (run) run.onclick = () => runImport();
  const stop = v.querySelector('#stop'); if (stop) stop.onclick = () => { I.running = false; render(); };
}
async function runImport(){
  const I = S.imp; I.running = true; I.done = 0; I.log = [];
  keepAwake();
  for (const it of I.items) {
    if (!I.running) break;
    if (!it.on || it.status === 'ok') continue;
    I.current = it.title; render();
    let r = null;
    try {
      if (it.kind === 'link') {
        try { r = await importFromUrl(it.link); } catch(e) { r = null; }
        if (r) { it.status = 'ok'; } else { it.status = 'fail'; r = newRecipe({ title: it.title, source: it.link, sourceName: hostOf(it.link), tags: ['Needs details'] }); }
        if (it.text) { const parsed = parseText(it.text); if (parsed.ings.length && !(r.ings||[]).length) { r.ings = parsed.ings; r.steps = r.steps.length ? r.steps : parsed.steps; } r.notes = it.text; }
      } else if (it.kind === 'typed' || it.kind === 'ig') {
        const parsed = parseText(it.text);
        r = newRecipe({ title: it.title, source: it.link, sourceName: it.kind === 'ig' ? 'Instagram' : '', ings: parsed.ings, steps: parsed.steps, sourceNotes: parsed.notes, tags: it.kind === 'ig' ? ['Instagram'] : [] });
        if (!parsed.title && it.kind === 'typed') r.title = it.title;
        it.status = 'ok';
      } else {
        r = newRecipe({ title: it.title, notes: it.text, tags: it.kind === 'screenshot' ? ['Needs details'] : [] });
        it.status = 'ok';
      }
      if (it.photos && it.photos.length) { r.photo = it.photos[0]; r.sourceImages = it.photos.slice(0, 8); r.photoSrc = null; }
      if (it.totry) { r.tags = r.tags || []; if (!r.tags.includes('To try')) r.tags.push('To try'); }
      if (!r.icon || !r.iconManual) r.icon = guessIcon(r.title, r.cats);
      await saveRecipe(r);
      I.log.push((it.status === 'ok' ? '✓ ' : '· ') + r.title);
      if (r.photo && /^https?:/.test(r.photo)) cachePhoto(r);
    } catch(e) { it.status = 'fail'; I.log.push('✕ ' + it.title); }
    I.done++;
    render();
    if (it.kind === 'link') await new Promise(res => setTimeout(res, 700));
  }
  I.running = false; I.current = ''; render();
  toast('Import finished');
}

/* ---------- samples ---------- */
const OLD_SAMPLE_TITLES = ['Big bubble no-knead focaccia','Vegan burnt Basque cheesecake',"Xi'an biang biang noodles","Xi'an biang biang noodles — my version",'Mango banana ice cream','Pumpkin seed butter','Marry me tofu','Eggless pistachio cookies','No knead focaccia','Chilli garlic soy mince udon','5 simple ingredient chocolate truffle balls'];
async function purgeSamples(){
  for (const r of S.recipes.slice()) { if (r.sample || OLD_SAMPLE_TITLES.some(t => t.toLowerCase() === (r.title||'').toLowerCase())) { await store.delRecipe(r.id); S.recipes = S.recipes.filter(x => x.id !== r.id); } }
}
async function loadSamples(){
  const now = Date.now();
  const mk = (o, i) => newRecipe(Object.assign({ created: now - i*60000, updated: now - i*60000, sample:true }, o));
  const list = [
    mk({ title:'Vegan burnt Basque cheesecake', cats:['Desserts','Bakes'], tags:['Sweet'], source:'https://addictedtodates.com/vegan-basque-cheesecake/', sourceName:'Addicted to Dates', servings:12, time:'9 h incl. chilling', oven:'200 °C fan', tin:'19–20 cm springform', rating:9,
      photo:'https://addictedtodates.com/wp-content/uploads/2025/01/vegan-burnt-basque-cheesecake.jpg', photoSrc:'https://addictedtodates.com/wp-content/uploads/2025/01/vegan-burnt-basque-cheesecake.jpg',
      sourceImages:['https://addictedtodates.com/wp-content/uploads/2025/01/vegan-burnt-basque-cheesecake.jpg','https://addictedtodates.com/wp-content/uploads/2025/01/basque-vegan-cheesecake.jpg','https://addictedtodates.com/wp-content/uploads/2025/01/san-sebastian-basque-cheesecake-vegan.png','https://addictedtodates.com/wp-content/uploads/2025/01/vegan-basque-cheesecake-ingredients.jpg'],
      ings:[{qty:400,unit:'g',name:'soft silken tofu',alt:{qty:14,unit:'oz'}},{qty:400,unit:'g',name:'vegan Greek-style yogurt',alt:{qty:1.667,unit:'cup'}},{qty:400,unit:'ml',name:'coconut whipping cream',alt:{qty:1,unit:'can'}},{qty:220,unit:'g',name:'cane sugar',alt:{qty:1,unit:'cup'}},{qty:60,unit:'g',name:'cornstarch',alt:{qty:6,unit:'tbsp'}},{qty:2,unit:'tbsp',name:'lemon juice, freshly squeezed'},{qty:2,unit:'tsp',name:'vanilla extract'},{qty:4,unit:'tsp',name:'nutritional yeast'},{qty:0.5,unit:'tsp',name:'sea salt'}],
      steps:['Preheat oven: place an aluminium baking sheet or tray in the middle of the oven and preheat to fan 200 °C or conventional 220 °C for at least 45–60 minutes to help even browning.','Double line the pan: scrunch up 2 large sheets of parchment and line a 7.5 or 8 inch springform, making sure the paper stands a few inches above the sides as the batter fills to the top.','Blend: add all the ingredients to a large food processor or high-speed blender and blitz until smooth and creamy.','Bake: pour the filling into the pan and place it on the preheated tray. Bake for 50–55 minutes, until the top is evenly browned and the centre still has a slight jiggle.','Cool and set: remove the tray from the oven and rest on a cooling rack for an hour. Then chill in the fridge for 8 hours (overnight works well).','Serving: carefully remove the springform, transfer to a plate and peel away the parchment. Cut with a sharp clean knife and lift each slice with a cake slice.'],
      sourceNotes:'1. Greek-style yogurt: Alpro Greek-style plain (soy) is used, sometimes labelled Skyr or protein yogurt. If you can\'t find vegan Greek yogurt, increase the silken tofu to 600 g and add 200 g thick coconut or unsweetened soy yogurt.\n2. Coconut cream: Nature\'s Charm coconut whipping cream.\n3. Cane sugar: Morena or Turbinado, or swap for granulated or light brown caster sugar.\n4. Cornstarch: arrowroot works 1:1.\n5. Vanilla: 1 tsp vanilla bean paste or a scraped pod instead.',
      nutrition:{ calories:221, carbs:26, protein:5, fat:9, saturates:6, fibre:1, sugars:20, per:'1 slice' }, notes:'' }, 0),
    mk({ title:'Eggless pistachio cookies', cats:['Bakes'], tags:['Sweet'], source:'https://www.lazycatkitchen.com/eggless-pistachio-cookies/', sourceName:'Lazy Cat Kitchen', servings:12, time:'15 min + 12 min bake, plus chilling', oven:'180 °C',
      photo:'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2026/05/eggless-pistachio-cookies.jpg', photoSrc:'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2026/05/eggless-pistachio-cookies.jpg',
      sourceImages:['https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2026/05/eggless-pistachio-cookies.jpg','https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2026/05/eggless-pistachio-cookies-tray-800x1200.jpg','https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2026/05/pistachio-cookies-ingredients-800x1200.jpg','https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2026/05/eggless-pistachio-cookies-raw-800x1200.jpg'],
      ings:[{qty:8,unit:'g',name:'ground flax',alt:{qty:4,unit:'tsp'}},{qty:60,unit:'ml',name:'soy milk (or other plant milk)',alt:{qty:0.25,unit:'cup'}},{qty:120,unit:'g',name:'vegan butter block',alt:{qty:4.2,unit:'oz'}},{qty:100,unit:'g',name:'dark muscovado sugar',alt:{qty:0.5,unit:'cup'}},{qty:100,unit:'g',name:'caster sugar',alt:{qty:0.5,unit:'cup'}},{qty:80,unit:'g',name:'pistachio butter, more to garnish',alt:{qty:0.333,unit:'cup'}},{qty:10,unit:'ml',name:'vanilla extract',alt:{qty:2,unit:'tsp'}},{qty:190,unit:'g',name:'plain flour (or a GF flour mix)',alt:{qty:1.5,unit:'cup'}},{qty:0.5,unit:'tsp',name:'fine salt'},{qty:0.5,unit:'tsp',name:'baking powder'},{qty:0.25,unit:'tsp',name:'baking soda'},{qty:60,unit:'g',name:'coarsely chopped pistachios',alt:{qty:2,unit:'oz'}},{qty:100,unit:'g',name:'vegan chocolate',alt:{qty:3.5,unit:'oz'}}],
      steps:['Combine ground flax with soy milk in a large mixing bowl and let it stand until thickened, about 20 minutes.','Gently melt the vegan butter, then let it cool completely.','Once the flax has activated and the butter is cool, add both sugars to the flax mixture.','Using an electric whisk, whip the flax and sugars for about 3 minutes, until thickened and bubbly.','Pour in the cooled butter, pistachio butter and vanilla. Stir gently to combine.','Combine flour, salt and both raising agents in a separate bowl and fold into the wet mixture in three batches.','Fold in three quarters of the chopped pistachios and chocolate chunks; keep the rest for decoration.','Shape into balls with an ice-cream scoop (a ¼ cup scoop makes 10). Top with a chunk of chocolate and pistachios.','Chill the shaped cookies overnight in the fridge, or freeze for 1 hour.','Just before baking, make a small hole in each cookie and fill it with pistachio butter.','Preheat the oven to 180 °C. Bake for about 6 minutes, bang the tray on the counter a few times, rotate, and bake another 5–7 minutes depending on size.','Out of the oven, bang the tray again or nudge the edges in with a cookie ring if they spread too much.','Let the cookies set for 10 minutes, then cool completely on a rack.','Store airtight for at least a week, or freeze before or after baking.'],
      sourceNotes:'A dark baking tray bakes the cookies faster.\nPistachio butter: toast 250 g shelled pistachios at 180 °C for 8–10 minutes, cool fully, then process to a butter; add a teaspoon of neutral oil if it looks dry.',
      nutrition:{ calories:306, sugars:21, fat:16, saturates:8, protein:4, carbs:37, per:'1 of 12 cookies' }, notes:'' }, 1),
    mk({ title:'No knead focaccia', cats:['Bread'], tags:['Italian','Savoury'], source:'https://www.okonomikitchen.com/easy-no-knead-focaccia/', sourceName:'Okonomi Kitchen', servings:8, time:'10 min prep, 25 min bake, 12–72 h cold rise', oven:'220–230 °C', tin:'7×11 or 9×9 inch pan',
      photo:'https://www.okonomikitchen.com/wp-content/uploads/2025/09/no-knead-focaccia-recipe.jpg', photoSrc:'https://www.okonomikitchen.com/wp-content/uploads/2025/09/no-knead-focaccia-recipe.jpg',
      sourceImages:['https://www.okonomikitchen.com/wp-content/uploads/2025/09/no-knead-focaccia-recipe.jpg','https://www.okonomikitchen.com/wp-content/uploads/2025/09/big-bubbly-open-crumb-focaccia.jpg','https://www.okonomikitchen.com/wp-content/uploads/2025/09/big-bubbly-focaccia.jpg','https://www.okonomikitchen.com/wp-content/uploads/2025/09/blistered-focaccia-2.jpg','https://www.okonomikitchen.com/wp-content/uploads/2025/09/dimpling-focaccia.jpg'],
      ings:[{qty:370,unit:'g',name:'bread flour',alt:{qty:3,unit:'cup'}},{qty:322,unit:'ml',name:'water',alt:{qty:1.375,unit:'cup'}},{qty:9,unit:'g',name:'salt (7–11 g, 2–3%)',alt:{qty:1.75,unit:'tsp'}},{qty:1,unit:'g',name:'instant dry yeast (for a 48 h rise)',alt:{qty:0.25,unit:'tsp'}},{qty:60,unit:'ml',name:'olive oil (45–75 ml)',alt:{qty:4,unit:'tbsp'}},{qty:1,unit:'tbsp',name:'butter, for the pan (optional)'},{qty:null,unit:'',name:'flaky salt, for topping'}],
      steps:['Combine the dough: in a large bowl mix flour, salt, yeast and water until no dry flour remains and a shaggy dough forms. Cover and rest 30 minutes.','First stretch and folds: with wet or oiled hands, grab one side of the dough, stretch it up and fold it across; rotate the bowl 90° and repeat 4–5 times. Do a few slap and folds if the dough lifts without tearing. Cover and rest 30 minutes.','Second set: if the dough still tears when lifted, do another set of stretch and folds; if it feels developed, do a coil fold — lift the middle so the top edge comes off the bowl and tuck it under, rotate and repeat on all sides. Rest 20–30 minutes.','Two more sets of coil folds, resting 20–30 minutes between. Drizzle the dough with a little olive oil.','Bulk ferment: cover and refrigerate for at least 12 hours, preferably 48 and up to 72, until doubled, bubbly and airy. For 12 hours use 1.8 g yeast; for 72 hours use 1 g.','Day 2 — prepare the pan: oil a pan generously (the more oil, the crispier the bottom) and butter the sides, or line with parchment.','Shape: turn the dough into the pan, fold the vertical sides over then the horizontal sides, and flip so the smooth side faces up.','Second proof: drizzle 1–2 tbsp olive oil over the top, cover and proof for 2–4 hours, until airy, bubbly and jiggly.','Dimple once: oil your fingers and press the pads of your fingers all the way to the pan. Preheat the oven to 220–230 °C.','Dimple again once the oven is hot, without popping the nice bubbles. Sprinkle with flaky salt and toppings, pressing them in.','Bake on the lowest rack for 22–30 minutes, until golden on top and bottom, rotating halfway if your oven has hot spots.','Cool: loosen with a spatula, transfer to a rack and rest at least 10 minutes before slicing.'],
      sourceNotes:'Use 2% salt if topping with salty ingredients, 3% for plain focaccia.\nYeast: 0.5% for a 12 h rise, 0.25% for 72 h, 1.25% (4.6 g) for the same-day method — then rise at room temperature 1–1.5 h instead of refrigerating and proof 30–45 min in the pan.\nDouble dimpling is optional.\nEvery oven differs: test between 220 and 230 °C and judge by colour on top and bottom.\nDirect method (no folds): mix, coat with oil, rest 10–18 h at room temperature or up to 72 h in the fridge, then continue from shaping.',
      nutrition:{ calories:263, sugars:0.3, fat:9, saturates:2, carbs:39, fibre:1.5, protein:5, per:'⅛ focaccia (source gives the whole loaf: 2100 kcal)' }, notes:'' }, 2)
  ];
  const igUdon = parseText("Chilli Garlic Soy Mince Udon\n\nServes 2\nIngredients\n\nFor the mince\nDrizzle of oil\n125g dried soy mince\n500ml vegetable stock, just boiled\n4 garlic cloves, grated\n2 inches ginger, grated\n6 spring onions, 3 sliced into 1 inch rounds, 3 finely sliced lengthways and placed in iced water to garnish\n2 tbsp doubanjiang / toban djan (chilli bean paste)\n1 tbsp light soy sauce\n1 tbsp dark soy sauce\n1.5 tsp caster sugar\n\nFor the sauce\n250ml vegetable stock\n1 tbsp cornflour, mixed with 2 tbsp cold water\n\nFor the noodles\n2 portions udon noodles\n\nTo serve\nFreshly cracked Sichuan pepper\nSpring onion greens\n\n*full method on my website - link is in my bio");
  list.push(mk({ title:'Chilli garlic soy mince udon', cats:['Mains'], tags:['Asian','Savoury','Instagram'], source:'https://www.instagram.com/reel/DcjI8UthMhU/', sourceName:'Instagram', servings:2, ings: igUdon.ings, steps: igUdon.steps, sourceNotes: 'Full method on the creator\'s website — link in their bio.', baking:false }, 3));
  const igTruf = parseText("5 simple ingredient chocolate truffle balls\n\n1 and 1/4 cup of cocoa powder \n2.5 tbsp coconut oil \n6 tbsp almond butter\n5 tbsp maple syrup \n2 pinches of salt\n\nSift the cocoa powder\nPut in all other ingredients\nMix and fold with a spatula until incorporated \nRoll into balls\nPlace on parchment paper (don\u2019t let them touch)\nDust more cocoa powder on top\nFreeze for 30 minutes or refrigerate for 4 hours\n\n#healthy #food #chocolate #recipe");
  list.push(mk({ title:'Chocolate truffle balls (5 ingredients)', cats:['Snacks','Desserts'], tags:['Sweet','No-bake','Instagram'], source:'https://www.instagram.com/reel/DcQ5GHxBEAJ/', sourceName:'Instagram', ings: igTruf.ings, steps: igTruf.steps, baking:true }, 4));
  for (const r of list) await saveRecipe(r);
  S.settings.sampleLoaded = true; S.settings.sampleVersion = 6; await saveSettings();
  list.forEach(r => cachePhoto(r));
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
  if (S.settings.sampleVersion !== 6) { await purgeSamples(); await loadSamples(); }
  render();
  if (S.timers.length) keepAwake();
  if (S.settings.backupEvery !== 'off') { const gap = S.settings.backupEvery === 'daily' ? 1 : 7; const n = S.recipes.filter(r => !r.deleted).length; if ((S.settings.lastBackup && Date.now() - S.settings.lastBackup > gap*86400000) || (!S.settings.lastBackup && n > 10)) setTimeout(() => toast('Time for a backup — Settings › Back up now', 4000), 1500); }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
window.addEventListener('popstate', e => { if (S.hist.length) { e.preventDefault(); back(); history.pushState(null, ''); } });
history.pushState(null, '');
boot();
})();
