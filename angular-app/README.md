# 🚛 Transportes Premium - Angular Landing Page

Landing page profesional para **Transportes Premium**, empresa de transporte de vehículos a nivel nacional. Construida con Angular 17+ y diseño mobile-first.

## ✨ Características

### 🏗️ Arquitectura
- **Angular 17+** con standalone components (sin NgModule)
- **Signals** para state management reactiv
- **OnPush** change detection para mejor performance
- **TypeScript** estricto con tipos definidos

### 🎨 Diseño
- **Mobile-first** responsive design
- **Tema oscuro premium** con gradientes azul (#0066ff a #00d4ff)
- **Tipografía dual**: Inter para cuerpo, Space Grotesk para títulos
- **Animaciones suaves** con CSS y Angular Animations
- **Partículas flotantes** en el hero
- **Scroll progress bar** personalizado

### 📦 Componentes
- **Header** - Navegación fija con efecto blur y menú hamburguesa
- **Hero** - Sección principal con estadísticas animadas y partículas
- **Trust Bar** - Barra de confianza con íconos
- **Services** - Grid de servicios con cards interactivas
- **Fleet** - Galería de flota con especificaciones
- **Coverage** - Mapa de cobertura con pins animados
- **Process** - Timeline de 4 pasos
- **Testimonials** - Cards de testimonios con ratings
- **CTA** - Call to action con fondo degradado
- **Contact** - Formulario reactivo con validaciones
- **Footer** - Links, redes sociales, información

### ⚡ Funcionalidades
- **Reactive Forms** con validaciones en tiempo real
- **Scroll animations** con Intersection Observer
- **Counter animations** para estadísticas
- **Smooth scroll** entre secciones
- **Active nav state** según sección visible
- **Form submission** con feedback visual
- **SEO optimized** con meta tags

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 18+ 
- npm 9+

### Instalación

```bash
# Navegar al directorio del proyecto
cd angular-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en: http://localhost:4200

### Build para Producción

```bash
npm run build
```

Los archivos de producción se generarán en `dist/transportes-premium`

## 📁 Estructura del Proyecto

```
angular-app/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios, modelos, interceptores
│   │   │   ├── models/              # Interfaces TypeScript
│   │   │   │   └── index.ts
│   │   │   ├── services/            # Servicios
│   │   │   │   └── data.service.ts
│   │   │   └── interceptors/        # HTTP interceptors
│   │   │       └── loading.interceptor.ts
│   │   ├── shared/                  # Componentes, directivas, pipes reutilizables
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   └── header.component.ts
│   │   │   │   └── footer/
│   │   │   │       └── footer.component.ts
│   │   │   ├── directives/
│   │   │   │   ├── scroll-progress.directive.ts
│   │   │   │   └── reveal-on-scroll.directive.ts
│   │   │   └── pipes/
│   │   │       └── format-number.pipe.ts
│   │   ├── features/                # Features/Rutas de la aplicación
│   │   │   └── landing/
│   │   │       ├── landing.component.ts
│   │   │       └── components/
│   │   │           ├── hero/
│   │   │           ├── trust-bar/
│   │   │           ├── services/
│   │   │           ├── fleet/
│   │   │           ├── coverage/
│   │   │           ├── process/
│   │   │           ├── testimonials/
│   │   │           ├── cta/
│   │   │           └── contact/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/                      # Imágenes, fonts, etc.
│   ├── index.html
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Personalización

### Colores
Modifica las variables CSS en `src/styles.scss`:

```scss
:root {
  --color-primary: #0066ff;    // Color primario
  --color-accent: #00d4ff;     // Color acento
  --gradient-primary: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
}
```

### Contenido
Los datos se cargan desde `DataService`. Modifica las señales en:
`src/app/core/services/data.service.ts`

### Imágenes
Reemplaza las URLs de Unsplash por tus propias imágenes en:
- Componentes del landing
- DataService

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: >= 1024px

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests una vez
npm test -- --watch=false
```

## 📝 Licencia

© 2024 Transportes Premium. Todos los derechos reservados.