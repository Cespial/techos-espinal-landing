# DIAGNÓSTICO PROFUNDO — Tu Página en 48

> Post-Wave 6. Auditoría completa de las 11 secciones del site.
> Fecha: 2026-02-22
> Baseline: https://tu-pagina-en-48.vercel.app

---

## 1. RESUMEN EJECUTIVO

El header (Navbar + Hero + FlowDiagram) está en un **nivel alto** tras las 6 Waves. Pero de Stats hacia abajo, el site pierde consistencia estética, tiene problemas de ritmo, y varias secciones no alcanzan el estándar editorial de las referencias (SignalLayer / AI SDK Agents).

**Las 3 secciones más urgentes**: Stats, Catalog, Plans.
**Las 2 oportunidades más grandes**: ProblemSolution (ya es ambiciosa pero tiene inconsistencias de color/glow) y Portfolio (se siente incompleta — solo testimoniales, no portafolio visual).

---

## 2. ANÁLISIS SECCIÓN POR SECCIÓN

### 2.1 Navbar — Nivel: ALTO (post-W1/W5)

| Aspecto | Estado | Nota |
|---|---|---|
| Border transparente/scroll | OK | Transición suave |
| Altura idle 72px | OK | Generosa, editorial |
| Dash indicator 16px centrado | OK | Patrón Vercel |
| Nav-link-hover underline | OK | Animación CSS 0.2s |
| Mobile drawer | OK | Border condicional |
| CTA navbar | OK | Sin pulse, limpio |

**Problemas menores**:
- `className={cn("hidden font-sans text-body-sm font-medium md:inline-flex", "")}` — el string vacío `""` como segundo argumento de `cn()` es ruido. Limpiar.
- El CTA del navbar dice "Quiero mi página" sin flecha, pero el hero sí tiene `→`. Inconsistencia menor de copy.

**vs. Referencia**: El navbar de SignalLayer tiene un CTA con borde visible ("Book a Demo") vs. nuestro primary negro. Ambos válidos. El de AI SDK Agents tiene un CTA de acento (azul). Nuestro negro funciona bien con la paleta monocroma.

---

### 2.2 Hero — Nivel: ALTO (post-W2/W3/W4/W5)

| Aspecto | Estado | Nota |
|---|---|---|
| Left-aligned desktop | OK | md:text-left |
| H1 clamp 2.5rem–5rem | OK | Controlado |
| Badge green dot | OK | Pulsante, sutil |
| hero-bg gradient | OK | #FAFAFA→#F7F7F7→#FFF |
| Fade-out ::after | OK | 120px transparente |
| CTA shadows | OK | Elevación con hover |
| Stagger timing | OK | Rítmico |

**Problemas**:
- **H1 hardcoded en JSX**: `"Tu Página Web<br/>Profesional en 48 Horas"` está directamente en el componente, no en `constants.ts`. Inconsistente — `HERO.badge` y `HERO.subheadline` sí vienen de constants pero el H1 no.
- **`fullWidth` en CTAs mobile**: Ambos botones tienen `fullWidth` prop, pero en desktop `md:w-auto` lo cancela. Funciona, pero el secondary CTA no tiene `md:w-auto` — Error: SÍ lo tiene, ambos están bien.
- **El hero left-aligned pero el badge centrado en mobile**: El badge es `inline-flex` dentro de `text-center md:text-left`, así que en mobile se centra correctamente y en desktop se alinea a la izquierda. OK.

**vs. Referencia**: SignalLayer tiene hero centrado; AI SDK Agents tiene hero left-aligned con visual a la derecha (halftone sphere). Nuestro hero es left-aligned **sin visual counterbalance a la derecha**. El lado derecho del hero en desktop queda vacío. Esto no es un problema per se (hay sites editoriales que lo hacen), pero hay oportunidad de agregar un elemento visual sutil.

---

### 2.3 FlowDiagram — Nivel: ALTO (post-W6)

| Aspecto | Estado | Nota |
|---|---|---|
| Sección standalone | OK | Con overline + heading |
| Card wrapper | OK | rounded-2xl, border, bg-alt |
| Connector vertical | OK | Gradient CSS |
| SVG responsive | OK | Desktop horizontal + mobile vertical |
| Animaciones inView | OK | Stagger progresivo |

**Problemas**:
- **El overline "Nuestro proceso"** usa `text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary`. Esto no coincide con el pattern del `SectionHeading` component que usa `text-overline`. ¿Existe `text-overline` en los tokens? Necesita verificarse — no está definido como token en `@theme inline` pero se usa en Footer como clase.
- **No usa `SectionHeading`**: FlowDiagram tiene su propio heading inline mientras todas las demás secciones usan `SectionHeading`. Inconsistencia deliberada (quería overline + heading más compacto) pero rompe el patrón.
- **`compact` prop eliminado** pero el tipo `FlowDiagramProps` ya no lo tiene. Limpio.

**vs. Referencia**: Muy cercano a SignalLayer (cajas punteadas, conectores, numeración). La card wrapper le da la separación visual del fondo que la referencia logra con el grid background.

---

### 2.4 Stats — Nivel: MEDIO-BAJO ⚠️

| Aspecto | Estado | Problema |
|---|---|---|
| Valores animados | OK | Spring counter funcional |
| Grid 4 columnas | OK | Responsive |
| **Pulse glow violeta** | MAL | `bg-violet-400/25 blur-xl` — color violeta rompe la paleta monocroma |
| **Datos duplicados** | MAL | Stats hardcoded en el componente (no usa `STATS` de constants.ts) + el componente tiene 4 stats pero constants.ts tiene 3 |
| **Border-y genérico** | DÉBIL | `border-y border-border` es funcional pero no editorial |
| **Sin heading** | DÉBIL | Es la única sección de contenido sin heading/contexto |
| Spacing | OK | py-16, adecuado para una franja |

**Problemas graves**:
1. **Violeta**: El glow pulse (`bg-violet-400/25`) introduce un color que NO existe en la paleta. El site es monocroma + verde accent. Violeta no tiene razón de ser.
2. **Datos desincronizados**: El componente define sus propios `STATS` con 4 items (incluyendo `$1M COP`) mientras `constants.ts` tiene solo 3 sin ese. Fuente de verdad rota.
3. **"Desde COP"** como label es confuso. ¿Desde qué? El prefix `$` y suffix `M` producen `$1M` pero el label dice "Desde COP" — debería ser "Desde" con el valor mostrando `$1M COP`.

**vs. Referencia**: SignalLayer tiene "Trusted by 240+ B2B SaaS teams" como un badge simple. No tiene una sección de stats separada. AI SDK Agents tiene pills de tech ("Next.js v16", "AI SDK v6"). Nuestra barra de stats puede funcionar pero necesita coherencia visual.

---

### 2.5 ProblemSolution — Nivel: MEDIO ⚠️

| Aspecto | Estado | Problema |
|---|---|---|
| Scrollytelling desktop | IMPRESIONANTE | Scroll-driven con sticky, parallax, phases |
| Mobile fallback | OK | Estático, legible |
| Reduced-motion fallback | OK | Layout grid estático |
| **Colores violeta/cyan** | MAL | `violet-400/18`, `cyan-300/15`, `violet-500/15`, `cyan-400/20` — rompen paleta monocroma |
| **Texto rojo** | CUESTIONABLE | `text-[#7a1f1f]` para warnings — no está en tokens, color hardcoded |
| **"73%" stat** | SIN FUENTE | "73% de profesionales en Colombia no tienen página web" — ¿fuente verificable? Si no, debería marcarse como estimación |
| **Problem tint rojo** | MAL | `rgba(176, 24, 24, ...)` como background tint — introduce rojo al site monocroma |
| Copy interna vs constants | MAL | `PROBLEMS` está hardcoded en el componente, no usa `PROBLEM_SEQUENCE` de constants.ts |

**Problemas graves**:
1. **Paleta rota**: Esta sección introduce violeta, cyan Y rojo. Es la sección más "colorida" del site, lo cual contradice la restricción monocroma. Los glows decorativos (violet/cyan) no aportan info funcional.
2. **Datos duplicados**: El componente define su propio array `PROBLEMS` (4 items con texto diferente) mientras `constants.ts` tiene `PROBLEM_SEQUENCE` (4 items con textos distintos). Dos fuentes de verdad.
3. **Complejidad**: El componente tiene 447 líneas con 4 sub-componentes (DesktopProblemPhrase, DesktopScrollytelling, MobileNarrative, ReducedMotionFallback). Es el componente más complejo del site. El scrollytelling es impresionante pero el ROI es cuestionable para el ICP (profesionales no-técnicos que probablemente scrollean rápido).

**vs. Referencia**: Ni SignalLayer ni AI SDK Agents tienen scrollytelling. Ambos usan secciones estáticas con layout limpio. Nuestra sección es más ambiciosa pero menos controlada visualmente.

---

### 2.6 Catalog — Nivel: MEDIO

| Aspecto | Estado | Problema |
|---|---|---|
| Grid 4 columnas | OK | Responsive con gaps escalados |
| Cards con spotlight hover | BUENO | Radial gradient sigue mouse |
| Lucide icons | OK | Reemplazaron emojis (bien) |
| **Datos duplicados** | MAL | `CATALOG` hardcoded en componente, diferente al de constants.ts (constants usa emojis + colores, componente usa Lucide icons) |
| **Cards genéricas** | DÉBIL | Todas iguales, sin diferenciación visual entre profesiones |
| **Sin CTA por card** | DÉBIL | Las cards son informativas pero no llevan a ninguna acción |
| **Hover shadow hardcoded** | MENOR | `shadow-[0_18px_35px_-30px_rgba(10,10,10,0.3)]` — no es un token |
| Min-height fija | OK | 170px/182px, previene saltos |

**Problemas**:
1. **Datos desincronizados**: `constants.ts` tiene un `CATALOG` con emojis y colores, pero el componente define su propio `CATALOG` con Lucide icons. La constante en constants.ts es dead code.
2. **Cards informativas sin acción**: El usuario lee "Psicóloga — Para que tus pacientes te encuentren..." pero no hay botón, link, ni indicación de qué hacer. ¿Debería cada card llevar a un anchor de Plans con el plan pre-seleccionado? ¿O a WhatsApp con el tipo de negocio pre-llenado?
3. **SectionHeading OK**: Usa el componente estándar. Bien.

**vs. Referencia**: SignalLayer no tiene algo comparable. AI SDK Agents tiene cards de patterns/templates con imagen preview. Nuestras cards son más abstractas — solo texto + icono. Agregar un elemento visual (screenshot mockup, patrón de diseño) las elevaría.

---

### 2.7 HowItWorks — Nivel: MEDIO-ALTO

| Aspecto | Estado | Nota |
|---|---|---|
| 3 pasos numerados | OK | Claro y conciso |
| Dashed connector SVG | BUENO | Animación pathLength |
| Sparkles icon bounce | BUENO | Scale spring |
| SectionHeading | OK | Componente estándar |
| Datos de constants.ts | OK | Usa `STEPS` — ¡bien! |

**Problemas menores**:
- **Numeración duplicada**: Los números grandes ("01", "02", "03") están como texto decorativo gigante + el Sparkles icon circulado. Es doble indicador de progreso. Uno sobra.
- **Números gigantes** muy light: `text-text-tertiary/25` (opacity ~6.25%). Casi invisibles. Si van a estar, que tengan presencia. Si no, quitar.
- **El dashed connector** entre pasos es vertical (SVG 2×48). Funciona pero es muy simple comparado con el FlowDiagram.
- **Padding interno**: `gap-5 md:gap-6` entre número y contenido. Adecuado.

**vs. Referencia**: Ambas referencias manejan "cómo funciona" con diagramas visuales, no con steps textuales. Ya tenemos el FlowDiagram como sección visual de proceso. HowItWorks es redundante en concepto (ambos explican el proceso) pero complementario en formato (uno visual, otro textual). Evaluar si combinar o diferenciar mejor.

---

### 2.8 Plans — Nivel: MEDIO

| Aspecto | Estado | Problema |
|---|---|---|
| 3 cards en grid | OK | Responsive |
| Plan Profesional destacado | OK | border-2, shadow, glow, badge "Más popular" |
| Precios con serif | OK | Playfair, clamp |
| Features con checks | OK | Lucide Check icon |
| CTAs con tracking | OK | data-cta attrs |
| **Glow violeta** | MAL | `violet-400/18`, `cyan-300/15` — misma paleta rota que ProblemSolution |
| **plan-professional-glow** | MAL | Animación pulse violeta infinita |
| **Card radius inconsistente** | MAL | `rounded-lg` (8px) en cards, pero Button es `rounded-[10px]`. Sin coherencia |
| **Shadow hardcoded** | MENOR | Dos sombras diferentes hardcoded (popular vs normal) |
| **"pago único"** como texto suelto | DÉBIL | No tiene peso visual, se pierde |
| Orden mobile | OK | `order-first` para Profesional |

**Problemas graves**:
1. **Violeta de nuevo**: El glow del plan Profesional usa `violet-400/18 via-cyan-300/15` — exactamente el mismo problema que ProblemSolution. Toda la "decoración de color" del site es violeta/cyan, lo cual contradice la paleta monocroma declarada.
2. **Cards `rounded-lg` (8px)** mientras botones son `rounded-[10px]`. Las Catalog cards también son `rounded-lg`. Necesitan alinearse.
3. **No hay comparativa clara**: El usuario tiene que leer 8 features por plan para comparar. Una tabla comparativa (como la de Linear pricing) sería más escaneable.
4. **El badge "Más popular"** tiene `bg-foreground text-white rounded-full` — esto es un chip flotante con `-top-3 -translate-x-1/2`. Funciona pero es un patrón visual que no se usa en ningún otro lugar del site.

**vs. Referencia**: SignalLayer tiene "Pricing" como sección separada (no visible en el hero screenshot pero mencionada en nav). El estándar editorial es tabla limpia, alternating rows, highlight column. Nuestras cards son funcionales pero no editoriales.

---

### 2.9 Portfolio — Nivel: BAJO ⚠️⚠️

| Aspecto | Estado | Problema |
|---|---|---|
| **Nombre engañoso** | MAL | Se llama "Portfolio" pero muestra solo TESTIMONIALS, no proyectos/screenshots |
| Carousel horizontal mobile | OK | snap-x funcional |
| Progress bar mobile | OK | Animated scaleX |
| **Sin portafolio visual** | MAL | 0 imágenes, 0 screenshots, 0 mockups de páginas entregadas |
| **Solo 3 testimoniales** | DÉBIL | Poco volumen de prueba social |
| **`PROJECTS` no se usa** | MAL | constants.ts tiene `PROJECTS` (4 items con resultados) pero el componente no los muestra |
| **Quote styling** | DÉBIL | `text-body-lg` / `text-h2-sm` — no existe `text-h2-sm` en tokens |
| **CTA "Quiero resultados así"** | OK | Buen copy contextual |
| Shadow inconsistente | MENOR | `shadow-[0_15px_30px_-28px_rgba(10,10,10,0.35)]` |

**Problemas graves**:
1. **No hay portafolio real**: La sección se llama Portfolio pero muestra testimoniales. Los `PROJECTS` en constants.ts (Dra. María López, Restaurante El Fogón, etc.) con resultados cuantitativos no se renderizan en ningún lado. Esto es la pieza de prueba social más fuerte y está sin usar.
2. **Sin evidencia visual**: Un servicio de diseño web debería mostrar screenshots/mockups de las páginas entregadas. Es la prueba más convincente. Actualmente hay 0 imágenes en todo el site.
3. **`text-h2-sm` no existe**: Se usa `md:text-h2-sm` en las blockquotes pero no hay token definido para esto. Probablemente se resuelve a un default.

**vs. Referencia**: SignalLayer tiene "Cases" como sección. AI SDK Agents tiene preview cards de patterns con thumbnails. Ambos muestran evidencia visual. Nuestra sección es la más débil del site.

---

### 2.10 FinalCTA — Nivel: MEDIO-ALTO

| Aspecto | Estado | Nota |
|---|---|---|
| Form con react-hook-form | OK | Validación, error states |
| GA tracking en submit + plan_select | OK | Detallado |
| WhatsApp redirect | OK | window.open con noopener |
| H2 con blur animation | BUENO | Efecto editorial |
| **Focus states violeta** | MAL | `focus:border-[rgba(124,58,237,0.5)]` + `focus:shadow-[...rgba(124,58,237,...)]` — VIOLETA de nuevo |
| **Card shadow hardcoded** | MENOR | `shadow-[0_20px_45px_-35px_rgba(10,10,10,0.4)]` |
| Form centrado | OK | max-w-2xl + max-w-lg |
| Error states rojo | OK | `border-red-400`, `text-red-600` — aceptable para errores |

**Problemas**:
1. **Focus ring violeta**: Los inputs usan `focus:border-[rgba(124,58,237,0.5)]` y un shadow con violeta. Esto contradice la paleta monocroma. Los focus rings del site base son `outline: 2px solid #0A0A0A` — los inputs deberían usar el mismo lenguaje visual (negro o foreground).
2. **`react-hook-form`** como dependencia no listada en el inventario. Funcional pero agregar a la documentación.
3. **Copy**: "Escríbenos hoy y mañana ya tienes tu página publicada" — ¿es literalmente cierto? Si el proceso es 48h, "mañana" puede ser falso. Sugerir: "Escríbenos hoy y en 48 horas tienes tu página publicada."

**vs. Referencia**: SignalLayer tiene "Book a Strategy Demo" como CTA final — formulario embebido. Estamos alineados en el patrón. Nuestro form es más completo (nombre, WhatsApp, negocio, plan) lo cual es bueno para calificar leads.

---

### 2.11 Footer — Nivel: MEDIO

| Aspecto | Estado | Nota |
|---|---|---|
| Grid 4 columnas | OK | Responsive |
| Links con min-h-11 | OK | Touch target 44px |
| Logo + tagline | OK | Consistente |
| Copyright dinámico | OK | `new Date().getFullYear()` |
| **Order inconsistente** | DÉBIL | `order-1 lg:order-4` para Contacto, `order-4 lg:order-1` para logo — funciona pero es confuso en el código |
| **Sin links legales** | FALTA | No hay Términos, Privacidad, ni Política de cookies |
| **"Hecho en Medellín"** | OK | Diferenciador local |

**Problemas menores**:
1. **Sin páginas legales**: Falta links a Términos de Servicio y Política de Privacidad. Para un negocio que cobra $1M–$3M COP, es necesario.
2. **El footer no tiene la clase `dot-grid-bg`**: Está fuera del wrapper en page.tsx. El footer tiene fondo blanco puro, lo cual está bien (diferenciación).

---

### 2.12 WhatsAppFloat — Nivel: ALTO

| Aspecto | Estado | Nota |
|---|---|---|
| Aparece después de 3s | OK | Delay razonable |
| aria-label | OK | "Contactar por WhatsApp" |
| CTA tracking | OK | data-cta attrs completos |
| Safe area insets | OK | env() margins |
| **Icono genérico** | MENOR | `MessageCircle` de Lucide vs. icono real de WhatsApp. El usuario colombiano reconoce el logo de WhatsApp instantáneamente — el icono genérico pierde reconocimiento |
| **Color negro** | CUESTIONABLE | `bg-foreground` (negro) es coherente con la paleta pero WhatsApp es verde. El negro pierde la asociación visual |

---

## 3. PROBLEMAS TRANSVERSALES

### 3.1 Paleta de colores ROTA

El problema más grave del site es la **incosistencia de color**. La paleta declarada es monocroma (negro/blanco/grises) + verde accent (#22C55E solo para badge dot). Pero en la práctica:

| Color intruso | Dónde aparece | Uso |
|---|---|---|
| `violet-400/25` | Stats (pulse glow) | Decorativo |
| `violet-400/18` | Plans (professional glow) | Decorativo |
| `violet-500/15` | ProblemSolution (solution glow) | Decorativo |
| `cyan-300/15` | Plans (professional glow) | Decorativo |
| `cyan-400/20` | ProblemSolution (promise glow) | Decorativo |
| `rgba(176,24,24,...)` | ProblemSolution (tint) | Semántico (peligro) |
| `#7a1f1f` | ProblemSolution (warning text) | Semántico |
| `rgba(124,58,237,...)` | FinalCTA (input focus) | Estado |

**Decisión**: Eliminar TODOS los violetas/cyans decorativos. Reemplazar con grises (glows monocromos `foreground/10` o `foreground/5`) o eliminar por completo. Los rojos semánticos (errores) pueden quedarse pero usando tokens estándar de Tailwind (`red-500`, `red-600`).

### 3.2 Datos duplicados (constants vs componentes)

| Componente | Datos propios | Constante en constants.ts | ¿Sincronizados? |
|---|---|---|---|
| Stats | `STATS` (4 items, con $1M) | `STATS` (3 items, sin $1M) | NO |
| ProblemSolution | `PROBLEMS` (4 items) | `PROBLEM_SEQUENCE` (4 items, textos distintos) | NO |
| Catalog | `CATALOG` (8 items, Lucide icons) | `CATALOG` (8 items, emojis + colores) | NO |
| HowItWorks | — | `STEPS` (3 items) | SÍ |
| Plans | — | `PLANS` (3 items) | SÍ |
| Portfolio | — | `TESTIMONIALS` (3 items) | SÍ |
| Portfolio | — | `PROJECTS` (4 items) | NO USADO |

**Decisión**: Consolidar. Una sola fuente de verdad por sección. Mover los datos actualizados al componente O a constants.ts, no ambos.

### 3.3 Border-radius inconsistente

| Componente | Radius |
|---|---|
| Button | `rounded-[10px]` |
| Catalog cards | `rounded-lg` (8px) |
| Plan cards | `rounded-lg` (8px) |
| Portfolio cards | `rounded-lg` (8px) |
| FlowDiagram card wrapper | `rounded-2xl` (16px) |
| ProblemSolution cards | `rounded-2xl` (16px) |
| Badge | `rounded-full` |
| FinalCTA form | `rounded-lg` (8px) |
| Inputs | `rounded-lg` (8px) |

**Decisión**: Estandarizar en 2-3 niveles: `rounded-[10px]` para cards/buttons interactivos, `rounded-2xl` para containers/wrappers grandes, `rounded-full` para badges/pills.

### 3.4 Sombras sin sistema

Hay 8+ sombras hardcoded diferentes en el site:

1. Navbar scroll: `0_1px_3px...0_6px_24px...`
2. Hero CTA: `0_1px_2px...0_4px_12px...`
3. Hero CTA hover: `0_2px_4px...0_8px_24px...`
4. Catalog card hover: `0_18px_35px_-30px...`
5. Plan cards (normal): `0_16px_30px_-28px...`
6. Plan cards (popular): `0_20px_45px_-30px...`
7. Portfolio cards: `0_15px_30px_-28px...`
8. FinalCTA form: `0_20px_45px_-35px...`

**Decisión**: Crear escala de sombras (3-4 niveles) como tokens y reusar.

### 3.5 Tokens tipográficos no formalizados

Se usan clases como `text-body`, `text-body-sm`, `text-body-lg`, `text-caption`, `text-tiny`, `text-overline`, `text-h3`, `text-h2-sm` pero **ninguno está definido como token en `@theme inline`**. Probablemente vienen de un preset de Tailwind o están definidos en otro lugar. Si no están definidos, se resuelven a defaults y el output tipográfico es impredecible.

---

## 4. RITMO Y FLOW DEL SITE

```
SECCIÓN          TIPO          DENSIDAD    VISUAL
─────────────────────────────────────────────────
Navbar           Chrome        —           —
Hero             Texto+CTA     Alta        hero-bg gradient
FlowDiagram      Visual        Media       SVG diagrama + card
Stats            Datos         Baja        Números animados ← TRANSICIÓN BRUSCA
ProblemSolution  Texto+scroll  Alta        Scrollytelling
Catalog          Cards         Media       Grid 4×2
HowItWorks      Texto+steps   Media       Steps + connectors
Plans            Cards         Alta        3 cards pricing
Portfolio        Cards         Media       Carousel testimonials
FinalCTA         Form          Alta        Formulario
Footer           Chrome        Baja        Links
```

**Problemas de ritmo**:
1. **FlowDiagram → Stats es abrupto**: Pasamos de una sección con card wrapper, overline, heading y diagrama SVG a una franja plana de números con `border-y`. No hay transición visual.
2. **Catalog → HowItWorks son redundantes en concepto**: Ambos contextualizan qué hace el servicio. Catalog dice "para quién" y HowItWorks dice "cómo". Están bien separados pero podrían fluir mejor.
3. **Plans → Portfolio → FinalCTA es correcto**: pricing → prueba social → acción. Buen funnel.
4. **ProblemSolution es un bloque muy largo** (min-h-[150vh] en desktop). El usuario pasa más tiempo aquí que en cualquier otra sección. El ROI de esa inversión de atención es cuestionable — el contenido podría entregarse en un tercio del espacio.

---

## 5. COMPARACIÓN CON REFERENCIAS

### vs. SignalLayer (Referencia A)

| Aspecto | SignalLayer | Tu Página en 48 | Gap |
|---|---|---|---|
| Grid de fondo | Dot grid uniforme, muy sutil | Dot grid solo en body sections | OK — similar |
| Tipografía headline | Serif alto contraste, centrada | Playfair left-aligned | OK — diferente pero válido |
| Diagrama de proceso | En el hero, integrado | Sección standalone post-hero | OK — ambos válidos |
| Social proof | Badge simple "Trusted by 240+" | Badge + Stats section | NUESTRO es más (quizás demasiado) |
| Color palette | 100% monocroma | Monocroma con violeta/cyan infiltrados | LIMPIAR |
| Cards | Bordes punteados, clean | Bordes sólidos, spotlight hover | OK |
| CTAs | Negro sólido + outline ghost | Negro sólido + outline ghost | ALINEADO |
| Spacing | Muy generoso | Generoso pero inconsistente | MEJORAR |

### vs. AI SDK Agents (Referencia B)

| Aspecto | AI SDK Agents | Tu Página en 48 | Gap |
|---|---|---|---|
| Hero background | Gris sutil → blanco | hero-bg gradient | ALINEADO |
| Hero visual | Halftone sphere | Sin visual | OPORTUNIDAD |
| Navbar border | Transparente en top | Transparente en top | ALINEADO |
| Tech pills | "Next.js v16", "AI SDK v6" | Badge de social proof | DIFERENTE, OK |
| Content cards | Con preview images | Solo texto + icono | OPORTUNIDAD |
| Layout | Left-aligned | Left-aligned | ALINEADO |

---

## 6. SCORING POR SECCIÓN

| Sección | Jerarquía | Legibilidad | Spacing | Consistencia | CTA | Mobile | Total /30 |
|---|---|---|---|---|---|---|---|
| Navbar | 5 | 5 | 5 | 5 | 4 | 5 | 29 |
| Hero | 5 | 5 | 5 | 5 | 5 | 5 | 30 |
| FlowDiagram | 4 | 5 | 4 | 4 | — | 4 | 21/25 |
| Stats | 3 | 4 | 3 | 2 | — | 4 | 16/25 |
| ProblemSolution | 4 | 4 | 3 | 2 | 3 | 4 | 20 |
| Catalog | 3 | 4 | 4 | 3 | 2 | 4 | 20 |
| HowItWorks | 4 | 5 | 4 | 4 | — | 4 | 21/25 |
| Plans | 3 | 4 | 3 | 2 | 4 | 3 | 19 |
| Portfolio | 2 | 4 | 3 | 2 | 4 | 3 | 18 |
| FinalCTA | 4 | 4 | 4 | 3 | 5 | 4 | 24 |
| Footer | 3 | 4 | 4 | 4 | 3 | 4 | 22 |

---

## 7. PRIORIZACIÓN

| Prioridad | Acción | Impacto | Esfuerzo |
|---|---|---|---|
| P0 | **Eliminar todos los violetas/cyans** — unificar paleta monocroma | Alto (consistencia) | Bajo |
| P0 | **Consolidar datos** — una fuente de verdad (constants.ts o componente, no ambos) | Alto (mantenibilidad) | Bajo |
| P1 | **Portfolio real** — agregar PROJECTS con resultados + screenshots/mockups | Alto (conversión) | Alto |
| P1 | **Stats → refactorizar** — sin glow violeta, datos desde constants, label clarity | Alto (consistencia) | Bajo |
| P1 | **Plans → limpiar glows** — glow monocromo o sin glow, radius consistente | Medio (consistencia) | Bajo |
| P2 | **FinalCTA inputs** — focus ring monocromo en vez de violeta | Medio (consistencia) | Bajo |
| P2 | **Border-radius** — estandarizar en 2-3 niveles | Medio (sistema) | Bajo |
| P2 | **Shadow tokens** — escala de sombras reutilizables | Medio (sistema) | Bajo |
| P3 | **ProblemSolution** — simplificar o reducir longitud, eliminar glows | Medio | Medio |
| P3 | **Catalog** — agregar CTA por card o link a WhatsApp con tipo de negocio | Medio (conversión) | Bajo |
| P3 | **Tokens tipográficos** — verificar/definir text-body, text-caption, etc. | Bajo (tech debt) | Bajo |
| P4 | **Hero visual** — evaluar agregar elemento visual lado derecho desktop | Medio | Alto |
| P4 | **WhatsApp Float** — icono real de WA en vez de MessageCircle genérico | Bajo | Bajo |
| P4 | **Footer** — agregar links legales | Bajo | Bajo |

---

## 8. NEXT ACTIONS (ejecutar primero)

1. **P0 — Eliminar violeta/cyan**: Stats glow, ProblemSolution glows/tints, Plans glow, FinalCTA input focus. Reemplazar todo con monocromo (`foreground/8`, `foreground/5`, `border`) o eliminar.
2. **P0 — Consolidar datos**: Decidir si constants.ts es la fuente de verdad. Actualizar Stats, ProblemSolution y Catalog para usar las constantes o mover los datos al componente y eliminar los duplicados.
3. **P1 — Stats section**: Quitar glow violeta, alinear datos con constants.ts, clarificar label "$1M COP".
4. **P1 — Plans glow**: Reemplazar violet/cyan glow con foreground/8 o eliminar. Alinear border-radius con Button (rounded-[10px]).
5. **P2 — FinalCTA focus**: Cambiar focus ring de inputs a monocromo (border-foreground, shadow con foreground).
6. **P2 — Shadow tokens**: Definir 3 niveles de sombra como clases utility reutilizables.
7. **P2 — Border-radius**: Estandarizar cards a rounded-[10px], wrappers a rounded-2xl.
