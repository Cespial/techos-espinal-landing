/** Regenerate stable social PNGs: node scripts/render-illustrated-og.mjs [proof-directory]
 * Uses the same TSX composition as the Next municipality route, TypeScript already in
 * devDependencies, and the installed Next/OG + Sharp runtime. No build or network needed.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire, Module } from "node:module";
import { resolve, dirname } from "node:path";
import ts from "typescript";
import React from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const root = process.cwd();
const require = createRequire(import.meta.url);
const cache = new Map();
// Compile only project-owned source modules in memory; resolve the existing @ alias.
async function loadSource(relative) {
  if (cache.has(relative)) return cache.get(relative);
  const filename = resolve(root, relative);
  const source = await readFile(filename, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  const dependencies = {};
  for (const match of compiled.outputText.matchAll(/require\("(@\/[^"]+)"\)/g)) {
    const local = match[1].slice(2);
    const extension = local.startsWith("components/") ? ".tsx" : ".ts";
    dependencies[match[1]] = await loadSource(`${local}${extension}`);
  }
  const compiledModule = new Module(filename);
  compiledModule.filename = filename;
  compiledModule.paths = Module._nodeModulePaths(dirname(filename));
  compiledModule.require = (id) => dependencies[id] ?? require(id);
  compiledModule._compile(compiled.outputText, filename);
  cache.set(relative, compiledModule.exports);
  return compiledModule.exports;
}

const { OG_SIZE, OgFrame, loadOgAssets, STATIC_OG_CARDS } = await loadSource("components/og/shared.tsx");
const outputDir = resolve(root, "public/og");
const manifestPath = resolve(root, "public/brand/asset-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const results = [];
for (const { file, image, ...copy } of STATIC_OG_CARDS) {
  const { fonts, ...artwork } = await loadOgAssets(image);
  const response = new ImageResponse(React.createElement(OgFrame, { ...copy, ...artwork }), { ...OG_SIZE, fonts });
  // Palette PNG keeps illustration detail and readable text without a multi-megabyte card.
  const png = await sharp(Buffer.from(await response.arrayBuffer())).png({ palette: true, quality: 95, colours: 256, dither: 0.8, compressionLevel: 9 }).toBuffer();
  await writeFile(resolve(outputDir, file), png);
  const sha256 = createHash("sha256").update(png).digest("hex");
  const record = manifest.files.find((item) => item.destination === `public/og/${file}`);
  if (!record) throw new Error(`Missing manifest entry: ${file}`);
  Object.assign(record, { source: `scripts/render-illustrated-og.mjs:${file}`, bytes: png.length, sha256 });
  results.push({ file, ...OG_SIZE, bytes: png.length, sha256 });
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

if (process.argv[2]) {
  const proofDir = resolve(process.argv[2]);
  await mkdir(proofDir, { recursive: true });
  const { MUNICIPALITY_SEO } = await loadSource("lib/seo-data.ts");
  for (const municipality of MUNICIPALITY_SEO) {
    const { fonts, ...artwork } = await loadOgAssets(`municipio-${municipality.slug}`);
    const response = new ImageResponse(React.createElement(OgFrame, {
      ...artwork, eyebrow: `${municipality.name} · Antioquia`, title: `Multiservicios\nen ${municipality.name}`,
      subtitle: "Techos, pintura y plomería.\nVamos a tu casa o negocio.", imageFit: "contain",
    }), { ...OG_SIZE, fonts });
    await writeFile(resolve(proofDir, `${municipality.slug}.png`), Buffer.from(await response.arrayBuffer()));
  }
  await writeFile(resolve(proofDir, "static-og-verification.json"), `${JSON.stringify(results, null, 2)}\n`);
}
console.log(JSON.stringify(results, null, 2));
