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
    id: "device-manager",
    title: "Device Manager Portal",
    description:
      "Admin portal for managing mobile mapping devices with an operator-first UX.",
    longDescription:
      "Focused on reliability and ergonomic workflows. Integrated diagnostics, fleet views, and fast search. Built to be resilient under spotty connections.",
    tags: ["B2B", "Ops"],
    tech: ["React", "TypeScript", "Vite", "Python"],
    links: [
      { label: "Case Study", href: "#" },
      { label: "Live (Auth)", href: "#" },
    ],
    cover: "/profile_picture.jpeg", // replace with /projects/device-manager/cover.jpg
    media: [
      { type: "image", src: "/profile_picture.jpeg", alt: "Device Manager UI" },
      // Example video entry (replace with your real YouTube ID or mp4 file)
      {
        type: "video",
        provider: "youtube",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
    spotlight: true,
  },
  {
    id: "navigator",
    title: "Navigator: Data Discovery",
    description:
      "Service-level data views with freshness tracking and microservice drilldowns.",
    tags: ["Data", "Internal Tool"],
    tech: ["Kubernetes", "Airflow", "Superset"],
    links: [{ label: "Overview", href: "#" }],
    media: [
      { type: "image", src: "/vite.svg", alt: "Mock" },
      { type: "image", src: "/vite.svg", alt: "Mock 2" },
    ],
  },
  {
    id: "chikoo",
    title: "Chikoo Commerce",
    description:
      "WhatsApp ordering, vouchers, and conversion-focused storefronts.",
    tags: ["E-commerce"],
    tech: ["React", "Node.js", "MongoDB", "GCP"],
    links: [{ label: "Website", href: "#" }],
    media: [{ type: "image", src: "/vite.svg", alt: "Chikoo" }],
  },
];

// Helper: derive all tag filters from data
export const ALL_TAGS = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tags))
).sort();
export const ALL_TECH = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tech))
).sort();
