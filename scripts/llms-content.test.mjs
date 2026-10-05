import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { COVERAGE_AREAS } from "../lib/coverage-areas.ts";

const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
const conversionSource = await readFile(new URL("../lib/conversion.ts", import.meta.url), "utf8");
const blogSource = await readFile(new URL("../lib/blog-data.ts", import.meta.url), "utf8");
const catalogSource = conversionSource.slice(
  conversionSource.indexOf("export const SERVICE_DATA"),
  conversionSource.indexOf("export const URGENCY_OPTIONS"),
);
const services = [...catalogSource.matchAll(/name:\s*"([^"]+)"[\s\S]*?basePrice:\s*"([^"]+)"/g)]
  .map(([, name, basePrice]) => ({ name, basePrice }));
const blogSlugs = [...blogSource.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map(([, slug]) => slug);

test("llms summary stays aligned with the complete coverage inventory", () => {
  assert.match(llms, new RegExp(`atiende ${COVERAGE_AREAS.length} municipios`, "i"));
  for (const area of COVERAGE_AREAS) {
    assert.match(llms, new RegExp(`https://espinalservicios\\.com/cobertura/${area.slug}(?:\\s|$)`));
    assert.ok(llms.includes(area.name), area.name);
  }
});

test("llms summary preserves current catalog names and starting references", () => {
  assert.equal(services.length, 24);
  for (const service of services) {
    assert.ok(llms.includes(service.name), service.name);
    assert.ok(llms.includes(service.basePrice), `${service.name}: ${service.basePrice}`);
  }
});

test("llms summary avoids superseded claims and points to canonical indexes", () => {
  assert.doesNotMatch(llms, /Atendemos en 12 municipios/i);
  assert.doesNotMatch(llms, /\$800\.000-\$1\.200\.000|\$18\.000-\$30\.000\/m²/i);
  assert.doesNotMatch(llms, /te damos el precio exacto|incluyen revisión de presión del agua, detección de fugas/i);
  assert.match(llms, /Soluciones: https:\/\/espinalservicios\.com\/soluciones/);
  assert.match(llms, /Cobertura: https:\/\/espinalservicios\.com\/cobertura/);
});

test("llms summary links every current editorial guide", () => {
  assert.equal(blogSlugs.length, 12);
  for (const slug of blogSlugs) {
    assert.ok(llms.includes(`https://espinalservicios.com/blog/${slug}`), slug);
  }
});
