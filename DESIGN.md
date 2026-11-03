# DESIGN.md: Akapp (Rutas, Hitos NFC, Guías y Cupones Tsirö)

## Design Read
Reading this as: aplicación móvil de exploración de rutas naturales, hitos NFC y guías locales en Costa Rica al estilo Strava y AllTrails, en un lenguaje visual deportivo de montaña limpio y táctil, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

## Dials
- **ENERGY**: 2 (Contraste nítido de instrumentación deportiva de montaña con acento terracota para métricas activas, nodos Àk y lectura bajo el sol).
- **RHYTHM**: 2 (Composición estructurada con 4 vistas separadas: Explorar rutas cercanas con detalle de mapa y guías, Escanear Àk, Cupones separados con códigos visibles en línea y Perfil).
- **MOTION**: 2 (Animación de trazo SVG al escanear el grabado rúnico NFC y selección interactiva de nodos Àk en el mapa del sendero).

## Decisiones de Diseño (R-31: Razón en una línea)
- **Por qué esta paleta de color**: Base piedra cálida (`#F7F6F2`) y verde bosque (`#14281D`) con acento terracota (`#B04A12`) para mantener contraste WCAG AA superior a 4.5:1 en exteriores, más modo oscuro volcánico (`#0F1210`).
- **Por qué este layout**: Cuatro vistas separadas en la barra inferior (`Explorar`, `Escanear Àk`, `Cupones`, `Perfil`) más datos de usuario arriba a la derecha para no mezclar el catálogo de cupones con el explorador de rutas.
- **Por qué esta tipografía**: `Plus Jakarta Sans` para telemetría de ritmo, altitud y saldos en `Tsirö`, combinada con `Fraunces` en nombres de parques e hitos ancestrales `Àk`.
- **Por qué este espaciado**: Objetivos táctiles de mínimo 44x44px con separación de 8px a 12px para operar con una mano en movimiento.
- **Por qué usar tarjetas diferenciadas**: Las tarjetas de ruta muestran telemetría y disponibilidad de guías; la vista de detalle de ruta despliega el mapa de nodos `Àk` y el selector de guías; y la vista de cupones muestra una caja de código permanente en pantalla al reclamar un beneficio.
- **Por qué usar el glifo rúnico SVG y la moneda Tsirö**: El grabado octogonal representa el `Àk` (piedra en Bribri) y `Tsirö` (semilla de cacao, moneda ancestral indígena) otorga recompensas proporcionales (+15 a +25 Tsirö por hito).
