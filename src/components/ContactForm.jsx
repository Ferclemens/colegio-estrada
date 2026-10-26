import { useId, useRef, useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import "./ContactForm.css";

export default function ContactForm() {
  const uid = useId();
  const formRef = useRef(null);

  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(formRef.current);
    const payload = Object.fromEntries(formData.entries());

    // En desarrollo local apunta a Node (5000), en producción en Hostinger usa la ruta relativa
    const API_URL = import.meta.env.DEV
      ? "http://localhost:5000/api/send-email"
      : "/api/send-email";

    // En ContactForm.jsx, dentro de handleSubmit:
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Esto mostrará el mensaje exacto de Resend (ej: "You can only send testing emails...")
        throw new Error(result.error || "No se pudo procesar la solicitud.");
      }

      setStatus("success");
      formRef.current.reset();
      setPrivacyAccepted(false);
    } catch (error) {
      console.error("Detalle del error:", error);
      setStatus("error");
      setErrorMessage(error.message); // Muestra el mensaje real en el cartel rojo
    }
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
            Nuestro equipo está disponible para brindar información sobre
            niveles, turnos, vacantes y proceso de inscripción.
          </p>
          <div className="contact-direct-info">
            <p>
              <strong>Información e inscripción:</strong>
            </p>
            <p>
              <a href="mailto:inscripciones.jme@gmail.com">
                inscripciones.jme@gmail.com
              </a>
            </p>
            <p>
              Nivel Inicial: <span>3624 161234</span>
            </p>
            <p>
              Nivel Primario: <span>3624 361076</span>
            </p>
            <p>
              Nivel Secundario: <span>3625 166260</span>
            </p>
          </div>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <fieldset className="contact-fields" disabled={status === "sending"}>
            <div className="field-grid">
              <div className="field">
                <label htmlFor={`${uid}-nombre`}>
                  Nombre tutor responsable
                </label>
                <input
                  id={`${uid}-nombre`}
                  name="nombre_responsable"
                  type="text"
                  autoComplete="name"
                  placeholder="Ej: Laura Gómez"
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
                  placeholder="ejemplo@correo.com"
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
                  placeholder="Ej: 3624 123456"
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
                    Seleccioná un nivel
                  </option>
                  <option value="Nivel Inicial">Nivel Inicial</option>
                  <option value="Nivel Primario">Nivel Primario</option>
                  <option value="Nivel Secundario">Nivel Secundario</option>
                  <option value="Bachillerato Libre para Adultos">
                    Bachillerato Libre para Adultos
                  </option>
                </select>
              </div>

              <div className="field message">
                <label htmlFor={`${uid}-mensaje`}>Mensaje o consulta</label>
                <textarea
                  id={`${uid}-mensaje`}
                  name="mensaje"
                  placeholder="Detalles sobre el alumno o dudas sobre el ingreso..."
                  required
                />
              </div>

              {/* Casilla de verificación de privacidad */}
              <div className="field privacy-checkbox">
                <label className="checkbox-label" htmlFor={`${uid}-privacy`}>
                  <input
                    id={`${uid}-privacy`}
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    required
                  />
                  <span>
                    Acepto los términos de privacidad y el uso de mis datos para
                    contacto pedagógico e institucional.
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          {status === "success" && (
            <div className="form-feedback success" role="alert">
              <CheckCircle size={20} />
              <span>
                ¡Consulta enviada con éxito! Nos pondremos en contacto a la
                brevedad.
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="form-feedback error" role="alert">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            className="button button-primary submit"
            type="submit"
            disabled={status === "sending" || !privacyAccepted}
          >
            {status === "sending" ? (
              <>
                Enviando consulta... <Loader2 size={20} className="spin" />
              </>
            ) : (
              <>
                Enviar consulta <Send size={20} aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
