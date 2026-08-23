/* ============================================================
   WHATSAPP — logique centralisée d'envoi de commande
   ============================================================ */

/**
 * Ouvre WhatsApp avec un message prérempli.
 * @param {string} prestation - Nom de la prestation concernée.
 * @param {"defaut"|"devis"|"general"} type - Type de message à générer.
 */
function commanderWhatsApp(prestation, type = "defaut") {
  const numero = CONFIG.whatsappLien;
  let message;

  if (type === "general") {
    message = CONFIG.messages.general;
  } else if (type === "devis") {
    message = CONFIG.messages.devis(prestation);
  } else {
    message = CONFIG.messages.defaut(prestation);
  }

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

/**
 * Attache automatiquement le comportement WhatsApp à tout élément
 * possédant l'attribut data-whatsapp="Nom de la prestation".
 * Attribut optionnel data-whatsapp-type="devis" pour un message de devis.
 */
function initWhatsAppButtons() {
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const prestation = el.getAttribute("data-whatsapp");
      const type = el.getAttribute("data-whatsapp-type") || "defaut";
      commanderWhatsApp(prestation, type);
    });
  });

  const floatBtn = document.getElementById("whatsapp-float");
  if (floatBtn) {
    floatBtn.addEventListener("click", (e) => {
      e.preventDefault();
      commanderWhatsApp("", "general");
    });
  }
}

document.addEventListener("DOMContentLoaded", initWhatsAppButtons);
