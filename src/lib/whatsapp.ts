export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/DSmz7cgTL5hBygip6hQc65?mode=gi_t'

export const WHATSAPP_DIRECT_CONTACT_URL = 'https://wa.link/51vyxi'

export function openWhatsappGroup() {
    window.open(WHATSAPP_GROUP_URL, '_blank', 'noopener,noreferrer')
}

export function openWhatsappDirectContact() {
    window.open(WHATSAPP_DIRECT_CONTACT_URL, '_blank', 'noopener,noreferrer')
}