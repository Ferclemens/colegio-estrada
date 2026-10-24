import { LOGO_URL } from "../data/content";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-row">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <img
            src={LOGO_URL}
            alt="Logo de U.E.G.P. N° 16 José Manuel Estrada"
            width="52"
            height="52"
          />
          <span>
            <span className="brand-title">José Manuel Estrada</span>
            <span className="brand-sub">U.E.G.P. N° 16</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#propuesta">Propuesta educativa</a>
          <a href="#niveles">Niveles</a>
          <a href="#valores">Valores</a>
        </nav>
        <a className="button button-primary header-cta" href="#consulta">
          Consultar por el ingreso 2027
        </a>
      </div>
    </header>
  );
}
