# Guía para armar landing pages con Vite + React + CSS plano

Esta guía describe, paso a paso, cómo construir una landing con la estructura de este proyecto (Vite + React, componentes separados, CSS plano sin librerías de estilos). Al final hay un **prompt reutilizable** para ejecutar todo el proceso con un asistente de IA.

## 1. Principios

- **Sin librerías de estilos** (nada de Tailwind, Bootstrap, styled-components). Solo archivos `.css`.
- **Un componente = un `.jsx` + un `.css`** con sus propias media queries.
- **Mobile first**: estilos base para móvil y `@media (min-width: ...)` para pantallas mayores.
- **Contenido separado de la presentación**: textos, imágenes y enlaces viven en `src/data/content.js`.
- **Accesibilidad por defecto**: HTML semántico, `alt`, `aria-*`, foco visible, `prefers-reduced-motion`.
- Única dependencia extra permitida: íconos (`lucide-react`). Si se quiere cero dependencias, usar SVG inline.

## 2. Estructura de carpetas

```
mi-landing/
├─ index.html                 # entrada de Vite (solo <div id="root"> + SEO base)
├─ package.json
├─ vite.config.js
├─ .env.example               # VITE_FORM_ENDPOINT=
├─ .gitignore
├─ eslint.config.js
├─ .prettierrc
├─ public/
│  ├─ favicon.svg
│  └─ fonts/                  # fuentes auto-hospedadas (woff2)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ data/
   │  └─ content.js           # TODO el contenido editable
   ├─ hooks/
   │  └─ useParallax.js
   ├─ styles/
   │  ├─ tokens.css           # variables (colores, tipografía, espaciado)
   │  ├─ reset.css            # reset + base de elementos
   │  ├─ fonts.css            # @font-face
   │  └─ index.css            # importa los anteriores + utilidades globales (.shell, .eyebrow...)
   └─ components/
      ├─ common/
      │  ├─ Section.jsx / Section.css
      │  └─ Button.jsx / Button.css
      ├─ Header.jsx / Header.css
      ├─ Hero.jsx / Hero.css
      ├─ ...secciones...
      ├─ ContactForm.jsx / ContactForm.css
      ├─ ThankYouModal.jsx / ThankYouModal.css
      └─ Footer.jsx / Footer.css
```

## 3. Paso a paso

### Paso 1 — Crear el proyecto y fijar versiones

```powershell
npm create vite@latest mi-landing -- --template react
cd mi-landing
npm install lucide-react
```

**Fijar versiones compatibles** (evita warnings y errores que ya ocurrieron):

- Vite 8 requiere `@vitejs/plugin-react` **v6** (usa oxc). Con la v4 aparecen warnings de `esbuild`, `optimizeDeps.rollupOptions` y `jsx`.
- Con **React 18**, el atributo de `<img>` se escribe en minúsculas: `fetchpriority="high"` (no `fetchPriority`). Con React 19 sí es `fetchPriority`.
- Usar versiones exactas o con `~` en `package.json` y commitear el `package-lock.json`.

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react()] })
```

### Paso 2 — Analizar el diseño (HTML original o mockup)

Antes de escribir código, listar:

1. **Secciones** (header, hero, propuesta, niveles, valores, formulario, footer, modal…).
2. **Variables de diseño**: colores, tipografías, radios, sombras → van a `tokens.css`.
3. **Contenido**: textos, imágenes (URL, alt, tamaño), enlaces, íconos → van a `content.js`.
4. **Breakpoints** y qué cambia en cada uno (columnas, visibilidad de menú, tamaños).
5. **Comportamientos**: scroll suave, parallax, modal, validación, menú móvil.

### Paso 3 — Design tokens, reset y fuentes

`src/styles/tokens.css`:

```css
:root {
  --violet: #2c3a5a;
  --pink: #ed2d7c;
  --paper: #fff5ec;
  --white: #fff;
  --ink: #2c3a5a;
  --muted: #666;
  --line: #f4a99c;
  --focus: #f4a99c;
  --shadow: 0 6px 18px rgba(44, 58, 90, 0.1);

  --font-body: 'Atkinson Hyperlegible', Arial, sans-serif;
  --font-heading: 'Fraunces', Georgia, serif;
  --font-ui: 'Barlow Semi Condensed', Arial, sans-serif;

  --shell-width: 1180px;
  --radius: 12px;
}
```

`src/styles/fonts.css` — fuentes **auto-hospedadas** (descargar `.woff2` a `public/fonts/`; no depender de nombres de fuente que no se cargan):

```css
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/fraunces.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

`src/styles/reset.css`: `box-sizing: border-box`, `margin: 0`, `img { display: block; max-width: 100% }`, `html { scroll-behavior: smooth }`, `:focus-visible` con outline visible.

`src/styles/index.css`:

```css
@import './fonts.css';
@import './tokens.css';
@import './reset.css';

.shell { width: min(var(--shell-width), calc(100% - 40px)); margin: auto; }

@media (max-width: 420px) {
  .shell { width: min(100% - 28px, var(--shell-width)); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
```

### Paso 4 — Centralizar el contenido

`src/data/content.js` exporta objetos simples (strings, arrays). Los componentes solo renderizan, no contienen textos largos.

```js
export const site = { name: 'Mi Institución', logo: '/logo.svg', heroImage: '/hero.webp' }
export const nav = [
  { label: 'Propuesta', href: '#propuesta' },
  { label: 'Niveles', href: '#niveles' },
]
export const levels = [{ title: '...', image: '...', alt: '...', text: '...' }]
```

Para cambiar de cliente solo se editan este archivo y `tokens.css`.

### Paso 5 — Componentes comunes

`Button.jsx` (variantes `primary` / `secondary`; renderiza `<a>` si recibe `href`, si no `<button>`):

```jsx
import './Button.css'

export default function Button({ variant = 'primary', href, children, ...props }) {
  const className = `button button-${variant}`
  return href
    ? <a className={className} href={href} {...props}>{children}</a>
    : <button className={className} {...props}>{children}</button>
}
```

`Section.jsx` (envuelve `<section>` con `id`, `aria-labelledby` y `.shell`):

```jsx
export default function Section({ id, titleId, className = '', children }) {
  return (
    <section id={id} className={className} aria-labelledby={titleId}>
      <div className="shell">{children}</div>
    </section>
  )
}
```

### Paso 6 — Hook `useParallax`

`src/hooks/useParallax.js`: actualiza una variable CSS `--parallax` con `requestAnimationFrame`, listener `passive`, limpieza al desmontar y se desactiva con `prefers-reduced-motion`.

```js
import { useEffect, useRef } from 'react'

export default function useParallax(speed = 0.25) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0) return
      el.style.setProperty('--parallax', `${(-rect.top * speed).toFixed(1)}px`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [speed])

  return ref
}
```

Patrón de CSS para un **hero con imagen de fondo y parallax**:

```css
.hero { position: relative; overflow: hidden; --parallax: 0px; }
.hero-visual { position: absolute; inset: 0; z-index: 0; }
.hero-visual img {
  position: absolute; left: 0; top: -15%;
  width: 100%; height: 130%; object-fit: cover;   /* sobra imagen para el desplazamiento */
  transform: translate3d(0, var(--parallax), 0);
  will-change: transform;
}
.hero-visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(...); } /* legibilidad */
.hero-grid { position: relative; z-index: 1; }
```

La imagen decorativa lleva `alt=""` y `aria-hidden="true"` en su contenedor.

### Paso 7 — Header con menú hamburguesa accesible

- Botón con `aria-expanded`, `aria-controls` y `aria-label` ("Abrir menú" / "Cerrar menú").
- Estado `open` en React; se cierra al hacer clic en un enlace y con `Escape`.
- Móvil: panel desplegable bajo el header; `>= 960px`: navegación horizontal y botón oculto.
- Foco visible y orden de tabulación lógico.

```jsx
const [open, setOpen] = useState(false)
// <button aria-expanded={open} aria-controls="menu-principal" onClick={() => setOpen(!open)}>
// <nav id="menu-principal" className={`nav-links ${open ? 'is-open' : ''}`}>
```

### Paso 8 — Secciones de contenido

Para cada sección: componente + CSS propio, que lee de `content.js` y usa `.map()` con `key` estable.

Reglas responsive habituales (mobile first):

| Elemento | Base (móvil) | ≥ 700px | ≥ 960px |
|---|---|---|---|
| Grids de tarjetas | 1 columna | 2 columnas | 3–4 columnas |
| Hero / intro | 1 columna | según diseño | — |
| Navegación | hamburguesa | hamburguesa o CTA visible | menú horizontal |
| Padding de secciones | 68px | 86px | — |

Imágenes: `width`/`height` explícitos (evita saltos de layout), `loading="lazy"` salvo la del hero (`fetchpriority="high"`), formato WebP.

### Paso 9 — Formulario con estado, validación y endpoint por `.env`

`.env.example`:

```
VITE_FORM_ENDPOINT=https://tu-servicio/endpoint
```

Lógica del componente:

- Estado: `values`, `errors`, `status` (`idle | loading | success | error`).
- Validación al enviar (requeridos, formato de email y teléfono) con mensajes accesibles: `aria-invalid`, `aria-describedby`, texto de error asociado.
- Envío con `fetch(import.meta.env.VITE_FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })`.
- Botón deshabilitado en `loading` (texto "Enviando…").
- `success` → limpiar el formulario y abrir el modal de agradecimiento; `error` → mensaje visible con `role="alert"` conservando los datos.
- Si no hay endpoint definido, avisar en consola y simular éxito solo en desarrollo.
- Nunca poner claves secretas en variables `VITE_*` (quedan expuestas en el navegador).

### Paso 10 — Modal de agradecimiento

`role="dialog"`, `aria-modal="true"`, `aria-labelledby`; se cierra con `Escape`, clic en el fondo o botón "Cerrar"; llevar el foco al diálogo al abrir y devolverlo al cerrar; bloquear el scroll del `body` mientras está abierto.

### Paso 11 — SEO y metadatos

En `index.html`:

- `<title>`, `meta description`, `lang="es"`.
- Open Graph: `og:title`, `og:description`, `og:type`, `og:image` (1200×630, URL absoluta), `og:url`.
- `<link rel="icon" href="/favicon.svg">` y `theme-color`.
- `preconnect` al dominio de imágenes y `preload` de la imagen del hero.
- Un solo `<h1>` por página y jerarquía de títulos ordenada.

### Paso 12 — Calidad: linter, formato y QA

```powershell
npm install -D eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks prettier
```

Scripts en `package.json`: `"lint": "eslint src"`, `"format": "prettier --write src"`.

**Checklist de QA antes de entregar**

Responsive:
- [ ] Probado a 320, 375, 420, 700, 960, 1280 y 1920 px.
- [ ] Sin scroll horizontal en ningún ancho.
- [ ] El menú hamburguesa funciona y se cierra bien.
- [ ] Imágenes sin deformación ni saltos de layout.
- [ ] Textos legibles sobre fondos con imagen (contraste).

Accesibilidad:
- [ ] Navegación completa con teclado; foco visible.
- [ ] Contraste AA (≥ 4.5:1 en texto normal).
- [ ] `alt` en imágenes informativas, `alt=""` en decorativas.
- [ ] Formulario con labels, errores asociados y `aria-invalid`.
- [ ] `prefers-reduced-motion` respetado (parallax y scroll suave).

Técnico:
- [ ] `npm run lint` sin errores.
- [ ] `npm run build` sin warnings.
- [ ] Consola del navegador sin warnings de React.
- [ ] Lighthouse: Performance, Accessibility y SEO ≥ 90.

### Paso 13 — Verificar y publicar

```powershell
npm run dev       # desarrollo en http://localhost:5173
npm run build     # genera /dist
npm run preview   # probar el build local
```

Publicar `dist/` en Netlify, Vercel, GitHub Pages o similar (configurar las variables `VITE_*` en la plataforma).

## 4. Problemas conocidos y soluciones

| Síntoma | Causa | Solución |
|---|---|---|
| Warnings `esbuild` / `optimizeDeps.rollupOptions` / `jsx` al iniciar Vite | `@vitejs/plugin-react` v4 con Vite 8 | `npm install -D @vitejs/plugin-react@latest` |
| `React does not recognize the fetchPriority prop` | React 18 | Usar `fetchpriority="high"` en minúsculas |
| La imagen de fondo deja huecos al hacer parallax | Imagen del mismo alto que la sección | Hacerla más alta (130 %) con `top: -15%` |
| Texto ilegible sobre la imagen | Falta overlay | Degradado en `::after` con el color de fondo |
| Íconos de Lucide por CDN no cargan en React | Se usaba `data-lucide` | Usar componentes de `lucide-react` |

## 5. Prompt reutilizable

Copiar, completar los campos entre `[corchetes]` y pegar en el asistente:

```
Necesito crear una landing page con Vite + React, separada en componentes.

REQUISITOS
- Los estilos deben estar en archivos .css, sin ninguna librería de estilos.
- Mobile first. Respetar el comportamiento responsive es crítico (320px a 1920px).
- Un componente = un .jsx + un .css con sus propias media queries.
- Estructura: src/{components, components/common, data, hooks, styles}.
- Estilos globales en src/styles/{tokens.css, reset.css, fonts.css, index.css}.
- Todo el contenido (textos, imágenes, enlaces) en src/data/content.js.
- Componentes comunes: Section y Button. Hook reutilizable: useParallax.
- Fijar versiones compatibles: Vite [versión] con @vitejs/plugin-react [versión], React [18/19].
  (React 18 → fetchpriority en minúsculas.)
- Fuentes auto-hospedadas con @font-face (woff2 en public/fonts).
- Header con menú hamburguesa accesible (aria-expanded, Escape, cierre al navegar).
- Formulario con estado, validación accesible, estados loading/success/error y
  endpoint configurable por variable de entorno VITE_FORM_ENDPOINT (incluir .env.example).
- Modal de agradecimiento accesible (Escape, clic fuera, manejo de foco).
- SEO en index.html: title, description, Open Graph, favicon, preconnect/preload del hero.
- Imágenes con width/height, lazy loading (excepto hero), formato WebP.
- ESLint + Prettier configurados y scripts lint/format.
- Respetar prefers-reduced-motion.

DISEÑO DE ORIGEN
- [Adjuntar HTML original / mockup / URL / descripción de secciones]

SECCIONES
- [Listar: header, hero, ..., formulario, footer]

IDENTIDAD
- Colores: [primario, secundario, fondo, texto]
- Tipografías: [títulos, cuerpo, UI]
- Efectos: [ej. hero con imagen de fondo y parallax suave al scroll]

PROCESO
1. Analiza el diseño y resume secciones, tokens, contenido y breakpoints. Sugiere mejoras ANTES de aplicarlas y espera mi confirmación.
2. Crea el proyecto, tokens/reset/fuentes y content.js.
3. Implementa componentes comunes, hook y secciones una por una.
4. Ejecuta `npm run lint` y `npm run build`; corrige errores y warnings.
5. Levanta `npm run dev` y revisa la consola del navegador (sin warnings de React).
6. Entrega un resumen con lo creado, decisiones tomadas y el checklist de QA completado.
```

## 6. Convenciones rápidas

- Componentes en `PascalCase`; clases CSS en `kebab-case`.
- Un único `<h1>`; cada `<section>` con `aria-labelledby` apuntando a su título.
- Prefijar clases por componente (`.hero-*`, `.level-*`) para evitar colisiones, ya que el CSS es global.
- No repetir colores ni tamaños a mano: usar variables de `tokens.css`.
- Commits pequeños por componente o sección.
