import {
  HeartHandshake,
  BadgeCheck,
  Target,
  Scale,
  HandHeart,
  Compass,
  Heart,
} from "lucide-react";
import initialLevelImage from "../assets/aula_nivel_inicial.webp";
import primaryLevelImage from "../assets/aula _nivel_primario.webp";
import secondaryLevelImage from "../assets/aula_nivel_secundario.webp";

export const LOGO_URL =
  "https://cdn.lugc.link/f3d89e23-6256-487d-9770-6d55c1e918f5/";
export const HERO_URL =
  "https://cdn.lugc.link/d8fd7d37-25b2-4bf0-9737-63420411cfe7/";

export const levels = [
  {
    title: "Nivel Inicial",
    image: initialLevelImage,
    alt: "Aula de Nivel Inicial",
    text: "Primeros aprendizajes en un entorno de juego, descubrimiento y vínculos de confianza.",
  },
  {
    title: "Nivel Primario",
    image: primaryLevelImage,
    alt: "Aula de Nivel Primario",
    text: "Una base de saberes, convivencia y curiosidad para aprender con autonomía y responsabilidad.",
  },
  {
    title: "Nivel Secundario",
    image: secondaryLevelImage,
    alt: "Aula de Nivel Secundario",
    text: "Formación para pensar críticamente, construir proyectos y participar de manera comprometida.",
  },
];

export const values = [
  {
    icon: HeartHandshake,
    title: "Respeto",
    text: "Reconocer a cada persona y cuidar la diversidad.",
  },
  {
    icon: BadgeCheck,
    title: "Honestidad",
    text: "Actuar con verdad y coherencia en cada acción.",
  },
  {
    icon: Target,
    title: "Compromiso",
    text: "Asumir con responsabilidad el propio recorrido.",
  },
  {
    icon: Scale,
    title: "Justicia",
    text: "Buscar vínculos y oportunidades más equitativas.",
  },
  {
    icon: HandHeart,
    title: "Solidaridad",
    text: "Estar disponibles para construir con otros.",
  },
  {
    icon: Compass,
    title: "Ética",
    text: "Elegir con conciencia y responsabilidad.",
  },
  {
    icon: Heart,
    title: "Paz",
    text: "Resolver diferencias desde el diálogo y el cuidado.",
  },
];
