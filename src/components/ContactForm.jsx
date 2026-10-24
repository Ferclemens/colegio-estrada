import { useId } from "react";
import { Send } from "lucide-react";
import "./ContactForm.css";

export default function ContactForm({ onSubmitted }) {
  const uid = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    onSubmitted();
  };

  return (
    <section
      className="conversion"
      id="consulta"
      aria-labelledby="consulta-title"
    >
      <div className="shell form-grid">
        <div className="form-intro">
          <p className="eyebrow">Ingreso 2027</p>
          <h2 id="consulta-title">
            Comencemos a construir su <span>recorrido educativo</span>
          </h2>
          <p>
            Dejanos tus datos y el equipo institucional se pondrá en contacto
            para brindar información y coordinar una entrevista.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-grid">
            <div className="field">
              <label htmlFor={`${uid}-nombre`}>
                Nombre del adulto responsable
              </label>
              <input
                id={`${uid}-nombre`}
                name="nombre_responsable"
                type="text"
                autoComplete="name"
                required
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-email`}>Email</label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-telefono`}>Teléfono</label>
              <input
                id={`${uid}-telefono`}
                name="telefono"
                type="tel"
                autoComplete="tel"
                required
              />
            </div>
            <div className="field level">
              <label htmlFor={`${uid}-nivel`}>Nivel de interés</label>
              <select
                id={`${uid}-nivel`}
                name="nivel_interes"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                <option value="inicial">Nivel Inicial</option>
                <option value="primario">Nivel Primario</option>
                <option value="secundario">Nivel Secundario</option>
                <option value="adultos">Bachillerato Libre para Adultos</option>
              </select>
            </div>
            <div className="field message">
              <label htmlFor={`${uid}-mensaje`}>Mensaje</label>
              <textarea id={`${uid}-mensaje`} name="mensaje" required />
            </div>
          </div>
          <p className="form-note">
            Tus datos serán utilizados únicamente para responder esta consulta
            institucional.
          </p>
          <button className="button button-primary submit" type="submit">
            Enviar consulta <Send size={24} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
