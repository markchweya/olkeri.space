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
}

export function getReadTime(content: string, suffix = 'min read') {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  return `${minutes} ${suffix}`
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
    contact: {
      title: 'Let us Build Something',
      intro: 'Tell us about your idea. We will respond within 24 hours with a clear next step.',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Tell us about your project',
      submit: 'Send Message',
    },
    startProject: {
      title: 'Start Your Project',
      intro: 'Let us build something exceptional. Tell us about your vision, and we will turn it into a scalable digital system.',
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
    contact: {
      title: 'Construisons quelque chose',
      intro: 'Parlez-nous de votre idee. Nous repondrons sous 24 heures avec une prochaine etape claire.',
      name: 'Votre nom',
      email: 'Votre e-mail',
      message: 'Parlez-nous de votre projet',
      submit: 'Envoyer le message',
    },
    startProject: {
      title: 'Demarrez votre projet',
      intro: 'Construisons quelque chose d exceptionnel. Parlez-nous de votre vision et nous la transformerons en systeme numerique evolutif.',
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
    contact: {
      title: 'Lassen Sie uns etwas bauen',
      intro: 'Erzahlen Sie uns von Ihrer Idee. Wir antworten innerhalb von 24 Stunden mit einem klaren nachsten Schritt.',
      name: 'Ihr Name',
      email: 'Ihre E-Mail',
      message: 'Erzahlen Sie uns von Ihrem Projekt',
      submit: 'Nachricht senden',
    },
    startProject: {
      title: 'Starten Sie Ihr Projekt',
      intro: 'Lassen Sie uns etwas Aussergewohnliches bauen. Erzahlen Sie uns von Ihrer Vision, und wir machen daraus ein skalierbares digitales System.',
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
