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
  'about': {
    slug: 'about',
    title: 'About Olkeri',
    effectiveDate: 'August 29, 2026',
    intro: [
      'Olkeri is an independent publication covering artificial intelligence worldwide, published in English, French and German.',
      'We report on the companies, research, policy, hardware and infrastructure shaping AI, with particular attention to regions that receive less coverage elsewhere, including across Africa, Asia and Latin America.',
    ],
    blocks: [
      { heading: 'What we cover', body: ['Our coverage spans model and product developments, semiconductors and computing infrastructure, regulation and public policy, AI in industry, and the national AI landscapes of individual countries.'], bullets: ['Companies and products', 'Research and capability', 'Policy and regulation', 'Hardware, chips and data centres', 'AI in industry and society'] },
      { heading: 'Who publishes Olkeri', body: ['Olkeri is published and edited by Mark Chweya, an independent publisher based in Kenya. Editorial decisions, story selection and publication are the responsibility of the publisher.'] },
      { heading: 'How we work', body: ['Articles are researched and written for Olkeri, and we credit the primary source of any reported development with a link where one exists.', 'We use AI tools in our production process, including for drafting, translation and illustration. Every article is published under the responsibility of the publisher, who is accountable for its content.', 'Our article artwork is created in-house. We do not use third-party photographs without a licence permitting it.'] },
      { heading: 'Corrections', body: ['We correct errors of fact promptly. If you believe something we published is inaccurate, email us with the article link and the correction, and we will review it and update the article where warranted.'] },
      { heading: 'Advertising and independence', body: ['The site carries advertising, which may be served by third-party networks. Advertising has no influence over what we cover or how we cover it, and advertisers receive no advance sight of editorial content.'] },
      { heading: 'Languages', body: ['Olkeri publishes in English, French and German. Translated versions of an article are linked to one another so readers can move between them.'] },
      { heading: 'Contact', body: ['Olkeri', 'Website: www.olkeri.space', 'Publisher and editor: Mark Chweya'], bullets: ['Email: chweyahub@gmail.com', 'Story tips, corrections and partnership enquiries are all welcome at this address.'] },
    ],
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    effectiveDate: 'August 29, 2026',
    intro: [
      'This Privacy Policy explains how Olkeri ("we", "our", "us") collects, uses, shares and protects information when you visit www.olkeri.space.',
      'Olkeri is operated by Mark Chweya, an independent publisher based in Kenya. You can contact us at any time at chweyahub@gmail.com.',
      'By using this website you agree to the practices described in this policy. If you do not agree, please do not use the site.',
    ],
    blocks: [
      { heading: 'Information you give us', body: ['We only collect information you choose to provide, which may include:'], bullets: ['Your name and email address when you contact us or send a story tip', 'Any message content you submit through our contact form', 'Your email address if you subscribe to updates'] },
      { heading: 'Information collected automatically', body: ['When you visit the site, certain information is collected automatically by us and by our service providers:'], bullets: ['IP address and approximate location (city or country level)', 'Browser type, device type and operating system', 'Pages viewed, time spent and referring website', 'Cookie and similar identifiers'] },
      { heading: 'How we use information', body: ['We use information for the following purposes:'], bullets: ['To operate, maintain and improve the website', 'To respond to your enquiries and story tips', 'To send updates you have requested, which you can stop at any time', 'To measure traffic and understand which articles readers value', 'To display advertising and measure its performance', 'To detect, prevent and address abuse, fraud or technical problems', 'To comply with legal obligations'] },
      { heading: 'Legal bases for processing', body: ['Where the UK GDPR or EU GDPR applies to you, we rely on the following legal bases:'], bullets: ['Consent, for advertising and analytics cookies, and for marketing emails', 'Legitimate interests, for operating and securing the site and understanding readership', 'Legal obligation, where we are required to retain or disclose information by law'] },
      { heading: 'Cookies and similar technologies', body: ['Cookies are small files stored on your device. We and our partners use them for the following purposes:', 'You can control cookies through your browser settings and, where a consent banner is shown, through your consent choices. Blocking cookies may affect how parts of the site work.'], bullets: ['Essential cookies, which are required for the site to function', 'Preference cookies, which remember your language and display settings', 'Analytics cookies, which help us understand how the site is used', 'Advertising cookies, which are used to select and measure advertisements'] },
      { heading: 'Advertising and Google AdSense', body: ['This website displays advertising. We use Google AdSense, and third-party vendors including Google may serve advertisements on this site.', 'Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website and other websites.', 'Google\'s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this and other sites on the Internet.', 'You may opt out of personalised advertising by visiting Google Ads Settings at www.google.com/settings/ads. You may also opt out of third-party vendor cookies for personalised advertising at www.aboutads.info/choices or www.youronlinechoices.eu.', 'Third-party advertising vendors and ad networks operate under their own privacy policies, which we do not control. We encourage you to review them.'] },
      { heading: 'Consent in the European Economic Area and United Kingdom', body: ['If you are located in the European Economic Area, the United Kingdom or Switzerland, we ask for your consent before setting advertising and analytics cookies, in line with Google\'s EU User Consent Policy.', 'You may withdraw or change your consent at any time using the cookie controls on the site, and withdrawal does not affect processing carried out before you withdrew.'] },
      { heading: 'Analytics', body: ['We may use analytics services, including Google Analytics, to understand how visitors use the site. These services collect information such as pages visited, time on page and referring sources, and process it on our behalf.', 'You can prevent Google Analytics from collecting your data using the browser opt-out available at tools.google.com/dlpage/gaoptout.'] },
      { heading: 'Sharing your information', body: ['We do not sell your personal information. We share information only in the following circumstances:'], bullets: ['With service providers who host the website, deliver email, provide analytics or serve advertising, acting on our instructions', 'Where required by law, regulation, legal process or an enforceable governmental request', 'To protect the rights, property or safety of Olkeri, our readers or the public', 'In connection with a merger, acquisition or sale of assets, subject to this policy continuing to apply'] },
      { heading: 'International transfers', body: ['Our service providers, including hosting, database and advertising providers, may process information outside your country, including in the United States and the European Union.', 'Where such transfers occur from the EEA or UK, they are made under appropriate safeguards such as standard contractual clauses.'] },
      { heading: 'Data retention', body: ['We keep information only as long as needed for the purposes described in this policy.', 'Contact form messages and story tips are retained for up to 24 months. Newsletter subscriptions are retained until you unsubscribe. Aggregated analytics data may be retained indefinitely because it does not identify you.'] },
      { heading: 'Your rights', body: ['Depending on where you live, you may have the following rights over your personal information:', 'To exercise any of these rights, email chweyahub@gmail.com. We will respond within the period required by applicable law, normally within 30 days. You also have the right to complain to your local data protection authority.'], bullets: ['Access to the information we hold about you', 'Correction of inaccurate information', 'Deletion of your information', 'Objection to, or restriction of, processing', 'Withdrawal of consent at any time', 'Portability of information you provided to us', 'For California residents, the right to know, to delete, to correct, and to opt out of sale or sharing of personal information. We do not sell personal information'] },
      { heading: 'Data security', body: ['We use reasonable technical and organisational measures to protect information, including encrypted connections and restricted access to our systems.', 'No method of transmission or storage is completely secure, and we cannot guarantee absolute security.'] },
      { heading: 'Children\'s privacy', body: ['This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13.', 'If you believe a child has provided us with personal information, contact us and we will delete it.'] },
      { heading: 'Third-party links and embedded content', body: ['Our articles link to other websites and may include embedded content such as videos or social media posts.', 'We are not responsible for the privacy practices of those websites, and embedded content may collect information according to the provider\'s own policy.'] },
      { heading: 'Artificial intelligence disclosure', body: ['We use AI tools in our production process, including for drafting, translation and illustration. Articles are published under the responsibility of the publisher.', 'Any information you send us may be processed using such tools. Please do not send confidential or sensitive personal information through the contact form.'] },
      { heading: 'Changes to this policy', body: ['We may update this policy from time to time. The effective date at the top of this page shows when it was last revised, and material changes will be announced on the site.'] },
      { heading: 'Contact', body: ['Olkeri', 'Publisher and data controller: Mark Chweya', 'Website: www.olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    effectiveDate: 'August 29, 2026',
    intro: [
      'These Terms and Conditions govern your use of www.olkeri.space, operated by Mark Chweya ("Olkeri", "we", "our", "us").',
      'By accessing or using the website you agree to these terms. If you do not agree, please do not use the site.',
    ],
    blocks: [
      { heading: 'Eligibility', body: ['The website is intended for users aged 13 and over. If you are under the age of majority where you live, you should use the site only with the involvement of a parent or guardian.'] },
      { heading: 'Permitted use', body: ['You may read our articles, share links to them, and quote short extracts with clear attribution and a link back to the original article.', 'You agree not to:'], bullets: ['Use the site for any unlawful purpose or in breach of these terms', 'Republish, sell or redistribute our articles in whole or in substantial part without written permission', 'Use automated systems to scrape or harvest content beyond ordinary search engine indexing', 'Introduce malware or attempt to gain unauthorised access to our systems', 'Interfere with the operation, security or availability of the website', 'Use our content to train machine learning models without written permission'] },
      { heading: 'Intellectual property', body: ['Unless otherwise stated, all content on this website, including articles, images and the Olkeri name and branding, is owned by Olkeri or used under licence, and is protected by copyright and other laws.', 'Article artwork is created in-house. Where third-party material is used, it is credited and used under a licence permitting that use.'] },
      { heading: 'Editorial content and accuracy', body: ['We publish news, analysis and explanatory articles about artificial intelligence. We take reasonable care to be accurate at the time of publication.', 'Information may become outdated, and articles are provided for general information only. Nothing on this website constitutes professional, legal, financial, medical or investment advice, and you should not act on it without seeking appropriate professional guidance.', 'Where we report on developments elsewhere, we credit the primary source. If you believe something we published is inaccurate, contact us and we will review it and correct it where warranted.'] },
      { heading: 'Use of artificial intelligence', body: ['We use AI tools in our production process, including for drafting, translation and illustration.', 'Every article is published under the responsibility of the publisher, who remains accountable for its content.'] },
      { heading: 'Advertising', body: ['This website displays advertising served by third parties, including Google AdSense.', 'Advertising is clearly distinguishable from editorial content and has no influence over what we cover or how we cover it. We are not responsible for the content of advertisements or for goods and services offered by advertisers.'] },
      { heading: 'Third-party links', body: ['Our articles link to third-party websites, which we do not control.', 'We are not responsible for the content, accuracy, availability or practices of those websites, and a link does not imply endorsement.'] },
      { heading: 'User submissions', body: ['If you send us a story tip, correction or other material, you confirm that you are entitled to share it and grant us a non-exclusive right to use it in our reporting.', 'Do not send confidential information or material you are not permitted to disclose.'] },
      { heading: 'Disclaimer of warranties', body: ['The website is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.', 'We do not warrant that the site will be uninterrupted, error-free or free of harmful components, or that content will be complete or current.'] },
      { heading: 'Limitation of liability', body: ['To the fullest extent permitted by law, Olkeri and its publisher will not be liable for any indirect, incidental, consequential or special damages, or for loss of profits, data or goodwill, arising from your use of or inability to use the website.', 'Nothing in these terms excludes liability that cannot be excluded under applicable law.'] },
      { heading: 'Indemnity', body: ['You agree to indemnify Olkeri and its publisher against claims, losses and reasonable costs arising from your breach of these terms or your misuse of the website.'] },
      { heading: 'Copyright complaints', body: ['If you believe content on this site infringes your copyright, follow the procedure set out in our DMCA and Copyright Policy, and we will respond promptly.'] },
      { heading: 'Privacy', body: ['Our collection and use of personal information is described in our Privacy Policy, which forms part of these terms.'] },
      { heading: 'Suspension and termination', body: ['We may suspend or restrict access to the website, in whole or in part, where we reasonably believe these terms have been breached or where necessary to protect the site or its users.'] },
      { heading: 'Changes to these terms', body: ['We may update these terms from time to time. The effective date above shows when they were last revised, and continued use of the site after changes take effect constitutes acceptance.'] },
      { heading: 'Governing law', body: ['These terms are governed by the laws of Kenya, and the courts of Kenya will have jurisdiction over any dispute, without affecting any mandatory consumer protections available to you where you live.'] },
      { heading: 'Contact', body: ['Olkeri', 'Publisher: Mark Chweya', 'Website: www.olkeri.space'], bullets: ['Email: chweyahub@gmail.com'] },
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
  { href: '/about', label: 'About' },
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms-and-conditions', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookies' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/editorial-policy', label: 'Editorial' },
  { href: '/dmca-copyright-policy', label: 'DMCA' },
]

export const localizedLegalPages: Record<'fr' | 'de', Record<string, Partial<LegalPageContent>>> = {
  fr: {
    'about': {
      title: 'A propos d Olkeri',
      intro: [
        'Olkeri est une publication independante consacree a l intelligence artificielle dans le monde entier, publiee en anglais, en francais et en allemand.',
        'Nous couvrons les entreprises, la recherche, la politique, le materiel et les infrastructures qui faconnent l IA, avec une attention particuliere aux regions moins couvertes ailleurs, notamment en Afrique, en Asie et en Amerique latine.',
      ],
      blocks: [
        { heading: 'Nos sujets', body: ['Notre couverture comprend les modeles et produits, les semi-conducteurs et les infrastructures de calcul, la reglementation et les politiques publiques, l IA dans l industrie, et les paysages nationaux de l IA.'] },
        { heading: 'Qui publie Olkeri', body: ['Olkeri est publie et edite par Mark Chweya, editeur independant base au Kenya. Les decisions editoriales relevent de la responsabilite de l editeur.'] },
        { heading: 'Notre methode', body: ['Les articles sont rediges pour Olkeri et nous creditons la source primaire de toute information rapportee, avec un lien lorsqu il existe.', 'Nous utilisons des outils d IA dans notre processus de production, notamment pour la redaction, la traduction et l illustration. Chaque article est publie sous la responsabilite de l editeur.', 'Nos illustrations sont realisees en interne.'] },
        { heading: 'Corrections', body: ['Nous corrigeons rapidement les erreurs factuelles. Ecrivez-nous avec le lien de l article et la correction proposee.'] },
        { heading: 'Publicite et independance', body: ['Le site diffuse de la publicite, qui peut etre servie par des reseaux tiers. La publicite n influence pas nos choix editoriaux.'] },
        { heading: 'Langues', body: ['Olkeri publie en anglais, en francais et en allemand. Les versions traduites d un article sont reliees entre elles.'] },
        { heading: 'Contact', body: ['Olkeri', 'Site web: www.olkeri.space', 'Editeur et redacteur: Mark Chweya'], bullets: ['Email: chweyahub@gmail.com'] },
      ],
    },
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
    'about': {
      title: 'Uber Olkeri',
      intro: [
        'Olkeri ist eine unabhangige Publikation uber kunstliche Intelligenz weltweit, veroffentlicht auf Englisch, Franzosisch und Deutsch.',
        'Wir berichten uber Unternehmen, Forschung, Politik, Hardware und Infrastruktur, die die KI pragen, mit besonderem Augenmerk auf Regionen, uber die anderswo weniger berichtet wird, darunter Afrika, Asien und Lateinamerika.',
      ],
      blocks: [
        { heading: 'Unsere Themen', body: ['Unsere Berichterstattung umfasst Modelle und Produkte, Halbleiter und Recheninfrastruktur, Regulierung und Politik, KI in der Industrie sowie nationale KI-Landschaften.'] },
        { heading: 'Wer Olkeri herausgibt', body: ['Olkeri wird von Mark Chweya herausgegeben und redigiert, einem unabhangigen Herausgeber mit Sitz in Kenia. Redaktionelle Entscheidungen liegen in seiner Verantwortung.'] },
        { heading: 'Unsere Arbeitsweise', body: ['Artikel werden fur Olkeri recherchiert und geschrieben, und wir nennen die Primarquelle jeder berichteten Entwicklung mit Link, sofern vorhanden.', 'Wir setzen KI-Werkzeuge im Produktionsprozess ein, unter anderem fur Entwurf, Ubersetzung und Illustration. Jeder Artikel erscheint unter der Verantwortung des Herausgebers.', 'Unsere Bilder werden intern erstellt.'] },
        { heading: 'Korrekturen', body: ['Sachliche Fehler korrigieren wir umgehend. Schreiben Sie uns mit dem Link zum Artikel und der Korrektur.'] },
        { heading: 'Werbung und Unabhangigkeit', body: ['Die Website schaltet Werbung, die von Drittanbietern ausgeliefert werden kann. Werbung hat keinen Einfluss auf unsere redaktionellen Entscheidungen.'] },
        { heading: 'Sprachen', body: ['Olkeri veroffentlicht auf Englisch, Franzosisch und Deutsch. Ubersetzte Fassungen eines Artikels sind miteinander verlinkt.'] },
        { heading: 'Kontakt', body: ['Olkeri', 'Website: www.olkeri.space', 'Herausgeber und Redakteur: Mark Chweya'], bullets: ['E-Mail: chweyahub@gmail.com'] },
      ],
    },
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
