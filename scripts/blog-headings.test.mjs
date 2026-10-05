import test from 'node:test';
import assert from 'node:assert/strict';
import { createHeadingId } from '../lib/blog-headings.ts';

test('repeated section names navigate to distinct anchors', () => {
  const id = createHeadingId();
  assert.deepEqual(Array.from({ length: 6 }, () => id('Ventajas')),
    ['ventajas', 'ventajas-2', 'ventajas-3', 'ventajas-4', 'ventajas-5', 'ventajas-6']);
});

test('explicit numeric titles and accent variants cannot collide', () => {
  const id = createHeadingId();
  const ids = ['Precio aproximado', 'Precio aproximado 2', 'Precio aproximado', 'Précio aproximado', '!!!'].map(id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids[0], 'precio-aproximado');
  assert.equal(ids[2], 'precio-aproximado-3');
});

test('each article has an independent stable anchor sequence', () => {
  const first = createHeadingId();
  first('Ventajas'); first('Ventajas');
  assert.equal(createHeadingId()('Ventajas'), 'ventajas');
});
