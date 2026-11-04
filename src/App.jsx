import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Avatar,
  Progress,
  Divider,
} from "@heroui/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ROUTES = [
  {
    id: "poas",
    name: "Parque Nacional Volcán Poás",
    photo: "/parks/poas.jpg",
    photoAlt: "Cráter principal turquesa del Parque Nacional Volcán Poás",
    region: "Alajuela · A 18 km de ti",
    difficulty: "Moderada",
    rating: "4.9 (418)",
    surface: "Sendero pavimentado y lastre",
    condition: "Despejado · 14 °C",
    distance: "4,8 km",
    elevation: "+260 m",
    duration: "1h 45m",
    totalTsiro: 50,
    center: [10.1894, -84.2309],
    zoom: 16,
    trailsSummary: "2 senderos conectados (Cráter Principal y Laguna Botos)",
    trailPath: [
      [10.18821, -84.23305],
      [10.18848, -84.2329],
      [10.18876, -84.23292],
      [10.18899, -84.23307],
      [10.1893, -84.23322],
      [10.18961, -84.23317],
      [10.18989, -84.23305],
      [10.19004, -84.23292],
      [10.1902, -84.2327],
      [10.19012, -84.23264],
      [10.18996, -84.23252],
      [10.18976, -84.23231],
      [10.18965, -84.23205],
      [10.18951, -84.23183],
      [10.18962, -84.23158],
      [10.19006, -84.23157],
      [10.18997, -84.23095],
      [10.1898, -84.23033],
      [10.19014, -84.22997],
      [10.1902, -84.22983],
      [10.19014, -84.22974],
      [10.18985, -84.22958],
      [10.18939, -84.22874],
      [10.18914, -84.22861],
    ],
    aks: [
      {
        id: "ak-01",
        code: "Àk #01",
        name: "Caseta de Entrada",
        trail: "Sendero Cráter",
        km: "0,2 km",
        tsiro: 10,
        xp: 80,
        lat: 10.18821,
        lng: -84.23305,
      },
      {
        id: "ak-02",
        code: "Àk #02",
        name: "Mirador Cráter Principal",
        trail: "Sendero Cráter",
        km: "1,4 km",
        tsiro: 15,
        xp: 120,
        lat: 10.1902,
        lng: -84.2327,
      },
      {
        id: "ak-03",
        code: "Àk #03",
        name: "Bifurcación Bosque Nuboso",
        trail: "Sendero Laguna Botos",
        km: "2,9 km",
        tsiro: 10,
        xp: 100,
        lat: 10.18997,
        lng: -84.23095,
      },
      {
        id: "ak-04",
        code: "Àk #04",
        name: "Mirador Laguna Botos",
        trail: "Sendero Laguna Botos",
        km: "4,8 km",
        tsiro: 15,
        xp: 150,
        lat: 10.18914,
        lng: -84.22861,
      },
    ],
    guides: [
      {
        id: "g-poas-1",
        initials: "CR",
        name: "Carlos Rojas",
        specialty: "Vulcanología y aves de altura · Certificado ICT",
        schedule: "Salidas 8:00 AM y 10:30 AM",
        rate: "₡12.000 por persona",
        available: true,
      },
      {
        id: "g-poas-2",
        initials: "MV",
        name: "Mariela Vargas",
        specialty: "Botánica de bosque nuboso · Bióloga local",
        schedule: "Salida 9:00 AM",
        rate: "₡14.000 por persona",
        available: true,
      },
      {
        id: "g-poas-3",
        initials: "JS",
        name: "Jorge Solís",
        specialty: "Fotografía de naturaleza",
        schedule: "En ruta actualmente",
        rate: "₡15.000 por persona",
        available: false,
      },
    ],
  },
  {
    id: "tenorio",
    name: "P.N. Volcán Tenorio · Río Celeste",
    photo: "/parks/tenorio.jpg",
    photoAlt: "Catarata Río Celeste en el Parque Nacional Volcán Tenorio",
    region: "Guatuso · A 64 km de ti",
    difficulty: "Moderada - Alta",
    rating: "4.9 (612)",
    surface: "Tierra, raíces y gradas de piedra",
    condition: "Húmedo · 22 °C",
    distance: "6,2 km",
    elevation: "+380 m",
    duration: "2h 30m",
    totalTsiro: 65,
    center: [10.7082, -84.9918],
    zoom: 14,
    trailsSummary:
      "Sendero Misterios del Tenorio (Catarata, Laguna Azul y Teñideros)",
    trailPath: [
      [10.71564, -84.98726],
      [10.71467, -84.98761],
      [10.71351, -84.9879],
      [10.7125, -84.98814],
      [10.71168, -84.98834],
      [10.71076, -84.98821],
      [10.70989, -84.98865],
      [10.70875, -84.98916],
      [10.70769, -84.98971],
      [10.70659, -84.98996],
      [10.70563, -84.98995],
      [10.70486, -84.99033],
      [10.70429, -84.99111],
      [10.7037, -84.9917],
      [10.70296, -84.99247],
      [10.70244, -84.99352],
      [10.70194, -84.99427],
      [10.70191, -84.9951],
      [10.70229, -84.99576],
      [10.70219, -84.99662],
      [10.70146, -84.99676],
      [10.70057, -84.99701],
    ],
    aks: [
      {
        id: "ak-05",
        code: "Àk #05",
        name: "Catarata Río Celeste",
        trail: "Sendero Misterios del Tenorio",
        km: "1,8 km",
        tsiro: 20,
        xp: 140,
        lat: 10.70486,
        lng: -84.99033,
      },
      {
        id: "ak-06",
        code: "Àk #06",
        name: "Mirador Laguna Azul",
        trail: "Sendero Misterios del Tenorio",
        km: "3,9 km",
        tsiro: 20,
        xp: 150,
        lat: 10.70244,
        lng: -84.99352,
      },
      {
        id: "ak-07",
        code: "Àk #07",
        name: "Los Teñideros",
        trail: "Sendero Misterios del Tenorio",
        km: "6,2 km",
        tsiro: 25,
        xp: 200,
        lat: 10.70057,
        lng: -84.99701,
      },
    ],
    guides: [
      {
        id: "g-ten-1",
        initials: "DM",
        name: "Danilo Méndez",
        specialty: "Herpetología y dantas · Comunidad Maleku",
        schedule: "Salidas 7:30 AM y 11:00 AM",
        rate: "₡15.000 por persona",
        available: true,
      },
    ],
  },
  {
    id: "tapanti",
    name: "Parque Nacional Tapantí",
    photo: "/parks/tapanti.jpg",
    photoAlt: "Bosque nuboso y río Grande de Orosi en el Parque Nacional Tapantí",
    region: "Orosi, Cartago · A 32 km de ti",
    difficulty: "Suave - Moderada",
    rating: "4.8 (289)",
    surface: "Lastre compacto y puentes de madera",
    condition: "Nublado · 18 °C",
    distance: "4,0 km",
    elevation: "+190 m",
    duration: "1h 30m",
    totalTsiro: 40,
    center: [9.7505, -83.7826],
    zoom: 16,
    trailsSummary:
      "Senderos Oropéndola, Arbolado y La Pava junto al río Grande de Orosi",
    trailPath: [
      [9.7498, -83.78185],
      [9.75021, -83.78197],
      [9.75043, -83.78211],
      [9.75062, -83.78222],
      [9.75087, -83.78247],
      [9.75093, -83.78269],
      [9.75104, -83.78297],
      [9.75125, -83.78314],
      [9.75126, -83.78326],
      [9.751, -83.7832],
      [9.75076, -83.78319],
      [9.75053, -83.78309],
      [9.75025, -83.78303],
      [9.75, -83.78297],
      [9.74985, -83.78308],
    ],
    aks: [
      {
        id: "ak-08",
        code: "Àk #08",
        name: "Inicio Sendero Oropéndola",
        trail: "Sendero Oropéndola",
        km: "1,5 km",
        tsiro: 20,
        xp: 130,
        lat: 9.7498,
        lng: -83.78185,
      },
      {
        id: "ak-09",
        code: "Àk #09",
        name: "Mirador Río Grande de Orosi",
        trail: "Sendero Oropéndola",
        km: "4,0 km",
        tsiro: 20,
        xp: 150,
        lat: 9.75126,
        lng: -83.78326,
      },
    ],
    guides: [],
  },
];

const BENEFITS = [
  {
    id: "b1",
    category: "gastronomia",
    tag: "CAFETERÍA DE MONTAÑA",
    discountBadge: "10% DCTO",
    title: "10% de descuento en café chorreado y repostería",
    place: "Soda Doña María · Sector Volcán Poás",
    requirement: "Equivale a ~10 hitos escaneados",
    cost: 150,
    code: "TSIRO-CAFE-10",
  },
  {
    id: "b2",
    category: "gastronomia",
    tag: "COCINA LOCAL",
    discountBadge: "15% DCTO",
    title: "15% de descuento en almuerzo tradicional",
    place: "Restaurante El Trillo · Fraijanes",
    requirement: "Equivale a ~20 hitos escaneados",
    cost: 300,
    code: "TSIRO-ALMUERZO-15",
  },
  {
    id: "b3",
    category: "guias",
    tag: "GUÍAS CERTIFICADOS",
    discountBadge: "15% DCTO",
    title: "15% de descuento en tarifa de guía certificado",
    place: "Asociación de Guías Locales · Poás y Tenorio",
    requirement: "Aplicable al reservar guía en ruta",
    cost: 450,
    code: "TSIRO-GUIA-15",
  },
  {
    id: "b4",
    category: "hospedaje",
    tag: "ECO-LODGE",
    discountBadge: "20% DCTO",
    title: "20% en estadía de fin de semana (2 noches)",
    place: "Posada Río Agrio · Bajos del Toro",
    requirement: "Recompensa de temporada (80 hitos)",
    cost: 1200,
    code: "TSIRO-POSADA-20",
  },
];

const WEEKLY_KM = [
  { day: "L", km: 3.2 },
  { day: "M", km: 0 },
  { day: "K", km: 5.4 },
  { day: "J", km: 4.1 },
  { day: "V", km: 0 },
  { day: "S", km: 11.8 },
  { day: "D", km: 8.6 },
];

// Píldora perfectamente centrada horizontal y verticalmente (reemplaza el Chip desalineado)
function BadgePill({ children, tone = "secondary", className = "" }) {
  const toneClasses = {
    secondary: "bg-secondary text-secondary-foreground",
    secondaryFlat: "bg-secondary/15 text-secondary border border-secondary/30",
    primary: "bg-primary text-primary-foreground",
    primaryFlat: "bg-primary/15 text-primary border border-primary/25",
    successFlat: "bg-success/15 text-success-700 dark:text-success border border-success/30",
    neutral: "bg-default-100 text-foreground border border-default-200",
    darkGlass: "bg-black/65 text-white border border-white/20 backdrop-blur-md",
  };

  return (
    <span
      className={`inline-flex items-center justify-center text-center leading-none font-semibold text-xs px-3 h-7 rounded-full whitespace-nowrap shrink-0 select-none ${
        toneClasses[tone] || toneClasses.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}

const COSTA_RICA_BOUNDS = [
  [8.0, -85.95],
  [11.25, -82.55],
];

const toRadians = (deg) => (deg * Math.PI) / 180;

function distanceMeters(a, b) {
  const dLat = toRadians(b[0] - a[0]);
  const dLng = toRadians(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a[0])) *
      Math.cos(toRadians(b[0])) *
      Math.sin(dLng / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(h));
}

function bearingDegrees(a, b) {
  const lat1 = toRadians(a[0]);
  const lat2 = toRadians(b[0]);
  const dLng = toRadians(b[1] - a[1]);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function nearestPathIndex(path, point) {
  let best = 0;
  let bestDistance = Infinity;
  path.forEach((vertex, index) => {
    const d = distanceMeters(vertex, point);
    if (d < bestDistance) {
      bestDistance = d;
      best = index;
    }
  });
  return best;
}

// Tramo del sendero entre la última piedra sellada y la siguiente pendiente
function buildWalkPath(route, nextAk) {
  const path = route.trailPath;
  if (!nextAk) return [path[path.length - 1]];

  const nextIndex = route.aks.findIndex((ak) => ak.id === nextAk.id);
  const previousAk = route.aks[nextIndex - 1];
  const start = previousAk
    ? nearestPathIndex(path, [previousAk.lat, previousAk.lng])
    : 0;
  const end = nearestPathIndex(path, [nextAk.lat, nextAk.lng]);

  const stretch =
    start <= end
      ? path.slice(start, end + 1)
      : path.slice(end, start + 1).reverse();
  return [...stretch, [nextAk.lat, nextAk.lng]];
}

function pointAlongWalk(walkPath, walked) {
  let remainingToWalk = walked;
  for (let i = 0; i < walkPath.length - 1; i += 1) {
    const from = walkPath[i];
    const to = walkPath[i + 1];
    const length = distanceMeters(from, to);
    if (length === 0) continue;
    if (remainingToWalk <= length || i === walkPath.length - 2) {
      const t = Math.min(1, remainingToWalk / length);
      return {
        position: [
          from[0] + (to[0] - from[0]) * t,
          from[1] + (to[1] - from[1]) * t,
        ],
        heading: bearingDegrees(from, to),
      };
    }
    remainingToWalk -= length;
  }
  return { position: walkPath[walkPath.length - 1], heading: 0 };
}

function walkLength(walkPath) {
  return walkPath.reduce(
    (total, vertex, index) =>
      index === 0 ? 0 : total + distanceMeters(walkPath[index - 1], vertex),
    0
  );
}

const MAP_ARROW_HTML = `<div class="nav-arrow-pulse"></div>
  <div class="nav-arrow">
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <path d="M16 3 L27 28 L16 22 L5 28 Z" fill="#0F5C46" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" />
    </svg>
  </div>`;

function createAkIcon(ak, isDone, isSelected) {
  const background = isDone ? "#0F7A5A" : "#0E2A22";
  const ring = isSelected
    ? "box-shadow: 0 0 0 4px rgba(143, 166, 90, 0.85);"
    : "box-shadow: 0 2px 5px rgba(0,0,0,0.35);";

  return L.divIcon({
    className: "ak-custom-pin",
    html: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:64px;height:36px;">
      <div style="background:${background};color:#FFFFFF;border:2px solid #FFFFFF;${ring}border-radius:9999px;padding:2px 8px;font-size:11px;font-weight:600;line-height:1.1;white-space:nowrap;text-align:center;">${ak.code}</div>
      <div style="width:8px;height:8px;border-radius:9999px;background:${background};border:2px solid #FFFFFF;margin-top:2px;"></div>
    </div>`,
    iconSize: [64, 36],
    iconAnchor: [32, 34],
  });
}

// Minimapa OpenStreetMap que sigue la flecha de dirección sobre el sendero
function TrailMiniMap({
  route,
  scannedAkIds,
  selectedAkId,
  onSelectAk,
  position,
  heading,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const arrowRef = useRef(null);
  const previousSelectedRef = useRef(selectedAkId);
  const [following, setFollowing] = useState(true);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      center: position,
      zoom: Math.max(route.zoom, 16),
      zoomControl: false,
    });
    map.attributionControl.setPrefix(false);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    arrowRef.current = L.marker(position, {
      icon: L.divIcon({
        className: "nav-arrow-pin",
        html: MAP_ARROW_HTML,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      }),
      interactive: false,
      zIndexOffset: 1000,
    }).addTo(map);

    map.on("dragstart", () => setFollowing(false));
    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    layer.clearLayers();

    L.polyline(route.trailPath, {
      color: "#FFFFFF",
      weight: 8,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(layer);

    L.polyline(route.trailPath, {
      color: "#0F5C46",
      weight: 4.5,
      dashArray: "7 5",
      lineCap: "round",
      lineJoin: "round",
    }).addTo(layer);

    route.aks.forEach((ak) => {
      L.marker([ak.lat, ak.lng], {
        icon: createAkIcon(
          ak,
          scannedAkIds.includes(ak.id),
          selectedAkId === ak.id
        ),
      })
        .on("click", () => onSelectAk(ak.id))
        .addTo(layer);
    });
  }, [route, scannedAkIds, selectedAkId, onSelectAk]);

  useEffect(() => {
    arrowRef.current.setLatLng(position);
    const arrow = arrowRef.current.getElement()?.querySelector(".nav-arrow");
    if (arrow) arrow.style.transform = `rotate(${heading}deg)`;
    if (following) {
      mapRef.current.panTo(position, { animate: true, duration: 0.4 });
    }
  }, [position, heading, following]);

  // Tocar un Àk en la lista lleva el mapa hasta esa piedra
  useEffect(() => {
    if (previousSelectedRef.current === selectedAkId) return;
    previousSelectedRef.current = selectedAkId;
    const ak = route.aks.find((item) => item.id === selectedAkId);
    if (!ak) return;
    setFollowing(false);
    mapRef.current.panTo([ak.lat, ak.lng]);
  }, [route, selectedAkId]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        aria-label={`Mapa en tiempo real de ${route.name}`}
      />
      {!following && (
        <button
          type="button"
          onClick={() => setFollowing(true)}
          className="absolute z-10 bottom-3 left-1/2 -translate-x-1/2 min-h-[40px] px-4 rounded-full bg-black/75 text-white text-xs font-semibold border border-white/25 backdrop-blur-md"
        >
          Volver a mi posición
        </button>
      )}
    </div>
  );
}

// Mapa general de Costa Rica con los parques nacionales disponibles
function GeneralParksMap({ onOpenRoute }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      zoomControl: false,
      minZoom: 6,
    });
    map.attributionControl.setPrefix(false);
    map.fitBounds(COSTA_RICA_BOUNDS);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    ROUTES.forEach((route) => {
      const label = route.name.replace(/^(Parque Nacional|P.N.) /, "");
      L.marker(route.center, {
        title: route.name,
        icon: L.divIcon({
          className: "ak-custom-pin",
          html: `<div style="display:flex;flex-direction:column;align-items:center;width:150px;">
            <div style="background:#FFFFFF;color:#0E2A22;border:1px solid rgba(14,42,34,0.18);border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:600;line-height:1.1;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.4);">${label}</div>
            <div style="width:12px;height:12px;border-radius:9999px;background:#0F5C46;border:2px solid #FFFFFF;margin-top:3px;"></div>
          </div>`,
          iconSize: [150, 46],
          iconAnchor: [75, 44],
        }),
      })
        .on("click", () => onOpenRoute(route))
        .addTo(map);
    });

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [onOpenRoute]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full z-0"
      aria-label="Mapa de parques nacionales de Costa Rica"
    />
  );
}

function LogoMark({ className = "", decorative = false }) {
  return (
    <span
      className={`logo-mark ${className}`}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "Akapp" })}
    />
  );
}

function NavIcon({ children, className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function CostaRicaIcon(props) {
  return (
    <NavIcon {...props}>
      <path
        fill="currentColor"
        fillOpacity="0.25"
        d="M1.5 6.5 5 4.8l3 .9 3 2.1h2.6l3 2.9 2 2.6 3.9 2.2-1.1 3.1-2 2.2-1.9-2.5-2.5.4-2-2.4-3-2.1-2.4-.5-1 1.1.4-2.6-2.5-.5-2 .6-1.8-2.6z"
      />
    </NavIcon>
  );
}

function HomeIcon(props) {
  return (
    <NavIcon {...props}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </NavIcon>
  );
}

function TicketIcon(props) {
  return (
    <NavIcon {...props}>
      <path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a3 3 0 0 0 0 6v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a3 3 0 0 0 0-6z" />
      <path d="M14 5v2M14 11v2M14 17v2" />
    </NavIcon>
  );
}

function GearIcon(props) {
  return (
    <NavIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </NavIcon>
  );
}

function CameraIcon(props) {
  return (
    <NavIcon {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </NavIcon>
  );
}

function MicIcon(props) {
  return (
    <NavIcon {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </NavIcon>
  );
}

function PointsIcon(props) {
  return (
    <NavIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4z" />
    </NavIcon>
  );
}

function BackIcon(props) {
  return (
    <NavIcon {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </NavIcon>
  );
}

function NavButton({ label, ariaLabel, active, onPress, children }) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={ariaLabel || label}
      aria-current={active ? "page" : undefined}
      className={`min-h-[52px] rounded-full flex flex-col items-center justify-center gap-0.5 transition-colors ${
        active ? "text-secondary" : "text-default-500"
      }`}
    >
      {children}
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </button>
  );
}

function SettingToggle({ label, isOn, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={() => onChange(!isOn)}
      className="min-h-[44px] w-full flex items-center justify-between gap-3 text-left"
    >
      <span className="text-sm font-medium">{label}</span>
      <span
        className={`w-12 h-7 p-0.5 rounded-full flex shrink-0 transition-colors ${
          isOn ? "bg-primary justify-end" : "bg-default-300 justify-start"
        }`}
      >
        <span className="w-6 h-6 rounded-full bg-white shadow-sm" />
      </span>
    </button>
  );
}

function ProfileBubble({ onPress, className = "" }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`w-11 h-11 rounded-full inline-flex items-center justify-center shrink-0 ${className}`}
      aria-label="Abrir perfil de Esteban"
    >
      <Avatar
        name="EM"
        size="sm"
        className="w-10 h-10 text-sm font-semibold bg-primary text-primary-foreground ring-2 ring-background shadow-md"
      />
    </button>
  );
}

// Modo sendero: 1/3 minimapa, 2/3 ciencia ciudadana y piedras Àk
function TrailView({
  route,
  scannedAkIds,
  selectedAkId,
  onSelectAk,
  onBack,
  onOpenProfile,
  onScanAk,
  onArrivalChange,
  reports,
  onAddReport,
  children,
}) {
  const nextAk = useMemo(
    () => route.aks.find((ak) => !scannedAkIds.includes(ak.id)) || null,
    [route, scannedAkIds]
  );
  const walkPath = useMemo(() => buildWalkPath(route, nextAk), [route, nextAk]);
  const totalWalk = useMemo(() => walkLength(walkPath), [walkPath]);
  const [walked, setWalked] = useState(0);
  const { position, heading } = useMemo(
    () => pointAlongWalk(walkPath, walked),
    [walkPath, walked]
  );
  const remaining = Math.max(0, Math.round(totalWalk - walked));
  const arrived = Boolean(nextAk) && remaining <= 25;

  const [isRecording, setIsRecording] = useState(false);
  const [notice, setNotice] = useState(null);
  const photoInputRef = useRef(null);
  const recorderRef = useRef(null);
  const noticeTimerRef = useRef(null);

  // Simulación de la caminata para la demo: la flecha avanza por el sendero real
  useEffect(() => {
    setWalked(0);
    if (totalWalk === 0) return undefined;
    const step = Math.max(5, totalWalk / 90);
    const timer = setInterval(() => {
      setWalked((previous) => {
        const next = Math.min(totalWalk, previous + step);
        if (next >= totalWalk) clearInterval(timer);
        return next;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [totalWalk]);

  useEffect(() => {
    onArrivalChange(arrived && nextAk ? nextAk.id : null);
    return () => onArrivalChange(null);
  }, [arrived, nextAk, onArrivalChange]);

  useEffect(
    () => () => {
      clearTimeout(noticeTimerRef.current);
      if (recorderRef.current) recorderRef.current.stop();
    },
    []
  );

  const showNotice = (text) => {
    setNotice(text);
    clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => setNotice(null), 3200);
  };

  const saveReport = (type, url) => {
    onAddReport({
      id: `${type}-${Date.now()}`,
      type,
      url,
      routeName: route.name,
      lat: position[0],
      lng: position[1],
    });
    showNotice(
      `${type === "foto" ? "Foto guardada" : "Audio guardado"} en ${position[0].toFixed(
        5
      )}, ${position[1].toFixed(5)}`
    );
  };

  const handlePhotoSelected = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) saveReport("foto", URL.createObjectURL(file));
  };

  const toggleRecording = async () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        recorderRef.current = null;
        setIsRecording(false);
        saveReport(
          "audio",
          URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }))
        );
      };
      recorder.start();
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      showNotice("No se pudo usar el micrófono. Revisa los permisos.");
    }
  };

  const routeReports = reports.filter((r) => r.routeName === route.name);

  return (
    <div className="fixed inset-y-0 inset-x-0 mx-auto w-full max-w-md z-20 bg-background flex flex-col">
      {/* Tercio superior: minimapa en tiempo real */}
      <div className="relative h-[33dvh] shrink-0 overflow-hidden">
        <TrailMiniMap
          route={route}
          scannedAkIds={scannedAkIds}
          selectedAkId={selectedAkId}
          onSelectAk={onSelectAk}
          position={position}
          heading={heading}
        />
        <div className="absolute z-10 top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver a rutas cercanas"
            className="pointer-events-auto w-11 h-11 rounded-full bg-black/75 text-white border border-white/25 backdrop-blur-md inline-flex items-center justify-center"
          >
            <BackIcon className="w-5 h-5" />
          </button>
          <ProfileBubble onPress={onOpenProfile} className="pointer-events-auto" />
        </div>
      </div>

      {/* Dos tercios inferiores: progreso, piedras Àk y guías */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-3.5 pb-44 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-lg leading-tight min-w-0">
            {route.name}
          </h1>
          <BadgePill tone="secondary">+{route.totalTsiro} Tsirö</BadgePill>
        </div>

        <div
          className={`p-3.5 rounded-2xl border ${
            arrived
              ? "border-secondary bg-secondary/10"
              : "border-default-200 bg-content1"
          }`}
        >
          {nextAk ? (
            <>
              <span className="text-xs font-medium text-default-500 block">
                {arrived ? "Llegaste a la piedra" : `Siguiente, a ${remaining} m`}
              </span>
              <strong className="text-sm font-semibold block">
                {nextAk.code} · {nextAk.name}
              </strong>
              {arrived && (
                <span className="text-xs text-secondary font-medium block mt-0.5">
                  Toca la runa de abajo para escanear
                </span>
              )}
            </>
          ) : (
            <strong className="text-sm font-semibold block">
              Sellaste todas las piedras de esta ruta
            </strong>
          )}
        </div>

        {notice && (
          <div
            role="status"
            className="p-3 rounded-2xl bg-success/15 border border-success/30 text-xs font-medium text-center"
          >
            {notice}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {route.aks.map((ak) => {
            const isDone = scannedAkIds.includes(ak.id);
            const isSelected = selectedAkId === ak.id;

            return (
              <div
                key={ak.id}
                onClick={() => onSelectAk(ak.id)}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "border-secondary bg-secondary/5"
                    : "border-default-200 bg-content1"
                }`}
              >
                <div className="min-w-0">
                  <strong className="text-sm font-semibold block truncate">
                    {ak.code} · {ak.name}
                  </strong>
                  <span className="text-xs text-default-500 block tabular-nums">
                    {ak.trail} · Km {ak.km} · +{ak.tsiro} Tsirö
                  </span>
                </div>
                {isDone ? (
                  <BadgePill tone="successFlat">Sellado</BadgePill>
                ) : (
                  <Button
                    size="sm"
                    radius="full"
                    color="secondary"
                    className="min-h-[40px] text-xs font-medium px-4 shrink-0"
                    onPress={() => onScanAk(ak)}
                  >
                    Escanear
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {routeReports.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold">Tus aportes al SINAC</h2>
            {routeReports.map((report) => (
              <div
                key={report.id}
                className="p-2.5 rounded-2xl border border-default-200 bg-content1 flex items-center gap-2.5"
              >
                {report.type === "foto" ? (
                  <img
                    src={report.url}
                    alt="Foto georreferenciada"
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                ) : (
                  <audio
                    src={report.url}
                    controls
                    className="h-10 min-w-0 flex-1"
                  />
                )}
                <span className="text-xs text-default-500 tabular-nums shrink-0">
                  {report.lat.toFixed(5)}, {report.lng.toFixed(5)}
                </span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>

      {/* Accesos flotantes de ciencia ciudadana */}
      <button
        type="button"
        onClick={toggleRecording}
        aria-pressed={isRecording}
        aria-label={isRecording ? "Detener grabación" : "Grabar audio o canto de aves"}
        className={`absolute z-20 left-4 bottom-24 w-14 h-14 rounded-full inline-flex items-center justify-center shadow-lg border-2 ${
          isRecording
            ? "bg-danger text-white border-white record-pulse"
            : "bg-content1 text-foreground border-default-300"
        }`}
      >
        <MicIcon />
      </button>

      <button
        type="button"
        onClick={() => photoInputRef.current?.click()}
        aria-label="Tomar foto georreferenciada"
        className="absolute z-20 right-4 bottom-24 w-14 h-14 rounded-full bg-content1 text-foreground border-2 border-default-300 inline-flex items-center justify-center shadow-lg"
      >
        <CameraIcon />
      </button>
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhotoSelected}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}

function SafariGuideIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 7c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <path d="M3.5 7.5c2.5 1 5.5 1.5 8.5 1.5s6-.5 8.5-1.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <path d="M10 17.5L12 20l2-2.5" />
    </svg>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [vibrateOnScan, setVibrateOnScan] = useState(true);

  // Saldo proporcional de Esteban (285 Tsirö acumulados tras varias caminatas)
  const [tsiro, setTsiro] = useState(285);
  const [xp, setXp] = useState(1880);
  const [totalKm, setTotalKm] = useState(42.6);
  const [scannedAkIds, setScannedAkIds] = useState(["ak-01", "ak-02"]);

  // Vistas: "mapa" | "explorar" | "escanear" | "cupones" | "config" | "perfil"
  const [activeView, setActiveView] = useState("explorar");

  // Estado de Explorar Rutas y Detalle de Ruta
  const [routeQuery, setRouteQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("todas");
  const [axLoading, setAxLoading] = useState(false);
  const [axSuggestion, setAxSuggestion] = useState(null);
  const [openedRouteId, setOpenedRouteId] = useState(null);
  const [selectedMapAkId, setSelectedMapAkId] = useState("ak-03");
  const [selectedGuidesByRoute, setSelectedGuidesByRoute] = useState({});
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);

  // Estado de Escáner NFC
  const [scannerAkId, setScannerAkId] = useState("ak-03");
  const [scanState, setScanState] = useState("idle"); // "idle" | "scanning" | "done"
  const [nearAkId, setNearAkId] = useState(null);
  const scanTimerRef = useRef(null);

  // Fotos y audios georreferenciados de ciencia ciudadana
  const [reports, setReports] = useState([]);

  // Estado de Cupones Separados y Pase Perforado
  const [couponCategory, setCouponCategory] = useState("todos");
  const [redeemedIds, setRedeemedIds] = useState([]);
  const [justRedeemedCoupon, setJustRedeemedCoupon] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const allAks = useMemo(() => ROUTES.flatMap((r) => r.aks), []);
  const scannerAk = useMemo(
    () => allAks.find((a) => a.id === scannerAkId) || allAks[0],
    [allAks, scannerAkId]
  );

  const openedRoute = useMemo(
    () => ROUTES.find((r) => r.id === openedRouteId) || null,
    [openedRouteId]
  );

  const selectedMapAk = useMemo(() => {
    if (!openedRoute) return null;
    return (
      openedRoute.aks.find((a) => a.id === selectedMapAkId) ||
      openedRoute.aks[0] ||
      null
    );
  }, [openedRoute, selectedMapAkId]);

  const selectedGuideForOpenedRoute = useMemo(() => {
    if (!openedRoute) return null;
    const gId = selectedGuidesByRoute[openedRoute.id];
    if (!gId) return null;
    return openedRoute.guides.find((g) => g.id === gId) || null;
  }, [openedRoute, selectedGuidesByRoute]);

  const level = Math.floor(xp / 250) + 1;
  const currentLevelXp = xp % 250;
  const levelProgress = Math.round((currentLevelXp / 250) * 100);

  const isOnTrail = activeView === "explorar" && Boolean(openedRoute);

  const scannerRouteProgress = useMemo(() => {
    const route = ROUTES.find((r) => r.aks.some((a) => a.id === scannerAkId));
    return {
      done: route.aks.filter((a) => scannedAkIds.includes(a.id)).length,
      total: route.aks.length,
      routeName: route.name.replace(/^(Parque Nacional|P.N.) /, ""),
    };
  }, [scannerAkId, scannedAkIds]);

  const setTheme = (dark) => {
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  };

  // Búsqueda de rutas cercanas o asistente AX
  const handleRouteSearch = (val) => {
    setRouteQuery(val);
    const clean = val.trim().toLowerCase();

    if (!clean) {
      setAxSuggestion(null);
      setAxLoading(false);
      return;
    }

    const isQuestion =
      clean.includes("hora") ||
      clean.includes("?") ||
      clean.includes("suave") ||
      clean.includes("recomienda");

    if (isQuestion) {
      setAxLoading(true);
      setAxSuggestion(null);
      setTimeout(() => {
        setAxLoading(false);
        setAxSuggestion({
          routeId: "poas",
          title: "Recomendación AX: Parque Nacional Volcán Poás",
          text: "A 18 km de tu ubicación. Tiene 4 piedras Àk (+50 Tsirö en total) y 2 guías certificados disponibles para salir hoy.",
        });
      }, 240);
    } else {
      setAxLoading(false);
      setAxSuggestion(null);
    }
  };

  const filteredRoutes = useMemo(() => {
    const clean = routeQuery.trim().toLowerCase();
    const isQuestion =
      clean.includes("hora") ||
      clean.includes("?") ||
      clean.includes("suave") ||
      clean.includes("recomienda");

    return ROUTES.filter((r) => {
      if (difficultyFilter === "con-guia") {
        const hasGuide = r.guides.some((g) => g.available);
        if (!hasGuide) return false;
      }

      if (!clean || isQuestion) return true;
      return `${r.name} ${r.region} ${r.trailsSummary}`
        .toLowerCase()
        .includes(clean);
    });
  }, [routeQuery, difficultyFilter]);

  const openRouteDetail = (route) => {
    const firstPending =
      route.aks.find((a) => !scannedAkIds.includes(a.id)) || route.aks[0];
    setOpenedRouteId(route.id);
    setGuidesDropdownOpen(false);
    setSelectedMapAkId(firstPending.id);
  };

  // Se mantiene estable para que el mapa general no se vuelva a crear
  const openRouteDetailRef = useRef(openRouteDetail);
  openRouteDetailRef.current = openRouteDetail;
  const handleOpenRouteFromMap = useCallback((route) => {
    openRouteDetailRef.current(route);
    setActiveView("explorar");
  }, []);

  const goToExplore = () => {
    setOpenedRouteId(null);
    setActiveView("explorar");
  };

  const handleAddReport = (report) => {
    setReports((prev) => [report, ...prev]);
  };

  const handleSelectGuide = (routeId, guideId) => {
    setSelectedGuidesByRoute((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === guideId ? null : guideId,
    }));
  };

  useEffect(() => () => clearTimeout(scanTimerRef.current), []);

  const startScan = (ak) => {
    if (scanState === "scanning") return;
    setScannerAkId(ak.id);
    setScanState("scanning");
    if (vibrateOnScan) navigator.vibrate?.([40, 80, 40]);

    scanTimerRef.current = setTimeout(() => {
      setTsiro((prev) => prev + ak.tsiro);
      setXp((prev) => prev + ak.xp);
      setTotalKm((prev) => Number((prev + 1.2).toFixed(1)));
      setScannedAkIds((prev) => [...prev, ak.id]);
      setScanState("done");
      setActiveView("escanear");
      if (vibrateOnScan) navigator.vibrate?.(120);
    }, 2400);
  };

  // Botón central: escanea la siguiente piedra pendiente de la ruta abierta
  const handleNfcPress = () => {
    const isPending = (ak) => !scannedAkIds.includes(ak.id);
    const target =
      openedRoute?.aks.find(isPending) || allAks.find(isPending) || null;

    if (target) {
      startScan(target);
      return;
    }
    setScanState("idle");
    setActiveView("escanear");
  };

  const handleContinueAfterScan = () => {
    setScanState("idle");
    setActiveView("explorar");
  };

  const handleResetDemo = () => {
    setTsiro(285);
    setXp(1880);
    setTotalKm(42.6);
    setScannedAkIds(["ak-01", "ak-02"]);
    setRedeemedIds([]);
    setJustRedeemedCoupon(null);
    setReports([]);
    setScanState("idle");
    setOpenedRouteId(null);
    setActiveView("explorar");
  };

  const handleRedeemCoupon = (benefit) => {
    if (redeemedIds.includes(benefit.id)) {
      setJustRedeemedCoupon(benefit);
      return;
    }
    if (tsiro < benefit.cost) return;
    setTsiro((prev) => prev - benefit.cost);
    setRedeemedIds((prev) => [...prev, benefit.id]);
    setJustRedeemedCoupon(benefit);
  };

  const handleCopyVoucherCode = (code) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 1800);
  };

  const filteredCoupons = useMemo(() => {
    return BENEFITS.filter((b) => {
      if (couponCategory === "canjeados") return redeemedIds.includes(b.id);
      if (couponCategory === "todos") return true;
      return b.category === couponCategory;
    });
  }, [couponCategory, redeemedIds]);

  const redeemedCouponsList = useMemo(
    () => BENEFITS.filter((b) => redeemedIds.includes(b.id)),
    [redeemedIds]
  );

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-md min-h-dvh flex flex-col pb-32 px-4 pt-3">
        
        {/* CABECERA FIJA: puntos a la izquierda, logo al centro y avatar a la derecha */}
        {!isOnTrail && (
          <header className="sticky top-0 z-10 -mx-4 px-4 py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-background/90 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveView("cupones")}
              aria-label={`Saldo de ${tsiro} puntos, abrir Cupones`}
              className="min-h-[44px] justify-self-start inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums"
            >
              <PointsIcon className="w-5 h-5 text-primary" />
              <span>{tsiro.toLocaleString("en-US")} pts</span>
            </button>

            <button
              type="button"
              onClick={goToExplore}
              aria-label="Ir a Explorar"
              className="min-h-[44px] inline-flex items-center justify-center text-primary"
            >
              <LogoMark className="h-10" decorative />
            </button>

            <ProfileBubble
              onPress={() => setActiveView("perfil")}
              className="justify-self-end"
            />
          </header>
        )}

        {/* ========================================================= */}
        {/* VISTA 1: EXPLORAR (CON FOTOGRAFÍAS REALES DE LOS PARQUES) */}
        {/* ========================================================= */}
        {activeView === "explorar" && !openedRoute && (
          <main className="flex flex-col gap-4 mt-1 flex-1">
            
            {/* Barra de búsqueda flotante estilo cápsula */}
            <div className="flex flex-col gap-2.5">
              <Input
                type="search"
                size="md"
                radius="full"
                variant="bordered"
                value={routeQuery}
                onValueChange={handleRouteSearch}
                placeholder="Buscar parque, sendero o pedir ruta..."
                aria-label="Buscar parque, sendero o pedir ruta"
                endContent={
                  routeQuery ? (
                    <button
                      type="button"
                      onClick={() => handleRouteSearch("")}
                      className="text-xs font-medium text-default-500 px-2 py-1 rounded-full hover:bg-default-100"
                    >
                      Limpiar
                    </button>
                  ) : null
                }
                classNames={{
                  inputWrapper:
                    "bg-content1 min-h-[48px] border-default-300 shadow-sm px-4",
                  input: "text-sm !bg-transparent",
                }}
              />

              {/* Píldoras de filtro en 2 columnas iguales */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  radius="full"
                  variant={difficultyFilter === "todas" ? "solid" : "flat"}
                  color={difficultyFilter === "todas" ? "primary" : "default"}
                  className="min-h-[44px] text-xs font-medium px-3"
                  onPress={() => setDifficultyFilter("todas")}
                >
                  Cerca de mí (3)
                </Button>
                <Button
                  size="sm"
                  radius="full"
                  variant={difficultyFilter === "con-guia" ? "solid" : "flat"}
                  color={difficultyFilter === "con-guia" ? "primary" : "default"}
                  className="min-h-[44px] text-xs font-medium px-3"
                  onPress={() => setDifficultyFilter("con-guia")}
                >
                  Con guía hoy
                </Button>
              </div>

              {axLoading && (
                <Card shadow="none" className="border border-default-200 bg-content1 rounded-2xl">
                  <CardBody className="py-3 px-4 text-xs text-default-600 text-center">
                    Buscando rutas cercanas y disponibilidad de guías...
                  </CardBody>
                </Card>
              )}

              {axSuggestion && (
                <Card shadow="sm" className="border border-secondary/40 bg-content1 rounded-2xl">
                  <CardBody className="gap-1.5 py-3.5 px-4">
                    <span className="text-xs font-semibold text-secondary">
                      {axSuggestion.title}
                    </span>
                    <p className="text-xs text-default-600 leading-relaxed">
                      {axSuggestion.text}
                    </p>
                  </CardBody>
                  <CardFooter className="pt-0 pb-3.5 px-4">
                    <Button
                      size="sm"
                      radius="full"
                      color="secondary"
                      className="min-h-[44px] w-full font-medium"
                      onPress={() => {
                        const r = ROUTES.find((x) => x.id === axSuggestion.routeId);
                        if (r) openRouteDetail(r);
                      }}
                    >
                      Abrir senderos y Àk de Poás
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            {/* Banner de estado Offline y Clima perfectamente alineado */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="min-w-0">
                <h1 className="font-display text-lg tracking-tight">
                  Rutas cerca de ti
                </h1>
                <span className="text-xs text-default-500 block">
                  Fotografía y cartografía GPS de parques nacionales
                </span>
              </div>
              <BadgePill tone="successFlat">GPS Activo</BadgePill>
            </div>

            {filteredRoutes.length === 0 && (
              <Card shadow="none" className="border border-default-200 bg-content1 rounded-2xl">
                <CardBody className="py-7 px-4 text-center flex flex-col items-center gap-3">
                  <p className="text-sm font-medium">
                    No encontramos rutas con ese filtro
                  </p>
                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    className="min-h-[44px] font-medium px-4"
                    onPress={() => {
                      setDifficultyFilter("todas");
                      handleRouteSearch("");
                    }}
                  >
                    Ver todas las rutas cercanas
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Tarjetas con Fotografía Real del Parque Nacional */}
            <div className="flex flex-col gap-4">
              {filteredRoutes.map((route) => {
                const availableGuidesCount = route.guides.filter(
                  (g) => g.available
                ).length;
                const completedInRoute = route.aks.filter((a) =>
                  scannedAkIds.includes(a.id)
                ).length;

                return (
                  <Card
                    key={route.id}
                    shadow="sm"
                    className="border border-default-200 bg-content1 rounded-3xl overflow-hidden"
                  >
                    {/* Fotografía Real del Parque Nacional con Gradiente y Píldoras Centradas */}
                    <div
                      onClick={() => openRouteDetail(route)}
                      className="w-full h-48 relative cursor-pointer overflow-hidden flex flex-col justify-between p-3.5 bg-default-200"
                    >
                      <img
                        src={route.photo}
                        alt={route.photoAlt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(10, 22, 16, 0.48) 0%, rgba(10, 22, 16, 0.15) 45%, rgba(10, 22, 16, 0.92) 100%)",
                        }}
                      />

                      {/* Píldoras superiores centradas */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <BadgePill tone="darkGlass">
                          {route.condition} · ★ {route.rating}
                        </BadgePill>
                        <BadgePill tone="secondary">
                          +{route.totalTsiro} Tsirö
                        </BadgePill>
                      </div>

                      {/* Título sobre la fotografía real del parque */}
                      <div className="relative z-10 text-white text-left">
                        <span className="text-xs font-medium text-white/85 block">
                          {route.region}
                        </span>
                        <h2 className="font-display text-lg leading-snug">
                          {route.name}
                        </h2>
                      </div>
                    </div>

                    <CardBody className="p-4 flex flex-col gap-3">
                      <p className="text-xs text-default-600 leading-relaxed">
                        {route.trailsSummary}
                      </p>

                      {/* Bento de 4 Métricas Rápidas perfectamente centradas */}
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs tabular-nums">
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Distancia
                          </span>
                          <strong className="font-semibold mt-0.5">
                            {route.distance}
                          </strong>
                        </div>
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Desnivel
                          </span>
                          <strong className="font-semibold mt-0.5">
                            {route.elevation}
                          </strong>
                        </div>
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Hitos Àk
                          </span>
                          <strong className="font-semibold mt-0.5">
                            {completedInRoute}/{route.aks.length}
                          </strong>
                        </div>
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Guías hoy
                          </span>
                          <strong className="font-semibold mt-0.5">
                            {availableGuidesCount > 0
                              ? `${availableGuidesCount} disp.`
                              : "Libre"}
                          </strong>
                        </div>
                      </div>
                    </CardBody>

                    <Divider />

                    <CardFooter className="px-4 py-3 flex justify-between items-center gap-2">
                      <span className="text-xs font-medium text-default-500">
                        {route.difficulty} · {route.duration}
                      </span>
                      <Button
                        size="sm"
                        radius="full"
                        color="primary"
                        className="min-h-[44px] font-medium text-xs px-4"
                        onPress={() => openRouteDetail(route)}
                      >
                        Ver senderos y Àk
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* SUB-VISTA EXPLORAR: MODO SENDERO ESTILO WAZE               */}
        {/* ========================================================= */}
        {isOnTrail && (
          <TrailView
            route={openedRoute}
            scannedAkIds={scannedAkIds}
            selectedAkId={selectedMapAkId}
            onSelectAk={setSelectedMapAkId}
            onBack={() => setOpenedRouteId(null)}
            onOpenProfile={() => setActiveView("perfil")}
            onScanAk={startScan}
            onArrivalChange={setNearAkId}
            reports={reports}
            onAddReport={handleAddReport}
          >
            {/* Botón Desplegable Opcional de Guías Locales con Icono de Sombrero Safari */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                id="toggleGuidesDropdownBtn"
                aria-expanded={guidesDropdownOpen}
                onClick={() => setGuidesDropdownOpen((prev) => !prev)}
                className="w-full min-h-[58px] p-3.5 rounded-3xl border border-default-200 bg-content1 shadow-sm flex items-center justify-between gap-3 text-left transition-colors hover:border-primary"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <SafariGuideIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-foreground block">
                      {selectedGuideForOpenedRoute
                        ? `Guía: ${selectedGuideForOpenedRoute.name}`
                        : "Guías locales (opcional)"}
                    </span>
                    <span className="text-xs text-default-500 block">
                      {selectedGuideForOpenedRoute
                        ? `${selectedGuideForOpenedRoute.rate}`
                        : `${
                            openedRoute.guides.filter((g) => g.available).length
                          } disponibles hoy`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <BadgePill
                    tone={
                      selectedGuideForOpenedRoute
                        ? "secondaryFlat"
                        : "primaryFlat"
                    }
                  >
                    {guidesDropdownOpen ? "Ocultar" : "Desplegar"}
                  </BadgePill>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-4 h-4 text-default-500 transition-transform ${
                      guidesDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {guidesDropdownOpen && (
                <Card
                  shadow="sm"
                  className="border border-default-200 bg-content1 rounded-3xl"
                >
                  <CardBody className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-semibold">
                          Guías locales en esta ruta
                        </h2>
                        <span className="text-xs text-default-500">
                          Contratación directa con la comunidad
                        </span>
                      </div>
                      <BadgePill tone="neutral">
                        {openedRoute.guides.filter((g) => g.available).length}{" "}
                        disponibles
                      </BadgePill>
                    </div>

                    {openedRoute.guides.length === 0 ? (
                      <div className="p-4 rounded-2xl bg-default-100 text-xs text-default-600 text-center">
                        No hay guías locales registrados hoy en este sector. Puedes recorrer los senderos autoguiados siguiendo los hitos Àk.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        {openedRoute.guides.map((guide) => {
                          const isSelected =
                            selectedGuidesByRoute[openedRoute.id] === guide.id;

                          return (
                            <div
                              key={guide.id}
                              className={`p-3.5 rounded-2xl border flex flex-col gap-2.5 ${
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-default-200 bg-default-50"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2.5">
                                <div className="flex items-center gap-2.5">
                                  <Avatar
                                    name={guide.initials}
                                    size="sm"
                                    className="w-10 h-10 text-xs font-semibold bg-primary text-primary-foreground shrink-0"
                                  />
                                  <div>
                                    <p className="text-sm font-semibold">
                                      {guide.name}
                                    </p>
                                    <p className="text-xs text-default-500">
                                      {guide.specialty}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-xs font-semibold text-secondary shrink-0">
                                  {guide.rate}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-default-200">
                                <span className="text-xs text-default-500">
                                  {guide.schedule}
                                </span>
                                {guide.available ? (
                                  <Button
                                    size="sm"
                                    radius="full"
                                    color={isSelected ? "secondary" : "primary"}
                                    variant={isSelected ? "solid" : "flat"}
                                    className="min-h-[44px] font-medium text-xs px-3.5"
                                    onPress={() =>
                                      handleSelectGuide(
                                        openedRoute.id,
                                        guide.id
                                      )
                                    }
                                  >
                                    {isSelected
                                      ? "Guía seleccionado para tu ruta"
                                      : "Seleccionar guía"}
                                  </Button>
                                ) : (
                                  <BadgePill tone="neutral">
                                    Ocupado en sendero
                                  </BadgePill>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Resumen de Reserva */}
                    {selectedGuideForOpenedRoute && (
                      <div className="p-3.5 rounded-2xl bg-primary text-primary-foreground flex items-center justify-between gap-2">
                        <div>
                          <span className="text-xs opacity-80 block">
                            Salida reservada con guía certificado
                          </span>
                          <strong className="text-xs font-semibold">
                            {selectedGuideForOpenedRoute.name} ·{" "}
                            {selectedGuideForOpenedRoute.rate}
                          </strong>
                        </div>
                        <BadgePill tone="secondary">Confirmado</BadgePill>
                      </div>
                    )}
                  </CardBody>
                </Card>
              )}
            </div>
          </TrailView>
        )}

        {/* ========================================================= */}
        {/* VISTA: MAPA GENERAL DE PARQUES NACIONALES                 */}
        {/* ========================================================= */}
        {activeView === "mapa" && (
          <main className="flex flex-col gap-3 mt-1 flex-1">
            <div className="px-1">
              <h1 className="font-display text-lg">Mapa de Costa Rica</h1>
              <span className="text-xs text-default-500 block">
                Toca un parque para abrir sus senderos
              </span>
            </div>
            <div className="h-[46dvh] rounded-3xl overflow-hidden border border-default-200 shadow-md">
              <GeneralParksMap onOpenRoute={handleOpenRouteFromMap} />
            </div>
            <div className="flex flex-col gap-2">
              {ROUTES.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleOpenRouteFromMap(route)}
                  className="min-h-[60px] p-2.5 rounded-2xl border border-default-200 bg-content1 flex items-center gap-3 text-left"
                >
                  <img
                    src={route.photo}
                    alt={route.photoAlt}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <span className="min-w-0">
                    <strong className="text-sm font-semibold block truncate">
                      {route.name}
                    </strong>
                    <span className="text-xs text-default-500 block truncate">
                      {route.region}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA: RESULTADO DEL ESCANEO NFC DE LA PIEDRA ÀK          */}
        {/* ========================================================= */}
        {activeView === "escanear" && (
          <main className="flex flex-col gap-4 mt-2 flex-1">
            {scanState === "done" ? (
              <Card
                shadow="sm"
                className="border border-default-200 bg-content1 rounded-3xl"
              >
                <CardBody className="p-6 flex flex-col items-center text-center gap-4">
                  <span className="text-xs font-medium tracking-wider text-default-500">
                    PIEDRA {scannerRouteProgress.done} DE{" "}
                    {scannerRouteProgress.total}
                  </span>
                  <LogoMark className="w-40 text-primary logo-glow" />
                  <div>
                    <h1 className="font-display text-2xl">Àk escaneada</h1>
                    <p className="text-xs text-default-500 mt-1">
                      {scannerAk.code} · {scannerAk.name} · {scannerAk.trail}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <BadgePill tone="secondaryFlat">
                      +{scannerAk.tsiro} Tsirö
                    </BadgePill>
                    <BadgePill tone="primaryFlat">+{scannerAk.xp} XP</BadgePill>
                  </div>

                  {scannerRouteProgress.done === scannerRouteProgress.total && (
                    <div className="w-full p-3 rounded-2xl bg-primary/10 border border-primary/30">
                      <span className="text-xs font-medium text-default-500 block">
                        NUEVA INSIGNIA
                      </span>
                      <strong className="text-sm font-semibold">
                        Guardián de {scannerRouteProgress.routeName}
                      </strong>
                    </div>
                  )}

                  <div className="w-full grid grid-cols-2 gap-2 mt-1">
                    <Button
                      radius="full"
                      variant="flat"
                      className="min-h-[48px] font-medium text-xs"
                      onPress={() => setActiveView("cupones")}
                    >
                      Ver premios ({tsiro} Tsirö)
                    </Button>
                    <Button
                      radius="full"
                      color="primary"
                      className="min-h-[48px] font-medium text-xs"
                      onPress={handleContinueAfterScan}
                    >
                      Seguir la ruta
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card
                shadow="none"
                className="border border-default-200 bg-content1 rounded-3xl"
              >
                <CardBody className="p-6 flex flex-col items-center text-center gap-3">
                  <h1 className="font-display text-xl">
                    Sellaste todas las piedras Àk
                  </h1>
                  <p className="text-xs text-default-500">
                    Ya tienes los {scannedAkIds.length} hitos disponibles. Usa tus Tsirö en Cupones.
                  </p>
                  <Button
                    radius="full"
                    color="primary"
                    className="min-h-[48px] w-full font-medium text-xs"
                    onPress={() => setActiveView("cupones")}
                  >
                    Ir a Cupones
                  </Button>
                </CardBody>
              </Card>
            )}
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA: CONFIGURACIÓN                                      */}
        {/* ========================================================= */}
        {activeView === "config" && (
          <main className="flex flex-col gap-4 mt-2 flex-1">
            <h1 className="font-display text-xl px-1">Configuración</h1>

            <Card
              shadow="none"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-4 flex flex-col gap-4">
                <SettingToggle
                  label="Modo noche"
                  isOn={isDark}
                  onChange={setTheme}
                />
                <Divider />
                <SettingToggle
                  label="Vibrar al escanear"
                  isOn={vibrateOnScan}
                  onChange={setVibrateOnScan}
                />
              </CardBody>
            </Card>

            <div className="flex flex-col gap-2">
              <Button
                radius="full"
                variant="flat"
                className="min-h-[48px] font-medium text-sm"
                onPress={() => setActiveView("perfil")}
              >
                Ver mi perfil
              </Button>
              <Button
                radius="full"
                variant="light"
                className="min-h-[48px] font-medium text-sm"
                onPress={handleResetDemo}
              >
                Reiniciar demo
              </Button>
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA 3: BILLETERA DE CUPONES CON BOLETOS PERFORADOS      */}
        {/* ========================================================= */}
        {activeView === "cupones" && (
          <main className="flex flex-col gap-4 mt-2 flex-1">
            
            {/* Tarjeta Héroe de Billetera Tsirö perfectamente alineada */}
            <div className="p-4 rounded-3xl bg-primary text-primary-foreground flex items-center justify-between gap-3 shadow-sm">
              <div>
                <h1 className="text-xs font-medium opacity-90">
                  Cupones canjeables
                </h1>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <strong className="font-display text-2xl tabular-nums leading-none">
                    {tsiro} Tsirö
                  </strong>
                  <span className="text-xs opacity-80">disponibles</span>
                </div>
              </div>
              <BadgePill tone="secondary">
                {redeemedCouponsList.length} activos
              </BadgePill>
            </div>

            {/* BOLETO PERFORADO ACTIVO PARA CAJA */}
            {justRedeemedCoupon && (
              <div className="relative rounded-3xl border-2 border-secondary bg-content1 shadow-sm overflow-hidden">
                <div className="w-5 h-5 rounded-full bg-background border-2 border-secondary absolute -left-3 top-1/2 -translate-y-1/2" />
                <div className="w-5 h-5 rounded-full bg-background border-2 border-secondary absolute -right-3 top-1/2 -translate-y-1/2" />

                <div className="p-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-secondary">
                      Pase activo para mostrar en caja
                    </span>
                    <Button
                      size="sm"
                      radius="full"
                      variant="light"
                      className="min-h-[40px] text-xs font-medium"
                      onPress={() => setJustRedeemedCoupon(null)}
                    >
                      Ocultar
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{justRedeemedCoupon.title}</p>
                    <p className="text-xs text-default-500">
                      {justRedeemedCoupon.place}
                    </p>
                  </div>

                  <div className="border-t-2 border-dashed border-default-200 my-1" />

                  <div className="p-3.5 rounded-2xl bg-default-100 border border-dashed border-secondary flex flex-col items-center justify-center gap-2 text-center">
                    <div
                      id="activeVoucherCodeBanner"
                      className="font-mono text-lg font-semibold tracking-widest text-foreground"
                    >
                      {justRedeemedCoupon.code}
                    </div>
                    <svg
                      viewBox="0 0 220 32"
                      className="w-48 h-7 text-foreground"
                      aria-hidden="true"
                    >
                      <rect x="6" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="14" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="20" y="2" width="6" height="28" fill="currentColor" />
                      <rect x="30" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="36" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="46" y="2" width="8" height="28" fill="currentColor" />
                      <rect x="58" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="64" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="74" y="2" width="6" height="28" fill="currentColor" />
                      <rect x="84" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="90" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="100" y="2" width="8" height="28" fill="currentColor" />
                      <rect x="112" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="118" y="2" width="6" height="28" fill="currentColor" />
                      <rect x="128" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="136" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="144" y="2" width="8" height="28" fill="currentColor" />
                      <rect x="156" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="164" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="170" y="2" width="6" height="28" fill="currentColor" />
                      <rect x="180" y="2" width="4" height="28" fill="currentColor" />
                      <rect x="188" y="2" width="2" height="28" fill="currentColor" />
                      <rect x="194" y="2" width="8" height="28" fill="currentColor" />
                      <rect x="206" y="2" width="4" height="28" fill="currentColor" />
                    </svg>
                    <span className="text-xs text-default-500">
                      Válido sin conexión · Comercio local afiliado
                    </span>
                  </div>

                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    color="secondary"
                    className="min-h-[44px] font-medium text-xs"
                    onPress={() => handleCopyVoucherCode(justRedeemedCoupon.code)}
                  >
                    {copiedCode === justRedeemedCoupon.code
                      ? "Código copiado al portapapeles"
                      : "Copiar código alfanumérico"}
                  </Button>
                </div>
              </div>
            )}

            {/* Barra de Categorías de Cupones en una sola línea centrada */}
            <div
              role="tablist"
              aria-label="Categorías de cupones"
              className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-content1 border border-default-200"
            >
              {[
                { key: "todos", label: "Todos" },
                { key: "gastronomia", label: "Comida" },
                { key: "guias", label: "Guías" },
                { key: "hospedaje", label: "Estadías" },
                {
                  key: "canjeados",
                  label: `Códigos (${redeemedCouponsList.length})`,
                },
              ].map((tab) => {
                const active = couponCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCouponCategory(tab.key)}
                    className={`min-h-[40px] px-1 rounded-xl text-[11px] font-semibold flex items-center justify-center text-center whitespace-nowrap transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-default-600 hover:bg-default-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {filteredCoupons.length === 0 && (
              <Card shadow="none" className="border border-default-200 bg-content1 rounded-2xl">
                <CardBody className="py-7 px-4 text-center flex flex-col items-center gap-3">
                  <p className="text-sm font-medium">
                    Aún no has reclamado ningún cupón
                  </p>
                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    className="min-h-[44px] font-medium px-4"
                    onPress={() => setCouponCategory("todos")}
                  >
                    Ver cupones disponibles
                  </Button>
                </CardBody>
              </Card>
            )}

            <div className="flex flex-col gap-3">
              {filteredCoupons.map((item) => {
                const isRedeemed = redeemedIds.includes(item.id);
                const canAfford = tsiro >= item.cost;
                const pct = Math.min(
                  100,
                  Math.round((tsiro / item.cost) * 100)
                );

                return (
                  <Card
                    key={item.id}
                    shadow="none"
                    className={`border bg-content1 rounded-3xl overflow-hidden ${
                      isRedeemed ? "border-secondary" : "border-default-200"
                    }`}
                  >
                    <CardBody className="p-4 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary">
                          {item.tag} · {item.discountBadge}
                        </span>
                        <BadgePill
                          tone={
                            isRedeemed || canAfford
                              ? "secondaryFlat"
                              : "neutral"
                          }
                        >
                          {item.cost} Tsirö
                        </BadgePill>
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold leading-snug">
                          {item.title}
                        </h2>
                        <p className="text-xs text-default-500 mt-0.5">
                          {item.place}
                        </p>
                      </div>

                      {isRedeemed && (
                        <div className="p-3 rounded-2xl bg-default-100 border border-dashed border-secondary flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-default-600">
                            Tu código de canje:
                          </span>
                          <strong className="font-mono text-sm font-semibold tracking-wider text-secondary">
                            {item.code}
                          </strong>
                        </div>
                      )}

                      {!isRedeemed && !canAfford && (
                        <Progress
                          aria-label={`Progreso para ${item.title}`}
                          value={pct}
                          color="secondary"
                          size="sm"
                          className="w-full"
                        />
                      )}

                      <div className="border-t border-dashed border-default-200 pt-2.5 mt-0.5 flex items-center justify-between gap-2">
                        <span className="text-xs text-default-500">
                          {isRedeemed
                            ? "Reclamado · Disponible offline"
                            : canAfford
                            ? item.requirement
                            : `Tienes ${tsiro}/${item.cost} Tsirö (faltan ${
                                item.cost - tsiro
                              })`}
                        </span>

                        {isRedeemed ? (
                          <Button
                            size="sm"
                            radius="full"
                            variant="flat"
                            color="secondary"
                            className="min-h-[44px] font-medium text-xs px-4 shrink-0"
                            onPress={() => setJustRedeemedCoupon(item)}
                          >
                            Mostrar en grande
                          </Button>
                        ) : canAfford ? (
                          <Button
                            size="sm"
                            radius="full"
                            color="primary"
                            className="min-h-[44px] font-medium text-xs px-4 shrink-0"
                            onPress={() => handleRedeemCoupon(item)}
                          >
                            Canjear ahora
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            radius="full"
                            variant="flat"
                            className="min-h-[44px] font-medium text-xs px-4 shrink-0"
                            onPress={handleNfcPress}
                          >
                            Escanear Àk
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA 4: PERFIL BENTO DE EXPLORADOR                       */}
        {/* ========================================================= */}
        {activeView === "perfil" && (
          <main className="flex flex-col gap-4 mt-2 flex-1">
            <Card
              shadow="sm"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-4 gap-4">
                <div className="flex items-center gap-3.5">
                  <Avatar
                    name="EM"
                    size="lg"
                    className="w-14 h-14 text-lg font-semibold bg-primary text-primary-foreground shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h1 className="text-base font-semibold truncate">
                        Esteban Morales
                      </h1>
                      <BadgePill tone="secondaryFlat">{tsiro} Tsirö</BadgePill>
                    </div>
                    <p className="text-xs text-default-500 mt-0.5">
                      Rango: Baqueano de Montaña · Nivel {level}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-medium text-default-600 tabular-nums">
                    <span>Experiencia de explorador</span>
                    <span>
                      {currentLevelXp} / 250 XP para Nivel {level + 1}
                    </span>
                  </div>
                  <Progress
                    aria-label="Progreso de nivel de usuario"
                    value={levelProgress}
                    color="primary"
                    size="sm"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1 tabular-nums">
                  <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-default-500">Distancia</span>
                    <strong className="text-sm font-semibold mt-0.5">
                      {totalKm} km
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-default-500">Piedras Àk</span>
                    <strong className="text-sm font-semibold mt-0.5">
                      {scannedAkIds.length}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-default-500">Cupones</span>
                    <strong className="text-sm font-semibold mt-0.5">
                      {redeemedIds.length}
                    </strong>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Ritmo Semanal de Senderismo */}
            <Card
              shadow="none"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold">
                    Actividad semanal en senderos
                  </h2>
                  <BadgePill tone="secondaryFlat">33,1 km</BadgePill>
                </div>
                <div className="grid grid-cols-7 gap-2 items-end h-20 pt-2 px-1">
                  {WEEKLY_KM.map((d) => {
                    const heightPct = Math.max(
                      12,
                      Math.round((d.km / 12) * 100)
                    );
                    return (
                      <div
                        key={d.day}
                        className="flex flex-col items-center gap-1 h-full justify-end"
                      >
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full rounded-md ${
                            d.km > 0 ? "bg-primary" : "bg-default-200"
                          }`}
                        />
                        <span className="text-xs text-default-500 font-medium">
                          {d.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Códigos reclamados visibles también en el perfil */}
            <Card
              shadow="none"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold">Mis códigos reclamados</h2>
                  <Button
                    size="sm"
                    radius="full"
                    variant="light"
                    className="min-h-[40px] text-xs font-medium"
                    onPress={() => setActiveView("cupones")}
                  >
                    Ir a Cupones
                  </Button>
                </div>

                {redeemedCouponsList.length === 0 ? (
                  <p className="text-xs text-default-500">
                    Aún no has canjeado cupones. Ve a la pestaña Cupones para canjear tus Tsirö.
                  </p>
                ) : (
                  redeemedCouponsList.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-2xl bg-default-100 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{c.title}</p>
                        <span className="text-xs text-default-500 block truncate">
                          {c.place}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-content1 border border-secondary text-secondary shrink-0">
                        {c.code}
                      </span>
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
          </main>
        )}
      </div>

      {/* ANIMACIÓN MÍSTICA DE ESCANEO NFC */}
      {scanState === "scanning" && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 bg-[#090A07] text-[#E8EBDD] flex flex-col items-center justify-center gap-10 px-6 text-center overflow-hidden"
        >
          <div className="relative w-72 h-72 flex items-center justify-center">
            <span className="nfc-ring" />
            <span className="nfc-ring nfc-ring-2" />
            <span className="nfc-ring nfc-ring-3" />
            <LogoMark className="w-48 logo-awaken" />
          </div>
          <div>
            <p className="font-display text-xl">Leyendo el Àk...</p>
            <p className="text-xs opacity-75 mt-1">
              {scannerAk.code} · {scannerAk.name}
            </p>
          </div>
        </div>
      )}

      {/* BARRA INFERIOR FIJA: 5 ACCESOS CON LA RUNA AL CENTRO */}
      <nav
        aria-label="Navegación principal"
        className="fixed bottom-3 inset-x-0 z-30 px-3 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto h-16 bg-content1/95 backdrop-blur-md border border-default-300 shadow-lg rounded-full px-1.5 grid grid-cols-5 items-center">
          <NavButton
            label="Mapa"
            ariaLabel="Mapa general de parques"
            active={activeView === "mapa"}
            onPress={() => {
              setOpenedRouteId(null);
              setActiveView("mapa");
            }}
          >
            <CostaRicaIcon />
          </NavButton>

          <NavButton
            label="Explorar"
            active={activeView === "explorar"}
            onPress={goToExplore}
          >
            <HomeIcon />
          </NavButton>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleNfcPress}
              aria-label="Escanear piedra Àk por NFC"
              className={`w-[72px] h-[72px] -mt-7 rounded-full bg-secondary text-secondary-foreground border-4 border-background shadow-xl inline-flex items-center justify-center transition-transform active:scale-95 ${
                nearAkId ? "nfc-call" : ""
              }`}
            >
              <LogoMark className="w-[52px]" decorative />
            </button>
          </div>

          <NavButton
            label="Cupones"
            active={activeView === "cupones"}
            onPress={() => setActiveView("cupones")}
          >
            <TicketIcon />
          </NavButton>

          <NavButton
            label="Ajustes"
            ariaLabel="Configuración"
            active={activeView === "config"}
            onPress={() => setActiveView("config")}
          >
            <GearIcon />
          </NavButton>
        </div>
      </nav>
    </div>
  );
}
