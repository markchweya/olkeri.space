export type LegalBlock = {
  heading?: string
  body?: string[]
  bullets?: string[]
}

export type LegalPageContent = {
  slug: string
  title: string
  effectiveDate: string
  intro?: string[]
  blocks: LegalBlock[]
}

const contactBlock: LegalBlock = {
  heading: 'Contact',
  body: ['Olkeri Space', 'Website: olkeri.space'],
  bullets: ['Email: chweyahub@gmail.com'],
}

export const legalPages: Record<string, LegalPageContent> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    effectiveDate: 'June 24, 2026',
    intro: [
      'Welcome to Olkeri Space ("we," "our," or "us"), accessible at olkeri.space.',
      'Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website and interact with our services.',
      'By using our website, you agree to the practices described in this Privacy Policy.',
    ],
    blocks: [
      { heading: 'Information We Collect', body: ['We may collect information that you voluntarily provide, including:'], bullets: ['Name', 'Email address', 'Contact details', 'Newsletter subscriptions', 'Information submitted through contact forms'] },
      { heading: 'Automatically Collected Information', body: ['We may automatically collect:'], bullets: ['IP address', 'Browser type', 'Device information', 'Operating system', 'Pages viewed', 'Referral sources', 'Session duration', 'General geographic location'] },
      { heading: 'How We Use Information', body: ['We may use collected information to:'], bullets: ['Deliver newsletters', 'Respond to inquiries', 'Improve website functionality', 'Analyze website traffic', 'Personalize content', 'Detect abuse or fraud', 'Comply with legal obligations'] },
      { heading: 'Newsletter Subscriptions', body: ['When you subscribe to our newsletter, we may send AI news updates, industry insights, product announcements, new blog articles, and company updates.', 'You may unsubscribe at any time using the unsubscribe link provided in our emails.'] },
      { heading: 'Cookies and Tracking Technologies', body: ['We use cookies and similar technologies to improve website performance, remember user preferences, analyze traffic, and deliver advertising.', 'Users can control cookies through browser settings.'] },
      { heading: 'Google AdSense', body: ['We may display advertisements through Google AdSense and other advertising networks.', 'Third-party vendors, including Google, may use cookies to serve ads based on a user\'s prior visits to this website and other websites.', 'Google\'s use of advertising cookies enables it and its partners to serve personalized advertisements. Users may manage advertising preferences through Google\'s Ad Settings.'] },
      { heading: 'Analytics', body: ['We may use analytics services such as Google Analytics to understand website usage and improve our services.'] },
      { heading: 'Third-Party Links', body: ['Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.'] },
      { heading: 'Embedded Content', body: ['Articles may include videos, images, social media posts, and interactive widgets.', 'Embedded content may collect information according to the policies of the third-party provider.'] },
      { heading: 'Data Security', body: ['We implement reasonable safeguards to protect information. However, no method of transmission over the internet can be guaranteed to be completely secure.'] },
      { heading: 'Children\'s Privacy', body: ['Our website is not directed at children under 13 years of age.', 'We do not knowingly collect personal information from children under 13.'] },
      { heading: 'AI Content Disclaimer', body: ['Olkeri Space publishes news, reviews, analysis, and educational content relating to artificial intelligence.', 'Information may become outdated and should not be relied upon as professional advice.'] },
      { heading: 'Changes to This Policy', body: ['We may update this Privacy Policy periodically. Updates will be published on this page.'] },
      contactBlock,
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    effectiveDate: 'June 24, 2026',
    intro: ['By accessing and using olkeri.space, you agree to these Terms and Conditions.'],
    blocks: [
      { heading: 'Website Use', body: ['You agree to use the website lawfully and responsibly.', 'You may not:'], bullets: ['Violate laws', 'Distribute malware', 'Attempt unauthorized access', 'Scrape content without permission', 'Disrupt website operations'] },
      { heading: 'Intellectual Property', body: ['Unless otherwise stated, all content published on Olkeri Space belongs to Olkeri Space and is protected by intellectual property laws.', 'You may read content and share article links. You may not republish articles without permission, reproduce substantial portions of content, or sell or redistribute our content.'] },
      { heading: 'Third-Party References', body: ['We may discuss or review third-party companies, products, and services. All trademarks remain the property of their respective owners.'] },
      { heading: 'User Contributions', body: ['Comments and submissions may be removed if unlawful, abusive, misleading, or harmful.'] },
      { heading: 'Newsletter Services', body: ['Users who subscribe may receive updates regarding artificial intelligence, technology, product launches, and website announcements.'] },
      { heading: 'Limitation of Liability', body: ['Olkeri Space shall not be liable for damages arising from use of the website, reliance on content, errors or omissions, or service interruptions.'] },
      { heading: 'External Websites', body: ['We are not responsible for third-party websites linked from our platform.'] },
      { heading: 'Changes', body: ['These terms may be updated periodically.'] },
      contactBlock,
    ],
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    effectiveDate: 'June 24, 2026',
    blocks: [
      { heading: 'What Are Cookies?', body: ['Cookies are small files stored on your device to improve website functionality and user experience.'] },
      { heading: 'Cookies We Use', body: ['Essential cookies support security, session management, and website functionality.', 'Analytics cookies measure page views, traffic sources, and user engagement.', 'Advertising cookies may be used by Google AdSense and advertising partners to personalize advertisements and measure performance.', 'Functional cookies remember preferences and settings.'] },
      { heading: 'Managing Cookies', body: ['You can block or delete cookies through your browser settings. Disabling cookies may affect certain website features.'] },
      { heading: 'Third-Party Cookies', body: ['Third-party services may place cookies on your device, including Google, YouTube, social media platforms, and analytics providers.'] },
      contactBlock,
    ],
  },
  disclaimer: {
    slug: 'Disclaimer',
    title: 'Disclaimer',
    effectiveDate: 'June 24, 2026',
    intro: ['The information provided on olkeri.space is for informational and educational purposes only.'],
    blocks: [
      { heading: 'News Coverage', body: ['We publish news, reviews, analysis, and commentary regarding artificial intelligence and technology.', 'Information may become outdated after publication.'] },
      { heading: 'No Professional Advice', body: ['Nothing on this website constitutes legal advice, financial advice, investment advice, tax advice, or business advice.', 'Consult qualified professionals where appropriate.'] },
      { heading: 'Reviews and Opinions', body: ['Opinions belong to the authors and contributors. Experiences with products and services may vary.'] },
      { heading: 'Affiliate Disclosure', body: ['We may earn commissions through affiliate programs or advertising. Compensation does not influence editorial decisions.'] },
      { heading: 'External Links', body: ['We are not responsible for third-party websites or services.'] },
      { heading: 'Limitation of Liability', body: ['Use of this website is at your own risk. Olkeri Space shall not be liable for losses arising from use of this website.'] },
      contactBlock,
    ],
  },
  'editorial-policy': {
    slug: 'editorial-policy',
    title: 'Editorial Policy',
    effectiveDate: 'June 24, 2026',
    intro: ['At Olkeri Space, our mission is to provide accurate, insightful, and trustworthy coverage of artificial intelligence, technology, innovation, and digital transformation.'],
    blocks: [
      { heading: 'Editorial Independence', body: ['Our editorial decisions are made independently.', 'Advertising relationships, affiliate partnerships, sponsorships, or business relationships do not influence our reporting.'] },
      { heading: 'Accuracy', body: ['We strive to verify facts before publication, use credible sources, attribute information appropriately, and correct inaccuracies when discovered.'] },
      { heading: 'Sources', body: ['We prioritize official company announcements, regulatory filings, research papers, public documentation, first-party statements, and interviews.'] },
      { heading: 'Corrections', body: ['If factual errors are identified, we will update articles and correct inaccuracies promptly.', 'Readers may report errors by contacting chweyahub@gmail.com.'] },
      { heading: 'Reviews', body: ['Product reviews reflect the opinions of our editorial team based on available information and testing where possible.'] },
      { heading: 'AI Coverage', body: ['Artificial intelligence evolves rapidly. Coverage may include AI models, AI products, AI companies, AI regulations, research developments, and industry analysis.', 'We aim to distinguish clearly between facts, opinions, speculation, and analysis.'] },
      { heading: 'Sponsored Content', body: ['Sponsored content will be clearly labeled.'] },
      contactBlock,
    ],
  },
  'dmca-copyright-policy': {
    slug: 'dmca-copyright-policy',
    title: 'DMCA / Copyright Policy',
    effectiveDate: 'June 24, 2026',
    intro: ['Olkeri Space respects the intellectual property rights of others and expects users and contributors to do the same.'],
    blocks: [
      { heading: 'Copyright Ownership', body: ['Unless otherwise stated, content published on olkeri.space is owned by Olkeri Space and protected by applicable copyright laws.'] },
      { heading: 'Permitted Use', body: ['Users may share article links and quote limited portions with proper attribution.', 'Users may not reproduce entire articles, republish content without permission, or sell or redistribute content.'] },
      { heading: 'Copyright Infringement Claims', body: ['If you believe content published on Olkeri Space infringes your copyright, please provide your name and contact information, identification of the copyrighted work, identification of the allegedly infringing material, a statement that you believe the use is unauthorized, and a statement that the information provided is accurate.', 'Send notices to chweyahub@gmail.com with the subject "Copyright Infringement Notice."'] },
      { heading: 'Removal Process', body: ['Upon receipt of a valid copyright complaint, we may investigate the claim, remove or restrict access to the material, contact the parties involved, and take appropriate action under applicable copyright laws.'] },
      { heading: 'Repeat Infringers', body: ['We reserve the right to restrict access to users who repeatedly violate intellectual property rights.'] },
      contactBlock,
    ],
  },
}

export const legalNavItems = [
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms-and-conditions', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookies' },
  { href: '/Disclaimer', label: 'Disclaimer' },
  { href: '/editorial-policy', label: 'Editorial' },
  { href: '/dmca-copyright-policy', label: 'DMCA' },
]

export const localizedLegalPages: Record<'fr' | 'de', Record<string, Partial<LegalPageContent>>> = {
  fr: {
    'privacy-policy': {
      title: 'Politique de confidentialite',
      intro: [
        'Bienvenue sur Olkeri Space, accessible sur olkeri.space.',
        'Cette politique explique comment nous collectons, utilisons et protegeons vos informations lorsque vous utilisez notre site.',
        'En utilisant notre site, vous acceptez les pratiques decrites dans cette politique.',
      ],
      blocks: [
        { heading: 'Informations collectees', body: ['Nous pouvons collecter votre nom, votre adresse e-mail, vos coordonnees, vos inscriptions a la newsletter et les informations envoyees via nos formulaires.'] },
        { heading: 'Informations automatiques', body: ['Nous pouvons collecter l adresse IP, le navigateur, le type d appareil, le systeme d exploitation, les pages consultees, les sources de trafic et la localisation generale.'] },
        { heading: 'Utilisation des informations', body: ['Nous utilisons ces donnees pour envoyer des newsletters, repondre aux demandes, ameliorer le site, analyser le trafic, personnaliser le contenu, detecter les abus et respecter nos obligations legales.'] },
        { heading: 'Cookies et publicite', body: ['Nous utilisons des cookies pour les performances, les preferences, l analyse et la publicite. Google AdSense et d autres partenaires peuvent utiliser des cookies publicitaires.'] },
        { heading: 'Securite des donnees', body: ['Nous appliquons des mesures raisonnables pour proteger les informations, mais aucune transmission sur Internet ne peut etre garantie comme totalement sure.'] },
        { heading: 'Vie privee des enfants', body: ['Le site ne s adresse pas aux enfants de moins de 13 ans et nous ne collectons pas volontairement leurs donnees personnelles.'] },
        { heading: 'Contenu IA', body: ['Olkeri Space publie des actualites, analyses et contenus educatifs sur l intelligence artificielle. Les informations peuvent devenir obsoletes.'] },
        { heading: 'Contact', body: ['Olkeri Space', 'Site web: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'terms-and-conditions': {
      title: 'Conditions generales',
      intro: ['En accedant a olkeri.space, vous acceptez ces conditions generales.'],
      blocks: [
        { heading: 'Utilisation du site', body: ['Vous acceptez d utiliser le site legalement et de ne pas perturber son fonctionnement, distribuer de logiciels malveillants, tenter un acces non autorise ou extraire le contenu sans permission.'] },
        { heading: 'Propriete intellectuelle', body: ['Sauf indication contraire, le contenu publie sur Olkeri Space appartient a Olkeri Space. Vous pouvez lire et partager des liens, mais pas republier ou vendre le contenu sans autorisation.'] },
        { heading: 'Services tiers', body: ['Nous pouvons mentionner des entreprises, produits et services tiers. Les marques appartiennent a leurs proprietaires respectifs.'] },
        { heading: 'Responsabilite', body: ['Olkeri Space n est pas responsable des dommages lies a l utilisation du site, aux erreurs, aux omissions ou aux interruptions de service.'] },
        { heading: 'Contact', body: ['Olkeri Space', 'Site web: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'cookie-policy': {
      title: 'Politique relative aux cookies',
      intro: ['Cette page explique comment Olkeri Space utilise les cookies.'],
      blocks: [
        { heading: 'Que sont les cookies ?', body: ['Les cookies sont de petits fichiers stockes sur votre appareil pour ameliorer le fonctionnement du site et l experience utilisateur.'] },
        { heading: 'Cookies utilises', body: ['Nous pouvons utiliser des cookies essentiels, analytiques, publicitaires et fonctionnels.'] },
        { heading: 'Gestion des cookies', body: ['Vous pouvez bloquer ou supprimer les cookies depuis les parametres de votre navigateur. Certaines fonctions peuvent etre limitees.'] },
        { heading: 'Cookies tiers', body: ['Google, YouTube, les plateformes sociales et les services d analyse peuvent placer leurs propres cookies.'] },
        { heading: 'Contact', body: ['Olkeri Space', 'Site web: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    disclaimer: {
      title: 'Avertissement',
      intro: ['Les informations publiees sur olkeri.space sont fournies uniquement a titre informatif et educatif.'],
      blocks: [
        { heading: 'Actualites et analyses', body: ['Nous publions des actualites, avis, analyses et commentaires sur l intelligence artificielle et la technologie. Les informations peuvent devenir obsoletes.'] },
        { heading: 'Pas de conseil professionnel', body: ['Le contenu ne constitue pas un conseil juridique, financier, fiscal, commercial ou d investissement. Consultez un professionnel qualifie si necessaire.'] },
        { heading: 'Liens externes', body: ['Nous ne sommes pas responsables des sites ou services tiers lies depuis notre plateforme.'] },
        { heading: 'Contact', body: ['Olkeri Space', 'Site web: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'editorial-policy': {
      title: 'Politique editoriale',
      intro: ['Olkeri Space vise a fournir une couverture fiable, claire et utile de l intelligence artificielle, de la technologie et de l innovation.'],
      blocks: [
        { heading: 'Independance editoriale', body: ['Nos decisions editoriales sont independantes et ne sont pas influencees par la publicite, les affiliations ou les partenariats.'] },
        { heading: 'Exactitude', body: ['Nous cherchons a verifier les faits, utiliser des sources credibles, attribuer les informations et corriger rapidement les erreurs.'] },
        { heading: 'Sources', body: ['Nous privilegions les annonces officielles, documents publics, articles de recherche, depots reglementaires et declarations de premiere main.'] },
        { heading: 'Contact', body: ['Olkeri Space', 'Site web: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'dmca-copyright-policy': {
      title: 'Politique DMCA / droits d auteur',
      intro: ['Olkeri Space respecte les droits de propriete intellectuelle des autres.'],
      blocks: [
        { heading: 'Propriete du contenu', body: ['Sauf indication contraire, le contenu publie sur olkeri.space appartient a Olkeri Space et est protege par les lois applicables.'] },
        { heading: 'Utilisation autorisee', body: ['Vous pouvez partager des liens et citer de courts extraits avec attribution. Vous ne pouvez pas republier des articles entiers sans autorisation.'] },
        { heading: 'Reclamations', body: ['Envoyez les avis de violation de droits d auteur a chweyahub@gmail.com avec le sujet Copyright Infringement Notice.'] },
        { heading: 'Contact', body: ['Olkeri Space', 'Site web: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
  },
  de: {
    'privacy-policy': {
      title: 'Datenschutzerklarung',
      intro: [
        'Willkommen bei Olkeri Space, erreichbar unter olkeri.space.',
        'Diese Datenschutzerklarung erklaert, wie wir Informationen sammeln, verwenden und schutzen, wenn Sie unsere Website nutzen.',
        'Durch die Nutzung der Website stimmen Sie diesen Praktiken zu.',
      ],
      blocks: [
        { heading: 'Welche Informationen wir sammeln', body: ['Wir konnen Name, E-Mail-Adresse, Kontaktdaten, Newsletter-Anmeldungen und Informationen aus Kontaktformularen erfassen.'] },
        { heading: 'Automatisch erfasste Informationen', body: ['Dazu konnen IP-Adresse, Browser, Gerat, Betriebssystem, besuchte Seiten, Traffic-Quellen, Sitzungsdauer und allgemeiner Standort gehoren.'] },
        { heading: 'Wie wir Informationen nutzen', body: ['Wir verwenden Informationen fur Newsletter, Antworten auf Anfragen, Website-Verbesserungen, Traffic-Analyse, Personalisierung, Missbrauchserkennung und rechtliche Pflichten.'] },
        { heading: 'Cookies und Werbung', body: ['Wir nutzen Cookies fur Leistung, Einstellungen, Analyse und Werbung. Google AdSense und andere Partner konnen Werbe-Cookies verwenden.'] },
        { heading: 'Datensicherheit', body: ['Wir nutzen angemessene Schutzmassnahmen, konnen aber keine vollstandige Sicherheit bei Internetubertragungen garantieren.'] },
        { heading: 'Kinder', body: ['Unsere Website richtet sich nicht an Kinder unter 13 Jahren. Wir sammeln wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren.'] },
        { heading: 'KI-Inhalte', body: ['Olkeri Space veroffentlicht Nachrichten, Analysen und Bildungsinhalte zu kunstlicher Intelligenz. Informationen konnen veralten.'] },
        { heading: 'Kontakt', body: ['Olkeri Space', 'Website: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'terms-and-conditions': {
      title: 'Allgemeine Bedingungen',
      intro: ['Durch den Zugriff auf olkeri.space stimmen Sie diesen Bedingungen zu.'],
      blocks: [
        { heading: 'Nutzung der Website', body: ['Sie verpflichten sich, die Website rechtmassig zu nutzen und keine Gesetze zu verletzen, Malware zu verbreiten, unbefugten Zugriff zu versuchen oder den Betrieb zu storen.'] },
        { heading: 'Geistiges Eigentum', body: ['Sofern nicht anders angegeben, gehort der Inhalt von Olkeri Space Olkeri Space. Sie durfen Inhalte lesen und Links teilen, aber nicht ohne Erlaubnis republizieren oder verkaufen.'] },
        { heading: 'Drittanbieter', body: ['Wir konnen Unternehmen, Produkte und Dienste Dritter besprechen. Marken bleiben Eigentum ihrer jeweiligen Inhaber.'] },
        { heading: 'Haftungsbeschrankung', body: ['Olkeri Space haftet nicht fur Schaden aus Nutzung der Website, Vertrauen auf Inhalte, Fehler, Auslassungen oder Serviceunterbrechungen.'] },
        { heading: 'Kontakt', body: ['Olkeri Space', 'Website: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'cookie-policy': {
      title: 'Cookie-Richtlinie',
      intro: ['Diese Seite erklart, wie Olkeri Space Cookies verwendet.'],
      blocks: [
        { heading: 'Was sind Cookies?', body: ['Cookies sind kleine Dateien auf Ihrem Gerat, die Funktionen und Nutzererfahrung verbessern.'] },
        { heading: 'Welche Cookies wir nutzen', body: ['Wir konnen notwendige, analytische, werbliche und funktionale Cookies verwenden.'] },
        { heading: 'Cookies verwalten', body: ['Sie konnen Cookies in Ihren Browser-Einstellungen blockieren oder loschen. Manche Funktionen konnen dadurch eingeschrankt sein.'] },
        { heading: 'Cookies von Dritten', body: ['Google, YouTube, soziale Plattformen und Analyseanbieter konnen eigene Cookies setzen.'] },
        { heading: 'Kontakt', body: ['Olkeri Space', 'Website: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    disclaimer: {
      title: 'Haftungsausschluss',
      intro: ['Die Informationen auf olkeri.space dienen nur Informations- und Bildungszwecken.'],
      blocks: [
        { heading: 'Berichterstattung', body: ['Wir veroffentlichen Nachrichten, Bewertungen, Analysen und Kommentare zu kunstlicher Intelligenz und Technologie. Informationen konnen nach der Veroffentlichung veralten.'] },
        { heading: 'Keine professionelle Beratung', body: ['Nichts auf dieser Website ist Rechts-, Finanz-, Steuer-, Geschafts- oder Anlageberatung. Wenden Sie sich bei Bedarf an qualifizierte Fachleute.'] },
        { heading: 'Externe Links', body: ['Wir sind nicht verantwortlich fur Websites oder Dienste Dritter.'] },
        { heading: 'Kontakt', body: ['Olkeri Space', 'Website: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'editorial-policy': {
      title: 'Redaktionelle Richtlinie',
      intro: ['Olkeri Space mochte verlassliche und verstandliche Berichterstattung uber KI, Technologie, Innovation und digitale Transformation bieten.'],
      blocks: [
        { heading: 'Redaktionelle Unabhangigkeit', body: ['Unsere redaktionellen Entscheidungen sind unabhangig und werden nicht durch Werbung, Affiliate-Beziehungen oder Partnerschaften beeinflusst.'] },
        { heading: 'Genauigkeit', body: ['Wir bemuhen uns, Fakten zu prufen, glaubwurdige Quellen zu nutzen, Informationen zuzuordnen und Fehler zeitnah zu korrigieren.'] },
        { heading: 'Quellen', body: ['Wir bevorzugen offizielle Ankundigungen, offentliche Dokumentation, Forschungsarbeiten, regulatorische Unterlagen und Aussagen aus erster Hand.'] },
        { heading: 'Kontakt', body: ['Olkeri Space', 'Website: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
    'dmca-copyright-policy': {
      title: 'DMCA / Urheberrechtsrichtlinie',
      intro: ['Olkeri Space respektiert die Rechte an geistigem Eigentum anderer.'],
      blocks: [
        { heading: 'Eigentum am Inhalt', body: ['Sofern nicht anders angegeben, gehort der Inhalt auf olkeri.space Olkeri Space und ist urheberrechtlich geschutzt.'] },
        { heading: 'Erlaubte Nutzung', body: ['Sie durfen Links teilen und kurze Ausschnitte mit Quellenangabe zitieren. Ganze Artikel durfen ohne Erlaubnis nicht erneut veroffentlicht werden.'] },
        { heading: 'Anspruche', body: ['Senden Sie Urheberrechtsbeschwerden an chweyahub@gmail.com mit dem Betreff Copyright Infringement Notice.'] },
        { heading: 'Kontakt', body: ['Olkeri Space', 'Website: olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
  },
}
