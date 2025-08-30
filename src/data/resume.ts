// src/data/resume.ts
export type WorkItem = {
  company: string;
  role: string;
  location: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or undefined (present)
  bullets: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  start: string;
  end: string;
  location: string;
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
    bullets: [
      "Core contributor on mobile mapping device software (Angular, TypeScript, Python, C++, Electron).",
      "Led lag-evaluation initiatives; migrated systems to Ubuntu 22.04 & ROS topics.",
      "Maintained device-manager web portal (React, TypeScript, Vite, Python).",
      "Improved reliability with Cypress integration tests and Angular unit tests.",
    ],
  },
  {
    company: "Careem",
    role: "Software Engineer I (Data & AI)",
    location: "Karachi, Pakistan",
    start: "2021-11",
    end: "2022-10",
    bullets: [
      "Enhanced Navigator (data discovery); added micro-service data view on Kubernetes.",
      "Automated daily data updates with Airflow DAGs, improved accuracy & freshness.",
      "Contributed to Careem Insights: database shortlisting, multi-table joins; CI/CD via Jenkins & Kubernetes.",
      "Implemented service monitoring metrics on Argus and improved OSS Superset.",
    ],
  },
  {
    company: "Brandverse",
    role: "Junior Full Stack Engineer",
    location: "Karachi, Pakistan",
    start: "2020-11",
    end: "2021-11",
    bullets: [
      "Built features for automated photo/video solution and Chikoo e-commerce platform.",
      "React, TypeScript, Node, MongoDB, Kubernetes, Dgraph; deployed on GCP.",
      "Led outsourced front-end project for a new Chikoo service.",
    ],
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
  },
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
