const V='suncha-aurora-v4',F=['./','index.html','pdf-lib.min.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.open(V).then(async c=>{const m=await c.match(e.request,{ignoreSearch:true});
const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>null);
return m||(await net)||c.match('index.html')}))});
