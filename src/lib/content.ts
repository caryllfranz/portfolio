/**
 * Single source of truth for portfolio content.
 * Every value here traces to the CV (public/caryll_cv.pdf) or prior site content.
 * Unverified numbers are intentionally omitted rather than invented.
 */

/** A run of hero intro copy; `strong` lifts it to full-contrast text. */
export type IntroSegment = { text: string; strong?: boolean };

export const profile = {
  name: "Caryll Franz M. Cariño",
  displayName: "Caryll Franz Cariño",
  /**
   * Still used by the page metadata, JSON-LD and assistant context. The hero no
   * longer renders these — it leads with `quote` and `intro` instead, which name
   * the role differently ("Software Engineer"). Worth reconciling.
   */
  disciplines: ["AI Engineer", "Data Engineer", "Data Scientist"],
  headline: "From raw data to predictions, insights, and intelligent systems.",
  summary:
    "I build AI and machine learning systems and the data infrastructure under them: training and evaluating models, wiring LLM and RAG pipelines, and engineering the pipelines that put them into production.",
  /** Hero centrepiece, in Caryll's own words. Set as a pull quote, not a headline. */
  quote: "Dreamer rather than settler. Curious about everything.",
  /**
   * Hero intro as alternating plain/emphasised segments, so the emphasis lives
   * in the data rather than as markup embedded in a copy string. Rendered by
   * joining every segment — `strong: true` ones step up to full-contrast text.
   */
  intro: [
    { text: "I'm a Software Engineer who loves " },
    { text: "building automation", strong: true },
    { text: " and these days I'm focused on " },
    { text: "Generative AI, Data Science, and Machine Learning.", strong: true },
  ] as readonly IntroSegment[],
  location: "Manila, Philippines",
  availability: "",
  email: "caryllcarino@gmail.com",
  github: "https://github.com/caryllfranz",
  linkedin: "https://linkedin.com/in/caryllfmc",
  resume: "/caryll_cv.pdf",
  /**
   * The asset is a JPEG despite the .png extension, which browsers and the
   * Next image optimizer both resolve by content sniffing. These must match the
   * file's real intrinsic size (1103x1426) — Next derives the aspect ratio and
   * the srcset candidate widths from them, so understating the width caps the
   * largest candidate below what a retina render of the hero slot needs.
   */
  portrait: "/profile_pic.png",
  portraitWidth: 1103,
  portraitHeight: 1426,
  currentRole: "Software Analyst at Accenture",
} as const;

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

/**
 * Same fact as the old profile.education string, restructured so it can
 * render as the final row of the Experience timeline instead of a sentence
 * in About. Location is inferred from the university's real campus (About
 * never stated it, but Adamson University is in Manila) — flag if that
 * should instead read "Philippines" or be omitted.
 */
export const education: Education = {
  degree: "B.S. Computer Engineering",
  institution: "Adamson University",
  location: "Manila, Philippines",
  period: "2024",
};

export const about = {
  paragraphs: [
    "I work as a Software Analyst at Accenture, where most of my engineering time goes to Python automation for SQL reporting, enterprise application support in Oracle environments, and workflow automation across teams.",
    "My focus is the full path from data to decision: ingesting and transforming data, training and evaluating models, wiring retrieval and LLM layers into applications, and exposing all of it through APIs that something real can consume.",
    "I build interfaces when the system needs one, but the interesting problem is almost always behind it.",
  ],
  pipeline: [
    "Raw data",
    "Cleaning",
    "EDA",
    "Modeling",
    "Insights",
    "Application",
  ],
} as const;

export type SkillGroup = {
  title: string;
  items: readonly string[];
};

/**
 * Supplied directly by Caryll, verbatim. Rendered as a category label plus a
 * dense inline tag list — no descriptions, no proficiency indicators.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "React",
      "React Native",
      "Next.js",
    ],
  },
  {
    title: "Backend",
    items: [
      "Python",
      "Java",
      "FastAPI",
      "Spring Boot",
      "SQL",
      "PostgreSQL",
      "MySQL",
      "Supabase",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Azure",
      "Azure AI Foundry",
      "Azure AI Search",
      "Docker",
      "Linux",
      "Azure DevOps",
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Generative AI",
      "RAG",
      "LangGraph",
      "LLM Integration",
      "Azure OpenAI",
      "OpenRouter",
      "Claude",
      "Prompt Engineering",
      "Pandas",
      "XGBoost",
      "SHAP",
      "OpenCV",
      "OpenCode",
      "Codex"
    ],
  },
  {
    title: "CMS & No-Code",
    items: [
      "Power Apps",
      "Power Automate",
      "n8n",
      "Microsoft 365",
    ],
  },
  {
    title: "Developer Tools",
    items: [
      "VS Code",
      "JetBrains IntelliJ",
      "PyCharm",
      "Jira",
      "Discord",
      "Microsoft Teams",
    ],
  },
] as const;

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  /**
   * One-line card description, compressed from `solution` below. Asserts
   * nothing that `solution` does not already state. `kind` and `year` are
   * retained for the assistant's context but are no longer rendered on cards.
   */
  blurb: string;
  problem: string;
  solution: string;
  data: string;
  method: string;
  contribution: string;
  architecture: readonly string[];
  stack: readonly string[];
  results: readonly string[];
  github: string | null;
  demo: string | null;
};

export const projects: readonly Project[] = [
  {
    slug: "data-analyst-agent",
    name: "Data Analyst Agent",
    kind: "AI Engineering · Data Science",
    year: "2026",
    blurb:
      "AI-powered data analysis platform that automates profiling, EDA, visualization, and business insights from datasets.",
    problem:
      "Analyzing CSV and Excel datasets requires repetitive profiling, exploration, visualization, and interpretation before useful insights can be produced.",
    solution:
      "An AI-powered analysis platform that orchestrates data profiling, exploratory analysis, visualization, machine learning, and AI-generated business insights through a LangGraph workflow.",
    data: "CSV and Excel datasets.",
    method:
      "LangGraph-based multi-agent workflow with Pandas, Plotly, and AI-generated analysis.",
    contribution:
      "Built the FastAPI backend and LangGraph orchestration, implemented data profiling and EDA workflows, and integrated visualization and AI-generated business insights.",
    architecture: [
      "CSV / Excel upload",
      "Data profiling",
      "EDA",
      "Visualization",
      "LangGraph orchestration",
      "AI-generated insights",
      "Interactive dashboard",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "LangGraph",
      "Pandas",
      "Plotly",
    ],
    results: [
      "Automated dataset profiling and EDA",
      "AI-generated business insights",
      "Interactive data visualizations",
    ],
    github: "https://github.com/caryllfranz/data-analyst-agent",
    demo: "https://data-analyst-agent.vercel.app/",
  },

  {
    slug: "azure-ai-helpdesk",
    name: "Azure AI Helpdesk Chatbot",
    kind: "AI Engineering · RAG",
    year: "2025",
    blurb:
      "Retrieval-augmented chatbot that grounds responses in indexed internal documentation.",
    problem:
      "Support teams repeatedly searched through internal documentation to answer common questions, while a standalone LLM could generate unsupported answers.",
    solution:
      "A RAG-based helpdesk chatbot that preprocesses internal documents, retrieves relevant content through Azure AI Search, and generates grounded responses using Azure OpenAI.",
    data: "Internal support documentation, chunked and embedded.",
    method:
      "Document preprocessing, embeddings, vector retrieval with Azure AI Search, and grounded generation with Azure OpenAI.",
    contribution:
      "Built the document ingestion and chunking pipeline, integrated Azure AI Search and Azure OpenAI, and designed the RAG flow for grounded responses.",
    architecture: [
      "Documents",
      "Preprocessing & chunking",
      "Embeddings",
      "Azure AI Search",
      "Retrieval",
      "Azure OpenAI",
      "Grounded answer",
    ],
    stack: [
      "Azure OpenAI",
      "Azure AI Search",
      "Azure AI Foundry",
      "Python",
      "RAG",
      "Embeddings",
    ],
    results: [
      "Document-grounded responses",
      "Source-bounded answers",
    ],
    github: null,
    demo: null,
  },

  {
    slug: "ds-salary-predictor",
    name: "DS Salary Predictor",
    kind: "Machine Learning · End-to-end",
    year: "2025",
    blurb:
      "End-to-end salary prediction pipeline using XGBoost with SHAP explainability.",
    problem:
      "Salary predictions are difficult to interpret without understanding which factors influence the result.",
    solution:
      "A gradient-boosted regression pipeline that predicts data science salaries and uses SHAP to explain the key drivers behind each prediction.",
    data: "Survey dataset with 162 engineered features.",
    method:
      "XGBoost gradient-boosted regression with SHAP attribution.",
    contribution:
      "Owned the pipeline end to end, including feature engineering, model training, evaluation, SHAP explainability, and Streamlit deployment.",
    architecture: [
      "Raw survey data",
      "Cleaning & feature engineering",
      "XGBoost training",
      "Evaluation",
      "SHAP attribution",
      "Streamlit app",
    ],
    stack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Streamlit",
    ],
    results: [
      "162 engineered features",
      "Per-prediction SHAP explanations",
      "Interactive salary prediction dashboard",
    ],
    github: "https://github.com/caryllfranz/ds-salary-predictor",
    demo: null,
  },

  {
    slug: "babai",
    name: "BabAI",
    kind: "AI Application · Mobile",
    year: "2025",
    blurb:
      "AI-powered commuter assistant that detects proximity to destinations and provides real-time alerts.",
    problem:
      "Commuters can miss their destination when trains are crowded or station announcements are difficult to hear.",
    solution:
      "A mobile commuter assistant that uses GPS proximity detection to trigger destination alerts, with an LLM-powered chatbot for commuter assistance.",
    data: "Live GPS location data and station coordinates.",
    method:
      "Haversine distance for station proximity detection and OpenRouter LLM integration for conversational assistance.",
    contribution:
      "Built the FastAPI backend and Supabase data layer, implemented GPS-based destination detection and push notifications, and integrated the LLM chatbot.",
    architecture: [
      "GPS stream",
      "Haversine station matching",
      "FastAPI",
      "Supabase / PostgreSQL",
      "OpenRouter LLM",
      "React Native app",
    ],
    stack: [
      "React Native",
      "Expo",
      "FastAPI",
      "Python",
      "Supabase",
      "PostgreSQL",
      "OpenRouter API",
    ],
    results: [
      "Automatic destination alerts",
      "Real-time push notifications",
      "LLM-powered commuter assistance",
    ],
    github: "https://github.com/caryllfranz/babAI",
    demo: null,
  },

  {
    slug: "apex-gym-management",
    name: "Apex Gym Management System",
    kind: "Automation · Full-stack",
    year: "2026",
    blurb:
      "Gym management and booking platform that automates reservations, membership tracking, and notifications.",
    problem:
      "Manual booking and membership processes make it difficult to manage schedules, expirations, and customer notifications efficiently.",
    solution:
      "A centralized gym management system for handling gym, basketball, pickleball, and coaching reservations alongside membership tracking and automated notifications.",
    data: "Membership, booking, schedule, and customer records.",
    method:
      "Full-stack booking system with PostgreSQL, API workflows, and automated notifications.",
    contribution:
      "Designed the booking workflow, membership management, scheduling logic, and automation flows for gym operations.",
    architecture: [
      "Customer booking",
      "Booking management",
      "Membership tracking",
      "PostgreSQL",
      "Automation workflows",
      "Notifications",
    ],
    stack: [
      "Next.js",
      "Supabase",
      "n8n",
    ],
    results: [
      "Automated booking workflows",
      "Membership expiration tracking",
      "Automated customer notifications",
    ],
    github: null,
    demo: null,
  },

  {
    slug: "spotsecure",
    name: "SpotSecure",
    kind: "Computer Vision · IoT · Thesis",
    year: "2024",
    blurb:
      "Smart parking reservation system with automatic license plate recognition and vehicle access control.",
    problem:
      "Manual parking verification and gate access make vehicle entry slower and harder to manage.",
    solution:
      "A parking reservation system that recognizes license plates, matches vehicles against reservations, and automatically controls physical gate access.",
    data: "Camera frames, license plates, and parking reservation records.",
    method:
      "OpenCV image preprocessing with Plate Recognizer API for license plate recognition.",
    contribution:
      "Built the Python service and REST API, integrated license plate recognition with the reservation system, and connected the Raspberry Pi and IoT hardware for automated access control.",
    architecture: [
      "Camera capture",
      "OpenCV preprocessing",
      "License plate recognition",
      "Reservation matching",
      "REST API",
      "Raspberry Pi control",
      "Flutter app",
    ],
    stack: [
      "Flutter",
      "Python",
      "OpenCV",
      "Plate Recognizer API",
      "REST API",
      "Raspberry Pi",
      "IoT",
    ],
    results: [
      "Automated license plate verification",
      "Reservation-based vehicle access",
      "Automated physical gate control",
    ],
    github: "https://github.com/caryllfranz/LPR",
    demo: null,
  },

  {
  slug: "yolov5-charger-detection",
  name: "YOLOv5 Charger Detection",
  kind: "Computer Vision · Object Detection",
  year: "2025",
  blurb:
    "Object detection model for identifying AC, DC, and battery chargers using YOLOv5 and OpenCV.",
  problem:
    "Different charger types can be difficult to identify automatically from images.",
  solution:
    "A YOLOv5 object detection model trained to identify AC, DC, and battery chargers from images.",
  data: "Custom charger image dataset prepared using Roboflow.",
  method:
    "YOLOv5 object detection with OpenCV for image processing and inference.",
  contribution:
    "Prepared the dataset, trained and evaluated the YOLOv5 model, and implemented the detection pipeline using OpenCV.",
  architecture: [
    "Image input",
    "Roboflow dataset",
    "YOLOv5 training",
    "Object detection",
    "OpenCV processing",
    "Detection output",
  ],
  stack: [
    "Python",
    "YOLOv5",
    "OpenCV",
    "Roboflow",
    "Google Colab",
  ],
  results: [
    "AC charger detection",
    "DC charger detection",
    "Battery charger detection",
  ],
  github: null,
  demo: null,
},
] as const;;

export const workflowStages = [
  { label: "Raw data", note: "Databases, APIs, files, sensors" },
  { label: "Cleaning", note: "Missing values, outliers, inconsistencies" },
  { label: "EDA", note: "Distributions, correlations, hypotheses" },
  { label: "Feature engineering", note: "Transformation, encoding, selection" },
  { label: "ML / AI", note: "Training, evaluation, retrieval, LLMs" },
  { label: "Insights", note: "Attribution, reporting, dashboards" },
  { label: "Application", note: "APIs, dashboards, products" },
] as const;

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    role: "Software Analyst",
    company: "Accenture",
    location: "Mandaluyong, Philippines",
    period: "2026 - Present",
    bullets: [
      "Automated SQL reporting workflows with Python scripts, reducing manual processing time and recurring reporting errors.",
      "Validated and optimized SQL queries against production data to troubleshoot and resolve data integrity issues.",
      "Built and maintained workflow automations using Microsoft Power Automate and Power Apps.",
      "Maintained and enhanced enterprise Java applications in Oracle environments.",
      "Used Git and Azure DevOps for version control, branching, and code collaboration across development tasks.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Accenture",
    location: "Mandaluyong, Philippines",
    period: "2024 - 2025",
    bullets: [
      "Completed Full Stack Java training covering Java, Spring Boot, SQL, and ReactJS.",
      "Provided application support by resolving ServiceNow tickets, troubleshooting Windows and Linux environments, analyzing application logs, and restarting services.",
      "Collaborated with cross-functional teams to troubleshoot and resolve production issues in a timely manner.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Techomancer Inc.",
    location: "Quezon City, Philippines",
    period: "2023",
    bullets: [
      "Developed and maintained web applications using PHP, Laravel, MySQL, JavaScript, HTML, and CSS.",
      "Used Jira to manage tasks and track progress within Agile sprint cycles.",
      "Collaborated with the development team during sprint planning and task execution.",
    ],
  },
] as const;

/**
 * Not rendered as sections — `about`, `workflowStages` and `focusAreas` are
 * kept solely because they feed the assistant's context in lib/portfolio.ts.
 */
export const focusAreas = [
  "AI Systems",
  "Data Platforms",
  "Machine Learning Solutions",
  "Intelligent Automation",
] as const;

export const certifications = [
  { name: "Claude 101", issuer: "Anthropic" },
  { name: "Data Analytics Essentials", issuer: "Cisco" },
  { name: "Intermediate Python", issuer: "DataCamp" },
  { name: "Python & Advanced SQL", issuer: "Kaggle" },
] as const;

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Certifications", href: "#certifications" },
] as const;
