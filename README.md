# Tu Página en 48

Landing page de alta conversión para un servicio de diseño web express en Colombia. Páginas web profesionales entregadas en 48 horas, orientadas a profesionales independientes y pequeños negocios.

**Live:** [tupaginaen48.com](https://tupaginaen48.com)

## Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion (fade-in sutiles, diagrama SVG animado)
- **Iconos:** Lucide React
- **Tipografía:** DM Serif Display (headlines) + Inter (body)
- **Deploy:** Vercel

## Estructura

```
app/
├── globals.css          # Tokens de tema, dot grid, utilidades CSS
├── layout.tsx           # Layout raíz (fonts, metadata, SEO)
└── page.tsx             # Página principal — orquesta las secciones

components/layout/
├── Navbar.tsx           # Navegación sticky, fondo blanco sólido
└── Footer.tsx           # Footer con columnas y links

components/sections/
├── Hero.tsx             # Hero con headline serif + CTAs
├── FlowDiagram.tsx      # Diagrama de flujo SVG técnico (animado)
├── Stats.tsx            # Números grandes en tipografía editorial
├── ProblemSolution.tsx  # Problema → solución (2 columnas)
├── Catalog.tsx          # Grid de profesiones con iconos Lucide
├── HowItWorks.tsx       # Timeline vertical, 3 pasos
├── Plans.tsx            # 3 cards de precios (destacado con borde negro)
├── Portfolio.tsx        # Testimonios en cards editoriales
└── FinalCTA.tsx         # Formulario de contacto + exit intent modal

components/ui/
├── Badge.tsx            # Pill con borde sutil
├── Button.tsx           # Primary (negro) / Secondary (outline) / Ghost
├── ScrollReveal.tsx     # Fade-in sutil con Framer Motion
├── SectionHeading.tsx   # Título serif + subtítulo sans-serif
└── cn.ts                # Utilidad para clases condicionales

lib/
├── constants.ts         # Textos, planes, datos del sitio
└── utils.ts             # Helpers (WhatsApp URL, formateo)
```

## Desarrollo

```bash
npm install
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm start         # Iniciar producción
```

## Diseño

Estilo SignalLayer / light minimal technical:

- **Fondo:** Blanco puro (`#FFFFFF`) con dot grid sutil de fondo
- **Tipografía:** Serif dramático (DM Serif Display) para headlines, sans-serif limpio (Inter) para body
- **Paleta:** Monocromática — negro, grises, blanco. Sin color de acento
- **Cards:** Bordes grises sutiles, sin sombras, sin gradientes
- **Botones:** Negro sólido o outline gris, esquinas `rounded-lg`
- **Hero visual:** Diagrama de flujo SVG técnico con nodos dashed y conectores angulares
- **Animaciones:** Solo fade-in sutiles y draw de SVG
- **Whitespace:** Generoso (`py-24 md:py-32` entre secciones)

## Licencia

Privado — Todos los derechos reservados.
