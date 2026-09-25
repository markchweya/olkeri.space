/**
 * The portfolio catalogue.
 *
 * Every entry here describes real work from the GitHub account behind Olkeri.
 * Blurbs are written from each repository's own description and README rather
 * than inferred from its name, so nothing on the site claims more than the code
 * actually does. Private repositories are listed without a link: the work is
 * real, the source simply is not public.
 */

export const projectCategories = [
  { id: 'mobile', label: 'Mobile apps' },
  { id: 'ai', label: 'AI & assistants' },
  { id: 'data', label: 'Data science' },
  { id: 'web', label: 'Web platforms' },
  { id: 'tools', label: 'Developer tools' },
] as const

export type ProjectCategory = (typeof projectCategories)[number]['id']

export type Project = {
  slug: string
  name: string
  blurb: string
  category: ProjectCategory
  stack: string[]
  /** Public repository URL, or null when the source is private. */
  repo: string | null
  /** Pinned to the home page and sorted first on the work page. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'ingia',
    name: 'Ingia',
    blurb:
      'Multi-tenant event ticket scanning and verification for organisers — built to stay fast at the door, where a slow scan becomes a queue.',
    category: 'mobile',
    stack: ['Expo', 'React Native', 'TypeScript'],
    repo: null,
    featured: true,
  },
  {
    slug: 'ibia',
    name: 'ibia',
    blurb:
      'A Windows assistant that puts local and cloud AI behind one floating chat window, so the model is available without leaving the app you are in.',
    category: 'ai',
    stack: ['JavaScript', 'Desktop', 'Local LLMs'],
    repo: 'https://github.com/markchweya/ibia',
    featured: true,
  },
  {
    slug: 'vectorwatch',
    name: 'VectorWatch',
    blurb:
      'A malaria surveillance dashboard that maps county prevalence, detects LISA hotspot clusters and shows trend and 3D profiles for public-health teams.',
    category: 'data',
    stack: ['R', 'Shiny', 'Spatial statistics'],
    repo: 'https://github.com/markchweya/VectorWatch',
    featured: true,
  },
  {
    slug: 'malwarefinder',
    name: 'malwarefinder',
    blurb:
      'Inspects Bank for International Settlements publications for malicious content. Every check is byte-level and runs offline, and the design is documented with a STRIDE threat model and a scored risk register.',
    category: 'tools',
    stack: ['Python', 'Security', 'CI'],
    repo: 'https://github.com/markchweya/malwarefinder',
    featured: true,
  },
  {
    slug: 'ongealabs',
    name: 'OngeaLabs',
    blurb:
      'A text-to-speech studio for Kiswahili, Deutsch and Français, with two voices that stay consistent across every phrase and phrasing that respects punctuation.',
    category: 'ai',
    stack: ['TypeScript', 'Speech synthesis'],
    repo: 'https://github.com/markchweya/OngeaLabs',
    featured: true,
  },
  {
    slug: 'roko',
    name: 'Roko',
    blurb:
      'A local-first AI gateway that cuts OpenAI token usage by roughly 60% and blocks prompt injection before it ever reaches the API.',
    category: 'ai',
    stack: ['Gateway', 'LLM security', 'Caching'],
    repo: null,
    featured: true,
  },
  {
    slug: 'kuki',
    name: 'Kuki',
    blurb:
      'A production-style AI workspace: chat with history, text extraction from PDF, DOCX, PPTX and images, and OCR that stays on your machine.',
    category: 'ai',
    stack: ['Python', 'Streamlit', 'Ollama', 'OCR'],
    repo: 'https://github.com/markchweya/kukilabs',
  },
  {
    slug: 'baraka',
    name: 'Baraka',
    blurb:
      'A multilingual support assistant for Kenyan retail banking and SACCOs — answers customer questions from a curated FAQ base and captures the requests it cannot answer.',
    category: 'ai',
    stack: ['Python', 'NLP', 'Multilingual'],
    repo: 'https://github.com/markchweya/Baraka',
  },
  {
    slug: 'nua',
    name: 'Nua',
    blurb:
      'An institutional research copilot that grounds every answer in page-level evidence, so a claim can always be traced back to the page it came from.',
    category: 'ai',
    stack: ['TypeScript', 'RAG', 'Document AI'],
    repo: null,
  },
  {
    slug: 'patikana',
    name: 'Patikana',
    blurb:
      'An AI-assisted telecom fraud-intelligence platform, built as a working demonstration of how fraud signals surface across a carrier network.',
    category: 'ai',
    stack: ['TypeScript', 'Fraud analytics'],
    repo: null,
  },
  {
    slug: 'apertus-voice',
    name: 'apertus-voice',
    blurb:
      'An open speech-generation layer for Apertus, the Swiss open LLM — giving an open model a voice without closing the stack around it.',
    category: 'ai',
    stack: ['Python', 'Speech synthesis'],
    repo: null,
  },
  {
    slug: 'starfell-labs',
    name: 'Starfell Labs',
    blurb:
      'A self-hosted dataset hub in the shape of HuggingFace or Kaggle, built so USIU students can discover, preview and download datasets without an account anywhere.',
    category: 'web',
    stack: ['Python', 'Data platform'],
    repo: 'https://github.com/markchweya/Starfell-Labs',
  },
  {
    slug: 'sdmx-data-mcp',
    name: 'sdmx-data-mcp',
    blurb:
      'An MCP server that discovers and retrieves official statistics from SDMX services, putting national statistical data directly in reach of an AI agent.',
    category: 'tools',
    stack: ['Python', 'MCP', 'SDMX'],
    repo: 'https://github.com/markchweya/sdmx-data-mcp',
  },
  {
    slug: 'social-upload-mcp',
    name: 'social-upload-mcp',
    blurb:
      'A local MCP server for publishing video to your own YouTube channel and TikTok account, with the credentials never leaving your machine.',
    category: 'tools',
    stack: ['Python', 'MCP', 'Media APIs'],
    repo: null,
  },
  {
    slug: 'kagua',
    name: 'kagua',
    blurb:
      'Sticky notes for your localhost — leave annotations on the thing you are building, where you are building it.',
    category: 'tools',
    stack: ['TypeScript', 'Developer UX'],
    repo: 'https://github.com/markchweya/kagua',
  },
  {
    slug: 'carlab',
    name: 'CarLab',
    blurb:
      'An interactive tool for comparing cars: weight your own priorities across mileage, horsepower, weight and acceleration, then filter and rank against them.',
    category: 'data',
    stack: ['R', 'Shiny', 'Decision analysis'],
    repo: 'https://github.com/markchweya/carlab',
  },
  {
    slug: 'network-traffic-forecasting',
    name: 'Network Traffic Forecasting',
    blurb:
      'Time-series analysis of network traffic: hourly resampling, rolling averages to expose the trend, and an ARIMA model forecasting short-term demand behind a dashboard.',
    category: 'data',
    stack: ['Python', 'ARIMA', 'Jupyter'],
    repo: 'https://github.com/markchweya/Time-Series-Analysis-Project',
  },
  {
    slug: 'eda-it',
    name: 'EDA-IT',
    blurb:
      'Exploratory data analysis without the boilerplate — upload a dataset, inspect its shape, check missing and duplicate values, and generate interactive charts.',
    category: 'data',
    stack: ['Python', 'Pandas', 'Plotly'],
    repo: 'https://github.com/markchweya/eda-it',
  },
  {
    slug: 'attendance-trends',
    name: 'Student Attendance Trends',
    blurb:
      'An analysis of student attendance against academic, demographic and lifestyle variables, surfacing which courses and behaviours track with turning up.',
    category: 'data',
    stack: ['Python', 'Pandas', 'Dashboard'],
    repo: 'https://github.com/markchweya/Student-Attendance-Trends-and-Forecasting',
  },
  {
    slug: 'titanic-survival',
    name: 'Titanic Survival Predictor',
    blurb:
      'A logistic-regression model served as an interactive app, estimating survival probability from passenger class, gender and age group.',
    category: 'data',
    stack: ['R', 'Shiny', 'Logistic regression'],
    repo: 'https://github.com/markchweya/Titanic-Survival-Rate-Predictor',
  },
  {
    slug: 'project-dashboard',
    name: 'Project Dashboard',
    blurb:
      'A tracking dashboard that answers one question cleanly: how far is each project from being finished?',
    category: 'data',
    stack: ['Python', 'Dashboard'],
    repo: 'https://github.com/markchweya/Project_Dashboard',
  },
]

export const featuredProjects = projects.filter(project => project.featured)

export function getProjectsByCategory(category: ProjectCategory | 'all') {
  if (category === 'all') return projects
  return projects.filter(project => project.category === category)
}

export function countByCategory(category: ProjectCategory) {
  return projects.filter(project => project.category === category).length
}
