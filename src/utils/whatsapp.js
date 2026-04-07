/**
 * WhatsApp Integration Utility
 * Generates WhatsApp web links with pre-filled messages
 */

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285814810017";

/**
 * Opens WhatsApp chat with pre-filled message for a specific product
 * @param {Object} product - Product object
 */
export const openWhatsApp = (product) => {
  if (typeof window === "undefined") return;
  const message = generateProductInquiryMessage(product);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * Opens WhatsApp chat with general inquiry message
 */
export const openWhatsAppGeneral = () => {
  if (typeof window === "undefined") return;
  const message = generateGeneralInquiryMessage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * Generates pre-filled message for specific product inquiry
 * @param {Object} product - Product object
 * @returns {string} Formatted message
 */
const generateProductInquiryMessage = (product) => {
  const availabilityText = product.availability === "rent" ? "sewa" : "beli";

  return `Halo DuRent Support! 👋

Saya tertarik untuk ${availabilityText}:

📦 *${product.name}*
📁 Kategori: ${product.category}
${product.availability === "rent" ? "🔄 Status: Rental" : "💳 Status: Purchase"}

Apakah item ini tersedia? Mohon informasi lebih lanjut mengenai:
- Ketersediaan
- Harga ${availabilityText}
- Syarat dan ketentuan

Terima kasih! 🙏`;
};

/**
 * Generates general inquiry message
 * @returns {string} Formatted message
 */
const generateGeneralInquiryMessage = () => {
  return `Halo DuRent Support! 👋

Saya ingin menanyakan informasi mengenai layanan production support rental Anda.

Mohon informasi lebih lanjut.

Terima kasih! 🙏`;
};

export default {
  openWhatsApp,
  openWhatsAppGeneral,
};
