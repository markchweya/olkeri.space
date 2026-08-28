export const articleLanguages = [
  { code: 'en', label: 'English', name: 'English' },
  { code: 'fr', label: 'French', name: 'Francais' },
  { code: 'de', label: 'German', name: 'Deutsch' },
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
    footerArticles: 'AI Articles',
    all: 'All',
    english: 'English',
    french: 'French',
    german: 'German',
    aiArticles: 'AI Articles',
    languageArticles: {
      en: 'English AI Articles',
      fr: 'French AI Articles',
      de: 'German AI Articles',
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
      sub: 'Original reporting on artificial intelligence — companies, research, policy, chips and more — published every day in English, French and German.',
      ctaNews: 'Latest AI news',
      ctaContact: 'Contact us',
      editions: 'Read Olkeri in your language',
      topToday: "Today's top stories",
    },
    contact: {
      title: 'Get in Touch',
      intro: 'A story tip, a correction, a partnership — tell us. We respond within 24 hours.',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your message',
      submit: 'Send Message',
    },
    startProject: {
      title: 'Have a story or a tip?',
      intro: 'Olkeri covers AI news worldwide, every day, in three languages. Send us story tips, corrections or partnership requests.',
      cta: 'Contact Us',
    },
    legalLabels: {
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
    footerArticles: 'Articles IA',
    all: 'Tous',
    english: 'Anglais',
    french: 'Francais',
    german: 'Allemand',
    aiArticles: 'Articles IA',
    languageArticles: {
      en: 'Articles IA en anglais',
      fr: 'Articles IA en francais',
      de: 'Articles IA en allemand',
    },
    noArticles: 'Aucun article n a encore ete publie pour cette vue.',
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
      sub: "Des articles originaux sur l'intelligence artificielle — entreprises, recherche, politique, puces et plus — publiés chaque jour en anglais, français et allemand.",
      ctaNews: 'Dernières actus IA',
      ctaContact: 'Nous contacter',
      editions: 'Lire Olkeri dans votre langue',
      topToday: 'À la une aujourd’hui',
    },
    contact: {
      title: 'Contactez-nous',
      intro: 'Une info, une correction, un partenariat — écrivez-nous. Nous répondons sous 24 heures.',
      name: 'Votre nom',
      email: 'Votre e-mail',
      message: 'Votre message',
      submit: 'Envoyer le message',
    },
    startProject: {
      title: 'Une info à partager ?',
      intro: "Olkeri couvre l'actualité de l'IA dans le monde entier, chaque jour, en trois langues. Envoyez-nous vos infos, corrections ou demandes de partenariat.",
      cta: 'Nous contacter',
    },
    legalLabels: {
      privacy: 'Confidentialite',
      terms: 'Conditions',
      cookies: 'Cookies',
      disclaimer: 'Avertissement',
      editorial: 'Editorial',
      dmca: 'DMCA',
    },
  },
  de: {
    navHome: 'Startseite',
    navBlog: 'Blog',
    navContact: 'Kontakt',
    footerArticles: 'KI-Artikel',
    all: 'Alle',
    english: 'Englisch',
    french: 'Franzosisch',
    german: 'Deutsch',
    aiArticles: 'KI-Artikel',
    languageArticles: {
      en: 'Englische KI-Artikel',
      fr: 'Franzosische KI-Artikel',
      de: 'Deutsche KI-Artikel',
    },
    noArticles: 'Fur diese Ansicht wurden noch keine Artikel veroffentlicht.',
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
      sub: 'Originalberichte über künstliche Intelligenz — Unternehmen, Forschung, Politik, Chips und mehr — jeden Tag auf Englisch, Französisch und Deutsch.',
      ctaNews: 'Neueste KI-Nachrichten',
      ctaContact: 'Kontakt aufnehmen',
      editions: 'Olkeri in Ihrer Sprache lesen',
      topToday: 'Die Top-Meldungen von heute',
    },
    contact: {
      title: 'Kontakt aufnehmen',
      intro: 'Ein Hinweis, eine Korrektur, eine Partnerschaft — schreiben Sie uns. Wir antworten innerhalb von 24 Stunden.',
      name: 'Ihr Name',
      email: 'Ihre E-Mail',
      message: 'Ihre Nachricht',
      submit: 'Nachricht senden',
    },
    startProject: {
      title: 'Einen Hinweis für uns?',
      intro: 'Olkeri berichtet jeden Tag über KI-Nachrichten aus aller Welt — in drei Sprachen. Senden Sie uns Hinweise, Korrekturen oder Partnerschaftsanfragen.',
      cta: 'Kontakt aufnehmen',
    },
    legalLabels: {
      privacy: 'Datenschutz',
      terms: 'Bedingungen',
      cookies: 'Cookies',
      disclaimer: 'Haftung',
      editorial: 'Redaktion',
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
  return copy.german
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
  }

  return new Date(article.published_at ?? article.created_at).toLocaleDateString(
    localeMap[appLanguage],
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
}
