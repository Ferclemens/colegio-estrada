# Guía de Despliegue en Producción (Hostinger)

### Proyecto: Landing Page Institucional · U.E.G.P. N° 16 "José Manuel Estrada"

Este documento detalla los pasos para desplegar tanto la aplicación cliente (**React / Vite**) como el servicio seguro de despacho de correos (**Node.js / Express / Resend**) en un entorno de hosting compartido o Cloud de **Hostinger**.

---

## 1. Verificación y Configuración de Resend para Dominio Institucional

En modo prueba, Resend solo despacha hacia tu dirección personal (`foclemens@gmail.com`). Para enviar los correos a la casilla institucional (`inscripciones.jme@gmail.com`) desde una dirección propia, se debe validar el dominio del colegio.

1. Ingresa a tu panel en [resend.com](https://resend.com) y dirígete a **Domains** > **Add Domain**.
2. Ingresa el dominio del colegio (por ejemplo: `colegioestrada.edu.ar`).
3. Resend generará registros DNS (DKIM, SPF y MX).
4. Ve al panel de control de Hostinger (**hPanel**):
   - Dirígete a **Dominios** > Selecciona tu dominio > **DNS / Servidores de Nombres**.
   - Copia y añade los registros provistos por Resend (tipo TXT y CNAME/MX).
5. Vuelve a Resend y haz clic en **Verify DNS Records** hasta que figure en estado **Verified**.
6. En **API Keys**, genera una clave de producción (`re_...`) con permisos de envío.

---

## 2. Ajustes Finales en el Código Local

### A. Modificar el destinatario y remitente en `backend/server.js`

Cambia el remitente de prueba y el correo de destino:

```javascript
// backend/server.js
const { data, error } = await resend.emails.send({
  from: "Inscripciones Estrada <consultas@colegioestrada.edu.ar>", // Dominio verificado en Resend
  to: ["inscripciones.jme@gmail.com"], // Correo oficial del colegio
  replyTo: email, // Permite responder directo a la familia desde el cliente de correo
  subject: `[Ingreso 2027] ${nivel_interes} - ${nombre_responsable}`,
  html: emailHtml,
});
```
