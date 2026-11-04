# Akapp - Turismo Regenerativo y Senderismo Gamificado

> Proyecto para el **HackaToB 2026** (Costa Rica).

Akapp transforma la experiencia de recorrer los Parques Nacionales de Costa Rica mediante la búsqueda geolocalizada de **Piedras Àk** y una economía circular basada en la moneda ancestral **Tsirö** (granos de cacao), canjeable por beneficios reales en comercios y guías turísticos locales.

---

## 1. Puesta en Marcha Rápida (Para Compañeros del Equipo)

### Prerrequisitos
* **Node.js** (v18 o superior)
* **Git**

### Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/NanuCR/Akapp.git
cd Akapp

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor local de desarrollo
npm run dev

# 4. Probar la compilación para producción
npm run build
```

---

## 2. Stack Tecnológico
* **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Componentes UI**: [HeroUI v2](https://heroui.com/)
* **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
* **Iconos**: [Lucide React](https://lucide.dev/)
* **Mapas e Información Geográfica**: [Leaflet](https://leafletjs.com/) y [React-Leaflet](https://react-leaflet.js.org/) con capas vectoriales de OpenStreetMap
* **Despliegue Continuo (CI/CD)**: Conectado a **Vercel** en la rama `main`. Cada push a `main` actualiza la web pública automáticamente.

---

## 3. Estructura del Proyecto

```text
Akapp/
├── public/
│   └── parks/                      # Fotografías reales de parques nacionales (Poás, Tenorio, Tapantí)
├── src/
│   ├── App.jsx                     # Componente principal: estado de Tsirö, rutas, Leaflet, canje de cupones
│   ├── main.jsx                    # Punto de entrada de React y HeroUIProvider
│   └── index.css                   # Variables de diseño y estilos globales
├── directorio_establecimientos_parques_cr.xlsx  # Directorio con 44 comercios locales para encuestas
├── tailwind.config.js              # Configuración de colores y temas HeroUI
├── vite.config.js                  # Configuración del bundler Vite
└── package.json                    # Dependencias y scripts
```

---

## 4. Reglas Clave y Decisiones de Diseño

Si tú o tu agente de IA van a editar el código, mantengan estos estándares aprobados:

1. **Ubicación de las Piedras Àk**:
   * Las piedras están georreferenciadas estrictamente sobre los senderos oficiales de OpenStreetMap (Poás en Laguna Botos; Tenorio en Catarata y Teñideros; Tapantí en Oropéndola). No mover las coordenadas fuera de las líneas de los senderos.
2. **Sin Elevación en los Àks**:
   * Las piedras Àk no muestran altitud, pendiente ni perfil altimétrico. No volver a agregar estos datos.
3. **Economía Tsirö Proporcional**:
   * Recolección: +10 a +25 Tsirö por piedra encontrada.
   * Cupones y Recompensas: 150 a 1200 Tsirö para canjear en comercios de la comunidad.
4. **Accesibilidad y Móvil**:
   * Botones e interactivos con área táctil mínima de 44x44px.
   * Contraste de color superior a 4.5:1.
5. **Tipografía y Textos**:
   * No utilizar guiones largos (em dashes o en dashes) en la interfaz ni en la documentación.

---

## 5. Flujo de Trabajo con Git
1. Antes de empezar una nueva funcionalidad: `git pull origin main`
2. Trabaja tus cambios y verifica con: `npm run build`
3. Sube tus cambios:
   ```bash
   git add .
   git commit -m "feat: descripción de la mejora"
   git push origin main
   ```
4. Vercel publicará la nueva versión en línea en cuestión de segundos.
