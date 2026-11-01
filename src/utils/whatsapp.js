export function createWhatsAppLink(message, phone) {
  const params = new URLSearchParams({
    phone: phone,
    text: message,
  });

  return `https://api.whatsapp.com/send?${params.toString()}`;
}