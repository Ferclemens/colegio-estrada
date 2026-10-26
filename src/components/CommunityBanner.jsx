import { CheckCircle2 } from "lucide-react";
import circuloEscolarImg from "../assets/circulo_escolar.webp"; // Ajusta según la ruta de tu proyecto
import "./CommunityBanner.css";

export default function CommunityBanner() {
  return (
    <section className="community-banner" aria-labelledby="community-title">
      <div className="shell community-grid">
        {/* Columna Izquierda: Formato Orgánico Dinámico */}
        <div className="community-visual">
          <div className="community-blob-backdrop" aria-hidden="true"></div>
          <div className="community-blob-wrapper">
            <img
              src={circuloEscolarImg}
              alt="Estudiantes sentados en ronda durante una actividad integradora"
              loading="lazy"
            />
          </div>
        </div>

        {/* Columna Derecha: Contenido y Frase */}
        <div className="community-copy">
          <p className="community-eyebrow">Trayectoria y Acompañamiento</p>
          <h2 id="community-title">
            Construimos experiencias educativas{" "}
            <span>
              desde la primera infancia hasta la educación de adultos.
            </span>
          </h2>
          <p className="community-description">
            Fomentamos espacios de encuentro, escucha y trabajo colaborativo.
            Cada nivel articula valores, saberes y metodologías pensadas para
            potenciar la autonomía de nuestros estudiantes en un entorno seguro
            y estimulante.
          </p>

          <ul className="community-highlights">
            <li>
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>Continuidad pedagógica en todos los niveles</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>Formación en valores y convivencia democrática</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>
                Acompañamiento personalizado y gabinete psicopedagógico
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
