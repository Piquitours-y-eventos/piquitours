# 📁 ESTRUCTURA DE IMÁGENES ORGANIZADA

## Nueva estructura en `/public/`

```
public/
├── brand/          → Logo de la empresa
│   └── logo.png
│
├── hero/           → Imágenes del carrusel/hero principal
│   ├── carrosel_1.jpg
│   ├── carrosel_2.png
│   ├── imagen_portada_01.jpg
│   └── imagen_portada_012.jpg
│
├── pages/          → Imágenes de páginas específicas
│   ├── contacto.png
│   ├── portada_nosotros_0101.jpg
│   └── portada_imagen_2919.jpg
│
├── destinations/   → Imágenes de destinos
│   ├── quindio.jpg
│   ├── san_andres.jpg
│   └── images (1).jpg
│
├── media/          → Videos y multimedia
│   └── video_nosotros.mp4
│
├── meta/           → Meta imágenes (OG, preview, SEO)
│   ├── portada_google.jpeg
│   └── preview.png
│
└── tours/          → Imágenes de tours por carpeta
    ├── guajira/
    ├── cartagena/
    ├── eje-cafetero/
    ├── guatape/
    ├── san-andres/
    ├── amazonas/
    ├── baru/
    └── medellin/
```

## ✅ Rutas actualizadas automáticamente en:

### **Componentes React:**

1. **`/src/components/Header.jsx`**
   - `/logo.png` → `/brand/logo.png`

2. **`/src/components/Footer.jsx`**
   - `/logo.png` → `/brand/logo.png`

3. **`/src/components/Destinations.jsx`**
   - `/portada_google.jpeg` → `/meta/portada_google.jpeg`

4. **`/src/components/WhyUs.jsx`**
   - `/portada_google.jpeg` → `/meta/portada_google.jpeg`

### **Páginas:**

5. **`/src/pages/Nosotros.jsx`**
   - `/portada_nosotros_0101.jpg` → `/pages/portada_nosotros_0101.jpg`
   - `/portada_google.jpeg` → `/meta/portada_google.jpeg`
   - `/portada_imagen_2919.jpg` → `/pages/portada_imagen_2919.jpg` (2 ocurrencias)

### **SEO y Meta tags:**

6. **`/index.html`**
   - Favicon: `/logo.png` → `/brand/logo.png`
   - Open Graph: `portada_google.jpeg` → `/meta/portada_google.jpeg`
   - Twitter Card: `portada_google.jpeg` → `/meta/portada_google.jpeg`
   - Schema.org logo: `logo.png` → `/brand/logo.png`
   - Schema.org image: `portada_google.jpeg` → `/meta/portada_google.jpeg`

## 🎯 Ventajas de esta organización:

1. **Fácil mantenimiento** - Sabes dónde está cada tipo de imagen
2. **Mejor performance** - Puedes optimizar imágenes por carpeta
3. **Escalabilidad** - Fácil agregar nuevas imágenes sin desorden
4. **Claridad** - Cualquier desarrollador puede entender la estructura

## 📝 Convenciones de nombres:

- **brand/** - Identidad visual de la empresa
- **hero/** - Imágenes principales de landing/home
- **pages/** - Imágenes específicas de páginas
- **destinations/** - Imágenes de destinos turísticos
- **media/** - Videos y contenido multimedia
- **meta/** - Imágenes para meta tags, OG, preview
- **tours/** - Una carpeta por cada tour con sus imágenes

## 🔧 Problema del texto invisible SOLUCIONADO

**Problema**: En el modal de tours, sección "Todo lo que incluye tu viaje", el texto aparecía en negro sobre fondo negro.

**Solución aplicada** en `/src/components/Destinations.jsx` línea 543:
- Agregado `style={{color: '#fff'}}` al span del texto
- Cambiado de `x.txt` a `x.item` para coincidir con tours.json
- Agregado fallback `x.item || x.txt` para compatibilidad

Ahora el texto es blanco y perfectamente visible en dark mode.
