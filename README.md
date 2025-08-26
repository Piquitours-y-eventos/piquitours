# 🌟 PiquiTours y Eventos

<div align="center">

![PiquiTours Logo](./public/logo.png)

**Agencia de Viajes Premium en Colombia**

*Transformamos tus sueños de viaje en experiencias inolvidables*

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://piquitours.vercel.app)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📖 Descripción

**PiquiTours y Eventos** es una plataforma web premium de turismo colombiano que ofrece experiencias únicas y personalizadas. Nuestra aplicación combina diseño moderno, animaciones fluidas y funcionalidades avanzadas para brindar la mejor experiencia de usuario en la planificación de viajes.

### 🎯 Misión
Conectar viajeros con los destinos más espectaculares de Colombia a través de una plataforma digital de clase mundial.

---

## ✨ Características Principales

### 🏠 **Página de Inicio Premium**
- Hero section con animaciones GSAP y Framer Motion
- Estadísticas en tiempo real de viajeros satisfechos
- Diseño responsive con efectos glassmorphism

### 🗺️ **Explorador de Destinos Avanzado**
- **Filtros inteligentes**: Por ciudad de salida, duración, categorías
- **Sistema de búsqueda**: Búsqueda en tiempo real por palabras clave
- **Ordenamiento dinámico**: Por popularidad, precio, duración
- **Modal interactivo**: Con pestañas para resumen, itinerario, galería
- **Lightbox premium**: Navegación con teclado y fullscreen
- **Animaciones fluidas**: Transiciones suaves con Framer Motion

### 📞 **Sección de Contacto Profesional**
- **Formulario avanzado**: Validación en tiempo real y estados de carga
- **Múltiples canales**: WhatsApp, email, teléfono, ubicación
- **Integración con Supabase**: Almacenamiento seguro de mensajes
- **Redes sociales premium**: Cards interactivas con estadísticas
- **Mapa interactivo**: Ubicación con Google Maps embebido

### 🎨 **Diseño y UX**
- **Paleta de colores premium**: Oro, naranja y rojo (#DAA520, #FF8C00, #DC143C)
- **Efectos visuales avanzados**: Partículas flotantes, glassmorphism, gradientes
- **Tipografía premium**: Playfair Display para títulos
- **Responsive design**: Optimizado para todos los dispositivos
- **Accesibilidad**: Cumple estándares WCAG

### 🔧 **Funcionalidades Técnicas**
- **SEO optimizado**: Meta tags, structured data, sitemap XML
- **PWA ready**: Manifest, service worker, offline support
- **Performance**: Lazy loading, code splitting, optimización de imágenes
- **Admin panel**: Sistema de autenticación con Supabase
- **Analytics**: Integración con Vercel Speed Insights

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### 1. Clonar el repositorio
```bash
git clone https://github.com/rx3card/piquitours.git
cd piquitours
```

### 2. Instalar dependencias
```bash
# Con pnpm (recomendado)
pnpm install

# O con npm
npm install
```

### 3. Configurar variables de entorno
```bash
# Crear archivo .env.local
cp .env.example .env.local
```

```env
# Supabase Configuration
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Analytics (opcional)
VITE_VERCEL_ANALYTICS_ID=tu_analytics_id
```

### 4. Ejecutar en desarrollo
```bash
# Con pnpm
pnpm dev

# O con npm
npm run dev
```

### 5. Construir para producción
```bash
# Con pnpm
pnpm build

# O con npm
npm run build
```

---

## 🛠️ Stack Tecnológico

<div align="center">

### Frontend Core
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Styling & Animation
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.5.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

### Backend & Database
![Supabase](https://img.shields.io/badge/Supabase-2.56.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql&logoColor=white)

### Deployment & Tools
![Vercel](https://img.shields.io/badge/Vercel-Latest-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.21.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

</div>

---

## 📁 Estructura del Proyecto

```
piquitours/
├── 📁 public/                 # Archivos estáticos
│   ├── 🖼️ logo.png           # Logo de la empresa
│   ├── 🖼️ portada_google.jpeg # Imagen principal
│   ├── 📄 manifest.json      # PWA manifest
│   └── 🤖 robots.txt         # SEO robots
├── 📁 src/
│   ├── 📁 components/         # Componentes reutilizables
│   │   ├── 🎯 Destinations.jsx # Explorador de destinos
│   │   ├── 🦸 Hero.jsx        # Sección hero
│   │   ├── 🔐 AdminLogin.jsx  # Login administrativo
│   │   └── 📁 styles/         # Estilos de componentes
│   ├── 📁 pages/              # Páginas principales
│   │   ├── 🏠 Home.jsx        # Página de inicio
│   │   ├── 🗺️ Destinos.jsx    # Página de destinos
│   │   ├── 📞 Contacto.jsx    # Página de contacto
│   │   ├── 👥 Nosotros.jsx    # Página sobre nosotros
│   │   └── 🔧 AdminPanel.jsx  # Panel administrativo
│   ├── 📁 layouts/            # Layouts de la aplicación
│   │   ├── 🌐 PublicLayout.jsx # Layout público
│   │   └── 🔒 AdminLayout.jsx  # Layout administrativo
│   ├── 📁 data/               # Datos de la aplicación
│   │   └── 📊 tours.json      # Base de datos de tours
│   ├── 📁 utils/              # Utilidades
│   │   └── 🔧 supabase.js     # Configuración Supabase
│   ├── 🎨 App.css             # Estilos globales
│   ├── ⚛️ App.jsx             # Componente principal
│   └── 🚀 main.jsx            # Punto de entrada
├── 📄 package.json            # Dependencias del proyecto
├── ⚙️ vite.config.js          # Configuración Vite
├── 🎨 tailwind.config.cjs     # Configuración Tailwind
├── 🌐 vercel.json             # Configuración Vercel
└── 📖 README.md               # Este archivo
```

---

## 🎨 Guía de Diseño

### Paleta de Colores
```css
/* Colores principales */
--gold: #DAA520;        /* Oro premium */
--orange: #FF8C00;      /* Naranja vibrante */
--red: #DC143C;         /* Rojo elegante */

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #DAA520, #FF8C00, #DC143C);
--gradient-glass: rgba(255, 255, 255, 0.1);
```

### Tipografía
- **Títulos**: Playfair Display (serif elegante)
- **Cuerpo**: Inter (sans-serif moderna)
- **Monospace**: JetBrains Mono

---

## 📊 Datos de Tours

El archivo `src/data/tours.json` contiene información detallada de todos los destinos:

```json
{
  "tours": [
    {
      "id": "guajira",
      "nombre": "Wayuu • Dunas de La Guajira",
      "resumen": "Desierto dorado, rancherías Wayuu...",
      "precio": 1390000,
      "duracion": 3,
      "categorias": ["Aventura", "Naturaleza", "Astronomía"],
      "itinerario": [...],
      "incluye": [...],
      "reviews": [...]
    }
  ]
}
```

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Servidor de desarrollo
pnpm build        # Construir para producción
pnpm preview      # Vista previa de producción
pnpm lint         # Linter ESLint

# Utilidades
pnpm clean        # Limpiar cache y node_modules
pnpm analyze      # Analizar bundle size
```

---

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Variables de entorno en producción
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica
VITE_VERCEL_ANALYTICS_ID=tu_analytics_id
```

---

## 🔍 SEO y Performance

### Características SEO
- ✅ Meta tags optimizados
- ✅ Structured data (JSON-LD)
- ✅ Open Graph y Twitter Cards
- ✅ Sitemap XML automático
- ✅ Robots.txt configurado
- ✅ URLs amigables

### Performance
- ✅ Lazy loading de imágenes
- ✅ Code splitting automático
- ✅ Compresión de assets
- ✅ PWA optimizada
- ✅ Core Web Vitals optimizados

---

## 🤝 Contribución

### Proceso de contribución
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de código
- Usar ESLint y Prettier
- Seguir convenciones de React
- Documentar componentes complejos
- Escribir tests para funcionalidades críticas

---

## 📞 Soporte

### Contacto del proyecto
- **Email**: info@piquitours.com
- **WhatsApp**: +57 311 123 4567
- **Ubicación**: Cra 9 #5-20, El Espinal, Tolima

### Reportar problemas
- [Issues en GitHub](https://github.com/rx3card/piquitours/issues)
- [Discusiones](https://github.com/rx3card/piquitours/discussions)

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**Desarrollado con ❤️ por el equipo de PiquiTours**

*Transformando sueños en aventuras desde 2024*

[![GitHub](https://img.shields.io/badge/GitHub-rx3card-181717?style=for-the-badge&logo=github)](https://github.com/rx3card)
[![Website](https://img.shields.io/badge/Website-piquitours.com-FF6B35?style=for-the-badge&logo=safari&logoColor=white)](https://piquitours.vercel.app)

</div>
