// src/data/projects.ts

export type ProjectLink = {
  demo?: string; // e.g. https://example.com
  repo?: string; // e.g. https://github.com/you/project
  caseStudy?: string; // optional external write-up
};

export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string } // local mp4/webm in /public
  | { type: "iframe"; src: string; title?: string }; // YouTube/Vimeo/etc

export type Project = {
  id: string;
  title: string;
  summary: string; // short card blurb
  description?: string; // longer text shown in modal
  role?: string; // your role (e.g., "Lead Engineer")
  period?: string; // "2023 — 2024"
  tech: string[]; // chips
  tags?: string[]; // used for filters (e.g. ["Web App","Data"])
  links?: ProjectLink;
  media: ProjectMedia[]; // images/videos/iframe slides
  highlights?: string[]; // bullet points (metrics/outcomes)
  featured?: boolean;
};

// Fill these with your real projects.
// You can use local assets from /public, e.g. /public/projects/xyz/shot1.jpg
export const PROJECTS: Project[] = [
  {
    id: "sample-webapp",
    title: "Sample Web App",
    summary: "Modern web app focused on speed, DX, and accessibility.",
    description:
      "A production-grade web application with SSR-ready architecture, strong typing, and CI/CD. Optimized bundle, solid a11y, and robust E2E tests.",
    role: "Full-Stack Engineer",
    period: "2024",
    tech: ["TypeScript", "React", "Node.js", "Kubernetes"],
    tags: ["Web App", "Platform"],
    links: {
      demo: "https://example.com",
      repo: "https://github.com/you/sample-webapp",
    },
    media: [
      { type: "image", src: "/projects/sample/hero.jpg", alt: "Landing page" },
      {
        type: "image",
        src: "/projects/sample/dashboard.jpg",
        alt: "Dashboard",
      },
      {
        type: "video",
        src: "/projects/sample/teaser.mp4",
        poster: "/projects/sample/poster.jpg",
      },
      {
        type: "iframe",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Demo Video",
      },
    ],
    highlights: [
      "LCP under 1.5s on 4G",
      "A11y score 100 (Lighthouse)",
      "Deployed on GKE with GitOps",
    ],
    featured: true,
  },

  // Add more objects here…
];
