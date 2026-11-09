<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Método no permitido.']);
    exit;
}

$configPath = dirname(__DIR__, 2) . '/private/resend-config.php';
if (!is_file($configPath)) {
    error_log('No se encontró la configuración privada de Resend.');
    http_response_code(500);
    echo json_encode(['error' => 'El servicio de consultas no está configurado.']);
    exit;
}

$config = require $configPath;
if (
    !is_array($config) ||
    empty($config['api_key']) ||
    empty($config['to']) ||
    empty($config['from'])
) {
    error_log('La configuración privada de Resend está incompleta.');
    http_response_code(500);
    echo json_encode(['error' => 'El servicio de consultas no está configurado.']);
    exit;
}

if (!function_exists('curl_init')) {
    error_log('La extensión PHP cURL no está habilitada.');
    http_response_code(500);
    echo json_encode(['error' => 'El servicio de consultas no está disponible.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'La solicitud no tiene un formato válido.']);
    exit;
}

$fields = ['nombre_responsable', 'email', 'telefono', 'nivel_interes', 'mensaje'];
$values = [];
foreach ($fields as $field) {
    if (!isset($input[$field]) || !is_string($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => 'Todos los campos son obligatorios.']);
        exit;
    }

    $values[$field] = trim($input[$field]);
    if ($values[$field] === '' || strlen($values[$field]) > 5000) {
        http_response_code(400);
        echo json_encode(['error' => 'Revisa los campos e intenta nuevamente.']);
        exit;
    }
}

if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ingresá un correo electrónico válido.']);
    exit;
}

$escape = static fn(string $value): string => htmlspecialchars(
    $value,
    ENT_QUOTES | ENT_SUBSTITUTE,
    'UTF-8'
);

$nombre = $escape($values['nombre_responsable']);
$email = $escape($values['email']);
$telefono = $escape($values['telefono']);
$nivel = $escape($values['nivel_interes']);
$mensaje = nl2br($escape($values['mensaje']));
$fechaHora = (new DateTime('now', new DateTimeZone('America/Argentina/Buenos_Aires')))
    ->format('d/m/Y H:i');

$html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Nueva consulta de ingreso</title></head>
<body style="margin:0;padding:24px 12px;background:#fff5ec;font-family:Arial,sans-serif;color:#2c3a5a">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#fff;border-top:6px solid #fc569b;border-radius:12px">
    <tr><td style="background:#2c3a5a;padding:28px;text-align:center;color:#fff">
      <h1 style="margin:0;font-size:22px">José Manuel Estrada</h1>
      <p style="margin:8px 0 0">Nueva consulta desde el sitio web · Ingreso 2027</p>
    </td></tr>
    <tr><td style="padding:28px">
      <p><strong>Adulto responsable:</strong> {$nombre}</p>
      <p><strong>Nivel solicitado:</strong> {$nivel}</p>
      <p><strong>Correo:</strong> <a href="mailto:{$email}">{$email}</a></p>
      <p><strong>Teléfono:</strong> <a href="tel:{$telefono}">{$telefono}</a></p>
      <p><strong>Consulta o mensaje:</strong></p>
      <div style="background:#fff5ec;border-left:4px solid #fc569b;padding:16px;line-height:1.6">{$mensaje}</div>
    </td></tr>
    <tr><td style="padding:18px;text-align:center;color:#888;font-size:12px">
      Recibido el {$fechaHora} hs. · U.E.G.P. N° 16 José Manuel Estrada
    </td></tr>
  </table>
</body>
</html>
HTML;

$subjectName = str_replace(["\r", "\n"], ' ', $values['nombre_responsable']);
$subjectLevel = str_replace(["\r", "\n"], ' ', $values['nivel_interes']);
$message = [
    'from' => $config['from'],
    'to' => [$config['to']],
    'reply_to' => $values['email'],
    'subject' => "[Ingreso 2027] {$subjectLevel} - {$subjectName}",
    'html' => $html,
];

$curl = curl_init('https://api.resend.com/emails');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $config['api_key'],
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($message),
    CURLOPT_TIMEOUT => 20,
]);

$responseBody = curl_exec($curl);
$curlError = curl_error($curl);
$statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($responseBody === false || $statusCode < 200 || $statusCode >= 300) {
    error_log(
        'Resend request failed; HTTP status ' . $statusCode .
        ($curlError !== '' ? '; cURL error: ' . $curlError : '')
    );
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo enviar la consulta. Intenta nuevamente más tarde.']);
    exit;
}

$response = json_decode($responseBody, true);
http_response_code(200);
echo json_encode(['success' => true, 'id' => $response['id'] ?? null]);
