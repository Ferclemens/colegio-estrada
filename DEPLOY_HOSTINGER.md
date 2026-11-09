# Activar el formulario de consultas en Hostinger

El sitio publicado en `colegiojmestrada.com` es una aplicación estática. El formulario envía la consulta a un endpoint PHP en el mismo hosting, y ese endpoint llama a Resend. **La API key debe quedar fuera de `public_html` y nunca debe ponerse en React ni en `dist`.**

## 1. Preparar Resend para pruebas

1. En [Resend](https://resend.com), crea una API key con permiso de envío. No la compartas por chat ni la guardes en el repositorio.
2. Para las pruebas se usa `Web Colegio <onboarding@resend.dev>` y el destinatario `foclemens@gmail.com`. El remitente de prueba de Resend solo permite enviar a una dirección autorizada por la cuenta de Resend.

## 2. Cargar el endpoint PHP y la clave privada

En hPanel > **Sitios web > Administrar > Administrador de archivos**:

1. Dentro de `public_html`, crea la carpeta `api`.
2. Sube [send-email.php](./backend/send-email.php) a `public_html/api/send-email.php`.
3. En la carpeta del dominio, al mismo nivel que `public_html`, crea `private`. La estructura debe quedar así:

   ```text
   domains/colegiojmestrada.com/
   ├── private/
   │   └── resend-config.php
   └── public_html/
       └── api/
           └── send-email.php
   ```

4. Crea `private/resend-config.php` usando como plantilla [resend-config.example.php](./backend/resend-config.example.php) y reemplaza el valor de `api_key` con tu clave real. Deja los valores de prueba:

   ```php
   return [
       'api_key' => 'TU_API_KEY_REAL',
       'to' => 'foclemens@gmail.com',
       'from' => 'Web Colegio <onboarding@resend.dev>',
   ];
   ```

   No subas la plantilla de ejemplo con la clave real al repositorio ni dentro de `public_html`. Si hPanel permite permisos de archivo, restringe `resend-config.php` al propietario de la cuenta.

5. Comprueba en hPanel que el dominio usa una versión PHP vigente y que la extensión **cURL** está habilitada. El endpoint necesita PHP cURL para comunicarse con Resend.

## 3. Publicar la web con la ruta del endpoint

El formulario de producción ahora llama a `https://colegiojmestrada.com/api/send-email.php`. Desde la carpeta del proyecto, vuelve a generar la versión estática:

```powershell
npm run build
```

Sube nuevamente **el contenido de `dist`** a `public_html`, sobrescribiendo los archivos anteriores. No subas `node_modules`.

## 4. Probar el formulario

1. Abre `https://colegiojmestrada.com` y envía una consulta de prueba con datos no sensibles.
2. Confirma la recepción en `foclemens@gmail.com`.
3. Si falla, revisa los logs de PHP en hPanel. Los errores más comunes son una ruta incorrecta del archivo privado, una API key inválida, cURL deshabilitado o que Resend no autorice el destinatario de prueba.

## 5. Cambiar al correo de la escuela

Cuando terminen las pruebas:

1. En Resend, agrega `colegiojmestrada.com` como dominio de envío y sigue las instrucciones DNS que aparecen en tu cuenta.
2. En Hostinger, agrega los registros de verificación de envío requeridos. **No reemplaces ni elimines los MX existentes del correo escolar**, ya que podrían ser necesarios para recibir correo en ese dominio. Agrega un MX solo si Resend lo exige expresamente y confirmaste que no interfiere con el servicio de correo actual.
3. Espera a que Resend marque el dominio como verificado.
4. Edita `private/resend-config.php`:

   ```php
   'to' => 'inscripciones.jme@gmail.com',
   'from' => 'Inscripciones Estrada <consultas@colegiojmestrada.com>',
   ```

   El remitente debe pertenecer al dominio verificado en Resend. Guarda el archivo y realiza una prueba final; no es necesario recompilar la web para cambiar el destinatario.
