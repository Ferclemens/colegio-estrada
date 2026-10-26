import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  try {
    const { nombre_responsable, email, telefono, nivel_interes, mensaje } =
      req.body;

    if (
      !nombre_responsable ||
      !email ||
      !telefono ||
      !nivel_interes ||
      !mensaje
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    // Fecha y hora formateada para Argentina
    const fechaHora = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Plantilla HTML con estilos en línea (100% compatible con Gmail y móviles)
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Nueva Consulta de Ingreso</title>
      </head>
      <body style="margin: 0; padding: 24px 12px; background-color: #fff5ec; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2c3a5a;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(44, 58, 90, 0.12); border-top: 6px solid #fc569b;">
          
          <!-- Encabezado Institucional -->
          <tr>
            <td style="background-color: #2c3a5a; padding: 32px 24px; text-align: center;">
              <span style="display: inline-block; padding: 5px 14px; background-color: rgba(255,255,255,0.15); color: #f4a99c; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 20px; margin-bottom: 8px;">
                Ingreso 2027 · U.E.G.P. N° 16
              </span>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
                José Manuel Estrada
              </h1>
              <p style="margin: 6px 0 0; color: #fff5ec; font-size: 13px; opacity: 0.9;">
                Nueva solicitud de información desde el sitio web
              </p>
            </td>
          </tr>

          <!-- Contenido: Ficha del Interesado -->
          <tr>
            <td style="padding: 32px 28px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
                      Adulto responsable
                    </span>
                    <span style="font-size: 17px; font-weight: 600; color: #2c3a5a;">
                      ${nombre_responsable}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
                      Nivel solicitado
                    </span>
                    <span style="display: inline-block; background-color: #fff5ec; border: 1.5px solid #f4a99c; color: #fc569b; font-weight: 700; font-size: 13px; padding: 5px 14px; border-radius: 999px;">
                      ${nivel_interes}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%" style="vertical-align: top;">
                          <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
                            Correo Electrónico
                          </span>
                          <a href="mailto:${email}" style="color: #326eee; font-weight: 600; font-size: 15px; text-decoration: none;">
                            ${email}
                          </a>
                        </td>
                        <td width="50%" style="vertical-align: top;">
                          <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
                            Teléfono
                          </span>
                          <a href="tel:${telefono}" style="color: #2c3a5a; font-weight: 600; font-size: 15px; text-decoration: none;">
                            ${telefono}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 6px;">
                    <span style="font-size: 11px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
                      Consulta o mensaje
                    </span>
                    <div style="background-color: #fff5ec; border-left: 4px solid #fc569b; padding: 16px 18px; border-radius: 6px; font-size: 15px; line-height: 1.6; color: #2c3a5a; white-space: pre-line;">
                      ${mensaje}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Pie del Correo -->
          <tr>
            <td style="background-color: #fcfbf9; border-top: 1px solid #f0eae4; padding: 18px 24px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #888888;">
                Recibido el ${fechaHora} hs.
              </p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #aaaaaa;">
                U.E.G.P. N° 16 José Manuel Estrada · Formulario Web
              </p>
            </td>
          </tr>

        </table>
      </body>
      </html>
    `;

    // Envío vía Resend vinculando la plantilla correcta
    const { data, error } = await resend.emails.send({
      from: "Web Colegio <onboarding@resend.dev>",
      to: ["foclemens@gmail.com"],
      replyTo: email,
      subject: `[Ingreso 2027] ${nivel_interes} - ${nombre_responsable}`,
      html: emailHtml, // <-- Ahora sí toma la variable con todo el template
    });

    if (error) {
      console.error("❌ Error devuelto por Resend:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("✅ Correo enviado con éxito por Resend. ID:", data.id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("❌ Excepción en el servidor:", err);
    return res
      .status(500)
      .json({ error: err.message || "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend del colegio corriendo en http://localhost:${PORT}`);
});
