// Usage: BASE_URL=http://127.0.0.1:4175 node scripts/check-seo.mjs
// Optional: REPORT_PATH=work/seo-check.json SITE_URL=https://espinalservicios.com
// Checks every sitemap URL and the internal links rendered by those pages.
// SSR/HTTP verification is not a guarantee of indexing or a substitute for GSC.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { cleanUrl, decodeEntities, googlebotAllowed, inspectBusinessSchemas, parseHtml } from './check-seo-lib.mjs';

const base = new URL(process.env.BASE_URL ?? 'http://127.0.0.1:4175');
const primary = new URL(process.env.SITE_URL ?? 'https://espinalservicios.com').origin;
const report = { checkedAt: new Date().toISOString(), baseUrl: base.origin, siteUrl: primary, status: 'pending', sitemapUrls: 0, businessEntities: 0, internalTargets: 0, errors: [], warnings: [], pages: [] };
const addError = (path, message) => report.errors.push({ path, message });
const cache = new Map();

async function request(path) {
  if (cache.has(path)) return cache.get(path);
  const promise = (async () => {
    const url = new URL(path, base);
    try {
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'EspinalSEOCheck/1.0' } });
      const contentType = response.headers.get('content-type') ?? '';
      const text = /text|xml|json/.test(contentType) ? await response.text() : '';
      if (!text) await response.body?.cancel();
      return { status: response.status, contentType, text, location: response.headers.get('location'), robots: response.headers.get('x-robots-tag') ?? '' };
    } catch (error) { return { status: 0, text: '', contentType: '', error: error.message }; }
  })();
  cache.set(path, promise);
  return promise;
}

async function limited(items, callback) {
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
    while (index < items.length) await callback(items[index++]);
  }));
}

async function sitemapUrls(path = '/sitemap.xml', seen = new Set()) {
  if (seen.has(path)) { addError(path, 'Sitemap circular'); return []; }
  seen.add(path);
  const response = await request(path);
  if (response.status !== 200) { addError(path, `Sitemap HTTP ${response.status}: ${response.error ?? ''}`); return []; }
  if (!/<(?:urlset|sitemapindex)\b/i.test(response.text)) { addError(path, 'XML de sitemap ausente'); return []; }
  const locations = [...response.text.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map((match) => decodeEntities(match[1].trim()));
  if (/<sitemapindex\b/i.test(response.text)) {
    const pages = [];
    for (const location of locations) {
      const url = new URL(location);
      if (url.origin !== primary) { addError(path, `Sitemap de otro dominio: ${url.origin}`); continue; }
      pages.push(...await sitemapUrls(url.pathname + url.search, seen));
    }
    return pages;
  }
  return locations;
}

const robots = await request('/robots.txt');
if (robots.status !== 200) addError('/robots.txt', `HTTP ${robots.status}`);
const locations = await sitemapUrls();
report.sitemapUrls = locations.length;
if (!locations.length) addError('/sitemap.xml', 'Sitemap vacío');
if (new Set(locations).size !== locations.length) addError('/sitemap.xml', 'URLs duplicadas');
const internal = new Map();
const parsedPages = new Map();
const signatures = new Map();

await limited(locations, async (location) => {
  let url;
  try { url = new URL(location); } catch { addError('/sitemap.xml', `URL inválida: ${location}`); return; }
  const path = url.pathname + url.search;
  if (url.origin !== primary) { addError(path, 'URL del sitemap fuera del dominio principal'); return; }
  if (url.hash || url.search) addError(path, 'URL del sitemap incluye fragmento o parámetros');
  if (!googlebotAllowed(robots.text, path)) addError(path, 'Bloqueada para Googlebot en robots.txt');
  const response = await request(path);
  if (response.status !== 200) { addError(path, `HTTP ${response.status}: ${response.error ?? ''}`); return; }
  if (!response.contentType.includes('text/html')) { addError(path, `Tipo de contenido inesperado: ${response.contentType}`); return; }
  const page = parseHtml(response.text);
  parsedPages.set(path, page);
  report.pages.push({ path, status: response.status, title: page.title, h1: page.h1s.join(' | '), canonical: page.canonicals[0] ?? null });
  if (!page.title || !page.description) addError(path, 'Título o descripción vacíos');
  if (page.h1s.length !== 1 || !page.h1s[0]) addError(path, `Se esperaba un H1 legible: ${page.h1s.length}`);
  if (/\b(noindex|none)\b/i.test(`${page.robots}, ${response.robots}`)) addError(path, 'URL del sitemap marcada noindex');
  if (page.canonicals.length !== 1) addError(path, `Se esperaba una canonical: ${page.canonicals.length}`);
  else {
    try { if (cleanUrl(page.canonicals[0]) !== cleanUrl(location)) addError(path, `Canonical diferente: ${page.canonicals[0]}`); }
    catch { addError(path, 'Canonical inválida'); }
  }
  if (new Set(page.ids).size !== page.ids.length) addError(path, 'IDs HTML duplicados');
  for (const issue of page.schemaErrors) addError(path, `JSON-LD inválido: ${issue}`);
  const schema = inspectBusinessSchemas(page.schemas, primary);
  schema.issues.forEach((issue) => addError(path, issue));
  report.businessEntities += schema.entities.length;
  for (const entity of schema.entities) {
    const signature = JSON.stringify({ name: entity.name, telephone: entity.telephone, url: entity.url, address: entity.address,
      areaServed: (entity.areaServed ?? []).map((area) => area.name).sort() });
    if (signatures.size && !signatures.has(signature)) addError(path, 'Datos identificativos o cobertura inconsistentes entre páginas');
    signatures.set(signature, path);
  }
  for (const href of page.links) {
    let target;
    try { target = new URL(href, location); } catch { addError(path, `Enlace inválido: ${href}`); continue; }
    if (target.origin !== primary) continue;
    const key = target.pathname + target.search;
    if (!internal.has(key)) internal.set(key, []);
    internal.get(key).push({ from: path, hash: target.hash });
  }
});

report.internalTargets = internal.size;
await limited([...internal.entries()], async ([path, refs]) => {
  const response = await request(path);
  if (response.status >= 300 && response.status < 400 && response.location) {
    const destination = new URL(response.location, new URL(path, base));
    if (destination.origin === base.origin || destination.origin === primary) {
      const next = await request(destination.pathname + destination.search);
      if (next.status !== 200) addError(path, `Redirección interna termina en HTTP ${next.status}`);
    }
    report.warnings.push({ path, message: `Enlace interno redirige: ${response.status}`, from: refs[0].from });
    return;
  }
  if (response.status !== 200) { addError(path, `Enlace interno roto HTTP ${response.status}, desde ${refs[0].from}`); return; }
  const page = parsedPages.get(path) ?? (response.contentType.includes('text/html') ? parseHtml(response.text) : null);
  if (!page) return;
  for (const ref of refs) {
    // Empty fragments and text-fragment directives do not name an HTML element.
    const hash = ref.hash.slice(1).split(':~:text=')[0];
    if (!hash) continue;
    let id;
    try { id = decodeURIComponent(hash); } catch { id = hash; }
    if (!page.ids.includes(id)) addError(ref.from, `Destino de ancla inexistente: ${path}#${id}`);
  }
});

if (!report.businessEntities) addError('/', 'Ninguna entidad del negocio encontrada');
for (const path of ['/terminos', '/privacidad']) {
  if (locations.some((location) => new URL(location).pathname === path)) addError(path, 'Página legal noindex incluida en sitemap');
  const response = await request(path);
  if (response.status !== 200) addError(path, `Página legal HTTP ${response.status}`);
  else if (!/\b(noindex|none)\b/i.test(`${parseHtml(response.text).robots}, ${response.robots}`)) addError(path, 'La página legal perdió su noindex');
}

const missingPath = '/__seo-check-pagina-inexistente__';
const missing = await request(missingPath);
if (missing.status !== 404) addError(missingPath, `Se esperaba HTTP 404, recibido ${missing.status}`);
else if (!/\b(noindex|none)\b/i.test(`${parseHtml(missing.text).robots}, ${missing.robots}`)) addError(missingPath, 'El 404 no declara noindex');
report.status = report.errors.length ? 'failed' : 'passed';
report.pages.sort((a, b) => a.path.localeCompare(b.path));
if (process.env.REPORT_PATH) {
  await mkdir(dirname(process.env.REPORT_PATH), { recursive: true });
  await writeFile(process.env.REPORT_PATH, JSON.stringify(report, null, 2) + '\n');
}
for (const error of report.errors) console.error(`✗ ${error.path}: ${error.message}`);
for (const warning of report.warnings) console.warn(`⚠ ${warning.path}: ${warning.message}`);
console.log(`${report.status === 'passed' ? '✓' : '✗'} ${locations.length} URLs del sitemap, ${report.businessEntities} nodos de negocio, ${internal.size} destinos internos; ${report.errors.length} errores, ${report.warnings.length} avisos.`);
process.exitCode = report.errors.length ? 1 : 0;
