import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CROSS_PAGE_SEO,
  MUNICIPALITY_PROFILE,
  MUNICIPALITY_SEO,
  SERVICE_LINE_SEO,
} from '../lib/seo-data.ts';

test('every service and municipality combination has complete unique metadata', () => {
  assert.equal(CROSS_PAGE_SEO.length, SERVICE_LINE_SEO.length * MUNICIPALITY_SEO.length);
  assert.equal(new Set(CROSS_PAGE_SEO.map((page) => page.title)).size, CROSS_PAGE_SEO.length);
  assert.equal(new Set(CROSS_PAGE_SEO.map((page) => page.metaDescription)).size, CROSS_PAGE_SEO.length);

  for (const page of CROSS_PAGE_SEO) {
    assert.match(page.metaDescription, /\.$/, `${page.lineSlug}/${page.municipioSlug}`);
    assert.ok(page.metaDescription.length <= 160, `${page.lineSlug}/${page.municipioSlug}: ${page.metaDescription.length}`);
    assert.ok(page.title.length <= 60, `${page.lineSlug}/${page.municipioSlug}: title ${page.title.length}`);
    assert.ok(page.metaDescription.includes(page.municipioName));
  }
});

test('representative metadata never ends in a mechanically cut word', () => {
  const samples = [
    ['techos', 'girardota'],
    ['techos', 'medellin'],
    ['techos', 'la-estrella'],
  ];
  for (const [line, municipality] of samples) {
    const page = CROSS_PAGE_SEO.find((item) => item.lineSlug === line && item.municipioSlug === municipality);
    assert.ok(page);
    assert.match(page.metaDescription, /Alcance y precio por escrito\.$/);
  }
});

test('local copy avoids unsupported timing, climate and material promises', () => {
  const copy = CROSS_PAGE_SEO.flatMap((page) => [
    page.intro,
    page.metaDescription,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]).join('\n');
  const banned = [
    /mismo día/i,
    /\b[1-9]\s*(?:a|–|-)\s*[1-9]\s*días/i,
    /medio día/i,
    /llueve más/i,
    /tuberías antiguas/i,
    /manto asfáltico|poliuretano|silicona elastomérica/i,
    /herramientas profesionales|resultado efectivo/i,
  ];
  for (const pattern of banned) assert.doesNotMatch(copy, pattern);
});

test('municipality profiles describe coordination instead of inferred local damage', () => {
  assert.deepEqual(Object.keys(MUNICIPALITY_PROFILE).sort(), MUNICIPALITY_SEO.map((item) => item.slug).sort());
  for (const [slug, profile] of Object.entries(MUNICIPALITY_PROFILE)) {
    assert.ok(profile.sectors.length >= 6, slug);
    assert.ok(profile.propertyTypes.length > 10, slug);
    assert.match(profile.bookingNote, /ind[ií]ca|comparte|envía/i, slug);
    assert.equal('climate' in profile, false, slug);
    assert.equal('housing' in profile, false, slug);
  }
});
