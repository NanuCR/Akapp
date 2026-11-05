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
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
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
    storeName: "Restaurante El Descanso",
    parkName: "P.N. Volcán Poás",
    region: "Alajuela / Poás",
    businessType: "Restaurante típico",
    location: "Poasito, 1 km antes de la entrada al Parque",
    position: [10.1725, -84.2368],
    category: "gastronomia",
    tag: "RESTAURANTE TÍPICO",
    discountBadge: "15% DCTO",
    title: "15% de descuento en almuerzo típico a la leña o casado montañero",
    place: "Restaurante El Descanso · Poasito, 1 km antes de la entrada al Parque",
    requirement: "Presentar código al ordenar en mesa",
    cost: 150,
    code: "AKAPP-DESCANSO-15",
    photo: "/merchants/descanso.jpg",
    logoInitials: "ED",
    logoBg: "#7C2D12",
    logoGlyph: "flame",
  },
  {
    id: "b2",
    storeName: "Restaurante y Cafetería Origen Poás",
    parkName: "P.N. Volcán Poás",
    region: "Alajuela / Alajuela",
    businessType: "Cafetería de especialidad",
    location: "50 m norte del cruce de Fraijanes",
    position: [10.1412, -84.1945],
    category: "gastronomia",
    tag: "CAFETERÍA DE ESPECIALIDAD",
    discountBadge: "15% DCTO",
    title: "15% de descuento en café chorreado de altura y repostería artesanal",
    place: "Restaurante y Cafetería Origen Poás · 50 m norte del cruce de Fraijanes",
    requirement: "Válido en barra de especialidad y mesa",
    cost: 120,
    code: "AKAPP-ORIGEN-15",
    photo: "/merchants/origen_poas.jpg",
    logoInitials: "OP",
    logoBg: "#451A03",
    logoGlyph: "coffee",
  },
  {
    id: "b3",
    storeName: "Soda y Cabinas El Parque",
    parkName: "P.N. Volcán Tenorio",
    region: "Alajuela / Guatuso",
    businessType: "Soda y cabinas",
    location: "Frente a entrada principal del Parque Nacional",
    position: [10.7038, -84.9912],
    category: "gastronomia",
    tag: "SODA Y CABINAS",
    discountBadge: "15% DCTO",
    title: "15% de descuento en casado tradicional o estadía en cabinas",
    place: "Soda y Cabinas El Parque · Frente a entrada de P.N. Volcán Tenorio",
    requirement: "A pasos del sendero Río Celeste",
    cost: 140,
    code: "AKAPP-ELPARQUE-15",
    photo: "/merchants/soda_el_parque.jpg",
    logoInitials: "EP",
    logoBg: "#0F766E",
    logoGlyph: "leaf",
  },
  {
    id: "b4",
    storeName: "Cataratas Bijagua Lodge",
    parkName: "P.N. Volcán Tenorio",
    region: "Alajuela / Upala",
    businessType: "Lodge y restaurante",
    location: "Bijagua de Upala, faldas volcán Miravalles",
    position: [10.7315, -85.0568],
    category: "hospedaje",
    tag: "LODGE Y RESTAURANTE",
    discountBadge: "20% DCTO",
    title: "20% de descuento en hospedaje de montaña o restaurante del lodge",
    place: "Cataratas Bijagua Lodge · Bijagua de Upala, faldas volcán Miravalles",
    requirement: "Válido en reserva directa con código",
    cost: 320,
    code: "AKAPP-BIJAGUA-20",
    photo: "/merchants/bijagua_lodge.jpg",
    logoInitials: "CB",
    logoBg: "#115E59",
    logoGlyph: "mountain",
  },
  {
    id: "b5",
    storeName: "Hacienda Orosí",
    parkName: "P.N. Tapantí",
    region: "Cartago / Paraíso",
    businessType: "Restaurante y termales",
    location: "Río Macho, carretera hacia Tapantí",
    position: [9.7892, -83.8425],
    category: "gastronomia",
    tag: "RESTAURANTE Y TERMALES",
    discountBadge: "15% DCTO",
    title: "15% de descuento en aguas termales minerales y almuerzo de hacienda",
    place: "Hacienda Orosí · Río Macho, carretera hacia Tapantí",
    requirement: "Ideal al salir del sendero en Tapantí",
    cost: 240,
    code: "AKAPP-OROSI-15",
    photo: "/merchants/hacienda_orosi.jpg",
    logoInitials: "HO",
    logoBg: "#9A3412",
    logoGlyph: "waves",
  },
  {
    id: "b6",
    storeName: "Soda Guayabo",
    parkName: "P.N. Tapantí",
    region: "Cartago / Paraíso",
    businessType: "Soda tradicional",
    location: "Orosí centro, Cartago",
    position: [9.7975, -83.8548],
    category: "gastronomia",
    tag: "SODA TRADICIONAL",
    discountBadge: "10% DCTO",
    title: "10% de descuento en desayuno típico u olla de carne casera",
    place: "Soda Guayabo · Orosí centro, Cartago",
    requirement: "Cocina criolla tradicional",
    cost: 110,
    code: "AKAPP-GUAYABO-10",
    photo: "/merchants/soda_guayabo.jpg",
    logoInitials: "SG",
    logoBg: "#854D0E",
    logoGlyph: "bowl",
  },
  {
    id: "b7",
    storeName: "Soda Hermanos Segura",
    parkName: "P.N. Volcán Irazú",
    region: "Cartago / Oreamuno",
    businessType: "Soda típica",
    location: "Ruta 219 camino al Volcán Irazú, Loyola",
    position: [9.9285, -83.8682],
    category: "gastronomia",
    tag: "SODA TÍPICA",
    discountBadge: "15% DCTO",
    title: "15% de descuento en tortilla con queso, aguadulce y almuerzo",
    place: "Soda Hermanos Segura · Ruta 219 camino al Volcán Irazú, Loyola",
    requirement: "Parada tradicional en ruta al cráter",
    cost: 130,
    code: "AKAPP-SEGURA-15",
    photo: "/merchants/hermanos_segura.jpg",
    logoInitials: "HS",
    logoBg: "#991B1B",
    logoGlyph: "flame",
  },
  {
    id: "b8",
    storeName: "GrandPas Hotel & Restaurante",
    parkName: "P.N. Volcán Irazú",
    region: "Cartago / Oreamuno",
    businessType: "Restaurante y hotel",
    location: "Cot de Oreamuno, ruta al Volcán Irazú",
    position: [9.8964, -83.8732],
    category: "hospedaje",
    tag: "RESTAURANTE Y HOTEL",
    discountBadge: "15% DCTO",
    title: "15% de descuento en restaurante familiar o tarifa de habitación",
    place: "GrandPas Hotel & Restaurante · Cot de Oreamuno, ruta al Volcán Irazú",
    requirement: "Válido en restaurante y estadía",
    cost: 260,
    code: "AKAPP-GRANDPAS-15",
    photo: "/merchants/grandpas_hotel.jpg",
    logoInitials: "GP",
    logoBg: "#1E3A8A",
    logoGlyph: "lodge",
  },
  {
    id: "b9",
    storeName: "Restaurante Que Rico Arenal",
    parkName: "P.N. Volcán Arenal",
    region: "Alajuela / San Carlos",
    businessType: "Restaurante y hotel",
    location: "Ruta hacia Parque Nacional, La Fortuna",
    position: [10.4708, -84.6585],
    category: "gastronomia",
    tag: "RESTAURANTE Y HOTEL",
    discountBadge: "15% DCTO",
    title: "15% de descuento en platos a la parrilla, horno de leña y bebidas",
    place: "Restaurante Que Rico Arenal · Ruta hacia Parque Nacional, La Fortuna",
    requirement: "Frente a vistas del Volcán Arenal",
    cost: 180,
    code: "AKAPP-QUERICO-15",
    photo: "/merchants/que_rico_arenal.jpg",
    logoInitials: "QR",
    logoBg: "#B45309",
    logoGlyph: "mountain",
  },
  {
    id: "b10",
    storeName: "Arenal Springs (Rest. Ti-Cain)",
    parkName: "P.N. Volcán Arenal",
    region: "Alajuela / San Carlos",
    businessType: "Resort y gastronomía",
    location: "La Fortuna de San Carlos",
    position: [10.4892, -84.6824],
    category: "hospedaje",
    tag: "RESORT Y GASTRONOMÍA",
    discountBadge: "20% DCTO",
    title: "20% de descuento en Restaurante Ti-Cain o pase de día termal",
    place: "Arenal Springs (Rest. Ti-Cain) · La Fortuna de San Carlos",
    requirement: "Gastronomía y termales frente al volcán",
    cost: 380,
    code: "AKAPP-TICAIN-20",
    photo: "/merchants/arenal_springs.jpg",
    logoInitials: "AS",
    logoBg: "#065F46",
    logoGlyph: "waves",
  },
  {
    id: "b11",
    storeName: "Hotel San Bada (Rest. Congo)",
    parkName: "P.N. Manuel Antonio",
    region: "Puntarenas / Quepos",
    businessType: "Hotel y restaurante",
    location: "Contiguo a entrada del Parque Nacional",
    position: [9.3924, -84.1462],
    category: "hospedaje",
    tag: "HOTEL Y RESTAURANTE",
    discountBadge: "15% DCTO",
    title: "15% de descuento en almuerzo o cena en Restaurante Congo",
    place: "Hotel San Bada (Rest. Congo) · Contiguo a entrada de Manuel Antonio",
    requirement: "Al salir de los senderos del parque",
    cost: 220,
    code: "AKAPP-SANBADA-15",
    photo: "/merchants/hotel_san_bada.jpg",
    logoInitials: "SB",
    logoBg: "#047857",
    logoGlyph: "sun",
  },
  {
    id: "b12",
    storeName: "Hotel Playa Espadilla (Rest. Puerto Escondido)",
    parkName: "P.N. Manuel Antonio",
    region: "Puntarenas / Quepos",
    businessType: "Hotel y restaurante",
    location: "A 200 m de entrada de Manuel Antonio",
    position: [9.3945, -84.1482],
    category: "hospedaje",
    tag: "HOTEL Y RESTAURANTE",
    discountBadge: "15% DCTO",
    title: "15% de descuento en mariscos y cocina costera en Rest. Puerto Escondido",
    place: "Hotel Playa Espadilla · A 200 m de entrada de Manuel Antonio",
    requirement: "A pasos de Playa Espadilla y el parque",
    cost: 240,
    code: "AKAPP-ESPADILLA-15",
    photo: "/merchants/playa_espadilla.jpg",
    logoInitials: "PE",
    logoBg: "#0369A1",
    logoGlyph: "waves",
  },
  {
    id: "b13",
    storeName: "Restaurante El Avión (Costa Verde)",
    parkName: "P.N. Manuel Antonio",
    region: "Puntarenas / Quepos",
    businessType: "Restaurante icónico",
    location: "Carretera principal hacia Manuel Antonio",
    position: [9.4062, -84.1564],
    category: "gastronomia",
    tag: "RESTAURANTE ICÓNICO",
    discountBadge: "15% DCTO",
    title: "15% de descuento en platillos del mar y bebida al atardecer",
    place: "Restaurante El Avión (Costa Verde) · Carretera principal hacia Manuel Antonio",
    requirement: "En el histórico avión Fairchild C-123",
    cost: 200,
    code: "AKAPP-ELAVION-15",
    photo: "/merchants/el_avion.jpg",
    logoInitials: "EA",
    logoBg: "#9A3412",
    logoGlyph: "plane",
  },
  {
    id: "b14",
    storeName: "Buena Vista del Rincón (Rest. La Montaña)",
    parkName: "P.N. Rincón de la Vieja",
    region: "Guanacaste / Liberia",
    businessType: "Eco-lodge y gastronomía",
    location: "Faldas del Volcán Rincón de la Vieja",
    position: [10.8145, -85.3685],
    category: "hospedaje",
    tag: "ECO-LODGE Y GASTRONOMÍA",
    discountBadge: "20% DCTO",
    title: "20% de descuento en Restaurante La Montaña o aguas termales del lodge",
    place: "Buena Vista del Rincón · Faldas del Volcán Rincón de la Vieja",
    requirement: "Experiencia eco-termal en el bosque",
    cost: 320,
    code: "AKAPP-BUENAVISTA-20",
    photo: "/merchants/buena_vista_rincon.jpg",
    logoInitials: "BV",
    logoBg: "#15803D",
    logoGlyph: "leaf",
  },
  {
    id: "b15",
    storeName: "Hotel Las Espuelas",
    parkName: "P.N. Rincón de la Vieja",
    region: "Guanacaste / Liberia",
    businessType: "Hotel y restaurante",
    location: "2 km al sur de la entrada a Liberia",
    position: [10.6112, -85.4295],
    category: "hospedaje",
    tag: "HOTEL Y RESTAURANTE",
    discountBadge: "15% DCTO",
    title: "15% de descuento en restaurante guanacasteco o tarifa de hospedaje",
    place: "Hotel Las Espuelas · 2 km al sur de la entrada a Liberia",
    requirement: "Tradición sabanera en Guanacaste",
    cost: 260,
    code: "AKAPP-ESPUELAS-15",
    photo: "/merchants/las_espuelas.jpg",
    logoInitials: "LE",
    logoBg: "#78350F",
    logoGlyph: "sun",
  },
  {
    id: "b16",
    storeName: "Hotel El Pelícano (Rest. Doña Elsa)",
    parkName: "P.N. Chirripó",
    region: "San José / Pérez Zeledón",
    businessType: "Hotel de montaña",
    location: "San Gerardo de Rivas, frente a oficina SINAC",
    position: [9.4692, -83.5938],
    category: "hospedaje",
    tag: "HOTEL DE MONTAÑA",
    discountBadge: "15% DCTO",
    title: "15% de descuento en trucha fresca en Rest. Doña Elsa o estadía",
    place: "Hotel El Pelícano (Rest. Doña Elsa) · San Gerardo de Rivas, frente a SINAC",
    requirement: "Punto de encuentro oficial de senderistas",
    cost: 210,
    code: "AKAPP-PELICANO-15",
    photo: "/merchants/el_pelicano.jpg",
    logoInitials: "HP",
    logoBg: "#3F6212",
    logoGlyph: "mountain",
  },
];

function MerchantLogoBadge({ item, className = "" }) {
  const renderGlyph = () => {
    switch (item.logoGlyph) {
      case "coffee":
        return (
          <path d="M5 7h9v5a4.5 4.5 0 0 1-9 0V7zm9 1h1.5a2 2 0 0 1 0 4H14M4 16.5h11" />
        );
      case "plane":
        return <path d="M10 3l1.5 5 5.5 2-5.5 1.5L10 17l-1.5-5.5L3 10l5.5-2L10 3z" />;
      case "waves":
        return (
          <path d="M3 9c2-1.5 4-1.5 6 0s4 1.5 6 0M3 13.5c2-1.5 4-1.5 6 0s4 1.5 6 0" />
        );
      case "mountain":
        return <path d="M3 15.5l4.5-7.5 3.2 4.8 2.3-3.3 4 6H3z" />;
      case "sun":
        return (
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 3.5v1.5M10 15v1.5M3.5 10H5M15 10h1.5" />
          </>
        );
      case "lodge":
        return <path d="M3 10l7-5.5L17 10v6H3v-6zm5 6v-4h4v4" />;
      case "bowl":
        return <path d="M3.5 9.5h13a6.5 6.5 0 0 1-13 0zm2.5 6.5h8" />;
      case "leaf":
        return <path d="M15.5 4.5C9 4.5 5 8.5 5 15c6.5 0 10.5-4 10.5-10.5zM5 15l5-5" />;
      default:
        return (
          <path d="M10 3.5c2.5 3 4.5 5.2 4.5 7.8a4.5 4.5 0 1 1-9 0c0-2.6 2-4.8 4.5-7.8z" />
        );
    }
  };

  return (
    <div
      style={{ backgroundColor: item.logoBg || "#14532D" }}
      className={`w-11 h-11 rounded-2xl border border-white/30 shadow-md flex flex-col items-center justify-center text-white shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 opacity-95 -mb-0.5"
      >
        {renderGlyph()}
      </svg>
      <span className="text-[10px] font-bold tracking-wider leading-none mt-0.5">
        {item.logoInitials}
      </span>
    </div>
  );
}

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

// Ilustraciones PNG de fauna de Costa Rica. Las animan las clases fauna-* de index.css
const FAUNA_AVATARS = [
  { id: "perezoso", name: "Perezoso", src: "/avatars/perezoso.png" },
  { id: "colibri", name: "Colibrí", src: "/avatars/colibri.png" },
  { id: "yiguirro", name: "Yigüirro", src: "/avatars/yiguirro.png" },
  { id: "ballena", name: "Ballena", src: "/avatars/ballena.png" },
];

function findFaunaAvatar(id) {
  return FAUNA_AVATARS.find((avatar) => avatar.id === id) || FAUNA_AVATARS[0];
}

function FaunaAvatar({ avatar, className = "" }) {
  return (
    <span className={`fauna-avatar ${className}`}>
      <img src={avatar.src} alt="" className={`fauna-${avatar.id}`} />
    </span>
  );
}

// El avatar queda derecho y solo la punta de direccion gira con el recorrido
function navMarkerHtml(avatar) {
  return `<div class="nav-arrow-pulse"></div>
  <div class="nav-arrow">
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
      <path d="M32 1 42 14H22Z" fill="#0F5C46" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" />
    </svg>
  </div>
  <div class="nav-avatar fauna-avatar"><img src="${avatar.src}" alt="" class="fauna-${avatar.id}" /></div>`;
}

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
  avatar,
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
        html: navMarkerHtml(avatar),
        iconSize: [64, 64],
        iconAnchor: [32, 32],
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

  // Tocar un Àk lleva el mapa hasta esa piedra
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
        className="trail-map absolute inset-0 z-0"
        aria-label={`Mapa en tiempo real de ${route.name}`}
      />
      {!following && (
        <button
          type="button"
          onClick={() => setFollowing(true)}
          className="absolute z-10 bottom-[104px] left-1/2 -translate-x-1/2 min-h-[40px] px-4 rounded-full bg-black/75 text-white text-xs font-semibold border border-white/25 backdrop-blur-md"
        >
          Volver a mi posición
        </button>
      )}
    </div>
  );
}

const PARK_DOT_BLUE = "#1D8CF0";
const MERCHANT_DOT_COLOR = "#EA580C";

// Red de parques del directorio de comercios aliados. Coordenadas aproximadas
const PARK_NETWORK = [
  { id: "poas", name: "Parque Nacional Volcán Poás", area: "Alajuela", position: [10.1894, -84.2309], routeId: "poas" },
  { id: "tenorio", name: "Parque Nacional Volcán Tenorio", area: "Alajuela", position: [10.7082, -84.9918], routeId: "tenorio" },
  { id: "tapanti", name: "Parque Nacional Tapantí", area: "Cartago", position: [9.7505, -83.7826], routeId: "tapanti" },
  { id: "irazu", name: "Parque Nacional Volcán Irazú", area: "Cartago", position: [9.979, -83.852] },
  { id: "arenal", name: "Parque Nacional Volcán Arenal", area: "Alajuela", position: [10.463, -84.703] },
  { id: "manuel-antonio", name: "Parque Nacional Manuel Antonio", area: "Puntarenas", position: [9.392, -84.137] },
  { id: "rincon", name: "Parque Nacional Rincón de la Vieja", area: "Guanacaste", position: [10.83, -85.324] },
  { id: "chirripo", name: "Parque Nacional Chirripó", area: "San José", position: [9.484, -83.489] },
  { id: "ballena", name: "Parque Nacional Marino Ballena", area: "Puntarenas", position: [9.138, -83.737] },
  { id: "cahuita", name: "Parque Nacional Cahuita", area: "Limón", position: [9.737, -82.817] },
  { id: "tortuguero", name: "Parque Nacional Tortuguero", area: "Limón", position: [10.543, -83.502] },
  { id: "corcovado", name: "Parque Nacional Corcovado", area: "Puntarenas", position: [8.541, -83.571] },
  { id: "braulio", name: "Parque Nacional Braulio Carrillo", area: "Heredia", position: [10.165, -83.953] },
];

// Mapa general a pantalla completa con la red de parques y comercios aliados
function GeneralParksMap({ onOpenRoute, onOpenMerchant }) {
  const containerRef = useRef(null);
  const dotsRef = useRef({});
  const merchantDotsRef = useRef({});
  const [selectedParkId, setSelectedParkId] = useState(null);
  const [selectedMerchantId, setSelectedMerchantId] = useState(null);

  const selectedPark =
    PARK_NETWORK.find((park) => park.id === selectedParkId) || null;
  const selectedRoute = selectedPark?.routeId
    ? ROUTES.find((route) => route.id === selectedPark.routeId)
    : null;
  const selectedMerchant =
    BENEFITS.find((b) => b.id === selectedMerchantId) || null;

  useEffect(() => {
    const map = L.map(containerRef.current, {
      zoomControl: false,
      zoomSnap: 0.25,
    });
    map.attributionControl.setPrefix(false);
    map.fitBounds(COSTA_RICA_BOUNDS, {
      paddingTopLeft: [8, 64],
      paddingBottomRight: [8, 88],
    });
    map.setMinZoom(map.getZoom() - 0.5);
    map.setMaxBounds(L.latLngBounds(COSTA_RICA_BOUNDS).pad(0.6));
    map.on("click", () => {
      setSelectedParkId(null);
      setSelectedMerchantId(null);
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    PARK_NETWORK.forEach((park) => {
      dotsRef.current[park.id] = L.marker(park.position, {
        title: park.name,
        alt: park.name,
        zIndexOffset: 200,
        icon: L.divIcon({
          className: "park-dot-pin",
          html: `<span class="park-dot" style="background:${PARK_DOT_BLUE}"></span>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        }),
      })
        .on("click", () => {
          setSelectedMerchantId(null);
          setSelectedParkId(park.id);
          map.panTo(park.position);
        })
        .addTo(map);
    });

    BENEFITS.forEach((merchant) => {
      if (!merchant.position) return;
      merchantDotsRef.current[merchant.id] = L.marker(merchant.position, {
        title: `${merchant.storeName} (${merchant.parkName})`,
        alt: merchant.storeName,
        zIndexOffset: 100,
        icon: L.divIcon({
          className: "merchant-dot-pin",
          html: `<span class="merchant-dot" style="background:${MERCHANT_DOT_COLOR}"></span>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        }),
      })
        .on("click", () => {
          setSelectedParkId(null);
          setSelectedMerchantId(merchant.id);
          map.panTo(merchant.position);
        })
        .addTo(map);
    });

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, []);

  useEffect(() => {
    PARK_NETWORK.forEach((park) => {
      dotsRef.current[park.id]
        ?.getElement()
        ?.classList.toggle("is-selected", park.id === selectedParkId);
    });
  }, [selectedParkId]);

  useEffect(() => {
    BENEFITS.forEach((merchant) => {
      merchantDotsRef.current[merchant.id]
        ?.getElement()
        ?.classList.toggle("is-selected", merchant.id === selectedMerchantId);
    });
  }, [selectedMerchantId]);

  return (
    <div className="absolute inset-0">
      <div
        ref={containerRef}
        className="park-map absolute inset-0 z-0"
        aria-label="Mapa de parques nacionales y comercios aliados de Costa Rica"
      />

      {/* Leyenda minimalista de puntos en el mapa */}
      <div className="absolute z-10 top-16 left-4 pointer-events-none">
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-content1/90 backdrop-blur-md border border-default-200 shadow-sm text-[11px] font-medium text-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-white shadow-sm shrink-0"
              style={{ backgroundColor: PARK_DOT_BLUE }}
            />
            Parques ({PARK_NETWORK.length})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white shadow-sm shrink-0"
              style={{ backgroundColor: MERCHANT_DOT_COLOR }}
            />
            Comercios ({BENEFITS.length})
          </span>
        </div>
      </div>

      {selectedPark && (
        <div className="absolute z-10 inset-x-0 bottom-24 px-4 pointer-events-none">
          <div
            role="status"
            className="scan-result-card pointer-events-auto max-w-md mx-auto p-4 rounded-2xl bg-content1/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <strong className="text-sm font-semibold block truncate">
                {selectedPark.name}
              </strong>
              <span className="text-xs text-default-500 block">
                {selectedRoute
                  ? selectedPark.area
                  : `${selectedPark.area} · Senderos próximamente`}
              </span>
            </div>
            {selectedRoute && (
              <Button
                size="sm"
                radius="full"
                color="primary"
                className="min-h-[40px] text-xs font-medium px-4 shrink-0"
                onPress={() => onOpenRoute(selectedRoute)}
              >
                Ver senderos
              </Button>
            )}
          </div>
        </div>
      )}

      {selectedMerchant && (
        <div className="absolute z-10 inset-x-0 bottom-24 px-4 pointer-events-none">
          <div
            role="status"
            className="scan-result-card pointer-events-auto max-w-md mx-auto p-3.5 rounded-2xl bg-content1/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-3 border border-default-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <MerchantLogoBadge item={selectedMerchant} />
              <div className="min-w-0">
                <strong className="text-sm font-semibold block truncate">
                  {selectedMerchant.storeName}
                </strong>
                <span className="text-xs text-default-500 block truncate">
                  {selectedMerchant.parkName} · {selectedMerchant.businessType}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center rounded-full bg-[#EA580C] text-white text-[10px] font-bold px-2 h-5 leading-none whitespace-nowrap">
                    {selectedMerchant.discountBadge}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold px-2 h-5 leading-none whitespace-nowrap tabular-nums">
                    {selectedMerchant.cost} pts
                  </span>
                </div>
              </div>
            </div>
            {onOpenMerchant && (
              <Button
                size="sm"
                radius="full"
                color="primary"
                className="min-h-[40px] text-xs font-medium px-3.5 shrink-0"
                onPress={() => onOpenMerchant(selectedMerchant)}
              >
                Ver cupón
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
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

function AkStonesCarouselHub({ routeId, aks, totalTsiro, scannedAkIds }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [routeId]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx >= 0 && idx < aks.length && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  };

  const scrollToSlide = (targetIdx) => {
    const clamped = Math.max(0, Math.min(aks.length - 1, targetIdx));
    setCurrentIndex(clamped);
    const el = trackRef.current;
    if (el) {
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < aks.length - 1;

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Piedras Àk</h2>
          <span className="text-[11px] font-medium text-default-400 tabular-nums">
            {currentIndex + 1} / {aks.length}
          </span>
        </div>
        <span className="text-xs text-default-500">
          Hasta +{totalTsiro} pts
        </span>
      </div>

      <div className="relative rounded-2xl bg-content1 border border-default-200 overflow-hidden">
        {hasPrev && (
          <button
            type="button"
            onClick={() => scrollToSlide(currentIndex - 1)}
            aria-label="Ver piedra Àk anterior"
            className="ak-hint-arrow-left absolute left-0.5 top-1/2 z-10 w-8 h-11 flex items-center justify-center rounded-xl text-default-500 hover:text-foreground focus:outline-none"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M12.5 15L7.5 10L12.5 5" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            type="button"
            onClick={() => scrollToSlide(currentIndex + 1)}
            aria-label="Deslizar a la siguiente piedra Àk"
            className="ak-hint-arrow-right absolute right-0.5 top-1/2 z-10 w-8 h-11 flex items-center justify-center rounded-xl text-default-500 hover:text-foreground focus:outline-none"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M7.5 5L12.5 10L7.5 15" />
            </svg>
          </button>
        )}

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth ak-no-scrollbar touch-pan-x"
        >
          {aks.map((ak) => (
            <div
              key={ak.id}
              className="w-full shrink-0 snap-center pt-3.5 pb-2 px-8 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <strong className="text-sm font-semibold min-w-0 truncate">
                  {ak.code} · {ak.name}
                </strong>
                {scannedAkIds.includes(ak.id) && (
                  <BadgePill tone="successFlat">Sellado</BadgePill>
                )}
              </div>
              <span className="text-xs text-default-500 tabular-nums">
                {ak.trail} · {ak.km}
              </span>
              <span className="text-xs text-default-500 tabular-nums">
                +{ak.tsiro} pts · +{ak.xp} XP · {ak.lat.toFixed(4)},{" "}
                {ak.lng.toFixed(4)}
              </span>
            </div>
          ))}
        </div>

        <div className="pb-2.5 flex items-center justify-center gap-1.5">
          {aks.map((ak, idx) => (
            <button
              key={ak.id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Ir a ${ak.code}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-4 bg-primary/70"
                  : "w-1.5 bg-default-300/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const TAB_ORDER = ["mapa", "explorar", "escanear", "cupones", "config", "perfil"];
const NFC_SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const STONE_READ_MS = 3400;
const STONE_FILL_SECONDS = 2.6;
const STONE_SIZE = { width: 680, height: 1440, centerX: 340, centerY: 584, reach: 820 };
const STONE_GLOW_GREEN = "#9BBF4E";
const SCAN_EMERALD = "52, 211, 153";
const SCAN_MINT = "212, 239, 160";
const SCAN_SPARKS = Array.from({ length: 18 }, (_, index) => ({
  angle: index * 20,
  distance: 100 + (index * 37) % 70,
  delay: (index * 53) % 160,
  size: 3 + (index * 7) % 4,
}));
const STONE_LIGHT_BLOBS = [
  [0, 0, 1],
  [1, 0.9, 0.92],
  [2.1, 0.8, 0.95],
  [4.2, 1, 0.9],
];

function createStoneLayer() {
  const canvas = document.createElement("canvas");
  canvas.width = STONE_SIZE.width;
  canvas.height = STONE_SIZE.height;
  return [canvas, canvas.getContext("2d")];
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

// Conserva la luz de la piedra tallada, pero la deja solo en verde
function tintStoneGreen(image) {
  const [canvas, context] = createStoneLayer();
  context.drawImage(image, 0, 0);
  context.globalCompositeOperation = "color";
  context.fillStyle = STONE_GLOW_GREEN;
  context.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

let stoneImagesPromise = null;

function loadStoneImages() {
  if (!stoneImagesPromise) {
    stoneImagesPromise = Promise.all([
      loadImage("/scan/rock-base.jpg"),
      loadImage("/scan/rock-lit.jpg"),
      loadImage("/scan/rock-white.jpg"),
    ])
      .then(([base, lit, white]) => ({
        base,
        lit: tintStoneGreen(lit),
        white: tintStoneGreen(white),
      }))
      .catch((error) => {
        stoneImagesPromise = null;
        throw error;
      });
  }
  return stoneImagesPromise;
}

// Piedra tallada que se ilumina desde el centro con partículas de luz
function StoneReadCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const { width, height, centerX, centerY, reach } = STONE_SIZE;
    const context = canvasRef.current.getContext("2d");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fillSeconds = reducedMotion ? 1 : STONE_FILL_SECONDS;
    const [litLayer, litContext] = createStoneLayer();
    const [edgeLayer, edgeContext] = createStoneLayer();
    const [maskLayer, maskContext] = createStoneLayer();
    const particles = reducedMotion
      ? []
      : Array.from({ length: 80 }, () => ({
          angle: Math.random() * Math.PI * 2,
          born: Math.random() * fillSeconds,
          life: 0.8 + Math.random() * 0.9,
          speed: 70 + Math.random() * 150,
          size: 2 + Math.random() * 5,
          color: Math.random() < 0.5 ? SCAN_MINT : SCAN_EMERALD,
        }));

    const easeFill = (progress) =>
      0.45 * (1 - (1 - progress) ** 2) +
      0.55 * (0.5 - 0.5 * Math.cos(Math.PI * progress));

    const paintLiquidMask = (radius, seconds) => {
      maskContext.globalCompositeOperation = "source-over";
      maskContext.clearRect(0, 0, width, height);
      maskContext.globalCompositeOperation = "lighter";
      STONE_LIGHT_BLOBS.forEach(([phase, amplitude, scale]) => {
        const x = centerX + Math.cos(seconds * 0.9 + phase) * 26 * amplitude;
        const y = centerY + Math.sin(seconds * 1.1 + phase) * 26 * amplitude;
        const size = Math.max(1, radius * scale);
        const gradient = maskContext.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, "rgba(0,0,0,0.5)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0.5)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        maskContext.fillStyle = gradient;
        maskContext.fillRect(0, 0, width, height);
      });
    };

    const paintThroughMask = (layerContext, image) => {
      layerContext.globalCompositeOperation = "source-over";
      layerContext.clearRect(0, 0, width, height);
      layerContext.drawImage(image, 0, 0);
      layerContext.globalCompositeOperation = "destination-in";
      layerContext.drawImage(maskLayer, 0, 0);
    };

    const paintParticles = (seconds, radius) => {
      context.globalCompositeOperation = "lighter";
      particles.forEach((particle) => {
        const age = seconds - particle.born;
        if (age < 0 || age > particle.life) return;
        const distance = radius * 0.6 + particle.speed * age;
        const x = centerX + Math.cos(particle.angle) * distance;
        const y = centerY + Math.sin(particle.angle) * distance - 50 * age;
        context.globalAlpha = Math.sin((Math.PI * age) / particle.life);
        context.fillStyle = `rgb(${particle.color})`;
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
    };

    // Ondas concentricas que salen del centro y se apagan al terminar el llenado
    const paintEnergyWaves = (seconds) => {
      if (reducedMotion) return;
      const fade = Math.max(0, Math.min(1, (fillSeconds + 0.3 - seconds) / 0.5));
      context.globalCompositeOperation = "lighter";
      context.globalAlpha = fade;
      [0, 1, 2].forEach((index) => {
        const phase = (seconds / 2.1 + index / 3) % 1;
        const outer = 90 + phase * reach;
        const strength = 0.5 * (1 - phase) ** 1.5;
        const ring = context.createRadialGradient(
          centerX,
          centerY,
          outer * 0.86,
          centerX,
          centerY,
          outer
        );
        ring.addColorStop(0, `rgba(${SCAN_EMERALD}, 0)`);
        ring.addColorStop(0.65, `rgba(${SCAN_EMERALD}, ${strength})`);
        ring.addColorStop(0.92, `rgba(${SCAN_MINT}, ${strength})`);
        ring.addColorStop(1, `rgba(${SCAN_MINT}, 0)`);
        context.fillStyle = ring;
        context.fillRect(0, 0, width, height);
      });
    };

    let frameId = null;
    let cancelled = false;

    loadStoneImages()
      .then((images) => {
        if (cancelled) return;
        const startedAt = performance.now();

        const paintFrame = (now) => {
          const seconds = Math.max(0, (now - startedAt) / 1000);
          const progress = Math.min(1, seconds / fillSeconds);
          const radius = easeFill(progress) * reach;

          context.globalCompositeOperation = "source-over";
          context.globalAlpha = 1;
          context.drawImage(images.base, 0, 0);

          paintLiquidMask(radius, seconds);
          paintThroughMask(litContext, images.lit);
          context.drawImage(litLayer, 0, 0);

          if (progress < 1) {
            maskContext.globalCompositeOperation = "source-over";
            maskContext.clearRect(0, 0, width, height);
            const edge = maskContext.createRadialGradient(
              centerX,
              centerY,
              radius * 0.35,
              centerX,
              centerY,
              Math.max(2, radius * 0.95)
            );
            edge.addColorStop(0, "rgba(0,0,0,0)");
            edge.addColorStop(0.6, "rgba(0,0,0,1)");
            edge.addColorStop(1, "rgba(0,0,0,0)");
            maskContext.fillStyle = edge;
            maskContext.fillRect(0, 0, width, height);
            paintThroughMask(edgeContext, images.white);
            context.globalCompositeOperation = "lighter";
            context.globalAlpha = 0.42 * (1 - progress * progress);
            context.drawImage(edgeLayer, 0, 0);
          }

          paintEnergyWaves(seconds);
          paintParticles(seconds, radius);

          const flash = seconds - fillSeconds + 0.15;
          if (flash > 0 && flash < 0.85) {
            context.globalCompositeOperation = "lighter";
            context.globalAlpha = 0.48 * Math.sin((Math.PI * flash) / 0.85);
            context.drawImage(images.lit, 0, 0);
          }

          frameId = requestAnimationFrame(paintFrame);
        };

        frameId = requestAnimationFrame(paintFrame);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={STONE_SIZE.width}
      height={STONE_SIZE.height}
      className="absolute inset-0 w-full h-full object-cover"
      role="img"
      aria-label="Piedra tallada que se llena de luz"
    />
  );
}

// Escucha NFC estilo AirDrop, detección y lectura de la piedra
function NfcScanOverlay({ stage, ak, onCancel }) {
  const isReading = stage === "reading";
  const isDetected = stage === "detected";

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 bg-[#090A07] text-[#E8EBDD] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {isReading ? (
        <div className="scan-stage-in absolute inset-0">
          <StoneReadCanvas />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-[#090A07]/90" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-t from-transparent to-[#090A07]/90" />
          <div className="absolute top-8 inset-x-0 flex justify-center">
            <LogoMark className="w-28 logo-awaken" decorative />
          </div>
          <div className="absolute bottom-16 inset-x-6 text-center">
            <p className="font-display text-xl">Leyendo el Àk...</p>
            <p className="text-xs opacity-75 mt-1">
              {ak.code} · {ak.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 px-6 text-center">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <span className="energy-ambient" />
            {isDetected ? (
              <>
                <span className="energy-shock" />
                <span className="energy-shock energy-shock-2" />
                <span className="energy-shock energy-shock-3" />
                <span className="energy-sparks">
                  {SCAN_SPARKS.map((spark) => (
                    <i
                      key={spark.angle}
                      style={{
                        "--spark-angle": `${spark.angle}deg`,
                        "--spark-distance": `${spark.distance}px`,
                        "--spark-size": `${spark.size}px`,
                        animationDelay: `${spark.delay}ms`,
                      }}
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <span className="energy-wave" />
                <span className="energy-wave energy-wave-2" />
                <span className="energy-wave energy-wave-3" />
                <span className="energy-wave energy-wave-4" />
                <span className="energy-halo" />
              </>
            )}
            <div
              className={`energy-core relative w-28 h-28 rounded-full text-[#090A07] flex items-center justify-center ${
                isDetected ? "proximity-lock" : ""
              }`}
            >
              <span className="rune-mark w-16 h-16" aria-hidden="true" />
            </div>
          </div>

          <div>
            <p className="font-display text-2xl">
              {isDetected ? "Piedra detectada" : "Acerca tu teléfono a la piedra"}
            </p>
            <p className="text-sm opacity-75 mt-2">
              {isDetected
                ? `${ak.code} · ${ak.name}`
                : "Buscando el chip NFC del Àk, sin necesidad de señal"}
            </p>
          </div>

          <div className="h-11">
            {!isDetected && (
              <button
                type="button"
                onClick={onCancel}
                className="min-h-[44px] px-6 rounded-full text-sm font-medium border border-white/25"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ScanResultModal({ ak, progress, balance, onBackToMap }) {
  const isRouteComplete = progress.done === progress.total;

  return (
    <MotionConfig reducedMotion="user">
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scanResultTitle"
        className="w-full max-w-md bg-content1 text-foreground rounded-3xl shadow-xl p-6 flex flex-col gap-5"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%", transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
        transition={{ type: "spring", bounce: 0.22, duration: 0.5, delay: 0.15 }}
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="scan-success-badge w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <span className="rune-mark w-10 h-10" aria-hidden="true" />
          </div>
          <h2
            id="scanResultTitle"
            className="text-xs font-semibold tracking-wider text-primary"
          >
            PIEDRA {progress.done} DE {progress.total} · ¡ESCANEADA!
          </h2>
          <div>
            <p className="font-display text-2xl leading-tight">
              {ak.code} {ak.name}
            </p>
            <p className="text-sm text-default-500 mt-1">
              {ak.trail} · {progress.routeName}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-default-100 flex flex-col gap-2.5">
          <p className="text-center">
            <strong className="font-display text-4xl tabular-nums">
              +{ak.tsiro}
            </strong>
            <span className="text-sm text-default-500 block mt-1">
              puntos añadidos a tu saldo
            </span>
          </p>
          <div className="pt-2.5 border-t border-default-200 flex items-center justify-between text-sm tabular-nums">
            <span className="text-default-500">Saldo total</span>
            <strong className="font-semibold">
              {balance.toLocaleString("en-US")} pts
            </strong>
          </div>
        </div>

        {isRouteComplete && (
          <p className="text-sm text-center">
            <span className="text-default-500">Nueva insignia: </span>
            <strong className="font-semibold">
              Guardián de {progress.routeName}
            </strong>
          </p>
        )}

        <Button
          autoFocus
          radius="full"
          color="primary"
          className="w-full min-h-[56px] text-base font-semibold"
          onPress={onBackToMap}
        >
          Volver al mapa
        </Button>
      </motion.div>
    </motion.div>
    </MotionConfig>
  );
}

function ProfileBubble({ profile, onPress, className = "" }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`w-11 h-11 rounded-full inline-flex items-center justify-center shrink-0 ${className}`}
      aria-label={`Abrir perfil de ${profile.name}`}
    >
      <Avatar
        name={profile.name}
        src={profile.photo || undefined}
        size="sm"
        className="w-10 h-10 text-sm font-semibold bg-primary text-primary-foreground ring-2 ring-background shadow-md"
      />
    </button>
  );
}

function EditProfileSheet({ profile, onSave, onClose }) {
  const [draft, setDraft] = useState(profile);
  const photoInputRef = useRef(null);
  const hasName = draft.name.trim().length > 0;

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const handlePhotoSelected = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) {
      setDraft((current) => ({ ...current, photo: URL.createObjectURL(file) }));
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="editProfileTitle"
          className="w-full max-w-md max-h-[90dvh] overflow-y-auto bg-content1 text-foreground rounded-3xl shadow-xl p-5 flex flex-col gap-5"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
          transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
        >
          <h2 id="editProfileTitle" className="font-display text-xl">
            Editar perfil
          </h2>

          <div className="flex items-center gap-3.5">
            <Avatar
              name={draft.name}
              src={draft.photo || undefined}
              className="w-16 h-16 text-lg font-semibold bg-primary text-primary-foreground shrink-0"
            />
            <Button
              radius="full"
              className="min-h-[44px] px-5 text-sm font-medium bg-default-100 text-foreground"
              onPress={() => photoInputRef.current?.click()}
            >
              Cambiar foto
            </Button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelected}
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
            />
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">Nombre de usuario</span>
            <input
              type="text"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Tu nombre"
              className="min-h-[48px] px-4 rounded-2xl bg-default-100 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <div className="flex flex-col gap-2">
            <h3 id="navAvatarLabel" className="text-sm font-semibold">
              Avatar de navegación
            </h3>
            <div
              role="radiogroup"
              aria-labelledby="navAvatarLabel"
              className="grid grid-cols-4 gap-2"
            >
              {FAUNA_AVATARS.map((avatar) => {
                const isSelected = draft.avatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        avatarId: avatar.id,
                      }))
                    }
                    className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-default-100"
                    }`}
                  >
                    <FaunaAvatar
                      avatar={avatar}
                      className="fauna-disc w-14 h-14 rounded-full"
                    />
                    <span className="text-xs font-medium">{avatar.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-default-500">
              Es el icono que te representa en el mapa cuando inicias una ruta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              radius="full"
              className="min-h-[48px] text-sm font-medium bg-default-100 text-foreground"
              onPress={onClose}
            >
              Cancelar
            </Button>
            <Button
              radius="full"
              color="primary"
              className="min-h-[48px] text-sm font-semibold disabled:opacity-50"
              isDisabled={!hasName}
              onPress={() => {
                onSave({ ...draft, name: draft.name.trim() });
                onClose();
              }}
            >
              Guardar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}

// Modo sendero: mapa a pantalla completa con camara y microfono
function TrailView({
  route,
  scannedAkIds,
  selectedAkId,
  onSelectAk,
  onArrivalChange,
  onAddReport,
  avatar,
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

  return (
    <div className="sheet-rise fixed inset-0 z-20 bg-background">
      <TrailMiniMap
        route={route}
        scannedAkIds={scannedAkIds}
        selectedAkId={selectedAkId}
        onSelectAk={onSelectAk}
        position={position}
        heading={heading}
        avatar={avatar}
      />

      {notice && (
        <div className="absolute z-20 inset-x-4 bottom-44 flex justify-center pointer-events-none">
          <span
            role="status"
            className="px-4 py-2 rounded-full bg-content1 text-xs font-medium text-center shadow-lg"
          >
            {notice}
          </span>
        </div>
      )}

      {/* Accesos flotantes de ciencia ciudadana */}
      <button
        type="button"
        onClick={toggleRecording}
        aria-pressed={isRecording}
        aria-label={isRecording ? "Detener grabación" : "Grabar audio o canto de aves"}
        className={`absolute z-20 left-4 bottom-24 w-14 h-14 rounded-full inline-flex items-center justify-center shadow-lg ${
          isRecording
            ? "bg-danger text-white record-pulse"
            : "bg-content1 text-foreground"
        }`}
      >
        <MicIcon />
      </button>

      <button
        type="button"
        onClick={() => photoInputRef.current?.click()}
        aria-label="Tomar foto georreferenciada"
        className="absolute z-20 right-4 bottom-24 w-14 h-14 rounded-full bg-content1 text-foreground inline-flex items-center justify-center shadow-lg"
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

  // Saldo proporcional de Esteban (285 puntos acumulados tras varias caminatas)
  const [tsiro, setTsiro] = useState(285);
  const [xp, setXp] = useState(1880);
  const [totalKm, setTotalKm] = useState(42.6);
  const [scannedAkIds, setScannedAkIds] = useState(["ak-01", "ak-02"]);

  // Vistas: "mapa" | "explorar" | "escanear" | "cupones" | "config" | "perfil"
  const [activeView, setActiveView] = useState("explorar");

  // Estado de Explorar Rutas y Detalle de Ruta
  const [routeQuery, setRouteQuery] = useState("");
  const [navigatingRouteId, setNavigatingRouteId] = useState(null);
  const [profile, setProfile] = useState({
    name: "Esteban Morales",
    photo: null,
    avatarId: FAUNA_AVATARS[0].id,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const closeProfileEditor = useCallback(() => setIsEditingProfile(false), []);
  const [nfcBurst, setNfcBurst] = useState(0);
  const [axLoading, setAxLoading] = useState(false);
  const [axSuggestion, setAxSuggestion] = useState(null);
  const [openedRouteId, setOpenedRouteId] = useState(null);
  const [selectedMapAkId, setSelectedMapAkId] = useState("ak-03");
  const [selectedGuidesByRoute, setSelectedGuidesByRoute] = useState({});
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);

  // Estado de Escáner NFC
  const [scannerAkId, setScannerAkId] = useState("ak-03");
  const [scanState, setScanState] = useState("idle"); // "idle" | "listening" | "detected" | "reading" | "done"
  const [nearAkId, setNearAkId] = useState(null);
  const scanTimerRef = useRef(null);

  // Fotos y audios georreferenciados de ciencia ciudadana
  const [reports, setReports] = useState([]);

  // Estado de Cupones Separados y Pase Perforado
  const [couponCategory, setCouponCategory] = useState("todos");
  const [couponQuery, setCouponQuery] = useState("");
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

  const isOnTrail =
    activeView === "explorar" &&
    Boolean(openedRoute) &&
    navigatingRouteId === openedRoute.id;
  const isMapView = activeView === "mapa" || isOnTrail;
  const tabMotionRef = useRef({ view: activeView, direction: 1 });
  if (tabMotionRef.current.view !== activeView) {
    tabMotionRef.current = {
      view: activeView,
      direction:
        TAB_ORDER.indexOf(activeView) <
        TAB_ORDER.indexOf(tabMotionRef.current.view)
          ? -1
          : 1,
    };
  }
  const mapGlassClass =
    "px-3.5 rounded-full bg-content1/85 backdrop-blur-md shadow-sm";

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
          text: "A 18 km de tu ubicación. Tiene 4 piedras Àk (+50 pts en total) y 2 guías certificados disponibles para salir hoy.",
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
      if (!clean || isQuestion) return true;
      return `${r.name} ${r.region} ${r.trailsSummary}`
        .toLowerCase()
        .includes(clean);
    });
  }, [routeQuery]);

  const openRouteDetail = (route) => {
    const firstPending =
      route.aks.find((a) => !scannedAkIds.includes(a.id)) || route.aks[0];
    setOpenedRouteId(route.id);
    setNavigatingRouteId(null);
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

  const handleOpenMerchantFromMap = useCallback((merchant) => {
    setCouponCategory("todos");
    setCouponQuery(merchant.storeName);
    setActiveView("cupones");
  }, []);

  const goToExplore = () => {
    setOpenedRouteId(null);
    setNavigatingRouteId(null);
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

  const finishScan = (ak) => {
    setTsiro((prev) => prev + ak.tsiro);
    setXp((prev) => prev + ak.xp);
    setTotalKm((prev) => Number((prev + 1.2).toFixed(1)));
    setScannedAkIds((prev) => [...prev, ak.id]);
    setScanState("done");
  };

  // Escucha NFC, detección simulada al acercar el teléfono y lectura de la piedra
  const startScan = (ak) => {
    if (scanState !== "idle") return;
    setScannerAkId(ak.id);
    setScanState("listening");
    loadStoneImages().catch(() => {});

    scanTimerRef.current = setTimeout(() => {
      setScanState("detected");
      if (vibrateOnScan) navigator.vibrate?.(30);

      scanTimerRef.current = setTimeout(() => {
        setScanState("reading");
        if (vibrateOnScan) navigator.vibrate?.([25, 40, 70]);

        scanTimerRef.current = setTimeout(
          () => finishScan(ak),
          STONE_READ_MS
        );
      }, 1000);
    }, 2600);
  };

  const handleCancelScan = () => {
    clearTimeout(scanTimerRef.current);
    setScanState("idle");
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

  const handleResultBackToMap = () => {
    setScanState("idle");
    setActiveView(navigatingRouteId ? "explorar" : "mapa");
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
    goToExplore();
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
    const clean = couponQuery.trim().toLowerCase();
    return BENEFITS.filter((b) => {
      const matchesCat =
        couponCategory === "canjeados"
          ? redeemedIds.includes(b.id)
          : couponCategory === "todos"
          ? true
          : b.category === couponCategory;

      if (!matchesCat) return false;
      if (!clean) return true;
      return `${b.storeName} ${b.parkName} ${b.region} ${b.businessType} ${b.location} ${b.title}`
        .toLowerCase()
        .includes(clean);
    });
  }, [couponCategory, couponQuery, redeemedIds]);

  const redeemedCouponsList = useMemo(
    () => BENEFITS.filter((b) => redeemedIds.includes(b.id)),
    [redeemedIds]
  );

  return (
    <div
      className="min-h-dvh w-full overflow-x-clip bg-background text-foreground flex flex-col items-center"
      style={{ "--tab-direction": tabMotionRef.current.direction }}
    >
      <div className="w-full max-w-md min-h-dvh flex flex-col pb-32 px-4 pt-3">
        
        {/* CABECERA FIJA: puntos a la izquierda, logo al centro y avatar a la derecha */}
        <header
            className={`sticky top-0 z-30 -mx-4 px-4 py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 ${
              isMapView ? "" : "glass-bar"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveView("cupones")}
              aria-label={`Saldo de ${tsiro} puntos, abrir Cupones`}
              className={`min-h-[44px] justify-self-start inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums ${
                isMapView ? mapGlassClass : ""
              }`}
            >
              <PointsIcon className="w-5 h-5 text-primary" />
              <span>{tsiro.toLocaleString("en-US")} pts</span>
            </button>

            <button
              type="button"
              onClick={goToExplore}
              aria-label="Ir a Explorar"
              className={`min-h-[44px] inline-flex items-center justify-center text-primary ${
                isMapView ? mapGlassClass : ""
              }`}
            >
              <LogoMark className="h-10" decorative />
            </button>

            <ProfileBubble
              profile={profile}
              onPress={() => setActiveView("perfil")}
              className="justify-self-end"
            />
        </header>

        {/* ========================================================= */}
        {/* VISTA 1: EXPLORAR (CON FOTOGRAFÍAS REALES DE LOS PARQUES) */}
        {/* ========================================================= */}
        {activeView === "explorar" && !openedRoute && (
          <main className="tab-view flex flex-col gap-4 mt-1 flex-1">
            
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
                  Cerca de mí
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
                          +{route.totalTsiro} pts
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

                    <CardBody className="p-4 flex flex-col gap-3.5">
                      <p className="text-sm text-default-600 leading-relaxed">
                        {route.trailsSummary}
                      </p>
                      <Button
                        radius="full"
                        color="primary"
                        className="w-full min-h-[52px] text-base font-semibold"
                        onPress={() => openRouteDetail(route)}
                      >
                        Ver senderos
                      </Button>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* SUB-VISTA EXPLORAR: DETALLE DEL PARQUE ANTES DE LA RUTA    */}
        {/* ========================================================= */}
        {activeView === "explorar" && openedRoute && !isOnTrail && (
          <>
          <main className="sheet-rise flex flex-col gap-5 mt-1 flex-1 pb-16">
            <div className="relative h-56 rounded-3xl overflow-hidden bg-default-200">
              <img
                src={openedRoute.photo}
                alt={openedRoute.photoAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={goToExplore}
                aria-label="Volver a parques cerca de mí"
                className="absolute top-3 left-3 w-11 h-11 rounded-full bg-black/60 text-white border border-white/25 backdrop-blur-md inline-flex items-center justify-center"
              >
                <BackIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="px-1">
              <span className="text-xs text-default-500 block">
                {openedRoute.region} · {openedRoute.condition}
              </span>
              <h1 className="font-display text-2xl leading-tight mt-1">
                {openedRoute.name}
              </h1>
              <p className="text-sm text-default-600 leading-relaxed mt-2">
                {openedRoute.trailsSummary}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                ["Distancia", openedRoute.distance],
                ["Duración", openedRoute.duration],
                ["Dificultad", openedRoute.difficulty],
                ["Desnivel", openedRoute.elevation],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="p-3 rounded-2xl bg-content1 border border-default-200"
                >
                  <span className="text-xs text-default-500 block">{label}</span>
                  <strong className="text-sm font-semibold tabular-nums">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold px-1">Senderos</h2>
              <div className="rounded-2xl bg-content1 border border-default-200 divide-y divide-default-200">
                {[...new Set(openedRoute.aks.map((ak) => ak.trail))].map(
                  (trail) => (
                    <div
                      key={trail}
                      className="p-3.5 flex items-center justify-between gap-3"
                    >
                      <span className="text-sm font-medium">{trail}</span>
                      <span className="text-xs text-default-500 shrink-0">
                        {openedRoute.aks.filter((ak) => ak.trail === trail).length}{" "}
                        piedras Àk
                      </span>
                    </div>
                  )
                )}
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <span className="text-xs text-default-500">Superficie</span>
                  <span className="text-xs font-medium text-right">
                    {openedRoute.surface}
                  </span>
                </div>
              </div>
            </section>

            <AkStonesCarouselHub
              routeId={openedRoute.id}
              aks={openedRoute.aks}
              totalTsiro={openedRoute.totalTsiro}
              scannedAkIds={scannedAkIds}
            />

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

          </main>

            <div className="cta-rise fixed inset-x-0 bottom-[116px] z-20 px-4 pointer-events-none">
              <div className="max-w-md mx-auto pointer-events-auto">
                <Button
                  radius="full"
                  color="primary"
                  className="w-full min-h-[56px] text-base font-semibold shadow-lg"
                  onPress={() => setNavigatingRouteId(openedRoute.id)}
                >
                  Iniciar ruta
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* SUB-VISTA EXPLORAR: NAVEGACIÓN ACTIVA ESTILO WAZE          */}
        {/* ========================================================= */}
        {isOnTrail && (
          <TrailView
            route={openedRoute}
            scannedAkIds={scannedAkIds}
            selectedAkId={selectedMapAkId}
            onSelectAk={setSelectedMapAkId}
            onArrivalChange={setNearAkId}
            avatar={findFaunaAvatar(profile.avatarId)}
            onAddReport={handleAddReport}
          />
        )}

        {/* ========================================================= */}
        {/* VISTA: MAPA GENERAL DE PARQUES NACIONALES                 */}
        {/* ========================================================= */}
        {activeView === "mapa" && (
          <main className="tab-view fixed inset-0 z-0">
            <GeneralParksMap
              onOpenRoute={handleOpenRouteFromMap}
              onOpenMerchant={handleOpenMerchantFromMap}
            />
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA: TODAS LAS PIEDRAS ÀK SELLADAS                      */}
        {/* ========================================================= */}
        {activeView === "escanear" && (
          <main className="tab-view flex flex-col gap-4 mt-2 flex-1">
            <Card
              shadow="none"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-6 flex flex-col items-center text-center gap-3">
                <h1 className="font-display text-xl">
                  Sellaste todas las piedras Àk
                </h1>
                <p className="text-xs text-default-500">
                  Ya tienes los {scannedAkIds.length} hitos disponibles. Usa tus puntos en Cupones.
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
          </main>
        )}

        {/* ========================================================= */}
        {/* VISTA: CONFIGURACIÓN                                      */}
        {/* ========================================================= */}
        {activeView === "config" && (
          <main className="tab-view flex flex-col gap-4 mt-2 flex-1">
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
        {/* VISTA 3: DIRECTORIO DE COMERCIOS Y CUPONES ESTILO PARQUES */}
        {/* ========================================================= */}
        {activeView === "cupones" && (
          <main className="tab-view flex flex-col gap-4 mt-1 flex-1">
            {/* Barra de búsqueda flotante estilo cápsula (igual que Explorar) */}
            <div className="flex flex-col gap-2.5">
              <Input
                type="search"
                size="md"
                radius="full"
                variant="bordered"
                value={couponQuery}
                onValueChange={setCouponQuery}
                placeholder="Buscar comercio, parque o ubicación..."
                aria-label="Buscar comercio, parque o ubicación"
                endContent={
                  couponQuery ? (
                    <button
                      type="button"
                      onClick={() => setCouponQuery("")}
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

              {/* Barra de Categorías de Comercios */}
              <div
                role="tablist"
                aria-label="Categorías de comercios aliados"
                className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-content1 border border-default-200"
              >
                {[
                  { key: "todos", label: `Todos (${BENEFITS.length})` },
                  { key: "gastronomia", label: "Restaurantes" },
                  { key: "hospedaje", label: "Hoteles / Lodges" },
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
            </div>

            {/* Cabecera alineada al estilo de Explorar Parques */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="min-w-0">
                <h1 className="font-display text-lg tracking-tight">
                  Comercios aliados
                </h1>
                <span className="text-xs text-default-500 block">
                  {BENEFITS.length} establecimientos verificados cerca de parques
                </span>
              </div>
              <BadgePill tone="secondary">{tsiro} pts disponibles</BadgePill>
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

                  <div className="flex items-center gap-3">
                    <MerchantLogoBadge item={justRedeemedCoupon} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {justRedeemedCoupon.storeName}
                      </p>
                      <p className="text-xs text-default-500">
                        {justRedeemedCoupon.title}
                      </p>
                    </div>
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
                      Válido sin conexión · {justRedeemedCoupon.parkName}
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

            {filteredCoupons.length === 0 && (
              <Card shadow="none" className="border border-default-200 bg-content1 rounded-2xl">
                <CardBody className="py-7 px-4 text-center flex flex-col items-center gap-3">
                  <p className="text-sm font-medium">
                    {couponCategory === "canjeados"
                      ? "Aún no has reclamado ningún cupón"
                      : "No encontramos comercios con ese filtro"}
                  </p>
                  <Button
                    size="sm"
                    radius="full"
                    variant="flat"
                    className="min-h-[44px] font-medium px-4"
                    onPress={() => {
                      setCouponCategory("todos");
                      setCouponQuery("");
                    }}
                  >
                    Ver todos los comercios ({BENEFITS.length})
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Tarjetas de Comercios con estética de Parques Nacionales */}
            <div className="flex flex-col gap-4">
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
                    shadow="sm"
                    className={`border bg-content1 rounded-3xl overflow-hidden ${
                      isRedeemed ? "border-secondary" : "border-default-200"
                    }`}
                  >
                    {/* Imagen del establecimiento con gradiente, píldoras y logo */}
                    <div className="w-full h-48 relative overflow-hidden flex flex-col justify-between p-3.5 bg-default-200">
                      <img
                        src={item.photo}
                        alt={item.storeName}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(10, 22, 16, 0.54) 0%, rgba(10, 22, 16, 0.18) 45%, rgba(10, 22, 16, 0.94) 100%)",
                        }}
                      />

                      {/* Píldoras superiores estilo Parque perfectamente alineadas */}
                      <div className="relative z-10 flex items-center justify-between gap-2 w-full">
                        <span className="inline-flex items-center min-w-0 max-w-[52%] truncate leading-none font-semibold text-xs px-3 h-7 rounded-full bg-black/65 text-white border border-white/20 backdrop-blur-md select-none">
                          <span className="truncate">{item.parkName}</span>
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="inline-flex items-center justify-center text-center leading-none font-bold text-[11px] px-2.5 h-7 rounded-full bg-[#EA580C] text-white shadow-sm whitespace-nowrap select-none">
                            {item.discountBadge}
                          </span>
                          <span className="inline-flex items-center justify-center text-center leading-none font-semibold text-xs px-2.5 h-7 rounded-full bg-secondary text-secondary-foreground shadow-sm whitespace-nowrap tabular-nums select-none">
                            {item.cost} pts
                          </span>
                        </div>
                      </div>

                      {/* Logo del negocio y nombre sobre la fotografía */}
                      <div className="relative z-10 flex items-center gap-3 text-white text-left">
                        <MerchantLogoBadge item={item} />
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium text-white/85 block truncate">
                            {item.businessType} · {item.region}
                          </span>
                          <h2 className="font-display text-lg leading-snug truncate">
                            {item.storeName}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <CardBody className="p-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {item.title}
                        </p>
                        <span className="text-xs text-default-500 block">
                          {item.location}
                        </span>
                        <span className="text-xs font-medium text-secondary block">
                          {isRedeemed
                            ? "Cupón activo · Disponible sin conexión"
                            : canAfford
                            ? `${item.requirement} · Costo: ${item.cost} pts`
                            : `Tienes ${tsiro}/${item.cost} pts (faltan ${
                                item.cost - tsiro
                              } pts)`}
                        </span>
                      </div>

                      {isRedeemed && (
                        <div className="p-3 rounded-2xl bg-default-100 border border-dashed border-secondary flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-default-600">
                            Código de canje:
                          </span>
                          <strong className="font-mono text-sm font-semibold tracking-wider text-secondary">
                            {item.code}
                          </strong>
                        </div>
                      )}

                      {!isRedeemed && !canAfford && (
                        <Progress
                          aria-label={`Progreso para ${item.storeName}`}
                          value={pct}
                          color="secondary"
                          size="sm"
                          className="w-full"
                        />
                      )}

                      {isRedeemed ? (
                        <Button
                          radius="full"
                          color="secondary"
                          variant="flat"
                          className="w-full min-h-[50px] text-sm font-semibold"
                          onPress={() => setJustRedeemedCoupon(item)}
                        >
                          Mostrar cupón en pantalla
                        </Button>
                      ) : canAfford ? (
                        <Button
                          radius="full"
                          color="primary"
                          className="w-full min-h-[50px] text-sm font-semibold"
                          onPress={() => handleRedeemCoupon(item)}
                        >
                          Canjear cupón ({item.cost} pts)
                        </Button>
                      ) : (
                        <Button
                          radius="full"
                          variant="flat"
                          className="w-full min-h-[50px] text-sm font-semibold"
                          onPress={handleNfcPress}
                        >
                          Escanear Àk para sumar puntos
                        </Button>
                      )}
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
          <main className="tab-view flex flex-col gap-4 mt-2 flex-1">
            <Card
              shadow="sm"
              className="border border-default-200 bg-content1 rounded-3xl"
            >
              <CardBody className="p-4 gap-4">
                <div className="flex items-center gap-3.5">
                  <Avatar
                    name={profile.name}
                    src={profile.photo || undefined}
                    size="lg"
                    className="w-14 h-14 text-lg font-semibold bg-primary text-primary-foreground shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h1 className="text-base font-semibold truncate">
                        {profile.name}
                      </h1>
                      <BadgePill tone="secondaryFlat">{tsiro} pts</BadgePill>
                    </div>
                    <p className="text-xs text-default-500 mt-0.5">
                      Rango: Baqueano de Montaña · Nivel {level}
                    </p>
                  </div>
                </div>

                <Button
                  radius="full"
                  className="w-full min-h-[44px] text-sm font-medium bg-primary/10 text-primary"
                  onPress={() => setIsEditingProfile(true)}
                >
                  Editar perfil
                </Button>

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
                    Aún no has canjeado cupones. Ve a la pestaña Cupones para canjear tus puntos.
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

      {/* FLUJO NFC: PROXIMIDAD, LECTURA RÚNICA Y RESULTADO */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {["listening", "detected", "reading"].includes(scanState) && (
            <NfcScanOverlay
              key="nfc-scan"
              stage={scanState}
              ak={scannerAk}
              onCancel={handleCancelScan}
            />
          )}
        </AnimatePresence>
      </MotionConfig>

      <AnimatePresence>
        {scanState === "done" && (
          <ScanResultModal
            key="scan-result"
            ak={scannerAk}
            progress={scannerRouteProgress}
            balance={tsiro}
            onBackToMap={handleResultBackToMap}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditingProfile && (
          <EditProfileSheet
            key="edit-profile"
            profile={profile}
            onSave={setProfile}
            onClose={closeProfileEditor}
          />
        )}
      </AnimatePresence>

      {/* BARRA INFERIOR FIJA: 5 ACCESOS CON LA RUNA AL CENTRO */}
      <nav
        aria-label="Navegación principal"
        className="fixed bottom-3 inset-x-0 z-30 px-3 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto h-16 glass-bar border-x border-b border-black/5 dark:border-white/10 shadow-lg rounded-full px-1.5 grid grid-cols-5 items-center">
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
              onPointerDown={() => setNfcBurst((count) => count + 1)}
              aria-label="Escanear piedra Àk por NFC"
              className={`w-[72px] h-[72px] -mt-7 rounded-full bg-secondary text-secondary-foreground border-4 border-background shadow-xl inline-flex items-center justify-center nfc-button ${
                nearAkId ? "nfc-call" : ""
              }`}
            >
              <span className="rune-mark w-11 h-11" aria-hidden="true" />
              {nfcBurst > 0 && (
                <span key={nfcBurst} className="nfc-sparks" aria-hidden="true">
                  {NFC_SPARK_ANGLES.map((angle) => (
                    <i key={angle} style={{ "--spark-angle": `${angle}deg` }} />
                  ))}
                </span>
              )}
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
