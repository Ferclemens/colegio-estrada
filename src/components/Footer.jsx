import { LOGO_URL } from "../data/content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="shell footer-row">
        <div className="footer-brand">
          <img
            src={LOGO_URL}
            alt="Logo de U.E.G.P. N° 16 José Manuel Estrada"
            width="50"
            height="50"
          />
          <div>
            <strong>U.E.G.P. N° 16 “José Manuel Estrada”</strong>
            <span>Ingreso 2027</span>
          </div>
        </div>
        <p className="footer-note">
          {" "}
          Construimos experiencias educativas desde la primera infancia hasta la
          educación de adultos.
        </p>
      </div>
    </footer>
  );
}
