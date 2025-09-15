export type Paper = {
  id: string;
  title: string;
  authors: string;
  venue?: string;
  year?: number;
  summary?: string;
  tags?: string[];
  links?: { label: string; href: string }[];
  cover?: string;
};

export const PAPERS: Paper[] = [
  {
    id: "bimf-module-federation-typed-micro-frontends",
    title:
      "Toward Bundler-Independent Module Federations: Enabling Typed Micro-Frontend Architectures",
    authors: "Billy Lando, Wilhelm Hasselbring",
    venue: "arXiv",
    year: 2025,
    summary:
      "Introduces Bundler-Independent Module Federation (BIMF), enabling runtime module loading across bundlers with TypeScript support, shared dependency management, and strategies for observability and performance in micro-frontend architectures.",
    tags: [
      "micro-frontends",
      "module federation",
      "BIMF",
      "TypeScript",
      "web architecture",
    ],
    links: [
      {
        label: "PDF",
        href: "https://arxiv.org/pdf/2501.18225#page=5&zoom=100,416,714",
      },
    ],
  },
];
