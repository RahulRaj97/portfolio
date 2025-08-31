// src/data/resume.ts
export type WorkItem = {
  company: string;
  role: string;
  location: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or undefined (present)
  bullets: string[];
  website?: string;
  techStack?: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  start: string;
  end: string;
  location: string;
  website?: string;
  achievements?: string[];
};

export const ABOUT = {
  name: "Rahul Raj",
  tagline:
    "Full-stack engineer focused on clean architecture, performance and DX.",
  intro:
    "I build clean, scalable products—fast. From interfaces to APIs and DevOps, I turn complex challenges into elegant, maintainable solutions.",
  highlights: [
    "4+ years across frontend, backend, data & cloud",
    "TypeScript • React • Angular • Node • Python",
    "Kubernetes • Docker • GCP • CI/CD",
  ],
};

export const WORK: WorkItem[] = [
  {
    company: "Navvis GmbH",
    role: "Software Engineer",
    location: "Munich, Germany",
    start: "2022-12",
    website: "https://navvis.com",
    bullets: [
      "Software Engineer (Jan 2025 - Present) - Leading end-to-end development of cutting-edge mobile mapping device software",
      "Advanced Software Engineer (Dec 2022 - Dec 2024) - Core contributor to device management systems and UI development",
      "Architecting and shipping system software from concept to production, including WiFi support, software updates, and analytics tracking",
      "Driving SaaS revenue growth through new subscription license implementation and end-to-end feature development",
      "Researching and prototyping next-generation ARM-based devices to expand company's hardware portfolio",
    ],
    techStack: [
      "JavaScript",
      "TypeScript",
      "Angular",
      "Python",
      "C++",
      "Electron",
    ],
  },
  {
    company: "Careem",
    role: "Software Engineer I (Data & AI)",
    location: "Karachi, Pakistan",
    start: "2021-11",
    end: "2022-10",
    website: "https://careem.com",
    bullets: [
      "Built and maintained Careem Insights analytics platform on Apache Superset, serving internal users across the organization",
      "Developed end-to-end features for data analytics platform, collaborating with infrastructure team for Kubernetes deployment and CI/CD implementation",
      "Created scalable Airflow DAGs enabling users to refresh analytics tables at scale, improving data freshness and reliability",
      "Built Navigator data discovery platform on Amundsen open-source, enabling faster querying across all microservices and data tables",
      "Contributed to open-source projects including Amundsen and Apache Superset, enhancing platform capabilities",
    ],
    techStack: [
      "React",
      "Python",
      "Kubernetes",
      "Terraform",
      "Airflow",
      "Apache Pinot",
      "Java",
    ],
  },
  {
    company: "Brandverse",
    role: "Junior Full Stack Engineer",
    location: "Karachi, Pakistan",
    start: "2020-11",
    end: "2021-11",
    website: "https://www.brandver.se",
    bullets: [
      "Founded and built Brandverse imaging platform technology, enabling automated image processing workflows for enterprise clients",
      "Developed Chikoo e-commerce platform allowing users to create websites and start selling directly from their mobile devices",
      "Built WhatsApp bot system for direct ordering, tracking, and payment processing, improving customer engagement and conversion",
      "Architected and implemented voucher microservices to support promotional campaigns and customer retention strategies",
    ],
    techStack: ["React", "Node.js", "GCP", "Dgraph", "TypeScript", "MongoDB"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution:
      "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
    degree: "BSc Computer Science",
    start: "2016-07",
    end: "2020-07",
    location: "Topi, Pakistan",
    website: "https://giki.edu.pk",
    achievements: ["President of IET OnCampus GIKI Society"],
  },
];

export const LANGUAGES = [
  { language: "English", level: "Native" },
  { language: "German", level: "A1" },
  { language: "Urdu", level: "Native" },
];

export const INTERESTS = [
  "Open Source",
  "AI & Machine Learning",
  "Data Engineering",
  "Mentoring & Teaching",
  "International Collaboration",
  "Problem Solving",
];

export const PROJECTS = [
  {
    title: "Device Manager Portal",
    blurb:
      "Admin portal for managing mobile mapping devices. React + TypeScript + Vite with Python services. Focused on reliability and operator UX.",
    tags: ["React", "TypeScript", "Vite", "Python"],
  },
  {
    title: "Navigator Data Discovery",
    blurb:
      "Surface and explore service-level data with micro-service views and scheduled freshness (Airflow).",
    tags: ["K8s", "Airflow", "Data", "Superset"],
  },
  {
    title: "Chikoo Commerce",
    blurb:
      "Features like WhatsApp ordering & vouchers to boost conversion for SMEs.",
    tags: ["React", "Node", "MongoDB", "GCP"],
  },
];
