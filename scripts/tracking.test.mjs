import test from 'node:test';
import assert from 'node:assert/strict';
import { gtag, normalizeCtaParams, normalizeMunicipality, trackCall, trackWhatsApp, trackingContextFromPath } from '../lib/tracking.ts';

function withWindow(win, callback) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { value: win, configurable: true });
  try { callback(); }
  finally {
    if (previous) Object.defineProperty(globalThis, 'window', previous);
    else delete globalThis.window;
  }
}

test('gtag queues the official arguments object, including calls before GA loads', () => {
  const win = {};
  withWindow(win, () => gtag('event', 'sample', { value: 3 }));
  assert.equal(win.dataLayer.length, 1);
  assert.equal(Object.prototype.toString.call(win.dataLayer[0]), '[object Arguments]');
  assert.equal(Array.isArray(win.dataLayer[0]), false);
  assert.deepEqual(Array.from(win.dataLayer[0]), ['event', 'sample', { value: 3 }]);
});

test('one contact activation queues exactly one event without a second page-view or duplicate conversion', () => {
  const win = { dataLayer: [] };
  withWindow(win, () => {
    trackWhatsApp({ source: 'hero', page_type: 'servicio', linea: 'techos', municipio: 'Medellín' });
    assert.equal(win.dataLayer.length, 1);
    assert.equal(win.dataLayer[0][1], 'cta_whatsapp_click');
    trackCall({ source: 'footer', page_type: 'cobertura', municipio: 'Bello' });
    assert.equal(win.dataLayer.length, 2);
    assert.equal(win.dataLayer[1][1], 'cta_call_click');
  });
});

test('WhatsApp and phone events share normalized municipalities, service IDs and defaults', () => {
  assert.equal(normalizeMunicipality('  MEDELLÍN  '), 'medellin');
  assert.equal(normalizeMunicipality('La Estrella'), 'la-estrella');
  assert.equal(normalizeMunicipality('La_Ceja'), 'la-ceja');
  assert.equal(normalizeMunicipality('Barbosa'), 'barbosa');
  assert.equal(normalizeMunicipality('Calle 10, apartamento 302'), 'general');
  const payload = normalizeCtaParams({ source: 'service_card', page_type: 'solucion', municipio: 'Itagüí', servicio: 'Protección contra goteras en el techo' });
  assert.deepEqual(payload, { source: 'service_card', page_type: 'solucion', linea: 'general', municipio: 'itagui', servicio: 'impermeabilizacion-cubiertas' });
});

test('free text and undeclared fields never enter the event payload or dataLayer', () => {
  const win = {};
  withWindow(win, () => trackWhatsApp({
    source: 'composer', page_type: 'home', linea: 'email@example.com', municipio: 'Carrera 55 #44',
    servicio: 'Soy Ana, teléfono 3001234567', nombre: 'Ana', telefono: '3001234567', email: 'email@example.com',
    problema: 'Mi casa...', context: 'Texto libre', user_id: 'unexpected',
  }));
  assert.deepEqual(win.dataLayer[0][2], { source: 'composer', page_type: 'home', linea: 'general', municipio: 'general' });
  assert.equal(normalizeCtaParams({ source: 'Nombre propio', page_type: 'home' }), null);
  assert.equal(normalizeCtaParams({ source: 'hero', page_type: 'email@example.com' }), null);
});

test('solution labels retain the catalog service ID even when their public names differ', () => {
  const solutions = [
    ['Reparación de goteras', 'reparacion-goteras'],
    ['Pintura interior', 'pintura-interior'],
    ['Reparación de fugas de agua', 'reparacion-fugas'],
    ['Impermeabilización de techos', 'impermeabilizacion-cubiertas'],
    ['Destape de desagües', 'destape-desagues'],
  ];
  for (const [name, id] of solutions) {
    const payload = normalizeCtaParams({ source: 'hero', page_type: 'solucion', servicio: name });
    assert.equal(payload.servicio, id, name);
  }
});

test('blocked or unavailable analytics cannot throw into the contact handler', () => {
  assert.doesNotThrow(() => trackCall({ source: 'footer', page_type: 'home' }));
  withWindow({ dataLayer: { push() { throw new Error('blocked'); } } }, () => {
    assert.doesNotThrow(() => trackWhatsApp({ source: 'hero', page_type: 'home' }));
  });
});

test('footer resolves route context without taking arbitrary path/query text as an analytics value', () => {
  assert.deepEqual(trackingContextFromPath('/servicios/techos/bello'), { page_type: 'servicio_municipio', linea: 'techos', municipio: 'bello' });
  assert.deepEqual(trackingContextFromPath('/cobertura/medellin'), { page_type: 'cobertura', linea: 'general', municipio: 'medellin' });
  assert.deepEqual(trackingContextFromPath('/soluciones/reparacion-fugas-agua'), { page_type: 'solucion', linea: 'plomeria', municipio: 'general' });
  assert.equal(trackingContextFromPath('/soluciones').page_type, 'soluciones_index');
  assert.equal(trackingContextFromPath('/blog').page_type, 'blog_index');
  assert.equal(trackingContextFromPath('/blog/precios').page_type, 'blog');
  assert.equal(trackingContextFromPath('/?nombre=Ana').page_type, 'home');
  assert.deepEqual(trackingContextFromPath('/cobertura/ana@example.com'), { page_type: 'cobertura', linea: 'general', municipio: 'general' });
});
