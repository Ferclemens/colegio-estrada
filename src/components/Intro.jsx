import './Intro.css'

export default function Intro() {
  return (
    <section id="propuesta" aria-labelledby="propuesta-title">
      <div className="shell intro-grid">
        <div>
          <p className="eyebrow">Nuestra propuesta</p>
          <h2 id="propuesta-title">Acompañar para aprender, crecer y participar</h2>
          <p className="intro-lead">
            Desde la primera infancia hasta la formación secundaria y la educación de adultos,
            construimos experiencias educativas que reconocen a cada estudiante y su momento.
          </p>
        </div>
        <div className="mission-cards">
          <article className="mission-card">
            <h3>Misión</h3>
            <p>
              Formar estudiantes honestos, críticos y reflexivos, capaces de aprender con otros y
              aportar a una comunidad inclusiva.
            </p>
          </article>
          <article className="mission-card">
            <h3>Visión</h3>
            <p>
              Educar con respeto y cuidado para formar personas pacíficas, comprometidas con el
              ambiente y con una sociedad más justa.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
