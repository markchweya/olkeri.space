import type { ArticleLanguage } from '@/lib/articles'

/**
 * The portfolio catalogue.
 *
 * Every entry here describes real work from the GitHub account behind Olkeri.
 * Blurbs are written from each repository's own description, README or source
 * rather than inferred from its name, so nothing on the site claims more than
 * the code actually does. Private repositories are listed without a link: the
 * work is real, the source simply is not public.
 *
 * Blurbs carry all four site languages. Stack labels deliberately do not —
 * they are technology names, and translating "Shiny" or "ARIMA" would make
 * them harder to recognise, not easier.
 */

export type LocalizedText = Record<ArticleLanguage, string>

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
  blurb: LocalizedText
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
    blurb: {
      en: 'Multi-tenant event ticket scanning and verification for organisers — built to stay fast at the door, where a slow scan becomes a queue.',
      fr: "Scan et vérification de billets multi-organisateurs — conçu pour rester rapide à l'entrée, là où un scan lent devient une file d'attente.",
      de: 'Mandantenfähiges Scannen und Prüfen von Eventtickets — gebaut, um am Einlass schnell zu bleiben, wo ein langsamer Scan zur Schlange wird.',
      es: 'Escaneo y verificación de entradas multiorganizador, pensado para no perder velocidad en la puerta, donde un escaneo lento se convierte en una cola.',
    },
    category: 'mobile',
    stack: ['Expo', 'React Native', 'TypeScript'],
    repo: null,
    featured: true,
  },
  {
    slug: 'ibia',
    name: 'ibia',
    blurb: {
      en: 'A Windows assistant that puts local and cloud AI behind one floating chat window, so the model is available without leaving the app you are in.',
      fr: "Un assistant Windows qui réunit IA locale et IA en ligne dans une fenêtre de discussion flottante, pour garder le modèle à portée sans quitter l'application en cours.",
      de: 'Ein Windows-Assistent, der lokale und Cloud-KI hinter einem schwebenden Chatfenster vereint — das Modell bleibt erreichbar, ohne die laufende Anwendung zu verlassen.',
      es: 'Un asistente para Windows que reúne la IA local y la de nube en una ventana de chat flotante, de modo que el modelo está a mano sin salir de la aplicación en uso.',
    },
    category: 'ai',
    stack: ['JavaScript', 'Desktop', 'Local LLMs'],
    repo: 'https://github.com/markchweya/ibia',
    featured: true,
  },
  {
    slug: 'zazu-zanzibar',
    name: 'Zazu Zanzibar',
    blurb: {
      en: 'A cinematic marketing site for a tour guide in Uroa, Zanzibar. Scrolling dives the camera underwater: a depth gauge tracks how far down you are, an animated map traces each tour, and the footer settles on the ocean floor.',
      fr: "Un site vitrine cinématographique pour un guide touristique d'Uroa, à Zanzibar. Le défilement fait plonger la caméra sous l'eau: une jauge de profondeur indique où vous en êtes, une carte animée retrace chaque excursion et le pied de page se pose sur le fond marin.",
      de: 'Eine filmische Marketing-Website für einen Reiseführer in Uroa auf Sansibar. Beim Scrollen taucht die Kamera unter Wasser: Eine Tiefenanzeige verfolgt, wie weit unten man ist, eine animierte Karte zeichnet jede Tour nach, und der Fußbereich kommt auf dem Meeresgrund zur Ruhe.',
      es: 'Un sitio de marketing cinematográfico para un guía turístico de Uroa, en Zanzíbar. Al desplazarte, la cámara se sumerge: un medidor de profundidad marca a qué altura vas, un mapa animado traza cada excursión y el pie de página se posa en el fondo marino.',
    },
    category: 'web',
    stack: ['TanStack Start', 'React', 'Framer Motion'],
    repo: null,
    featured: true,
  },
  {
    slug: 'vectorwatch',
    name: 'VectorWatch',
    blurb: {
      en: 'A malaria surveillance dashboard that maps county prevalence, detects LISA hotspot clusters and shows trend and 3D profiles for public-health teams.',
      fr: 'Un tableau de bord de surveillance du paludisme qui cartographie la prévalence par comté, détecte les grappes de points chauds LISA et affiche tendances et profils 3D pour les équipes de santé publique.',
      de: 'Ein Dashboard zur Malaria-Überwachung: Prävalenz nach Bezirk kartiert, LISA-Hotspot-Cluster erkannt, Trends und 3D-Profile für Teams im öffentlichen Gesundheitswesen.',
      es: 'Un panel de vigilancia de la malaria que cartografía la prevalencia por condado, detecta conglomerados LISA de puntos calientes y muestra tendencias y perfiles en 3D para equipos de salud pública.',
    },
    category: 'data',
    stack: ['R', 'Shiny', 'Spatial statistics'],
    repo: 'https://github.com/markchweya/VectorWatch',
    featured: true,
  },
  {
    slug: 'ongealabs',
    name: 'OngeaLabs',
    blurb: {
      en: 'A text-to-speech studio for Kiswahili, Deutsch and Français, with two voices that stay consistent across every phrase and phrasing that respects punctuation.',
      fr: "Un studio de synthèse vocale pour le kiswahili, l'allemand et le français, avec deux voix qui restent cohérentes d'une phrase à l'autre et un phrasé qui respecte la ponctuation.",
      de: 'Ein Text-to-Speech-Studio für Kiswahili, Deutsch und Französisch mit zwei Stimmen, die über jeden Satz hinweg konsistent bleiben, und einer Phrasierung, die Satzzeichen beachtet.',
      es: 'Un estudio de síntesis de voz para suajili, alemán y francés, con dos voces que se mantienen constantes en cada frase y un fraseo que respeta la puntuación.',
    },
    category: 'ai',
    stack: ['TypeScript', 'Speech synthesis'],
    repo: 'https://github.com/markchweya/OngeaLabs',
    featured: true,
  },
  {
    slug: 'roko',
    name: 'Roko',
    blurb: {
      en: 'A local-first AI gateway that cuts OpenAI token usage by roughly 60% and blocks prompt injection before it ever reaches the API.',
      fr: "Une passerelle d'IA privilégiant le local, qui réduit d'environ 60 % la consommation de jetons OpenAI et bloque l'injection de requêtes avant qu'elle n'atteigne l'API.",
      de: 'Ein lokal ausgerichtetes KI-Gateway, das den OpenAI-Tokenverbrauch um rund 60 Prozent senkt und Prompt Injection abfängt, bevor sie die API erreicht.',
      es: 'Una pasarela de IA que prioriza lo local, recorta en torno al 60 % el consumo de tokens de OpenAI y bloquea la inyección de instrucciones antes de que llegue a la API.',
    },
    category: 'ai',
    stack: ['Gateway', 'LLM security', 'Caching'],
    repo: null,
    featured: true,
  },
  {
    slug: 'malwarefinder',
    name: 'malwarefinder',
    blurb: {
      en: 'Inspects Bank for International Settlements publications for malicious content. Every check is byte-level and runs offline, and the design is documented with a STRIDE threat model and a scored risk register.',
      fr: "Inspecte les publications de la Banque des règlements internationaux à la recherche de contenus malveillants. Chaque contrôle se fait au niveau de l'octet et fonctionne hors ligne, et la conception est documentée par un modèle de menaces STRIDE et un registre de risques noté.",
      de: 'Prüft Veröffentlichungen der Bank für Internationalen Zahlungsausgleich auf Schadinhalte. Jede Prüfung arbeitet auf Byte-Ebene und läuft offline; der Entwurf ist mit einem STRIDE-Bedrohungsmodell und einem bewerteten Risikoregister dokumentiert.',
      es: 'Inspecciona las publicaciones del Banco de Pagos Internacionales en busca de contenido malicioso. Cada comprobación es a nivel de bytes y funciona sin conexión, y el diseño está documentado con un modelo de amenazas STRIDE y un registro de riesgos puntuado.',
    },
    category: 'tools',
    stack: ['Python', 'Security', 'CI'],
    repo: 'https://github.com/markchweya/malwarefinder',
  },
  {
    slug: 'kuki',
    name: 'Kuki',
    blurb: {
      en: 'A production-style AI workspace: chat with history, text extraction from PDF, DOCX, PPTX and images, and OCR that stays on your machine.',
      fr: "Un espace de travail IA de qualité production: discussion avec historique, extraction de texte depuis PDF, DOCX, PPTX et images, et OCR qui ne quitte jamais votre machine.",
      de: 'Ein produktionsreifer KI-Arbeitsplatz: Chat mit Verlauf, Textextraktion aus PDF, DOCX, PPTX und Bildern sowie OCR, die auf dem eigenen Rechner bleibt.',
      es: 'Un espacio de trabajo de IA con acabado de producción: chat con historial, extracción de texto de PDF, DOCX, PPTX e imágenes, y OCR que no sale de tu equipo.',
    },
    category: 'ai',
    stack: ['Python', 'Streamlit', 'Ollama', 'OCR'],
    repo: 'https://github.com/markchweya/kukilabs',
  },
  {
    slug: 'baraka',
    name: 'Baraka',
    blurb: {
      en: 'A multilingual support assistant for Kenyan retail banking and SACCOs — answers customer questions from a curated FAQ base and captures the requests it cannot answer.',
      fr: "Un assistant d'assistance multilingue pour la banque de détail kényane et les SACCO: il répond aux questions des clients à partir d'une base de FAQ curée et enregistre les demandes auxquelles il ne peut pas répondre.",
      de: 'Ein mehrsprachiger Support-Assistent für das kenianische Privatkundengeschäft und SACCOs: Er beantwortet Kundenfragen aus einer gepflegten FAQ-Basis und nimmt die Anliegen auf, die er nicht beantworten kann.',
      es: 'Un asistente de soporte multilingüe para la banca minorista keniana y las SACCO: responde a las preguntas de los clientes desde una base de preguntas frecuentes curada y registra las solicitudes que no puede resolver.',
    },
    category: 'ai',
    stack: ['Python', 'NLP', 'Multilingual'],
    repo: 'https://github.com/markchweya/Baraka',
  },
  {
    slug: 'nua',
    name: 'Nua',
    blurb: {
      en: 'An institutional research copilot that grounds every answer in page-level evidence, so a claim can always be traced back to the page it came from.',
      fr: "Un copilote de recherche institutionnelle qui fonde chaque réponse sur des preuves au niveau de la page, de sorte qu'une affirmation puisse toujours être retracée jusqu'à sa source.",
      de: 'Ein Recherche-Copilot für Institutionen, der jede Antwort auf seitengenaue Belege stützt, sodass sich jede Aussage bis zur Ursprungsseite zurückverfolgen lässt.',
      es: 'Un copiloto de investigación institucional que fundamenta cada respuesta en evidencia a nivel de página, de modo que toda afirmación pueda rastrearse hasta la página de la que procede.',
    },
    category: 'ai',
    stack: ['TypeScript', 'RAG', 'Document AI'],
    repo: null,
  },
  {
    slug: 'patikana',
    name: 'Patikana',
    blurb: {
      en: 'An AI-assisted telecom fraud-intelligence platform, built as a working demonstration of how fraud signals surface across a carrier network.',
      fr: "Une plateforme de renseignement sur la fraude télécom assistée par IA, conçue comme une démonstration opérationnelle de la manière dont les signaux de fraude émergent sur le réseau d'un opérateur.",
      de: 'Eine KI-gestützte Plattform für Betrugsaufklärung im Telekommunikationsbereich, gebaut als funktionsfähige Demonstration, wie Betrugssignale in einem Netz sichtbar werden.',
      es: 'Una plataforma de inteligencia contra el fraude en telecomunicaciones asistida por IA, construida como demostración funcional de cómo afloran las señales de fraude en la red de un operador.',
    },
    category: 'ai',
    stack: ['TypeScript', 'Fraud analytics'],
    repo: null,
  },
  {
    slug: 'apertus-voice',
    name: 'apertus-voice',
    blurb: {
      en: 'An open speech-generation layer for Apertus, the Swiss open LLM — giving an open model a voice without closing the stack around it.',
      fr: "Une couche ouverte de génération vocale pour Apertus, le LLM ouvert suisse: donner une voix à un modèle ouvert sans refermer la pile autour de lui.",
      de: 'Eine offene Sprachsynthese-Schicht für Apertus, das offene Schweizer LLM — sie gibt einem offenen Modell eine Stimme, ohne den Stack darum herum zu schließen.',
      es: 'Una capa abierta de generación de voz para Apertus, el LLM abierto suizo: dar voz a un modelo abierto sin cerrar la pila a su alrededor.',
    },
    category: 'ai',
    stack: ['Python', 'Speech synthesis'],
    repo: null,
  },
  {
    slug: 'starfell-labs',
    name: 'Starfell Labs',
    blurb: {
      en: 'A self-hosted dataset hub in the shape of HuggingFace or Kaggle, built so USIU students can discover, preview and download datasets without an account anywhere.',
      fr: "Un dépôt de jeux de données auto-hébergé, dans l'esprit de HuggingFace ou Kaggle, pour que les étudiants de l'USIU puissent découvrir, prévisualiser et télécharger des jeux de données sans compte nulle part.",
      de: 'Ein selbst gehosteter Datensatz-Hub im Zuschnitt von HuggingFace oder Kaggle, damit Studierende der USIU Datensätze finden, ansehen und herunterladen können — ganz ohne Konto irgendwo.',
      es: 'Un repositorio de conjuntos de datos autoalojado con la forma de HuggingFace o Kaggle, para que el alumnado de la USIU descubra, previsualice y descargue datos sin necesidad de una cuenta en ninguna parte.',
    },
    category: 'web',
    stack: ['Python', 'Data platform'],
    repo: 'https://github.com/markchweya/Starfell-Labs',
  },
  {
    slug: 'sdmx-data-mcp',
    name: 'sdmx-data-mcp',
    blurb: {
      en: 'An MCP server that discovers and retrieves official statistics from SDMX services, putting national statistical data directly in reach of an AI agent.',
      fr: "Un serveur MCP qui découvre et récupère les statistiques officielles publiées via SDMX, mettant les données statistiques nationales à portée directe d'un agent d'IA.",
      de: 'Ein MCP-Server, der amtliche Statistiken über SDMX-Dienste auffindet und abruft und damit nationale Statistikdaten direkt in die Reichweite eines KI-Agenten bringt.',
      es: 'Un servidor MCP que descubre y recupera estadísticas oficiales de servicios SDMX, poniendo los datos estadísticos nacionales al alcance directo de un agente de IA.',
    },
    category: 'tools',
    stack: ['Python', 'MCP', 'SDMX'],
    repo: 'https://github.com/markchweya/sdmx-data-mcp',
  },
  {
    slug: 'social-upload-mcp',
    name: 'social-upload-mcp',
    blurb: {
      en: 'A local MCP server for publishing video to your own YouTube channel and TikTok account, with the credentials never leaving your machine.',
      fr: 'Un serveur MCP local pour publier des vidéos sur votre propre chaîne YouTube et votre compte TikTok, sans que les identifiants quittent jamais votre machine.',
      de: 'Ein lokaler MCP-Server, um Videos auf den eigenen YouTube-Kanal und das eigene TikTok-Konto zu veröffentlichen — die Zugangsdaten verlassen den Rechner nie.',
      es: 'Un servidor MCP local para publicar vídeo en tu propio canal de YouTube y tu cuenta de TikTok, sin que las credenciales salgan nunca de tu equipo.',
    },
    category: 'tools',
    stack: ['Python', 'MCP', 'Media APIs'],
    repo: null,
  },
  {
    slug: 'kagua',
    name: 'kagua',
    blurb: {
      en: 'Sticky notes for your localhost — leave annotations on the thing you are building, where you are building it.',
      fr: 'Des pense-bêtes pour votre localhost: laissez des annotations sur ce que vous construisez, là même où vous le construisez.',
      de: 'Haftnotizen für den localhost: Anmerkungen direkt an dem, was gerade gebaut wird — dort, wo es gebaut wird.',
      es: 'Notas adhesivas para tu localhost: deja anotaciones sobre lo que estás construyendo, justo donde lo construyes.',
    },
    category: 'tools',
    stack: ['TypeScript', 'Developer UX'],
    repo: 'https://github.com/markchweya/kagua',
  },
  {
    slug: 'carlab',
    name: 'CarLab',
    blurb: {
      en: 'An interactive tool for comparing cars: weight your own priorities across mileage, horsepower, weight and acceleration, then filter and rank against them.',
      fr: 'Un outil interactif de comparaison automobile: pondérez vos propres priorités entre consommation, puissance, poids et accélération, puis filtrez et classez en conséquence.',
      de: 'Ein interaktives Werkzeug zum Autovergleich: eigene Prioritäten zwischen Verbrauch, Leistung, Gewicht und Beschleunigung gewichten, dann danach filtern und ordnen.',
      es: 'Una herramienta interactiva para comparar coches: pondera tus propias prioridades entre consumo, potencia, peso y aceleración, y luego filtra y ordena según ellas.',
    },
    category: 'data',
    stack: ['R', 'Shiny', 'Decision analysis'],
    repo: 'https://github.com/markchweya/carlab',
  },
  {
    slug: 'network-traffic-forecasting',
    name: 'Network Traffic Forecasting',
    blurb: {
      en: 'Time-series analysis of network traffic: hourly resampling, rolling averages to expose the trend, and an ARIMA model forecasting short-term demand behind a dashboard.',
      fr: 'Analyse de séries temporelles du trafic réseau: rééchantillonnage horaire, moyennes glissantes pour dégager la tendance et un modèle ARIMA prévoyant la demande à court terme derrière un tableau de bord.',
      de: 'Zeitreihenanalyse des Netzwerkverkehrs: stündliche Aggregation, gleitende Mittelwerte zur Freilegung des Trends und ein ARIMA-Modell, das die kurzfristige Last hinter einem Dashboard prognostiziert.',
      es: 'Análisis de series temporales del tráfico de red: remuestreo por hora, medias móviles para exponer la tendencia y un modelo ARIMA que prevé la demanda a corto plazo tras un panel.',
    },
    category: 'data',
    stack: ['Python', 'ARIMA', 'Jupyter'],
    repo: 'https://github.com/markchweya/Time-Series-Analysis-Project',
  },
  {
    slug: 'eda-it',
    name: 'EDA-IT',
    blurb: {
      en: 'Exploratory data analysis without the boilerplate — upload a dataset, inspect its shape, check missing and duplicate values, and generate interactive charts.',
      fr: "L'analyse exploratoire sans le code répétitif: importez un jeu de données, examinez sa structure, repérez valeurs manquantes et doublons, et générez des graphiques interactifs.",
      de: 'Explorative Datenanalyse ohne Boilerplate: Datensatz hochladen, Struktur prüfen, fehlende und doppelte Werte finden und interaktive Diagramme erzeugen.',
      es: 'Análisis exploratorio de datos sin código repetitivo: sube un conjunto de datos, examina su forma, revisa valores ausentes y duplicados y genera gráficos interactivos.',
    },
    category: 'data',
    stack: ['Python', 'Pandas', 'Plotly'],
    repo: 'https://github.com/markchweya/eda-it',
  },
  {
    slug: 'attendance-trends',
    name: 'Student Attendance Trends',
    blurb: {
      en: 'An analysis of student attendance against academic, demographic and lifestyle variables, surfacing which courses and behaviours track with turning up.',
      fr: "Une analyse de l'assiduité des étudiants au regard de variables scolaires, démographiques et de mode de vie, mettant en évidence les cours et les comportements qui vont de pair avec la présence.",
      de: 'Eine Auswertung der Anwesenheit von Studierenden gegen akademische, demografische und Lebensstil-Variablen — sie zeigt, welche Kurse und Verhaltensweisen mit dem Erscheinen einhergehen.',
      es: 'Un análisis de la asistencia del alumnado frente a variables académicas, demográficas y de estilo de vida, que revela qué asignaturas y qué hábitos acompañan a presentarse a clase.',
    },
    category: 'data',
    stack: ['Python', 'Pandas', 'Dashboard'],
    repo: 'https://github.com/markchweya/Student-Attendance-Trends-and-Forecasting',
  },
  {
    slug: 'titanic-survival',
    name: 'Titanic Survival Predictor',
    blurb: {
      en: 'A logistic-regression model served as an interactive app, estimating survival probability from passenger class, gender and age group.',
      fr: "Un modèle de régression logistique servi sous forme d'application interactive, estimant la probabilité de survie à partir de la classe, du genre et de la tranche d'âge du passager.",
      de: 'Ein Modell der logistischen Regression als interaktive Anwendung, das die Überlebenswahrscheinlichkeit aus Klasse, Geschlecht und Altersgruppe schätzt.',
      es: 'Un modelo de regresión logística servido como aplicación interactiva, que estima la probabilidad de supervivencia a partir de la clase, el género y el grupo de edad del pasajero.',
    },
    category: 'data',
    stack: ['R', 'Shiny', 'Logistic regression'],
    repo: 'https://github.com/markchweya/Titanic-Survival-Rate-Predictor',
  },
  {
    slug: 'project-dashboard',
    name: 'Project Dashboard',
    blurb: {
      en: 'A tracking dashboard that answers one question cleanly: how far is each project from being finished?',
      fr: "Un tableau de bord de suivi qui répond proprement à une seule question: à quelle distance chaque projet est-il de son achèvement ?",
      de: 'Ein Dashboard zur Fortschrittsverfolgung, das eine einzige Frage sauber beantwortet: Wie weit ist jedes Projekt noch vom Abschluss entfernt?',
      es: 'Un panel de seguimiento que responde con claridad a una sola pregunta: ¿cuánto le falta a cada proyecto para estar terminado?',
    },
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
