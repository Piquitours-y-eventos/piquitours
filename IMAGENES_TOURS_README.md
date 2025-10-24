# 📸 Guía de Imágenes para Tours

## Estado actual de imágenes

### Tours con imágenes reales:

1. **San Andrés** (id: 4) - `/tours/san-andres/`
   - ✅ portada.jpg
   - ✅ bote.jpg
   - ✅ comidas.jpg
   - ✅ coco.jpg

2. **Eje Cafetero** (id: 3) - `/tours/eje-cafetero/`
   - ✅ andina.jpg (usada como portada para Bogotá temporalmente)
   - ✅ ajiaco.webp
   - ✅ fuente.webp

3. **Barú/Costa Caribe** (id: 5) - `/tours/baru/`
   - ✅ image.png
   - ✅ pescado.jpg
   - ✅ ii.jpg

4. **Medellín** (id: 6) - `/tours/medellin/`
   - ✅ selva.jpg
   - ✅ monos.jpg
   - ✅ selvita.jpg

### Tours usando placeholders (necesitan imágenes propias):

5. **Guatapé** (id: 4) - `/tours/guatape/`
   - ⚠️ portada.jpg (placeholder)
   - ⚠️ pueblo.jpg (placeholder)
   - ⚠️ vista.jpg (placeholder)

6. **Bogotá** (id: 7) - `/tours/bogota/` 
   - ⚠️ Usando imágenes de eje-cafetero temporalmente
   - Necesita: portada.jpg, monserrate.jpg, catedral-sal.jpg

7. **Amazonas** (id: 8) - `/tours/amazonas/`
   - ⚠️ Usando imágenes de san-andres temporalmente
   - Necesita: portada.jpg, delfines.jpg, tribu.jpg, lodge.jpg

8. **Guajira** (id: 0), **Cartagena** (id: 1) - Ya existentes
   - Revisar que tengan imágenes en sus carpetas

## Cómo agregar imágenes propias:

1. **Crea las imágenes** con estas características:
   - Formato: JPG o WebP
   - Tamaño: Mínimo 1200x800px
   - Peso: Máximo 500KB (optimizadas)
   - Nombres: descriptivos en minúsculas (ej: `delfines-rosados.jpg`)

2. **Coloca las imágenes** en la carpeta correspondiente:
   ```
   /public/tours/{slug-del-tour}/
   ```

3. **Actualiza tours.json** con las rutas correctas:
   ```json
   "portada": {"type":"image","src":"/tours/amazonas/portada.jpg"},
   "galeria": ["/tours/amazonas/delfines.jpg","/tours/amazonas/tribu.jpg"]
   ```

## Estructura recomendada por tour:

```
tours/
├── amazonas/
│   ├── portada.jpg      (imagen principal)
│   ├── delfines.jpg     (galería)
│   ├── tribu.jpg        (galería)
│   └── lodge.jpg        (galería)
├── guatape/
│   ├── portada.jpg
│   ├── penon.jpg
│   └── pueblo.jpg
└── bogota/
    ├── portada.jpg
    ├── monserrate.jpg
    └── catedral-sal.jpg
```

## ⚠️ IMPORTANTE:

- Los tours **Amazonas**, **Guatapé** y **Bogotá** están usando imágenes temporales de otros tours
- Cuando agregues las imágenes reales, actualiza `tours.json` con las rutas correctas
- Las rutas SIEMPRE deben empezar con `/tours/`
- NO uses URLs externas, todas las imágenes deben estar en `/public/tours/`
