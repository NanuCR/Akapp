# DESIGN.md: Akapp (Rutas, Hitos NFC, Guías y Cupones Tsirö)

## Design Read
Reading this as: aplicación móvil de exploración de rutas naturales, hitos NFC y guías locales en Costa Rica al estilo Strava y AllTrails, en un lenguaje visual deportivo de montaña limpio y táctil, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

## Dials
- **ENERGY**: 2 (Contraste nítido de instrumentación deportiva de montaña con acento cian para métricas activas, nodos Àk y lectura bajo el sol).
- **RHYTHM**: 2 (Composición estructurada con cinco accesos inferiores: Mapa general, Explorar con modo sendero, runa central de escaneo NFC, Cupones y Configuración; Perfil se abre desde el avatar superior derecho).
- **MOTION**: 2 (Animación de trazo SVG al escanear el grabado rúnico NFC y selección interactiva de nodos Àk en el mapa del sendero).

## Decisiones de Diseño (R-31: Razón en una línea)
- **Por qué esta paleta de color**: Verdes de conservación (bosque `#0F5C46`, texto `#0E2A22`) con cian `#0E7490` para acciones y estados activos, sobre blanco y gris muy claro (`#F8FAF9`). Contraste WCAG AA verificado. Modo noche en verde profundo (`#07140F`) con esmeralda `#4FD1A5` y cian `#38D6E8`.
- **Por qué este layout**: Barra inferior de cinco accesos con la runa al centro y avatar arriba a la derecha. Al abrir un parque, 1/3 superior de minimapa estilo Waze y 2/3 inferiores con piedras Àk y accesos flotantes de micrófono (izquierda) y cámara (derecha) para ciencia ciudadana del SINAC.
- **Por qué esta tipografía**: Pila de sistema estilo Apple (`-apple-system`, `SF Pro`) con `Inter` como respaldo. Títulos en `font-light` con tracking cerrado, y textos en `font-medium` o `font-semibold` para una jerarquía limpia.
- **Por qué este espaciado**: Objetivos táctiles de mínimo 44x44px con separación de 8px a 12px para operar con una mano en movimiento.
- **Por qué usar tarjetas diferenciadas**: Las tarjetas de ruta muestran telemetría y disponibilidad de guías; el modo sendero despliega el minimapa con flecha de dirección, los nodos `Àk` y el selector de guías; y la vista de cupones muestra una caja de código permanente en pantalla al reclamar un beneficio.
- **Por qué usar el logo rúnico y la moneda Tsirö**: El logotipo tallado de Akapp es el disparador del escaneo de cada `Àk` (piedra en Bribri) y `Tsirö` (semilla de cacao, moneda ancestral indígena) otorga recompensas proporcionales (+15 a +25 Tsirö por hito).
