/** Read-only verification of the local preview or authorized public site. No contact actions. */
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin=new URL(process.argv[2]??'http://127.0.0.1:4175');
const local=['127.0.0.1','localhost','[::1]'].includes(origin.hostname)&&['http:','https:'].includes(origin.protocol);
const production=['espinalservicios.com','www.espinalservicios.com'].includes(origin.hostname)&&origin.protocol==='https:'&&!origin.port;
assert.ok(local||production,'Allowed origins: local preview or HTTPS espinalservicios.com/www.espinalservicios.com.');
assert.ok(!origin.username&&!origin.password&&origin.pathname==='/'&&!origin.search&&!origin.hash,'Pass an origin without credentials, path, query, or fragment.');
const scope=production?'production':'local';
const routes=['/','/nosotros','/servicios/techos','/servicios/pintura','/servicios/plomeria','/cobertura','/cobertura/envigado','/servicios/techos/envigado','/blog','/blog/como-arreglar-gotera-techo','/privacidad','/terminos'];
for(const path of routes){
 const response=await fetch(new URL(path,origin));assert.equal(response.status,200,path);const html=await response.text();
 assert.ok(/Espinal Multiservicios, inicio/.test(html),`${path}: accessible brand link`);
 assert.ok(/espinal-compact-color\.svg/.test(html),`${path}: compact signature`);
 for(const size of[16,20,24,32,48,96])assert.ok(html.includes(`/favicon-${size}.png`),`${path}: native favicon ${size}`);
 assert.ok(/apple-icon\.png/.test(html),`${path}: Apple icon`);assert.ok(/manifest\.webmanifest/.test(html),`${path}: manifest`);
 assert.ok(/href="\/icon\.svg"/.test(html),`${path}: SVG favicon declared`);
 assert.ok(/tel:\+573007336333/.test(html),`${path}: unchanged public phone`);
 assert.ok(!/>HE<\/span>/.test(html),`${path}: no initials substituting for a real founder portrait`);
}
const manifest=await(await fetch(new URL('/manifest.webmanifest',origin))).json();
assert.equal(manifest.theme_color,'#B94B24');assert.equal(manifest.background_color,'#FAF7F2');assert.equal(manifest.scope,'/');assert.equal(manifest.short_name,'Espinal');
assert.deepEqual(manifest.icons.map(x=>x.sizes),['192x192','512x512','512x512']);assert.equal(manifest.icons[2].purpose,'maskable');
const assets=JSON.parse(await readFile('public/brand/asset-manifest.json','utf8'));assert.equal(assets.version,'2.1.0');
for(const asset of assets.files){
 const path='/'+asset.destination.replace(/^(public|app)\//,'');const response=await fetch(new URL(path,origin));assert.equal(response.status,200,path);
 if(path.endsWith('.svg'))assert.match(response.headers.get('content-type'),/image\/svg\+xml/);
 const data=Buffer.from(await response.arrayBuffer());assert.equal(createHash('sha256').update(data).digest('hex'),asset.sha256,`${path}: served bytes match kit`);
}
console.log(JSON.stringify({origin:origin.origin,scope,version:assets.version,routes:routes.length,assets:assets.files.length,servedHashes:'all match',metadata:'passed',manifest:'passed',publicPhone:'unchanged',conversionLinksOpened:false},null,2));
