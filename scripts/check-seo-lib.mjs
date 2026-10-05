// Small SSR HTML/XML helpers. Scripts and styles are excluded from visible markup;
// no browser, external parser, Google API or new dependency is required.
export function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' }[entity.toLowerCase()] ?? match;
  });
}

export function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map((match) => [match[1].toLowerCase(), decodeEntities(match[2] ?? match[3] ?? match[4])]));
}

export function cleanUrl(value) {
  const url = new URL(value);
  url.hash = '';
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
  return url.href;
}

export function parseHtml(html) {
  const schemas = [];
  const schemaErrors = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (attributes(match[1]).type?.toLowerCase() !== 'application/ld+json') continue;
    try { schemas.push(JSON.parse(match[2])); } catch (error) { schemaErrors.push(error.message); }
  }
  const markup = html.replace(/<!--([\s\S]*?)-->|<(script|style)\b[^>]*>[\s\S]*?<\/\2\s*>/gi, '');
  const plain = (text) => decodeEntities(text.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const metas = [...markup.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]));
  return {
    title: plain(markup.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] ?? ''),
    description: metas.find((meta) => meta.name?.toLowerCase() === 'description')?.content ?? '',
    robots: metas.filter((meta) => ['robots', 'googlebot'].includes(meta.name?.toLowerCase())).map((meta) => meta.content ?? '').join(', '),
    canonicals: [...markup.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]))
      .filter((link) => link.rel?.toLowerCase().split(/\s+/).includes('canonical')).map((link) => link.href),
    h1s: [...markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi)].map((match) => plain(match[1])),
    ids: [...markup.matchAll(/<[a-z][^>]*>/gi)].map((match) => attributes(match[0]).id).filter(Boolean),
    links: [...markup.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]).href).filter(Boolean),
    schemas,
    schemaErrors,
  };
}

export function walkNodes(value, callback) {
  if (Array.isArray(value)) value.forEach((entry) => walkNodes(entry, callback));
  else if (value && typeof value === 'object') {
    callback(value);
    Object.values(value).forEach((entry) => walkNodes(entry, callback));
  }
}

export function inspectBusinessSchemas(schemas, siteUrl) {
  const primary = new URL(siteUrl).origin;
  const issues = [];
  const entities = [];
  walkNodes(schemas, (node) => {
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    if (types.includes('SearchAction')) issues.push('SearchAction sin buscador implementado');
    const isBusiness = types.some((type) => ['HomeAndConstructionBusiness', 'LocalBusiness'].includes(type))
      || (node['@id'] === `${primary}/#business` && Object.keys(node).some((key) => !['@id', '@type'].includes(key)));
    if (!isBusiness) return;
    entities.push(node);
    if (node['@id'] !== `${primary}/#business`) issues.push('Identificador del negocio distinto de la entidad principal');
    for (const field of ['url', 'mainEntityOfPage']) {
      try { if (cleanUrl(node[field]) !== cleanUrl(primary)) issues.push(`${field} del negocio cambia según la página`); }
      catch { issues.push(`${field} del negocio ausente o inválida`); }
    }
    if (node.address?.addressLocality !== 'Medellín' || node.address?.addressRegion !== 'Antioquia' || node.address?.addressCountry !== 'CO') {
      issues.push('La localidad pública del negocio cambia según el municipio');
    }
    if (node.geo || node.address?.streetAddress) issues.push('Dirección o coordenadas sin verificar en la entidad');
    if (node.review || node.aggregateRating) issues.push('Reseñas autorreferenciales en la entidad del negocio');
  });
  return { issues, entities };
}

export function googlebotAllowed(robots, pathname) {
  const groups = [];
  let current = null;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    const split = line.indexOf(':');
    if (split < 0) continue;
    const name = line.slice(0, split).trim().toLowerCase();
    const value = line.slice(split + 1).trim();
    if (name === 'user-agent') {
      if (!current || current.rules.length) { current = { agents: [], rules: [] }; groups.push(current); }
      current.agents.push(value.toLowerCase());
    } else if (current && ['allow', 'disallow'].includes(name) && value) {
      current.rules.push({ allow: name === 'allow', path: value });
    }
  }
  const exact = groups.filter((group) => group.agents.includes('googlebot'));
  const selected = exact.length ? exact : groups.filter((group) => group.agents.includes('*'));
  const matching = selected.flatMap((group) => group.rules).filter((rule) => {
    const pattern = rule.path.replace(/[.+?^{}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\$$/, '$');
    return new RegExp(`^${pattern}`).test(pathname);
  }).sort((a, b) => b.path.replace(/\*/g, '').length - a.path.replace(/\*/g, '').length || Number(b.allow) - Number(a.allow));
  return matching[0]?.allow ?? true;
}
