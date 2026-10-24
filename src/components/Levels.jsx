import { levels } from "../data/content";
import "./Levels.css";

export default function Levels() {
  return (
    <section className="levels" id="niveles" aria-labelledby="niveles-title">
      <div className="shell">
        <div className="section-heading">
          <p>Elegí el recorrido</p>
          <h2 id="niveles-title">Un espacio para cada etapa</h2>
          <p>
            Conocé las propuestas que acompañan el desarrollo de niñas, niños,
            jóvenes y personas adultas.
          </p>
        </div>
        <div className="levels-grid">
          {levels.map((level) => (
            <article className="level-card" key={level.title}>
              <img
                className="level-image"
                src={level.image}
                alt={level.alt}
                loading="lazy"
              />
              <div className="level-body">
                <h3>{level.title}</h3>
                <p>{level.text}</p>
              </div>
            </article>
          ))}
          <article className="level-card adult-card">
            <div className="level-body">
              <h3>Bachillerato Libre para Adultos</h3>
              <p>
                Para personas desde los 17 años que acrediten actividad laboral.
              </p>
              <p>
                Duración de 2 años o menos, según espacios curriculares previos
                aprobados.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
