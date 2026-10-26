import { ArrowRight } from "lucide-react";
import { HERO_URL } from "../data/content";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Ingreso 2027 · U.E.G.P. N° 16</p>
          <h1 id="hero-title">
            Una educación integral <br />
            <span>para cada etapa de la vida</span>
          </h1>
          <p className="hero-text">
            En José Manuel Estrada acompañamos cada recorrido con compromiso
            pedagógico, excelencia académica y la contención humana que las
            familias necesitan.
          </p>
        </div>

        <div className="hero-visual">
          <div className="blob-backdrop" aria-hidden="true"></div>
          <div className="blob-wrapper">
            <img
              src={HERO_URL}
              alt="Estudiantes de la institución compartiendo una lectura"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
