# DESIGN.md: Akapp (Rutas, Hitos NFC, Guías y Cupones Tsirö)

## Design Read
Reading this as: aplicación móvil de exploración de rutas naturales, hitos NFC y guías locales en Costa Rica al estilo Strava y AllTrails, en un lenguaje visual deportivo de montaña limpio y táctil, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

## Dials
- **ENERGY**: 2 (Contraste nítido de instrumentación deportiva de montaña con acento terracota para métricas activas, nodos Àk y lectura bajo el sol).
- **RHYTHM**: 2 (Composición estructurada con cinco accesos inferiores: Mapa general, Explorar con modo sendero, runa central de escaneo NFC, Cupones y Configuración; Perfil se abre desde el avatar superior derecho).
- **MOTION**: 2 (Animación de trazo SVG al escanear el grabado rúnico NFC y selección interactiva de nodos Àk en el mapa del sendero).

## Decisiones de Diseño (R-31: Razón en una línea)
- **Por qué esta paleta de color**: Paleta de la demo visual: noche (`#070707`), obsidiana (`#10201D`), lumbre (`#F1BF57`), ámbar (`#F5A114`) y jade (`#34C38F`), con modo día en arena (`#EDE8DC`).
- **Por qué este layout**: Barra inferior de cinco accesos con la runa al centro y avatar arriba a la derecha. Al abrir un parque, 1/3 superior de minimapa estilo Waze y 2/3 inferiores con piedras Àk y accesos flotantes de micrófono (izquierda) y cámara (derecha) para ciencia ciudadana del SINAC.
- **Por qué esta tipografía**: `Outfit` para interfaz, saldos en `Tsirö` y datos de ruta, combinada con `Marcellus` en títulos y nombres de parques.
- **Por qué este espaciado**: Objetivos táctiles de mínimo 44x44px con separación de 8px a 12px para operar con una mano en movimiento.
- **Por qué usar tarjetas diferenciadas**: Las tarjetas de ruta muestran telemetría y disponibilidad de guías; el modo sendero despliega el minimapa con flecha de dirección, los nodos `Àk` y el selector de guías; y la vista de cupones muestra una caja de código permanente en pantalla al reclamar un beneficio.
- **Por qué usar el logo rúnico y la moneda Tsirö**: El logotipo tallado de Akapp es el disparador del escaneo de cada `Àk` (piedra en Bribri) y `Tsirö` (semilla de cacao, moneda ancestral indígena) otorga recompensas proporcionales (+15 a +25 Tsirö por hito).
