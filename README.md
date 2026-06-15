<div align="center">

# ✦ Portafolio — Juan Eduardo Zorrilla Chávez

### *"Trazando rutas a través del código"*

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Sin dependencias](https://img.shields.io/badge/dependencias-ninguna-6ad7ff?style=for-the-badge)](.)

</div>

---

## Sobre este proyecto

Portafolio web personal con estética **Honkai: Star Rail** — fondos cósmicos, constelaciones y una interfaz holográfica. Construido completamente en HTML, CSS y JavaScript vanilla, sin frameworks ni librerías externas.

El diseño usa el sistema de **Caminos** del juego como metáfora visual para las categorías de proyectos: cada tarjeta pertenece a un Camino con su color y personalidad propios.

---

## Estructura del repositorio

```
portafolio/
├── index.html          # Inicio · Sobre Mí · Contacto
├── proyectos.html      # Galería de proyectos con filtros
├── styles.css          # Sistema de estilos completo (variables HSR)
├── main.js             # Starfield · Navbar · Reveal · Formulario
└── README.md           # Este archivo
```

> La separación de responsabilidades es intencional: `main.js` expone `window.PROJECTS`, que `proyectos.html` consume y renderiza. Así ambas páginas comparten el mismo dato sin duplicar código.

---

## Funcionalidades

| Módulo | Descripción |
|---|---|
| 🌌 **Campo estelar** | Canvas animado con estrellas titilantes y estrellas fugaces aleatorias |
| 🧊 **Navbar Liquid Glass** | `backdrop-filter` + auto-ocultar al bajar / mostrar al subir |
| 🎨 **RGB en hover** | El nombre aplica un ciclo de colores RGB **solo** al pasar el cursor |
| 🃏 **Tarjetas astrales** | Efecto 3D + halo holográfico que sigue al cursor en cada tarjeta |
| 🔍 **Filtros de proyectos** | 6 categorías: Python · HTML/CSS · JavaScript · DB · C# · ASP.NET |
| ✨ **Reveal on scroll** | `IntersectionObserver` para fade-in/slide-up de cada elemento |
| 📬 **Formulario** | Validación y feedback visual (listo para conectar a un backend) |
| ♿ **Accesibilidad** | `prefers-reduced-motion`, `aria-label`, foco visible en teclado |

---

## Páginas

### `index.html` — Inicio
- **Hero section** con nombre, rol, CTA y estadísticas
- **Tarjeta de proyectos destacados** con rotación de luz cónica
- **Sobre Mí** — educación, stack completo y soft skills
- **Contacto** — formulario + enlaces rápidos a redes

### `proyectos.html` — Galería
- Filtrado dinámico por tecnología (sin recarga de página)
- Contador de proyectos por categoría en cada botón de filtro
- Cada tarjeta muestra su **Camino HSR**, stack, y enlaces a repo y demo

---

## Cómo usar

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/portafolio.git

# Abre directamente en el navegador
open index.html
# o
start index.html   # Windows
```

No requiere servidor ni instalación. Abre `index.html` y listo.

> **Nota:** Para el formulario de contacto en producción, conecta el `submit` a [Formspree](https://formspree.io/) o tu propio backend. El campo `action` del formulario está listo para recibirlo.

---

## Personalización

Edita el array `window.PROJECTS` al inicio de `main.js` para añadir o modificar proyectos:

```js
window.PROJECTS = [
  {
    title: "Mi proyecto",
    path: "La Caza",          // nombre del Camino HSR (estético)
    icon: "🚀",
    color: "#ff7eb6",         // color del acento de la tarjeta
    desc: "Descripción breve del proyecto.",
    tech: ["React", "Node"],  // etiquetas de tecnología
    tags: ["js"],             // filtros: python · htmlcss · js · db · csharp · aspnet
    repo: "https://github.com/...",
    demo: "https://..."
  },
  // ...
];
```

Las variables de color viven en `:root` dentro de `styles.css`. Cambia `--stellar`, `--astral` y `--gold` para ajustar toda la paleta de una sola vez.

---

## Stack & tecnologías mostradas

`HTML/CSS` `JavaScript` `C#` `ASP.NET` `Java · Spring Boot` `PHP · Laravel` `SQL` `Docker` `Nginx` `AWS` `Azure` `Linux / WSL`

---

## Autor

**Juan Eduardo Zorrilla Chávez**
Técnico en Análisis y Desarrollo de Software · SENA / Fátima Nutibara  
Estudiante becado · Academia Riwi  
Inglés B1

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/)
[![Telegram](https://img.shields.io/badge/Telegram-27A7E7?style=flat&logo=telegram&logoColor=white)](https://telegram.org/)

---

<div align="center">
<sub>Diseño inspirado en el universo de Honkai: Star Rail · Desarrollado con ♡ y 0 dependencias</sub>
</div>
