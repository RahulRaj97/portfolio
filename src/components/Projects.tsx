"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  Database,
  Rocket,
  Server,
  Layers,
  Code2,
  ArrowLeft,
  ArrowRight,
  X,
  Play,
  Images,
} from "lucide-react";

/* --------------------------- Motion variants --------------------------- */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ------------------------------- Types --------------------------------- */
type Media = {
  type: "image" | "video";
  src: string;         // e.g. "/projects/navvis/01.jpg" or video file
  alt?: string;
  poster?: string;     // for videos
};
type LinkRef = { label: string; href: string; kind: "live" | "github" | "docs" | "demo" };
type Project = {
  id: string;
  title: string;
  company: string;
  period?: string;
  category: "enterprise" | "data" | "web";
  summary: string;
  problem?: string;
  solution?: string;
  impact?: string;
  stack: string[];
  icon: any;
  color: string; // Tailwind gradient like "from-cyan-500 to-blue-500"
  links?: LinkRef[];
  media: Media[];
};

/* --------------------------- Showcase content -------------------------- */
/* Replace media.src with your actual images/videos. */
const PROJECTS: Project[] = [
  {
    id: "navvis-mapping",
    title: "MOBILE_MAPPING_DEVICE",
    company: "NavVis GmbH",
    period: "2022 → Present",
    category: "enterprise",
    summary:
      "Full-stack software powering autonomous spatial data capture devices (Angular · TS · Python · C++ · Electron).",
    problem:
      "Low-latency device control & reliable capture UX on constrained hardware.",
    solution:
      "Optimized streaming & IPC, ROS topic migration on Ubuntu 22.04, and hardened Electron surface for field ops.",
    impact:
      "Smoother capture sessions, fewer support incidents, and faster ops handoff.",
    stack: ["Angular", "TypeScript", "Electron", "Python", "C++", "ROS", "Ubuntu"],
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    links: [
      // { label: "Live", href: "https://…", kind: "live" },
      // { label: "GitHub", href: "https://…", kind: "github" },
    ],
    media: [
      { type: "image", src: "/media/navvis/01.jpg", alt: "Device UI - overview" },
      { type: "image", src: "/media/navvis/02.jpg", alt: "Session details" },
      { type: "video", src: "/media/navvis/teaser.mp4", poster: "/media/navvis/poster.jpg" },
    ],
  },
  {
    id: "careem-navigator",
    title: "DATA_DISCOVERY_PLATFORM",
    company: "Careem",
    period: "2021 → 2022",
    category: "data",
    summary:
      "Navigator data discovery with micro-services on Kubernetes; ETL via Airflow; Superset dashboards.",
    problem:
      "Fragmented data views slowed down analysts & downstream product teams.",
    solution:
      "Service-level data views, daily DAGs, Argus monitoring, and Superset customization for fast insights.",
    impact: "Shorter time-to-insight and reproducible reporting flows.",
    stack: ["Python", "Kubernetes", "Airflow", "Jenkins", "Superset", "ETL"],
    icon: Database,
    color: "from-emerald-500 to-green-500",
    links: [],
    media: [
      { type: "image", src: "/media/careem/01.jpg", alt: "Navigator modules" },
      { type: "image", src: "/media/careem/02.jpg", alt: "Superset dashboards" },
      { type: "image", src: "/media/careem/03.jpg", alt: "K8s observability" },
    ],
  },
  {
    id: "brandverse-chikoo",
    title: "ECOMMERCE_AUTOMATION",
    company: "Brandverse",
    period: "2020 → 2021",
    category: "web",
    summary:
      "Chikoo: WhatsApp ordering, vouchers, + automated media pipelines (React · TS · Node · Mongo · GCP).",
    problem: "SMBs needed ultra-fast catalog → storefront → order turnaround.",
    solution:
      "Automation for product media + lean storefront, scaled via K8s & GCP.",
    impact: "High-volume SKU onboarding & faster conversion cycles.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "Kubernetes", "GCP"],
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    links: [],
    media: [
      { type: "image", src: "/media/brandverse/01.jpg", alt: "Storefront" },
      { type: "image", src: "/media/brandverse/02.jpg", alt: "Order flow" },
      { type: "image", src: "/media/brandverse/03.jpg", alt: "Automation studio" },
    ],
  },
  {
    id: "afiniti-megaacd",
    title: "AUTHENTICATION_MODULE",
    company: "Afiniti",
    period: "2019 → 2020",
    category: "web",
    summary:
      "MegaACD authentication: React · Node · TS · PostgreSQL; JWT & Dockerized LimeSurvey for HR data.",
    problem: "Secure auth gates and uniform internal survey tooling.",
    solution:
      "JWT auth flows & containerized survey platform with clean rollout pipeline.",
    impact: "Consistent sign-on and auditable survey data collection.",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "JWT"],
    icon: Server,
    color: "from-orange-500 to-red-500",
    links: [],
    media: [
      { type: "image", src: "/media/afiniti/01.jpg", alt: "Auth screens" },
      { type: "image", src: "/media/afiniti/02.jpg", alt: "Admin console" },
    ],
  },
];

/* ------------------------------ Filters ------------------------------- */
const FILTERS = [
  { key: "all", label: "ALL_PROJECTS", icon: Layers },
  { key: "enterprise", label: "ENTERPRISE", icon: Globe },
  { key: "data", label: "DATA_ENGINEERING", icon: Database },
  { key: "web", label: "WEB_APPS", icon: Code2 },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

/* ------------------------------ Lightbox ------------------------------ */
function Lightbox({
  items,
  startAt,
  onClose,
}: {
  items: Media[];
  startAt: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startAt);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

  const cur = items[idx];

  return (
    <AnimatePresence>
      <m.div
        className="fixed inset-0 z-[70] grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <m.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <m.div
          initial={{ y: 20, scale: reduce ? 1 : 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="relative z-[71] w-[min(92vw,1200px)] rounded-2xl border border-cyan-400/25 bg-slate-900/90 p-4 md:p-6"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
            {cur.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cur.src}
                alt={cur.alt || ""}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <video
                src={cur.src}
                poster={cur.poster}
                controls
                className="h-full w-full object-cover bg-black"
              />
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-cyan-200 font-mono text-sm">
              {idx + 1} / {items.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60"
                onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-lg border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60"
                onClick={() => setIdx((i) => (i + 1) % items.length)}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-lg border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}

/* ------------------------------ Gallery ------------------------------- */
function Gallery({
  media,
  onOpenLightbox,
}: {
  media: Media[];
  onOpenLightbox: (startAt: number) => void;
}) {
  const [active, setActive] = useState(0);
  const cur = media[active];

  return (
    <div className="w-full">
      <div
        className="relative aspect-[16/9] rounded-xl overflow-hidden border border-cyan-400/25 bg-slate-900/60"
      >
        {/* main stage */}
        {cur.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cur.src}
            alt={cur.alt || ""}
            className="h-full w-full object-cover"
            loading="lazy"
            onClick={() => onOpenLightbox(active)}
          />
        ) : (
          <div className="h-full w-full relative bg-black">
            <video
              src={cur.src}
              poster={cur.poster}
              className="h-full w-full object-cover"
              controls
            />
          </div>
        )}

        {/* quick controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            onClick={() => onOpenLightbox(active)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-400/40 bg-slate-900/50 text-cyan-200 hover:border-cyan-400/70"
          >
            <Images className="w-4 h-4" /> VIEW
          </button>
          {cur.type === "video" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-black/50 text-cyan-200 border border-cyan-400/30">
              <Play className="w-3.5 h-3.5" /> video
            </span>
          )}
        </div>
      </div>

      {/* thumbs */}
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-28 shrink-0 rounded-lg overflow-hidden border transition-colors ${
              i === active
                ? "border-cyan-400"
                : "border-cyan-400/25 hover:border-cyan-400/50"
            }`}
            title={m.alt}
          >
            {m.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.src} alt={m.alt || ""} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="h-full w-full grid place-items-center bg-black">
                <Play className="w-6 h-6 text-cyan-300" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Project Block ---------------------------- */
function ProjectBlock({ p, onOpenLightbox }: { p: Project; onOpenLightbox: (items: Media[], startAt: number) => void }) {
  const reduce = useReducedMotion();

  return (
    <m.div variants={item} className="rounded-2xl border border-cyan-400/20 bg-white/[0.04] backdrop-blur-md p-6 md:p-8">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <Gallery
            media={p.media}
            onOpenLightbox={(start) => onOpenLightbox(p.media, start)}
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${p.color} grid place-items-center`}>
                <p.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                <p className="text-cyan-300 font-mono text-sm">{p.company}{p.period ? ` · ${p.period}` : ""}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-cyan-100/90 leading-relaxed">{p.summary}</p>

          <div className="mt-4 space-y-3 text-cyan-200/90">
            {p.problem && (
              <div>
                <div className="font-mono text-xs text-cyan-300">PROBLEM</div>
                <div>{p.problem}</div>
              </div>
            )}
            {p.solution && (
              <div>
                <div className="font-mono text-xs text-cyan-300">SOLUTION</div>
                <div>{p.solution}</div>
              </div>
            )}
            {p.impact && (
              <div>
                <div className="font-mono text-xs text-cyan-300">IMPACT</div>
                <div>{p.impact}</div>
              </div>
            )}
          </div>

          {/* Stack */}
          <div className="mt-5">
            <div className="font-mono text-xs text-cyan-300 mb-2">TECH_STACK</div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/25"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {p.links && p.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60"
                >
                  {l.kind === "github" ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}

/* -------------------------------- Main --------------------------------- */
export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ items: Media[]; at: number } | null>(null);

  const data = useMemo(() => {
    const base = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
    );
  }, [filter, query]);

  // keyboard focus trap for lightbox handled inside component

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="projects"
        className="relative min-h-screen py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden"
      >
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <m.h2
              variants={item}
              className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              PROJECT_SHOWCASE
            </m.h2>
            <m.p variants={item} className="mt-4 text-xl md:text-2xl text-cyan-100/90">
              Case-study style galleries with live links & stacks.
            </m.p>
          </m.div>

          {/* Controls */}
          <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                {FILTERS.map((f) => (
                  <m.button
                    key={f.key}
                    variants={item}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2 rounded-xl border-2 font-mono transition-all ${
                      filter === f.key
                        ? "border-cyan-400 text-cyan-300 bg-cyan-500/10"
                        : "border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-500/10"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <f.icon className="w-4 h-4" />
                      {f.label}
                    </span>
                  </m.button>
                ))}
              </div>

              <div className="relative">
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/80" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, company, or stack…"
                  className="pl-9 pr-3 py-2 rounded-xl border-2 border-cyan-400/30 bg-slate-800/60 text-cyan-100 placeholder:text-cyan-300/50 focus:border-cyan-400 outline-none"
                />
              </div>
            </div>
          </m.div>

          {/* Projects */}
          <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-10">
            {data.map((p) => (
              <ProjectBlock
                key={p.id}
                p={p}
                onOpenLightbox={(items, at) => setLightbox({ items, at })}
              />
            ))}
            {data.length === 0 && (
              <div className="text-center text-cyan-300 py-24">No matches found.</div>
            )}
          </m.div>

          {/* Footer strip */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-6 rounded-2xl border border-cyan-400/20 bg-white/5 backdrop-blur-md text-center"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-cyan-200 font-mono">PROJECTS: {PROJECTS.length}</div>
              <div className="text-blue-200 font-mono">GALLERIES: multi-image / video</div>
              <div className="text-purple-200 font-mono">STYLE: Showcase</div>
            </div>
          </m.div>
        </div>

        {/* Lightbox */}
        {lightbox && (
          <Lightbox
            items={lightbox.items}
            startAt={lightbox.at}
            onClose={() => setLightbox(null)}
          />
        )}

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>
    </LazyMotion>
  );
}