export const brand = {
  name: "Smartcore Académique",
  slogan: "Apprendre, entreprendre et évoluer.",
  courseName: "Smartcore Académique",
  supportHours: "Assistance : lundi au samedi, 9 h - 17 h",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@smartcoreacademique.com",
  whatsappUrl: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_URL ?? "#",
  whatsappGroupUrl: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ?? "#",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#",
};

export const statuses = [
  "En attente",
  "Confirmée",
  "Contactée",
  "Ajoutée au groupe",
  "Refusée",
  "Annulée",
] as const;

export const platforms = [
  "Amazon",
  "eBay",
  "TikTok Shop",
  "SHEIN",
  "Temu",
  "Alibaba",
  "AliExpress",
  "Autre",
] as const;

export const modules = [
  "Création d’entreprise",
  "Recherche de fournisseurs",
  "Choix des produits et comparaison des prix",
  "Adresse postale",
  "Carte de débit et PayPal",
  "Rechargement des comptes",
  "Achats sur les grandes plateformes",
  "Protection des achats",
  "Exercice pratique final",
];

export const faqItems = [
  {
    question: "La formation est-elle réellement gratuite ?",
    answer:
      "Oui. La participation à la formation Smartcore Académique est gratuite. Le montant demandé ne concerne pas la formation.",
  },
  {
    question: "À quoi servent les 1 400 HTG ?",
    answer:
      "Ils servent uniquement à l’acquisition de votre adresse postale personnelle utilisée pour la création de la carte et certaines activités pratiques. Ce ne sont pas des frais d’inscription.",
  },
  {
    question: "Où se déroule la formation ?",
    answer:
      "Les sessions se déroulent en ligne, principalement sur Google Meet, avec un accompagnement via WhatsApp.",
  },
  {
    question: "Ai-je besoin d’un ordinateur ?",
    answer:
      "Un ordinateur facilite certains exercices, mais il n’est pas obligatoire pour suivre les explications principales.",
  },
  {
    question: "Puis-je participer avec un téléphone ?",
    answer:
      "Oui. Vous pouvez participer avec un téléphone connecté à Internet et capable d’utiliser Google Meet et WhatsApp.",
  },
  {
    question: "Vais-je recevoir une attestation ?",
    answer:
      "Une attestation peut être prévue selon les conditions communiquées pendant la formation et la participation effective aux séances.",
  },
  {
    question: "Comment vais-je recevoir le lien Google Meet ?",
    answer:
      "Après validation, les informations importantes, le calendrier et les liens de séance seront envoyés par e-mail et/ou WhatsApp.",
  },
  {
    question: "Que se passe-t-il après mon inscription ?",
    answer:
      "Vous recevez un numéro d’inscription, puis l’équipe peut vous contacter avec les consignes, le lien du groupe WhatsApp et le calendrier.",
  },
  {
    question:
      "Est-ce que la formation garantit la création d’un compte PayPal ou d’une carte ?",
    answer:
      "Non. La formation explique les démarches, mais la création d’un compte ou d’une carte dépend toujours des conditions d’éligibilité et de vérification des prestataires concernés.",
  },
  {
    question: "Mes informations personnelles sont-elles protégées ?",
    answer:
      "Les informations sont utilisées pour gérer l’inscription et le suivi de la formation. Elles ne doivent être accessibles qu’à l’équipe autorisée.",
  },
];
