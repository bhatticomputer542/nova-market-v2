const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const PUBLIC = ROOT;
const PORT = Number(process.env.PORT || 3000);
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const DATA_DIR = path.join(ROOT, 'data');
const LOCAL_PRODUCTS = path.join(DATA_DIR, 'products.json');
const LOCAL_ORDERS = path.join(DATA_DIR, 'orders.json');
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(LOCAL_PRODUCTS)) fs.writeFileSync(LOCAL_PRODUCTS, JSON.stringify([
  {
    "id": 1,
    "name": "Classic T-Shirt",
    "category": "Clothing",
    "price": 1500,
    "description": "Soft everyday cotton T-shirt.",
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    "tag": "Popular",
    "active": true
  },
  {
    "id": 2,
    "name": "Everyday Sneakers",
    "category": "Shoes",
    "price": 3500,
    "description": "Comfortable sneakers for daily wear.",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "tag": "New",
    "active": true
  },
  {
    "id": 3,
    "name": "Minimal Wristwatch",
    "category": "Accessories",
    "price": 2500,
    "description": "A simple finishing touch for your outfit.",
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    "tag": "Popular",
    "active": true
  },
  {
    "id": 4,
    "name": "Classic Denim Jacket",
    "category": "Clothing",
    "price": 4200,
    "description": "A versatile layer for casual looks.",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    "tag": "Trending",
    "active": true
  },
  {
    "id": 5,
    "name": "Everyday Handbag",
    "category": "Accessories",
    "price": 2800,
    "description": "A practical bag for everyday essentials.",
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    "tag": "Popular",
    "active": true
  },
  {
    "id": 6,
    "name": "Casual White Trainers",
    "category": "Shoes",
    "price": 3200,
    "description": "Clean, easy-to-style everyday footwear.",
    "image": "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=80",
    "tag": "",
    "active": true
  },
  {
    "id": 7,
    "name": "Oversized Hoodie",
    "category": "Clothing",
    "price": 2900,
    "description": "A relaxed-fit hoodie for laid-back days.",
    "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    "tag": "New",
    "active": true
  },
  {
    "id": 8,
    "name": "Leather-look Belt",
    "category": "Accessories",
    "price": 950,
    "description": "A versatile belt to finish your outfit.",
    "image": "https://images.unsplash.com/photo-1624222247344-550fb8f6b5b4?auto=format&fit=crop&w=900&q=80",
    "tag": "",
    "active": true
  },
  {
    "id": 9,
    "name": "Running Shoes",
    "category": "Shoes",
    "price": 3900,
    "description": "Lightweight sporty shoes for active days.",
    "image": "https://images.unsplash.com/photo-1460353581641-37bAddab3fdd?auto=format&fit=crop&w=900&q=80",
    "tag": "Trending",
    "active": true
  },
  {
    "id": 10,
    "name": "Sunglasses",
    "category": "Accessories",
    "price": 1800,
    "description": "Modern shades for sunny days.",
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    "tag": "New",
    "active": true
  },
  {
    "id": 11,
    "name": "Casual Button Shirt",
    "category": "Clothing",
    "price": 2200,
    "description": "An easy smart-casual shirt for everyday wear.",
    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    "tag": "",
    "active": true
  },
  {
    "id": 12,
    "name": "Sport Digital Watch",
    "category": "Accessories",
    "price": 2100,
    "description": "A sporty watch-inspired everyday accessory.",
    "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80",
    "tag": "Popular",
    "active": true
  },
  {
    "id": 13,
    "name": "Canvas Backpack",
    "category": "Accessories",
    "price": 2600,
    "description": "A handy backpack for work, study and travel.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    "tag": "",
    "active": true
  },
  {
    "id": 14,
    "name": "Classic Loafers",
    "category": "Shoes",
    "price": 3700,
    "description": "Smart-casual shoes for dressed-up days.",
    "image": "https://images.unsplash.com/photo-1614252369475-531rk9f8e8b?auto=format&fit=crop&w=900&q=80",
    "tag": "New",
    "active": true
  },
  {
    "id": 15,
    "name": "Everyday Jeans",
    "category": "Clothing",
    "price": 2700,
    "description": "Classic denim made for everyday outfits.",
    "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    "tag": "",
    "active": true
  }
], null, 2));
if (!fs.existsSync(LOCAL_ORDERS)) fs.writeFileSync(LOCAL_ORDERS, '[]');

function readJson(file, fallback) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
function send(res, status, data, type='application/json; charset=utf-8') {
  res.writeHead(status, {'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  res.end(type.startsWith('application/json') ? JSON.stringify(data) : data);
}
function bodyJson(req) {
  return new Promise((resolve,reject)=>{let raw='';req.on('data',chunk=>{raw+=chunk;if(raw.length>1_000_000){reject(new Error('Request too large'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'));}catch{reject(new Error('Invalid JSON'));}});req.on('error',reject);});
}
function isAdmin(req) {
  const supplied=req.headers['x-admin-key'];
  if (!ADMIN_KEY || typeof supplied!=='string') return false;
  const a=Buffer.from(supplied), b=Buffer.from(ADMIN_KEY);
  return a.length===b.length && crypto.timingSafeEqual(a,b);
}
async function db(table,method='GET',payload=null,query='') {
  const resp=await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`,{method,headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,'Content-Type':'application/json',Prefer:'return=representation'},...(payload!==null?{body:JSON.stringify(payload)}:{})});
  const txt=await resp.text(); if(!resp.ok) throw new Error(`Database request failed (${resp.status}): ${txt.slice(0,250)}`); return txt?JSON.parse(txt):[];
}
async function getProducts(){if(SUPABASE_URL&&SUPABASE_KEY)return db('products','GET',null,'?select=*&active=eq.true&order=id.asc');return readJson(LOCAL_PRODUCTS,[]).filter(p=>p.active!==false);}
async function saveProduct(p,id){
  const clean={name:String(p.name||'').trim(),category:String(p.category||'General').trim(),price:Number(p.price),description:String(p.description||'').trim(),image:String(p.image||'').trim(),tag:String(p.tag||'').trim(),active:p.active!==false};
  if(!clean.name||!Number.isFinite(clean.price)||clean.price<0)throw new Error('Product name and valid price are required.');
  if(SUPABASE_URL&&SUPABASE_KEY){if(id){const rows=await db('products','PATCH',clean,`?id=eq.${encodeURIComponent(id)}`);if(!rows.length)throw new Error('Product not found.');return rows[0];}return (await db('products','POST',clean))[0];}
  const arr=readJson(LOCAL_PRODUCTS,[]);
  if(id){const i=arr.findIndex(x=>String(x.id)===String(id));if(i<0)throw new Error('Product not found.');arr[i]={...arr[i],...clean};fs.writeFileSync(LOCAL_PRODUCTS,JSON.stringify(arr,null,2));return arr[i];}
  const row={...clean,id:arr.reduce((m,x)=>Math.max(m,Number(x.id)||0),0)+1};arr.push(row);fs.writeFileSync(LOCAL_PRODUCTS,JSON.stringify(arr,null,2));return row;
}
async function deleteProduct(id){if(SUPABASE_URL&&SUPABASE_KEY){await db('products','DELETE',null,`?id=eq.${encodeURIComponent(id)}`);return;}const arr=readJson(LOCAL_PRODUCTS,[]).filter(x=>String(x.id)!==String(id));fs.writeFileSync(LOCAL_PRODUCTS,JSON.stringify(arr,null,2));}
async function createOrder(o){
  const name=String(o.name||'').trim(),phone=String(o.phone||'').trim(),address=String(o.address||'').trim(),city=String(o.city||'').trim();
  if(!name||!phone||!address||!city||!Array.isArray(o.items)||!o.items.length)throw new Error('Please complete all checkout fields.');
  const products=await getProducts(),items=[];
  for(const line of o.items){const p=products.find(x=>String(x.id)===String(line.id));const quantity=Math.max(1,Math.min(50,Math.floor(Number(line.quantity)||1)));if(!p)throw new Error('A selected product is no longer available.');items.push({id:p.id,name:p.name,price:Number(p.price),quantity});}
  const total=items.reduce((s,p)=>s+p.price*p.quantity,0);
  const record={customer_name:name,phone,address,city,items,total,payment_method:'COD',status:'Pending'};
  if(SUPABASE_URL&&SUPABASE_KEY)return (await db('orders','POST',record))[0];
  const arr=readJson(LOCAL_ORDERS,[]),saved={...record,id:Date.now(),created_at:new Date().toISOString()};arr.unshift(saved);fs.writeFileSync(LOCAL_ORDERS,JSON.stringify(arr,null,2));return saved;
}
async function listOrders(){if(SUPABASE_URL&&SUPABASE_KEY)return db('orders','GET',null,'?select=*&order=created_at.desc');return readJson(LOCAL_ORDERS,[]);}
async function updateOrder(id,status){if(!['Pending','Confirmed','Shipped','Delivered','Cancelled'].includes(status))throw new Error('Invalid order status.');if(SUPABASE_URL&&SUPABASE_KEY){const rows=await db('orders','PATCH',{status},`?id=eq.${encodeURIComponent(id)}`);if(!rows.length)throw new Error('Order not found.');return rows[0];}const arr=readJson(LOCAL_ORDERS,[]),row=arr.find(x=>String(x.id)===String(id));if(!row)throw new Error('Order not found.');row.status=status;fs.writeFileSync(LOCAL_ORDERS,JSON.stringify(arr,null,2));return row;}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
  if(req.method==='GET'&&url.pathname==='/api/health')return send(res,200,{ok:true,database:SUPABASE_URL&&SUPABASE_KEY?'supabase-configured':'local-demo'});
  if(req.method==='GET'&&url.pathname==='/api/products')return send(res,200,await getProducts());
  if(req.method==='POST'&&url.pathname==='/api/orders'){const o=await createOrder(await bodyJson(req));return send(res,201,{ok:true,orderId:o.id,message:'Order received. We will contact you to confirm.'});}
  if(url.pathname.startsWith('/api/admin/')){
   if(!isAdmin(req))return send(res,401,{error:'Admin key is missing or incorrect.'});
   if(req.method==='GET'&&url.pathname==='/api/admin/products'){if(SUPABASE_URL&&SUPABASE_KEY)return send(res,200,await db('products','GET',null,'?select=*&order=id.asc'));return send(res,200,readJson(LOCAL_PRODUCTS,[]));}
   if(req.method==='POST'&&url.pathname==='/api/admin/products')return send(res,201,await saveProduct(await bodyJson(req),null));
   const pm=url.pathname.match(/^\/api\/admin\/products\/([^/]+)$/);
   if(pm&&req.method==='PUT')return send(res,200,await saveProduct(await bodyJson(req),decodeURIComponent(pm[1])));
   if(pm&&req.method==='DELETE'){await deleteProduct(decodeURIComponent(pm[1]));return send(res,200,{ok:true});}
   if(req.method==='GET'&&url.pathname==='/api/admin/orders')return send(res,200,await listOrders());
   const om=url.pathname.match(/^\/api\/admin\/orders\/([^/]+)$/);
   if(om&&req.method==='PATCH'){const b=await bodyJson(req);return send(res,200,await updateOrder(decodeURIComponent(om[1]),b.status));}
   return send(res,404,{error:'Admin endpoint not found.'});
  }
  let pathname=decodeURIComponent(url.pathname);if(pathname==='/')pathname='/index.html';
  const target=path.resolve(PUBLIC,'.'+pathname);
  if(!target.startsWith(PUBLIC+path.sep)&&target!==PUBLIC)return send(res,403,{error:'Forbidden'});
  fs.readFile(target,(err,content)=>{if(err)return send(res,404,'Not found','text/plain; charset=utf-8');send(res,200,content,mime[path.extname(target).toLowerCase()]||'application/octet-stream');});
 }catch(err){send(res,400,{error:err.message||'Request failed.'});}
});
server.listen(PORT,'0.0.0.0',()=>console.log(`Nova Market v2 listening on ${PORT}`));
