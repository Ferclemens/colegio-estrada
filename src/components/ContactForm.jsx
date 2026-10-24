import { useId } from "react";
import { Send } from "lucide-react";
import "./ContactForm.css";

export default function ContactForm() {
  const uid = useId();

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
            La recepción de consultas en línea estará disponible próximamente.
          </p>
        </div>
        <form className="contact-form">
          <fieldset
            className="contact-fields"
            disabled
            aria-describedby={`${uid}-unavailable`}
          >
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
                  <option value="adultos">
                    Bachillerato Libre para Adultos
                  </option>
                </select>
              </div>
              <div className="field message">
                <label htmlFor={`${uid}-mensaje`}>Mensaje</label>
                <textarea id={`${uid}-mensaje`} name="mensaje" required />
              </div>
            </div>
          </fieldset>
          <p className="form-note" id={`${uid}-unavailable`} role="status">
            El formulario todavía no está configurado. No se enviarán datos.
          </p>
          <button
            className="button button-primary submit"
            type="submit"
            disabled
          >
            Enviar consulta <Send size={24} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
