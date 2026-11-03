import React, { useState, useMemo, useEffect, useRef } from "react";
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
    elevationProfile: "0,48 45,42 95,34 145,25 195,29 245,21 290,15 332,12 380,14",
    elevationArea:
      "M 0,56 L 0,48 L 45,42 L 95,34 L 145,25 L 195,29 L 245,21 L 290,15 L 332,12 L 380,14 L 380,56 Z",
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
        altitude: "2.480 m",
        grade: "3%",
        tsiro: 10,
        xp: 80,
        lat: 10.18821,
        lng: -84.23305,
        x: 45,
        y: 42,
      },
      {
        id: "ak-02",
        code: "Àk #02",
        name: "Mirador Cráter Principal",
        trail: "Sendero Cráter",
        km: "1,4 km",
        altitude: "2.570 m",
        grade: "6%",
        tsiro: 15,
        xp: 120,
        lat: 10.1902,
        lng: -84.2327,
        x: 145,
        y: 25,
      },
      {
        id: "ak-03",
        code: "Àk #03",
        name: "Bifurcación Bosque Nuboso",
        trail: "Sendero Laguna Botos",
        km: "2,9 km",
        altitude: "2.590 m",
        grade: "5%",
        tsiro: 10,
        xp: 100,
        lat: 10.18997,
        lng: -84.23095,
        x: 245,
        y: 21,
      },
      {
        id: "ak-04",
        code: "Àk #04",
        name: "Mirador Laguna Botos",
        trail: "Sendero Laguna Botos",
        km: "4,8 km",
        altitude: "2.640 m",
        grade: "8%",
        tsiro: 15,
        xp: 150,
        lat: 10.18914,
        lng: -84.22861,
        x: 332,
        y: 12,
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
    elevationProfile: "0,48 35,44 72,38 135,32 196,24 255,18 318,12 380,15",
    elevationArea:
      "M 0,56 L 0,48 L 35,44 L 72,38 L 135,32 L 196,24 L 255,18 L 318,12 L 380,15 L 380,56 Z",
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
        altitude: "680 m",
        grade: "11%",
        tsiro: 20,
        xp: 140,
        lat: 10.70486,
        lng: -84.99033,
        x: 72,
        y: 38,
      },
      {
        id: "ak-06",
        code: "Àk #06",
        name: "Mirador Laguna Azul",
        trail: "Sendero Misterios del Tenorio",
        km: "3,9 km",
        altitude: "720 m",
        grade: "7%",
        tsiro: 20,
        xp: 150,
        lat: 10.70244,
        lng: -84.99352,
        x: 196,
        y: 24,
      },
      {
        id: "ak-07",
        code: "Àk #07",
        name: "Los Teñideros",
        trail: "Sendero Misterios del Tenorio",
        km: "6,2 km",
        altitude: "760 m",
        grade: "9%",
        tsiro: 25,
        xp: 200,
        lat: 10.70057,
        lng: -84.99701,
        x: 318,
        y: 12,
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
    elevationProfile: "0,46 55,40 112,34 195,25 282,16 380,14",
    elevationArea:
      "M 0,56 L 0,46 L 55,40 L 112,34 L 195,25 L 282,16 L 380,14 L 380,56 Z",
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
        altitude: "1.280 m",
        grade: "4%",
        tsiro: 20,
        xp: 130,
        lat: 9.7498,
        lng: -83.78185,
        x: 112,
        y: 34,
      },
      {
        id: "ak-09",
        code: "Àk #09",
        name: "Mirador Río Grande de Orosi",
        trail: "Sendero Oropéndola",
        km: "4,0 km",
        altitude: "1.390 m",
        grade: "6%",
        tsiro: 20,
        xp: 150,
        lat: 9.75126,
        lng: -83.78326,
        x: 282,
        y: 16,
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
    secondary: "bg-secondary text-white",
    secondaryFlat: "bg-secondary/15 text-secondary border border-secondary/30",
    primary: "bg-primary text-primary-foreground",
    primaryFlat: "bg-primary/15 text-primary border border-primary/25",
    successFlat: "bg-success/15 text-success-700 dark:text-success border border-success/30",
    neutral: "bg-default-100 text-foreground border border-default-200",
    darkGlass: "bg-black/65 text-white border border-white/20 backdrop-blur-md",
  };

  return (
    <span
      className={`inline-flex items-center justify-center text-center leading-none font-bold text-xs px-3 h-7 rounded-full whitespace-nowrap shrink-0 select-none ${
        toneClasses[tone] || toneClasses.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}

function RealParkLeafletMap({
  route,
  scannedAkIds,
  selectedMapAkId,
  onSelectAk,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const prevRouteIdRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: route.center,
        zoom: route.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      L.control
        .zoom({
          position: "bottomright",
        })
        .addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    // Polilínea real siguiendo todos los vértices GPS del sendero de OpenStreetMap
    const latlngs =
      route.trailPath && route.trailPath.length > 0
        ? route.trailPath
        : route.aks.map((ak) => [ak.lat, ak.lng]);

    // Halo blanco debajo para que el sendero resalte con nitidez sobre el mapa real
    L.polyline(latlngs, {
      color: "#FFFFFF",
      weight: 8,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(layer);

    const polyline = L.polyline(latlngs, {
      color: "#B04A12",
      weight: 4.5,
      opacity: 1,
      dashArray: "7 5",
      lineCap: "round",
      lineJoin: "round",
    }).addTo(layer);

    // Marcadores reales anclados exactamente sobre el sendero con punto de ubicación + etiqueta
    route.aks.forEach((ak) => {
      const isDone = scannedAkIds.includes(ak.id);
      const isSelected = selectedMapAkId === ak.id;

      const bg = isDone ? "#B04A12" : "#163020";
      const ring = isSelected
        ? "box-shadow: 0 0 0 4px rgba(176, 74, 18, 0.45);"
        : "box-shadow: 0 2px 5px rgba(0,0,0,0.35);";

      const icon = L.divIcon({
        className: "ak-custom-pin",
        html: `<div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 64px;
          height: 36px;
        ">
          <div style="
            background: ${bg};
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            ${ring}
            border-radius: 9999px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 800;
            line-height: 1.1;
            white-space: nowrap;
            text-align: center;
          ">${ak.code}</div>
          <div style="
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: ${bg};
            border: 2px solid #FFFFFF;
            margin-top: 2px;
          "></div>
        </div>`,
        iconSize: [64, 36],
        iconAnchor: [32, 34],
      });

      const marker = L.marker([ak.lat, ak.lng], { icon }).addTo(layer);
      marker.on("click", () => {
        onSelectAk(ak.id);
      });
    });

    // Encuadrar todo el sendero real dentro del mapa
    if (prevRouteIdRef.current !== route.id && latlngs.length > 0) {
      map.fitBounds(polyline.getBounds(), { padding: [36, 36], maxZoom: 16 });
      prevRouteIdRef.current = route.id;
    } else if (latlngs.length > 0) {
      map.fitBounds(polyline.getBounds(), { padding: [36, 36], maxZoom: 16 });
    }
  }, [route, scannedAkIds, selectedMapAkId, onSelectAk]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-60 z-0"
      aria-label={`Mapa satelital y topográfico real de ${route.name}`}
    />
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

  // Saldo proporcional de Esteban (285 Tsirö acumulados tras varias caminatas)
  const [tsiro, setTsiro] = useState(285);
  const [xp, setXp] = useState(1880);
  const [totalKm, setTotalKm] = useState(42.6);
  const [scannedAkIds, setScannedAkIds] = useState(["ak-01", "ak-02"]);

  // 4 pestañas principales separadas: "explorar" | "escanear" | "cupones" | "perfil"
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

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
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
    setOpenedRouteId(route.id);
    setGuidesDropdownOpen(false);
    if (route.aks.length > 0) {
      setSelectedMapAkId(route.aks[0].id);
    }
  };

  const handleSelectGuide = (routeId, guideId) => {
    setSelectedGuidesByRoute((prev) => ({
      ...prev,
      [routeId]: prev[routeId] === guideId ? null : guideId,
    }));
  };

  const handleScanStone = () => {
    setScanState("scanning");
    setTimeout(() => {
      setScanState("done");
      setTsiro((prev) => prev + scannerAk.tsiro);
      setXp((prev) => prev + scannerAk.xp);
      setTotalKm((prev) => Number((prev + 1.2).toFixed(1)));
      if (!scannedAkIds.includes(scannerAk.id)) {
        setScannedAkIds((prev) => [...prev, scannerAk.id]);
      }
    }, 1150);
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
      <div className="w-full max-w-md min-h-dvh flex flex-col pb-28 px-4 pt-3">
        
        {/* CABECERA ALINEADA AL CENTRO VERTICAL: Marca a la izquierda, Saldo Tsirö y Perfil a la derecha */}
        <header className="flex items-center justify-between py-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setOpenedRouteId(null);
              setActiveView("explorar");
            }}
            className="font-serif text-2xl font-bold tracking-tight text-foreground min-h-[44px] px-1 inline-flex items-center gap-2"
          >
            <span className="leading-none">Akapp</span>
            <span className="inline-flex items-center justify-center text-[11px] font-sans font-bold h-6 px-2.5 rounded-full bg-default-100 text-default-600 border border-default-200 leading-none">
              CR
            </span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="flat"
              onPress={toggleTheme}
              className="min-h-[44px] min-w-[44px] font-semibold text-xs px-3 rounded-full"
              aria-label="Cambiar tema de color"
            >
              {isDark ? "Claro" : "Oscuro"}
            </Button>

            <button
              type="button"
              onClick={() => setActiveView("perfil")}
              className="min-h-[44px] p-1.5 rounded-full bg-content1 border border-default-300 inline-flex items-center justify-center gap-2 shadow-sm"
              aria-label="Abrir perfil de Esteban"
            >
              <BadgePill tone="secondary">{tsiro} Tsirö</BadgePill>
              <div className="text-right leading-tight hidden sm:block pr-0.5">
                <span className="text-xs font-bold block">Esteban</span>
                <span className="text-xs text-default-500 block">Nv. {level}</span>
              </div>
              <Avatar
                name="EM"
                size="sm"
                className="w-7 h-7 text-xs font-bold bg-primary text-primary-foreground shrink-0"
              />
            </button>
          </div>
        </header>

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
                      className="text-xs font-semibold text-default-500 px-2 py-1 rounded-full hover:bg-default-100"
                    >
                      Limpiar
                    </button>
                  ) : null
                }
                classNames={{
                  inputWrapper:
                    "bg-content1 min-h-[48px] border-default-300 shadow-sm px-4",
                  input: "text-sm",
                }}
              />

              {/* Píldoras de filtro centradas en 3 columnas iguales */}
              <div className="grid grid-cols-3 gap-1.5">
                <Button
                  size="sm"
                  radius="full"
                  variant={difficultyFilter === "todas" ? "solid" : "flat"}
                  color={difficultyFilter === "todas" ? "primary" : "default"}
                  className="min-h-[44px] text-xs font-semibold px-2"
                  onPress={() => setDifficultyFilter("todas")}
                >
                  Cerca de mí (3)
                </Button>
                <Button
                  size="sm"
                  radius="full"
                  variant={difficultyFilter === "con-guia" ? "solid" : "flat"}
                  color={difficultyFilter === "con-guia" ? "primary" : "default"}
                  className="min-h-[44px] text-xs font-semibold px-2"
                  onPress={() => setDifficultyFilter("con-guia")}
                >
                  Con guía hoy
                </Button>
                <Button
                  size="sm"
                  radius="full"
                  variant="flat"
                  className="min-h-[44px] text-xs font-semibold px-2"
                  onPress={() =>
                    handleRouteSearch("¿Qué ruta me recomiendas de 2 horas?")
                  }
                >
                  Ruta 2h (AX)
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
                    <span className="text-xs font-bold text-secondary">
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
                      className="min-h-[44px] w-full font-semibold"
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
                <h1 className="font-serif text-lg font-bold tracking-tight">
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
                  <p className="text-sm font-semibold">
                    No encontramos rutas con ese filtro
                  </p>
                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    className="min-h-[44px] font-semibold px-4"
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
                        <h2 className="font-serif text-lg font-bold leading-snug">
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
                          <strong className="font-bold mt-0.5">
                            {route.distance}
                          </strong>
                        </div>
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Desnivel
                          </span>
                          <strong className="font-bold mt-0.5">
                            {route.elevation}
                          </strong>
                        </div>
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Hitos Àk
                          </span>
                          <strong className="font-bold mt-0.5">
                            {completedInRoute}/{route.aks.length}
                          </strong>
                        </div>
                        <div className="p-2 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                          <span className="text-[11px] text-default-500">
                            Guías hoy
                          </span>
                          <strong className="font-bold mt-0.5">
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
                        className="min-h-[44px] font-semibold text-xs px-4"
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
        {/* SUB-VISTA EXPLORAR: MAPA REAL LEAFLET + HOJA DESLIZANTE   */}
        {/* ========================================================= */}
        {activeView === "explorar" && openedRoute && (
          <main className="flex flex-col gap-3.5 mt-1 flex-1">
            
            {/* Contenedor con Fotografía Miniatura, Controles y Mapa Geográfico Real (Leaflet) */}
            <div className="w-full rounded-3xl bg-[#10231A] text-white border border-default-200 overflow-hidden shadow-md relative">
              
              {/* Cabecera sobre foto del parque */}
              <div className="relative p-3.5 flex flex-col gap-2 overflow-hidden">
                <img
                  src={openedRoute.photo}
                  alt={openedRoute.photoAlt}
                  className="absolute inset-0 w-full h-full object-cover opacity-45"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(16, 35, 26, 0.72), rgba(16, 35, 26, 0.95))",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    className="min-h-[44px] font-semibold text-xs bg-black/60 text-white border border-white/20 backdrop-blur-md px-3.5"
                    onPress={() => setOpenedRouteId(null)}
                  >
                    Volver a rutas cercanas
                  </Button>
                  <BadgePill tone="secondary">
                    Hasta +{openedRoute.totalTsiro} Tsirö
                  </BadgePill>
                </div>

                <div className="relative z-10 px-1 pt-0.5">
                  <span className="text-xs text-white/80 block">
                    Mapa topográfico y ubicación de piedras Àk
                  </span>
                  <h1 className="font-serif text-xl font-bold text-white">
                    {openedRoute.name}
                  </h1>
                </div>
              </div>

              {/* Mapa Geográfico Interactivo Real (OpenStreetMap + Leaflet) con Coordenadas Encuadradas */}
              <RealParkLeafletMap
                route={openedRoute}
                scannedAkIds={scannedAkIds}
                selectedMapAkId={selectedMapAkId}
                onSelectAk={(akId) => setSelectedMapAkId(akId)}
              />
            </div>

            {/* Hoja Deslizante (Bottom Sheet Card) con Altimetría Rellena y Hitos */}
            <Card
              shadow="sm"
              className="border border-default-200 bg-content1 rounded-3xl -mt-3 relative z-20"
            >
              <CardBody className="p-4 flex flex-col gap-3.5">
                {/* Tirador visual estilo iOS Bottom Sheet */}
                <div className="w-10 h-1.5 rounded-full bg-default-300 mx-auto" />

                {/* Gráfico de Altimetría con Área Rellena */}
                {selectedMapAk && (
                  <div className="p-3.5 rounded-2xl bg-default-100 border border-default-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="font-bold text-foreground truncate">
                        Perfil de elevación · {selectedMapAk.code} ({selectedMapAk.name})
                      </span>
                      <span className="font-semibold text-secondary shrink-0 tabular-nums">
                        {selectedMapAk.altitude} · {selectedMapAk.grade}
                      </span>
                    </div>

                    <svg
                      viewBox="0 0 380 56"
                      className="w-full h-14 overflow-visible"
                      aria-label="Gráfico de altimetría del sendero"
                    >
                      <defs>
                        <linearGradient
                          id="elevFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="currentColor"
                            stopOpacity="0.28"
                          />
                          <stop
                            offset="100%"
                            stopColor="currentColor"
                            stopOpacity="0.02"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d={openedRoute.elevationArea}
                        fill="url(#elevFill)"
                        className="text-primary"
                      />

                      <polyline
                        points={openedRoute.elevationProfile}
                        fill="none"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth="2.5"
                      />

                      {openedRoute.aks.map((ak) => {
                        const active = ak.id === selectedMapAk.id;
                        return (
                          <g
                            key={ak.id}
                            onClick={() => setSelectedMapAkId(ak.id)}
                            className="cursor-pointer"
                          >
                            {active && (
                              <line
                                x1={ak.x}
                                y1={2}
                                x2={ak.x}
                                y2={54}
                                stroke="currentColor"
                                className="text-secondary"
                                strokeWidth="1.5"
                                strokeDasharray="3 2"
                              />
                            )}
                            <circle
                              cx={ak.x}
                              cy={ak.y}
                              r={active ? "6" : "4.5"}
                              className={
                                active
                                  ? "fill-secondary stroke-background stroke-2"
                                  : "fill-background stroke-primary stroke-2"
                              }
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                )}

                {/* Lista de piedras Àk con filas limpias y alineación centrada */}
                <div className="flex flex-col gap-2.5">
                  {openedRoute.aks.map((ak) => {
                    const isDone = scannedAkIds.includes(ak.id);
                    const isSelected = selectedMapAkId === ak.id;

                    return (
                      <div
                        key={ak.id}
                        onClick={() => setSelectedMapAkId(ak.id)}
                        className={`p-3.5 rounded-2xl border flex flex-col gap-2.5 cursor-pointer transition-colors ${
                          isSelected
                            ? "border-secondary bg-secondary/5"
                            : "border-default-200 bg-default-50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <BadgePill tone="secondaryFlat">
                              {ak.code}
                            </BadgePill>
                            <strong className="text-sm font-bold text-foreground truncate">
                              {ak.name}
                            </strong>
                          </div>
                          <BadgePill tone="neutral">+{ak.tsiro} Tsirö</BadgePill>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-default-200/70">
                          <span className="text-xs text-default-500 tabular-nums">
                            {ak.trail} · Km {ak.km} · Alt. {ak.altitude}
                          </span>

                          {isDone ? (
                            <BadgePill tone="successFlat">Sellado</BadgePill>
                          ) : (
                            <Button
                              size="sm"
                              radius="full"
                              color="secondary"
                              className="min-h-[40px] text-xs font-semibold px-4"
                              onPress={() => {
                                setScannerAkId(ak.id);
                                setScanState("idle");
                                setActiveView("escanear");
                              }}
                            >
                              Escanear
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

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
                    <span className="text-sm font-bold text-foreground block">
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
                        <h2 className="text-sm font-bold">
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
                                    className="w-10 h-10 text-xs font-bold bg-primary text-primary-foreground shrink-0"
                                  />
                                  <div>
                                    <p className="text-sm font-bold">
                                      {guide.name}
                                    </p>
                                    <p className="text-xs text-default-500">
                                      {guide.specialty}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-xs font-bold text-secondary shrink-0">
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
                                    className="min-h-[44px] font-semibold text-xs px-3.5"
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
                          <strong className="text-xs font-bold">
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
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA 2: ESCANEAR PIEDRA ÀK (CUNA DE ROCA TÁCTIL + NFC)   */}
        {/* ========================================================= */}
        {activeView === "escanear" && (
          <main className="flex flex-col gap-4 mt-2 flex-1">
            <div className="grid grid-cols-2 gap-1.5">
              {allAks.slice(0, 4).map((stone) => (
                <Button
                  key={stone.id}
                  size="sm"
                  radius="full"
                  variant={scannerAkId === stone.id ? "solid" : "bordered"}
                  color={scannerAkId === stone.id ? "primary" : "default"}
                  className="min-h-[44px] text-xs font-semibold px-2.5 truncate"
                  onPress={() => {
                    setScannerAkId(stone.id);
                    setScanState("idle");
                  }}
                >
                  {stone.code} · +{stone.tsiro} Tsirö
                </Button>
              ))}
            </div>

            <Card
              shadow="sm"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-6 flex flex-col items-center text-center gap-4">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs font-semibold text-default-500">
                    {scannerAk.trail} · Km {scannerAk.km}
                  </span>
                  <h1 className="font-serif text-xl font-bold">
                    {scannerAk.code}: {scannerAk.name}
                  </h1>
                </div>

                {/* Cavidad Tallada en Roca Volcánica y Glifo Rúnico con Anillos Concéntricos */}
                <div className="w-48 h-48 rounded-full bg-default-100 border-2 border-default-300 flex items-center justify-center relative shadow-inner">
                  <div className="w-36 h-36 rounded-full border border-dashed border-default-300 flex items-center justify-center">
                    <svg
                      viewBox="0 0 120 120"
                      className={`w-28 h-28 fill-none stroke-[3.5] transition-colors ${
                        scanState === "scanning" || scanState === "done"
                          ? "stroke-secondary"
                          : "stroke-default-400"
                      }`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      role="img"
                      aria-label="Runa de piedra Àk"
                    >
                      <polygon
                        className={scanState === "scanning" ? "rune-animate" : ""}
                        points="38,10 82,10 110,38 110,82 82,110 38,110 10,82 10,38"
                      />
                      <polyline
                        className={scanState === "scanning" ? "rune-animate" : ""}
                        points="60,22 60,98"
                      />
                      <polyline
                        className={scanState === "scanning" ? "rune-animate" : ""}
                        points="32,52 60,26 88,52"
                      />
                      <polyline
                        className={scanState === "scanning" ? "rune-animate" : ""}
                        points="36,78 60,56 84,78"
                      />
                    </svg>
                  </div>
                </div>

                {scanState === "idle" && (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <BadgePill tone="secondaryFlat">
                        +{scannerAk.tsiro} Tsirö
                      </BadgePill>
                      <BadgePill tone="primaryFlat">
                        +{scannerAk.xp} XP
                      </BadgePill>
                    </div>
                    <p className="text-xs text-default-500 max-w-xs text-center">
                      Coloca tu celular en la hendidura física de la piedra para leer el chip NFC pasivo sin conexión.
                    </p>
                    <Button
                      radius="full"
                      color="secondary"
                      className="min-h-[48px] w-full font-bold text-sm"
                      onPress={handleScanStone}
                    >
                      Acercar celular al Àk (NFC)
                    </Button>
                  </>
                )}

                {scanState === "scanning" && (
                  <p className="text-sm font-semibold text-secondary py-2 text-center">
                    Cargando runa del hito...
                  </p>
                )}

                {scanState === "done" && (
                  <div className="w-full flex flex-col gap-3 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-lg font-bold text-secondary">
                        Àk escaneada
                      </span>
                      <div className="flex items-center gap-1.5">
                        <BadgePill tone="secondaryFlat">
                          +{scannerAk.tsiro} Tsirö
                        </BadgePill>
                        <BadgePill tone="primaryFlat">
                          +{scannerAk.xp} XP
                        </BadgePill>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-center tabular-nums">
                      <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                        <span className="text-default-500">Altitud</span>
                        <strong className="text-sm mt-0.5">
                          {scannerAk.altitude}
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                        <span className="text-default-500">Kilómetro</span>
                        <strong className="text-sm mt-0.5">
                          {scannerAk.km}
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                        <span className="text-default-500">Pendiente</span>
                        <strong className="text-sm mt-0.5">
                          {scannerAk.grade}
                        </strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        radius="full"
                        variant="flat"
                        className="min-h-[48px] font-semibold text-xs"
                        onPress={() => setActiveView("explorar")}
                      >
                        Ver mapa de ruta
                      </Button>
                      <Button
                        radius="full"
                        color="primary"
                        className="min-h-[48px] font-semibold text-xs"
                        onPress={() => setActiveView("cupones")}
                      >
                        Ir a Cupones ({tsiro} Tsirö)
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
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
                <h1 className="text-xs font-semibold opacity-90">
                  Cupones canjeables
                </h1>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <strong className="font-serif text-2xl font-bold tabular-nums leading-none">
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
                    <span className="text-xs font-bold uppercase text-secondary">
                      Pase activo para mostrar en caja
                    </span>
                    <Button
                      size="sm"
                      radius="full"
                      variant="light"
                      className="min-h-[40px] text-xs font-semibold"
                      onPress={() => setJustRedeemedCoupon(null)}
                    >
                      Ocultar
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-bold">{justRedeemedCoupon.title}</p>
                    <p className="text-xs text-default-500">
                      {justRedeemedCoupon.place}
                    </p>
                  </div>

                  <div className="border-t-2 border-dashed border-default-200 my-1" />

                  <div className="p-3.5 rounded-2xl bg-default-100 border border-dashed border-secondary flex flex-col items-center justify-center gap-2 text-center">
                    <div
                      id="activeVoucherCodeBanner"
                      className="font-mono text-lg font-bold tracking-widest text-foreground"
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
                    className="min-h-[44px] font-semibold text-xs"
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
                    className={`min-h-[40px] px-1 rounded-xl text-[11px] font-bold flex items-center justify-center text-center whitespace-nowrap transition-colors ${
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
                  <p className="text-sm font-semibold">
                    Aún no has reclamado ningún cupón
                  </p>
                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    className="min-h-[44px] font-semibold px-4"
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
                        <span className="text-[11px] font-bold tracking-wider uppercase text-secondary">
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
                        <h2 className="text-sm font-bold leading-snug">
                          {item.title}
                        </h2>
                        <p className="text-xs text-default-500 mt-0.5">
                          {item.place}
                        </p>
                      </div>

                      {isRedeemed && (
                        <div className="p-3 rounded-2xl bg-default-100 border border-dashed border-secondary flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-default-600">
                            Tu código de canje:
                          </span>
                          <strong className="font-mono text-sm font-bold tracking-wider text-secondary">
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
                            className="min-h-[44px] font-semibold text-xs px-4 shrink-0"
                            onPress={() => setJustRedeemedCoupon(item)}
                          >
                            Mostrar en grande
                          </Button>
                        ) : canAfford ? (
                          <Button
                            size="sm"
                            radius="full"
                            color="primary"
                            className="min-h-[44px] font-semibold text-xs px-4 shrink-0"
                            onPress={() => handleRedeemCoupon(item)}
                          >
                            Canjear ahora
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            radius="full"
                            variant="flat"
                            className="min-h-[44px] font-semibold text-xs px-4 shrink-0"
                            onPress={() => setActiveView("escanear")}
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
                    className="w-14 h-14 text-lg font-bold bg-primary text-primary-foreground shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h1 className="text-base font-bold truncate">
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
                    <strong className="text-sm font-bold mt-0.5">
                      {totalKm} km
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-default-500">Piedras Àk</span>
                    <strong className="text-sm font-bold mt-0.5">
                      {scannedAkIds.length}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-default-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-default-500">Cupones</span>
                    <strong className="text-sm font-bold mt-0.5">
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
                  <h2 className="text-sm font-bold">
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
                  <h2 className="text-sm font-bold">Mis códigos reclamados</h2>
                  <Button
                    size="sm"
                    radius="full"
                    variant="light"
                    className="min-h-[40px] text-xs font-semibold"
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
                        <p className="text-xs font-bold truncate">{c.title}</p>
                        <span className="text-xs text-default-500 block truncate">
                          {c.place}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-content1 border border-secondary text-secondary shrink-0">
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

      {/* DOCK FLOTANTE TIPO CÁPSULA PERFECTAMENTE CENTRADO */}
      <nav
        aria-label="Navegación principal"
        className="fixed bottom-3 inset-x-0 z-30 px-3 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto bg-content1/95 backdrop-blur-md border border-default-300 shadow-lg rounded-full p-1.5 grid grid-cols-4 gap-1">
          <Button
            size="sm"
            radius="full"
            variant={activeView === "explorar" ? "solid" : "light"}
            color={activeView === "explorar" ? "primary" : "default"}
            className="min-h-[44px] font-semibold text-xs px-1 flex items-center justify-center text-center"
            onPress={() => setActiveView("explorar")}
          >
            Explorar
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={activeView === "escanear" ? "solid" : "flat"}
            color="secondary"
            className="min-h-[44px] font-semibold text-xs px-1 flex items-center justify-center text-center"
            onPress={() => setActiveView("escanear")}
          >
            Escanear Àk
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={activeView === "cupones" ? "solid" : "light"}
            color={activeView === "cupones" ? "primary" : "default"}
            className="min-h-[44px] font-semibold text-xs px-1 flex items-center justify-center text-center"
            onPress={() => setActiveView("cupones")}
          >
            Cupones
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={activeView === "perfil" ? "solid" : "light"}
            color={activeView === "perfil" ? "primary" : "default"}
            className="min-h-[44px] font-semibold text-xs px-1 flex items-center justify-center text-center"
            onPress={() => setActiveView("perfil")}
          >
            Perfil
          </Button>
        </div>
      </nav>
    </div>
  );
}
