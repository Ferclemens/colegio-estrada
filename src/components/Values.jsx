import { values } from '../data/content'
import './Values.css'

export default function Values() {
  return (
    <section id="valores" aria-labelledby="valores-title">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">Convivir y aprender</p>
          <h2 id="valores-title">Valores que orientan nuestra comunidad</h2>
          <p>Son principios cotidianos que guían las decisiones, los vínculos y el modo en que aprendemos juntos.</p>
        </div>
        <div className="values-grid">
          {values.map(({ icon: Icon, title, text }) => (
            <article className="value" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
