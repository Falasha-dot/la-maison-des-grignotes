/* ============================================================
   CONFIGURATION CENTRALE — LA MAISON DES GRIGNOTE
   Toutes les informations de l'entreprise sont centralisées ici.
   Modifiez ce fichier pour mettre à jour le site sans toucher
   au reste du code.
   ============================================================ */

const CONFIG = {
  nomEntreprise: "La Maison des Grignote",
  responsable: "Diby Bosson Agnès Jean Joanna",
  activite: "Entrepreneuse en pâtisserie",
  slogan: "Des douceurs faites avec amour !",

  // Téléphone affiché (format local)
  telephone: "01 60 22 24 777",
  telephoneLien: "0160224777",

  // WhatsApp : le numéro utilisé pour les liens doit être au format international, sans "+" ni espaces
  whatsapp: "0555614642",
  whatsappLien: "2250555614642",

  email: "joanna@gmail.com",
  ville: "Bouaké",
  quartier: "Broukro",
  anneeDebut: "2026",

  // Réseaux sociaux — à compléter/modifier facilement
  reseaux: {
    facebook: "", // ex: "https://facebook.com/joanna.diby" — à préciser par la cliente
    facebookNom: "Joanna Diby",
    instagram: "", // à ajouter dès que disponible
  },

  // Messages WhatsApp préremplis par défaut
  messages: {
    general: "Bonjour La Maison des Grignote, je souhaite avoir des informations sur vos prestations.",
    defaut: (prestation) =>
      `Bonjour La Maison des Grignote, je suis intéressé(e) par : ${prestation}. Je souhaiterais avoir plus d'informations concernant les tarifs et les disponibilités.`,
    devis: (prestation) =>
      `Bonjour La Maison des Grignote, je souhaite demander un devis pour : ${prestation}. Pouvez-vous m'indiquer les modalités ?`,
  },
};

// Empêche toute modification accidentelle depuis un autre script
Object.freeze(CONFIG.messages);
