import test from 'node:test';
import assert from 'node:assert/strict';
import { googlebotAllowed, inspectBusinessSchemas, parseHtml } from './check-seo-lib.mjs';

test('reads SSR markup regardless of attribute order/quotes and ignores serialized React markup', () => {
  const page = parseHtml(`<meta content='index,follow' name='robots'><meta content='Precio &amp; visita' name='description'>
    <link href='https://espinalservicios.com/' rel='canonical'><title>Espinal</title>
    <h1 id='principal'>Techos <span>y pintura</span></h1><a href='/blog#precio'>Guía</a>
    <script>const cached = '<h1>Fake</h1><a href="/missing">Cached</a>';</script>
    <script data-test='x' type='application/ld+json'>{"@type":"WebSite"}</script>`);
  assert.deepEqual(page.h1s, ['Techos y pintura']);
  assert.deepEqual(page.links, ['/blog#precio']);
  assert.deepEqual(page.ids, ['principal']);
  assert.equal(page.description, 'Precio & visita');
  assert.equal(page.canonicals[0], 'https://espinalservicios.com/');
  assert.equal(page.schemas.length, 1);
});

test('detects changing provider identity, centroid coordinates and fictional search actions inside nested schema', () => {
  const audit = inspectBusinessSchemas({ '@graph': [{ '@type': 'Service', provider: {
    '@type': 'HomeAndConstructionBusiness', '@id': 'https://espinalservicios.com/#business',
    url: 'https://espinalservicios.com/cobertura/bello', mainEntityOfPage: 'https://espinalservicios.com/cobertura/bello',
    address: { addressLocality: 'Bello', addressRegion: 'Antioquia', addressCountry: 'CO' },
    geo: { latitude: 6.3, longitude: -75.5 }, aggregateRating: { ratingValue: 5 },
  } }, { '@type': 'SearchAction' }] }, 'https://espinalservicios.com');
  assert.equal(audit.entities.length, 1);
  assert.equal(audit.issues.length, 6);
});

test('accepts stable business identity and references without pretending they are full entities', () => {
  const audit = inspectBusinessSchemas([{ '@id': 'https://espinalservicios.com/#business' }, {
    '@type': 'HomeAndConstructionBusiness', '@id': 'https://espinalservicios.com/#business',
    url: 'https://espinalservicios.com', mainEntityOfPage: 'https://espinalservicios.com/',
    address: { addressLocality: 'Medellín', addressRegion: 'Antioquia', addressCountry: 'CO' },
  }], 'https://espinalservicios.com');
  assert.equal(audit.entities.length, 1);
  assert.deepEqual(audit.issues, []);
});

test('Googlebot uses its own group, longest path and Allow on a specificity tie', () => {
  const robots = 'User-agent: *\nDisallow: /\nUser-agent: Googlebot\nDisallow: /privado\nAllow: /privado/publico\nDisallow: /empate\nAllow: /empate';
  assert.equal(googlebotAllowed(robots, '/blog'), true);
  assert.equal(googlebotAllowed(robots, '/privado/x'), false);
  assert.equal(googlebotAllowed(robots, '/privado/publico/x'), true);
  assert.equal(googlebotAllowed(robots, '/empate'), true);
  assert.equal(googlebotAllowed('User-agent: *\nDisallow: /*?\nDisallow: /final$', '/final-extra'), true);
  assert.equal(googlebotAllowed('User-agent: *\nDisallow: /*?\nDisallow: /final$', '/blog?q=algo'), false);
});

test('broken JSON-LD is surfaced instead of silently omitted', () => {
  assert.equal(parseHtml('<script type="application/ld+json">{"broken":}</script>').schemaErrors.length, 1);
});
