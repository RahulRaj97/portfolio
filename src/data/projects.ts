// src/data/projects.ts
export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | {
      type: "video";
      src: string;
      provider?: "youtube" | "vimeo" | "file";
      poster?: string;
    };

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[]; // e.g. ['B2B', 'Internal Tool']
  tech: string[]; // e.g. ['React', 'TypeScript', 'GCP']
  links?: { label: string; href: string }[];
  cover?: string; // image path; optional (we’ll fallback gracefully)
  media: ProjectMedia[]; // gallery: images + videos
  spotlight?: boolean; // optional highlight
};

export const PROJECTS: Project[] = [
  {
    id: "usp-admissions",
    title: "USP Admissions Platform",
    description:
      "Comprehensive international education platform connecting students, agents, and institutions worldwide.",
    longDescription:
      "Built a comprehensive full-stack platform enabling students to discover and apply to international educational programs worldwide. The system includes AI-powered document verification, real-time analytics dashboards, and comprehensive user management for students, agents, and educational institutions. Features include advanced search and matching algorithms, application management workflows, and secure communication tools.",
    tags: ["B2B", "Education", "SaaS", "AI/ML"],
    tech: [
      "React",
      "TypeScript",
      "MongoDB",
      "AWS",
      "ElasticSearch",
      "Node.js",
      "Redis",
      "Socket.IO",
    ],
    links: [{ label: "Live Platform", href: "https://www.uspadmissions.com" }],
    cover: "/projects/usp-admissions/usp-logo.png", // Company logo as cover
    media: [
      // Main USP Website (Student Portal)
      {
        type: "image",
        src: "/projects/usp-admissions/usp-main.jpeg",
        alt: "USP Main Website - Student Portal",
      },
      // Agent Platform (new images)
      {
        type: "image",
        src: "/projects/usp-admissions/usp-agent-dashboard.jpeg",
        alt: "Agent Dashboard",
      },
      {
        type: "image",
        src: "/projects/usp-admissions/usp-agent-programmes.jpeg",
        alt: "Agent Programmes List",
      },
      {
        type: "image",
        src: "/projects/usp-admissions/usp-agent-program-detail.jpeg",
        alt: "Agent Programme Detail",
      },
    ],
    spotlight: true,
  },
];
