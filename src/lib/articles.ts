export const articleLanguages = [
  { code: 'en', label: 'English', name: 'English' },
  { code: 'fr', label: 'French', name: 'Français' },
  { code: 'de', label: 'German', name: 'Deutsch' },
  { code: 'es', label: 'Spanish', name: 'Español' },
] as const

export type ArticleLanguage = (typeof articleLanguages)[number]['code']

export type Article = {
  id: string
  title: string
  slug: string
  content: string
  language: ArticleLanguage
  image_url: string | null
  created_at: string
  updated_at: string
  published_at: string | null
  views: number | null
  translation_group_id?: string | null
  summary?: string | null
  category?: string | null
  region?: string | null
  tags?: string[] | null
  source_name?: string | null
  source_url?: string | null
  image_credit?: string | null
  author?: string | null
}

// Shown when an article carries no explicit byline.
export const DEFAULT_AUTHOR = 'Olkeri.space'

export function getArticleAuthor(article: Pick<Article, 'author'>) {
  return article.author?.trim() || DEFAULT_AUTHOR
}

export const newsCategories = [
  'companies',
  'research',
  'policy',
  'business',
  'hardware',
  'science',
  'society',
] as const

export type NewsCategory = (typeof newsCategories)[number]

export const newsRegions = [
  'global',
  'americas',
  'europe',
  'asia',
  'africa',
  'middle-east',
  'oceania',
] as const

export type NewsRegion = (typeof newsRegions)[number]

export function getArticleExcerpt(
  article: Pick<Article, 'content'> & { summary?: string | null },
  maxLength = 180
) {
  const summary = article.summary?.trim()
  const base = summary || article.content.trim().replace(/\s+/g, ' ')

  if (base.length <= maxLength) return base

  const clipped = base.slice(0, maxLength)
  const lastSpace = clipped.lastIndexOf(' ')

  return `${clipped.slice(0, lastSpace > 60 ? lastSpace : maxLength)}…`
}

export function getReadTime(content: string, suffix = 'min read') {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  return `${minutes} ${suffix}`
}

export function getArticleParagraphs(content: string) {
  const normalizedContent = content.trim().replace(/\r\n?/g, '\n')

  if (!normalizedContent) {
    return []
  }

  if (normalizedContent.includes('\n')) {
    const paragraphBreak = normalizedContent.includes('\n\n') ? /\n{2,}/ : /\n+/

    return normalizedContent
      .split(paragraphBreak)
      .map(paragraph => paragraph.trim())
      .filter(Boolean)
  }

  const sentences = normalizedContent
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“‘])/)
    .map(sentence => sentence.trim())
    .filter(Boolean)

  if (sentences.length <= 1) {
    return [normalizedContent]
  }

  const paragraphs: string[] = []
  let currentParagraph = ''

  for (const sentence of sentences) {
    const nextParagraph = currentParagraph
      ? `${currentParagraph} ${sentence}`
      : sentence

    if (currentParagraph && (nextParagraph.length > 520 || currentParagraph.split(/(?<=[.!?])\s+/).length >= 3)) {
      paragraphs.push(currentParagraph)
      currentParagraph = sentence
    } else {
      currentParagraph = nextParagraph
    }
  }

  if (currentParagraph) {
    paragraphs.push(currentParagraph)
  }

  return paragraphs
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
}

export const appCopy = {
  en: {
    navHome: 'Home',
    navBlog: 'Blog',
    navContact: 'Contact',
    navWork: 'Work',
    footerArticles: 'AI Articles',
    all: 'All',
    english: 'English',
    french: 'French',
    german: 'German',
    spanish: 'Spanish',
    aiArticles: 'AI Articles',
    languageArticles: {
      en: 'English AI Articles',
      fr: 'French AI Articles',
      de: 'German AI Articles',
      es: 'Spanish AI Articles',
    },
    noArticles: 'No articles have been published for this view yet.',
    loading: 'Loading articles...',
    readTimeSuffix: 'min read',
    views: 'views',
    news: {
      brand: 'AI News',
      tagline: 'AI news from around the world — updated every day.',
      topStory: 'Top story',
      latest: 'Latest AI news',
      mostRead: 'Most read',
      moreNews: 'More AI news',
      source: 'Source',
      imageCredit: 'Image',
      readIn: 'Read this story in',
      older: 'Older news',
      newer: 'Newer news',
      backToNews: 'All AI news',
      byline: 'By',
    },
    categories: {
      companies: 'Companies',
      research: 'Research',
      policy: 'Policy & Regulation',
      business: 'Business',
      hardware: 'Hardware & Chips',
      science: 'Science',
      society: 'Society & Culture',
    },
    regions: {
      global: 'Global',
      americas: 'Americas',
      europe: 'Europe',
      asia: 'Asia',
      africa: 'Africa',
      'middle-east': 'Middle East',
      oceania: 'Oceania',
    },
    home: {
      headline: 'AI news from around the world',
      sub: 'Original reporting on artificial intelligence — companies, research, policy, chips and more — published every day in English, French, German and Spanish.',
      ctaNews: 'Latest AI news',
      ctaContact: 'Contact us',
      editions: 'Read Olkeri in your language',
      topToday: "Today's top stories",
    },
    contact: {
      title: 'Get in Touch',
      intro: 'Tell us what you want built — a mobile app, a web platform, an AI or data system. Story tips and corrections for the newsroom are welcome here too. We respond within 24 hours.',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your message',
      submit: 'Send Message',
      topicLabel: 'What is this about?',
      topicProject: 'A project to build',
      topicNewsroom: 'Newsroom tip or correction',
      topicOther: 'Something else',
      sending: 'Sending…',
      success: 'Thank you — your message reached us. We reply within 24 hours.',
      error: 'Something went wrong. Please try again, or email us directly.',
      emailFallback: 'Or email us at',
    },
    startProject: {
      title: 'Have something you want built?',
      intro: 'We build mobile apps, web platforms, AI systems and data tools. Tell us the problem and we will tell you honestly whether we are the right people to solve it.',
      cta: 'Start a project',
    },
    studio: {
      eyebrow: 'Software studio',
      headline: 'We build mobile apps and web solutions',
      sub: 'Olkeri is a software studio working across mobile, web, AI and data science — and a newsroom covering artificial intelligence in four languages. Tell us what you need built.',
      ctaWork: 'See our work',
      ctaContact: 'Start a project',
      servicesTitle: 'What we build',
      services: [
        { title: 'Mobile applications', body: 'Cross-platform apps in React Native and Expo, from first prototype to store listing.' },
        { title: 'Web solutions', body: 'Product sites, dashboards and internal platforms built on Next.js, TypeScript and Postgres.' },
        { title: 'AI systems', body: 'Assistants, retrieval pipelines and model gateways — including the unglamorous parts: cost, latency and prompt-injection defence.' },
        { title: 'Data science', body: 'Forecasting, spatial analysis and dashboards that answer a decision rather than just plot a column.' },
      ],
      workTitle: 'Selected work',
      workSub: 'Projects across mobile, AI, data science and developer tooling.',
      viewAll: 'View all projects',
      blogTitle: 'From the newsroom',
      blogSub: 'Olkeri also publishes daily AI journalism in English, French, German and Spanish.',
      readBlog: 'Read the blog',
      privateLabel: 'Private source',
      viewCode: 'View code',
      filterAll: 'All',
      workPageTitle: 'Work',
      workPageSub: 'Mobile apps, AI systems, data science and developer tools — a selection of what we have built.',
      cats: { mobile: 'Mobile apps', ai: 'AI & assistants', data: 'Data science', web: 'Web platforms', tools: 'Developer tools' },
    },
    legalLabels: {
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      disclaimer: 'Disclaimer',
      editorial: 'Editorial',
      dmca: 'DMCA',
    },
  },
  fr: {
    navHome: 'Accueil',
    navBlog: 'Blog',
    navContact: 'Contact',
    navWork: 'Projets',
    footerArticles: 'Articles IA',
    all: 'Tous',
    english: 'Anglais',
    french: 'Français',
    german: 'Allemand',
    spanish: 'Espagnol',
    aiArticles: 'Articles IA',
    languageArticles: {
      en: 'Articles IA en anglais',
      fr: 'Articles IA en français',
      de: 'Articles IA en allemand',
      es: 'Articles IA en espagnol',
    },
    noArticles: "Aucun article n'a encore été publié pour cette vue.",
    loading: 'Chargement des articles...',
    readTimeSuffix: 'min de lecture',
    views: 'lectures',
    news: {
      brand: 'Actus IA',
      tagline: "L'actualité de l'IA dans le monde entier — mise à jour chaque jour.",
      topStory: 'À la une',
      latest: 'Dernières actus IA',
      mostRead: 'Les plus lus',
      moreNews: "Plus d'actus IA",
      source: 'Source',
      imageCredit: 'Image',
      readIn: 'Lire cet article en',
      older: 'Actus plus anciennes',
      newer: 'Actus plus récentes',
      backToNews: 'Toutes les actus IA',
      byline: 'Par',
    },
    categories: {
      companies: 'Entreprises',
      research: 'Recherche',
      policy: 'Politique & Régulation',
      business: 'Économie',
      hardware: 'Matériel & Puces',
      science: 'Science',
      society: 'Société & Culture',
    },
    regions: {
      global: 'Monde',
      americas: 'Amériques',
      europe: 'Europe',
      asia: 'Asie',
      africa: 'Afrique',
      'middle-east': 'Moyen-Orient',
      oceania: 'Océanie',
    },
    home: {
      headline: "L'actualité de l'IA dans le monde entier",
      sub: "Des articles originaux sur l'intelligence artificielle — entreprises, recherche, politique, puces et plus — publiés chaque jour en anglais, français, allemand et espagnol.",
      ctaNews: 'Dernières actus IA',
      ctaContact: 'Nous contacter',
      editions: 'Lire Olkeri dans votre langue',
      topToday: 'À la une aujourd’hui',
    },
    contact: {
      title: 'Contactez-nous',
      intro: "Dites-nous ce que vous voulez construire — une application mobile, une plateforme web, un système d'IA ou de données. Les infos et corrections pour la rédaction sont aussi les bienvenues. Nous répondons sous 24 heures.",
      name: 'Votre nom',
      email: 'Votre e-mail',
      message: 'Votre message',
      submit: 'Envoyer le message',
      topicLabel: 'De quoi s’agit-il ?',
      topicProject: 'Un projet à construire',
      topicNewsroom: 'Info ou correction pour la rédaction',
      topicOther: 'Autre chose',
      sending: 'Envoi…',
      success: 'Merci — votre message nous est bien parvenu. Nous répondons sous 24 heures.',
      error: 'Une erreur est survenue. Réessayez, ou écrivez-nous directement.',
      emailFallback: 'Ou écrivez-nous à',
    },
    startProject: {
      title: 'Un projet à construire ?',
      intro: "Nous créons des applications mobiles, des plateformes web, des systèmes d'IA et des outils de données. Exposez-nous le problème et nous vous dirons franchement si nous sommes les bonnes personnes pour le résoudre.",
      cta: 'Démarrer un projet',
    },
    studio: {
      eyebrow: 'Studio logiciel',
      headline: 'Nous créons des applications mobiles et des solutions web',
      sub: "Olkeri est un studio logiciel qui travaille le mobile, le web, l'IA et la data science — et une rédaction qui couvre l'intelligence artificielle en quatre langues. Dites-nous ce que vous voulez construire.",
      ctaWork: 'Voir nos projets',
      ctaContact: 'Démarrer un projet',
      servicesTitle: 'Ce que nous construisons',
      services: [
        { title: 'Applications mobiles', body: "Des applications multiplateformes en React Native et Expo, du premier prototype à la publication sur les stores." },
        { title: 'Solutions web', body: 'Sites produits, tableaux de bord et plateformes internes bâtis sur Next.js, TypeScript et Postgres.' },
        { title: "Systèmes d'IA", body: "Assistants, pipelines de recherche documentaire et passerelles de modèles — y compris les parties ingrates : coût, latence et défense contre l'injection de requêtes." },
        { title: 'Data science', body: 'Prévision, analyse spatiale et tableaux de bord qui répondent à une décision plutôt que de tracer une courbe.' },
      ],
      workTitle: 'Projets sélectionnés',
      workSub: 'Des projets en mobile, IA, data science et outils pour développeurs.',
      viewAll: 'Voir tous les projets',
      blogTitle: 'Depuis la rédaction',
      blogSub: "Olkeri publie aussi chaque jour du journalisme sur l'IA en anglais, français, allemand et espagnol.",
      readBlog: 'Lire le blog',
      privateLabel: 'Source privée',
      viewCode: 'Voir le code',
      filterAll: 'Tous',
      workPageTitle: 'Projets',
      workPageSub: "Applications mobiles, systèmes d'IA, data science et outils pour développeurs — une sélection de ce que nous avons construit.",
      cats: { mobile: 'Applications mobiles', ai: 'IA et assistants', data: 'Data science', web: 'Plateformes web', tools: 'Outils développeur' },
    },
    legalLabels: {
      about: 'À propos',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      cookies: 'Cookies',
      disclaimer: 'Avertissement',
      editorial: 'Éditorial',
      dmca: 'DMCA',
    },
  },
  de: {
    navHome: 'Startseite',
    navBlog: 'Blog',
    navContact: 'Kontakt',
    navWork: 'Projekte',
    footerArticles: 'KI-Artikel',
    all: 'Alle',
    english: 'Englisch',
    french: 'Französisch',
    german: 'Deutsch',
    spanish: 'Spanisch',
    aiArticles: 'KI-Artikel',
    languageArticles: {
      en: 'Englische KI-Artikel',
      fr: 'Französische KI-Artikel',
      de: 'Deutsche KI-Artikel',
      es: 'Spanische KI-Artikel',
    },
    noArticles: 'Für diese Ansicht wurden noch keine Artikel veröffentlicht.',
    loading: 'Artikel werden geladen...',
    readTimeSuffix: 'Min. Lesezeit',
    views: 'Aufrufe',
    news: {
      brand: 'KI-News',
      tagline: 'KI-Nachrichten aus aller Welt — jeden Tag aktualisiert.',
      topStory: 'Top-Meldung',
      latest: 'Neueste KI-Nachrichten',
      mostRead: 'Meistgelesen',
      moreNews: 'Weitere KI-Nachrichten',
      source: 'Quelle',
      imageCredit: 'Bild',
      readIn: 'Diesen Artikel lesen auf',
      older: 'Ältere Nachrichten',
      newer: 'Neuere Nachrichten',
      backToNews: 'Alle KI-Nachrichten',
      byline: 'Von',
    },
    categories: {
      companies: 'Unternehmen',
      research: 'Forschung',
      policy: 'Politik & Regulierung',
      business: 'Wirtschaft',
      hardware: 'Hardware & Chips',
      science: 'Wissenschaft',
      society: 'Gesellschaft & Kultur',
    },
    regions: {
      global: 'Global',
      americas: 'Amerika',
      europe: 'Europa',
      asia: 'Asien',
      africa: 'Afrika',
      'middle-east': 'Naher Osten',
      oceania: 'Ozeanien',
    },
    home: {
      headline: 'KI-Nachrichten aus aller Welt',
      sub: 'Originalberichte über künstliche Intelligenz — Unternehmen, Forschung, Politik, Chips und mehr — jeden Tag auf Englisch, Französisch, Deutsch und Spanisch.',
      ctaNews: 'Neueste KI-Nachrichten',
      ctaContact: 'Kontakt aufnehmen',
      editions: 'Olkeri in Ihrer Sprache lesen',
      topToday: 'Die Top-Meldungen von heute',
    },
    contact: {
      title: 'Kontakt aufnehmen',
      intro: 'Sagen Sie uns, was entstehen soll — eine mobile App, eine Web-Plattform, ein KI- oder Datensystem. Hinweise und Korrekturen für die Redaktion sind hier ebenfalls willkommen. Wir antworten innerhalb von 24 Stunden.',
      name: 'Ihr Name',
      email: 'Ihre E-Mail',
      message: 'Ihre Nachricht',
      submit: 'Nachricht senden',
      topicLabel: 'Worum geht es?',
      topicProject: 'Ein Projekt, das gebaut werden soll',
      topicNewsroom: 'Hinweis oder Korrektur für die Redaktion',
      topicOther: 'Etwas anderes',
      sending: 'Wird gesendet…',
      success: 'Danke — Ihre Nachricht ist angekommen. Wir antworten innerhalb von 24 Stunden.',
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
      emailFallback: 'Oder schreiben Sie uns an',
    },
    startProject: {
      title: 'Etwas, das gebaut werden soll?',
      intro: 'Wir bauen mobile Apps, Web-Plattformen, KI-Systeme und Datenwerkzeuge. Schildern Sie uns das Problem, und wir sagen Ihnen ehrlich, ob wir die Richtigen sind, um es zu lösen.',
      cta: 'Projekt starten',
    },
    studio: {
      eyebrow: 'Software-Studio',
      headline: 'Wir bauen mobile Apps und Web-Lösungen',
      sub: 'Olkeri ist ein Software-Studio für Mobile, Web, KI und Data Science — und eine Redaktion, die künstliche Intelligenz in vier Sprachen begleitet. Sagen Sie uns, was entstehen soll.',
      ctaWork: 'Projekte ansehen',
      ctaContact: 'Projekt starten',
      servicesTitle: 'Was wir bauen',
      services: [
        { title: 'Mobile Anwendungen', body: 'Plattformübergreifende Apps mit React Native und Expo — vom ersten Prototyp bis zum Store-Eintrag.' },
        { title: 'Web-Lösungen', body: 'Produktseiten, Dashboards und interne Plattformen auf Basis von Next.js, TypeScript und Postgres.' },
        { title: 'KI-Systeme', body: 'Assistenten, Retrieval-Pipelines und Modell-Gateways — samt der undankbaren Teile: Kosten, Latenz und Schutz vor Prompt Injection.' },
        { title: 'Data Science', body: 'Prognosen, räumliche Analysen und Dashboards, die eine Entscheidung beantworten statt nur eine Spalte zu zeichnen.' },
      ],
      workTitle: 'Ausgewählte Arbeiten',
      workSub: 'Projekte aus Mobile, KI, Data Science und Entwicklerwerkzeugen.',
      viewAll: 'Alle Projekte ansehen',
      blogTitle: 'Aus der Redaktion',
      blogSub: 'Olkeri veröffentlicht täglich KI-Journalismus auf Englisch, Französisch, Deutsch und Spanisch.',
      readBlog: 'Zum Blog',
      privateLabel: 'Privater Quellcode',
      viewCode: 'Code ansehen',
      filterAll: 'Alle',
      workPageTitle: 'Projekte',
      workPageSub: 'Mobile Apps, KI-Systeme, Data Science und Entwicklerwerkzeuge — eine Auswahl dessen, was wir gebaut haben.',
      cats: { mobile: 'Mobile Apps', ai: 'KI und Assistenten', data: 'Data Science', web: 'Web-Plattformen', tools: 'Entwicklerwerkzeuge' },
    },
    legalLabels: {
      about: 'Über uns',
      privacy: 'Datenschutz',
      terms: 'Bedingungen',
      cookies: 'Cookies',
      disclaimer: 'Haftung',
      editorial: 'Redaktion',
      dmca: 'DMCA',
    },
  },
  es: {
    navHome: 'Inicio',
    navBlog: 'Blog',
    navContact: 'Contacto',
    navWork: 'Proyectos',
    footerArticles: 'Artículos de IA',
    all: 'Todos',
    english: 'Inglés',
    french: 'Francés',
    german: 'Alemán',
    spanish: 'Español',
    aiArticles: 'Artículos de IA',
    languageArticles: {
      en: 'Artículos de IA en inglés',
      fr: 'Artículos de IA en francés',
      de: 'Artículos de IA en alemán',
      es: 'Artículos de IA en español',
    },
    noArticles: 'Todavía no se han publicado artículos para esta vista.',
    loading: 'Cargando artículos...',
    readTimeSuffix: 'min de lectura',
    views: 'lecturas',
    news: {
      brand: 'Noticias de IA',
      tagline: 'Noticias de inteligencia artificial de todo el mundo — actualizadas cada día.',
      topStory: 'Historia principal',
      latest: 'Últimas noticias de IA',
      mostRead: 'Lo más leído',
      moreNews: 'Más noticias de IA',
      source: 'Fuente',
      imageCredit: 'Imagen',
      readIn: 'Leer este artículo en',
      older: 'Noticias anteriores',
      newer: 'Noticias más recientes',
      backToNews: 'Todas las noticias de IA',
      byline: 'Por',
    },
    categories: {
      companies: 'Empresas',
      research: 'Investigación',
      policy: 'Política y regulación',
      business: 'Negocios',
      hardware: 'Hardware y chips',
      science: 'Ciencia',
      society: 'Sociedad y cultura',
    },
    regions: {
      global: 'Global',
      americas: 'América',
      europe: 'Europa',
      asia: 'Asia',
      africa: 'África',
      'middle-east': 'Oriente Medio',
      oceania: 'Oceanía',
    },
    home: {
      headline: 'Noticias de IA de todo el mundo',
      sub: 'Información original sobre inteligencia artificial — empresas, investigación, política, chips y mucho más — publicada cada día en inglés, francés, alemán y español.',
      ctaNews: 'Últimas noticias de IA',
      ctaContact: 'Contáctanos',
      editions: 'Lee Olkeri en tu idioma',
      topToday: 'Las historias principales de hoy',
    },
    contact: {
      title: 'Ponte en contacto',
      intro: 'Cuéntanos qué quieres construir: una aplicación móvil, una plataforma web, un sistema de IA o de datos. Las noticias y correcciones para la redacción también son bienvenidas aquí. Respondemos en 24 horas.',
      name: 'Tu nombre',
      email: 'Tu correo electrónico',
      message: 'Tu mensaje',
      submit: 'Enviar mensaje',
      topicLabel: '¿De qué se trata?',
      topicProject: 'Un proyecto que construir',
      topicNewsroom: 'Noticia o corrección para la redacción',
      topicOther: 'Otra cosa',
      sending: 'Enviando…',
      success: 'Gracias: tu mensaje nos ha llegado. Respondemos en 24 horas.',
      error: 'Algo ha fallado. Inténtalo de nuevo o escríbenos directamente.',
      emailFallback: 'O escríbenos a',
    },
    startProject: {
      title: '¿Tienes algo que construir?',
      intro: 'Creamos aplicaciones móviles, plataformas web, sistemas de IA y herramientas de datos. Plantéanos el problema y te diremos con franqueza si somos las personas adecuadas para resolverlo.',
      cta: 'Empezar un proyecto',
    },
    studio: {
      eyebrow: 'Estudio de software',
      headline: 'Creamos aplicaciones móviles y soluciones web',
      sub: 'Olkeri es un estudio de software que trabaja en móvil, web, IA y ciencia de datos — y una redacción que cubre la inteligencia artificial en cuatro idiomas. Cuéntanos qué necesitas construir.',
      ctaWork: 'Ver proyectos',
      ctaContact: 'Empezar un proyecto',
      servicesTitle: 'Qué construimos',
      services: [
        { title: 'Aplicaciones móviles', body: 'Apps multiplataforma en React Native y Expo, del primer prototipo a la ficha en la tienda.' },
        { title: 'Soluciones web', body: 'Sitios de producto, paneles y plataformas internas sobre Next.js, TypeScript y Postgres.' },
        { title: 'Sistemas de IA', body: 'Asistentes, canalizaciones de recuperación y pasarelas de modelos, incluidas las partes ingratas: coste, latencia y defensa frente a la inyección de instrucciones.' },
        { title: 'Ciencia de datos', body: 'Previsión, análisis espacial y paneles que responden a una decisión en lugar de limitarse a dibujar una columna.' },
      ],
      workTitle: 'Trabajos seleccionados',
      workSub: 'Proyectos de móvil, IA, ciencia de datos y herramientas para desarrolladores.',
      viewAll: 'Ver todos los proyectos',
      blogTitle: 'Desde la redacción',
      blogSub: 'Olkeri también publica cada día periodismo sobre IA en inglés, francés, alemán y español.',
      readBlog: 'Leer el blog',
      privateLabel: 'Código privado',
      viewCode: 'Ver código',
      filterAll: 'Todos',
      workPageTitle: 'Proyectos',
      workPageSub: 'Aplicaciones móviles, sistemas de IA, ciencia de datos y herramientas para desarrolladores: una selección de lo que hemos construido.',
      cats: { mobile: 'Aplicaciones móviles', ai: 'IA y asistentes', data: 'Ciencia de datos', web: 'Plataformas web', tools: 'Herramientas para desarrolladores' },
    },
    legalLabels: {
      about: 'Sobre nosotros',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies',
      disclaimer: 'Aviso legal',
      editorial: 'Editorial',
      dmca: 'DMCA',
    },
  },
} as const

export function getArticleLanguageLabel(
  code: ArticleLanguage,
  appLanguage: ArticleLanguage
) {
  const copy = appCopy[appLanguage]

  if (code === 'en') return copy.english
  if (code === 'fr') return copy.french
  if (code === 'de') return copy.german
  return copy.spanish
}

export function isArticleLanguage(value: string): value is ArticleLanguage {
  return articleLanguages.some(language => language.code === value)
}

export function getLanguageName(code: ArticleLanguage) {
  return articleLanguages.find(language => language.code === code)?.name ?? code
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    // Transliterate accents before stripping, so a French or Spanish headline
    // becomes "modele-de-langage" rather than "mod-le-de-langage". German
    // sharp s has no decomposed form, so it is spelled out.
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getArticlePath(article: Pick<Article, 'language' | 'slug'>) {
  return `/${article.language}/${article.slug}`
}

export function getCategoryLabel(
  category: string | null | undefined,
  appLanguage: ArticleLanguage
) {
  if (!category) return null

  const labels = appCopy[appLanguage].categories as Record<string, string>

  return labels[category] ?? category
}

export function getRegionLabel(
  region: string | null | undefined,
  appLanguage: ArticleLanguage
) {
  if (!region) return null

  const labels = appCopy[appLanguage].regions as Record<string, string>

  return labels[region] ?? region
}

export function formatArticleDate(article: Article, appLanguage: ArticleLanguage) {
  const localeMap: Record<ArticleLanguage, string> = {
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
  }

  return new Date(article.published_at ?? article.created_at).toLocaleDateString(
    localeMap[appLanguage],
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
}
