"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Layers,
  Navigation,
  Webhook,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb,
  Target,
  Globe,
  Rocket,
} from "lucide-react";

/* ───────────────────────── Brand tokens (match Hero: Pearl Mint Shine) ───────────────────────── */
const BRAND = {
  pageBg: "from-zinc-50 via-white to-emerald-50",
  accent: "from-emerald-600 to-teal-600",
  titleGrad: "from-emerald-800 via-teal-800 to-slate-800",
  chipBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  cardBorder: "border-slate-200",
};

/* ───────────────────────── Motion variants ───────────────────────── */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

/* ───────────────────────── Coder-centric content ───────────────────────── */
const PRINCIPLES = [
  {
    title: "Clarity First",
    desc: "Readable code, cohesive modules, strong boundaries. Future-you (or the team) should thank you.",
    icon: BookOpen,
  },
  {
    title: "Reliability > Cleverness",
    desc: "Fewer moving parts, guarded edges, graceful failure. Observability baked in.",
    icon: Target,
  },
  {
    title: "Performance as a Feature",
    desc: "Data-informed profiling, lean render paths, cache where it matters, async the rest.",
    icon: Rocket,
  },
  {
    title: "DX Matters",
    desc: "Tight feedback loops, scripts over rituals, reproducible environments, CI/CD from day one.",
    icon: Lightbulb,
  },
] as const;

const TOOLBELT = [
  { label: "Languages", items: ["TypeScript", "Python", "C++"] },
  { label: "Frontend", items: ["Angular", "React", "Vite", "Tailwind"] },
  { label: "Backend & Services", items: ["Node.js", "REST", "gRPC", "Auth/JWT"] },
  { label: "Data & Cloud", items: ["ETL", "Airflow", "Superset", "GCP"] },
  { label: "Systems", items: ["Electron", "ROS", "Ubuntu"] },
  { label: "Ops", items: ["Docker", "Kubernetes", "CI/CD"] },
] as const;

const EXPERIENCES = [
  {
    year: "2022–Present",
    title: "Software Engineer",
    company: "NavVis GmbH",
    location: "Munich, Germany",
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
    bullets: [
      "Full-stack work across Angular, TypeScript, Python, C++",
      "Enterprise desktop tooling (Electron) & ROS topics",
      "Reliability/perf-focused refactors, Ubuntu migration",
    ],
    tech: ["Angular", "TypeScript", "Python", "C++", "Electron", "ROS", "Ubuntu"],
  },
  {
    year: "2021–2022",
    title: "Software Engineer I (Data & AI)",
    company: "Careem",
    location: "Karachi, Pakistan",
    icon: Database,
    color: "from-teal-500 to-cyan-500",
    bullets: [
      "Navigator data discovery: micro-services on Kubernetes",
      "ETL in Airflow, monitoring/metrics on Argus",
      "Superset improvements & data modeling for insights",
    ],
    tech: ["Python", "Kubernetes", "Airflow", "Jenkins", "Superset"],
  },
  {
    year: "2020–2021",
    title: "Junior Full Stack Engineer",
    company: "Brandverse",
    location: "Karachi, Pakistan",
    icon: Rocket,
    color: "from-cyan-500 to-sky-500",
    bullets: [
      "E-commerce (Chikoo) features & automations",
      "WhatsApp ordering, vouchers, media pipeline",
      "React/TypeScript + Node + Mongo + K8s on GCP",
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Kubernetes", "GCP"],
  },
] as const;

export default function About() {
  const reduce = useReducedMotion();

  /* Scroll-linked timeline spine */
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={ref}
        className={`relative min-h-screen py-28 overflow-hidden bg-gradient-to-br ${BRAND.pageBg} text-[16px] md:text-[17px]`}
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(5,150,105,.24) 1px, transparent 1px),
              linear-gradient(90deg, rgba(5,150,105,.24) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto px-6 max-w-[100rem]">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2
              className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${BRAND.titleGrad} bg-clip-text text-transparent tracking-tight`}
            >
              About — the coder’s cut
            </h2>
            <div className={`mt-4 h-[3px] w-56 bg-gradient-to-r ${BRAND.accent} rounded-full opacity-80`} />
          </m.div>

          {/* Main grid */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid xl:grid-cols-[1.05fr_.95fr] gap-14 xl:gap-20 mb-20"
          >
            {/* LEFT: Principles + Toolbelt */}
            <div className="space-y-12">
              {/* Principles */}
              <m.div
                variants={item}
                className={`p-10 rounded-2xl border ${BRAND.cardBorder} bg-white/85 backdrop-blur-xl shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Layers className="w-5 h-5 text-teal-700" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
                    How I build software
                  </h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-6">
                  {PRINCIPLES.map((p) => (
                    <li key={p.title} className="flex items-start gap-3">
                      <p.icon className="w-5 h-5 mt-1 text-emerald-700 shrink-0" />
                      <div>
                        <div className="text-slate-900 font-medium">{p.title}</div>
                        <div className="text-slate-600 leading-7">{p.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </m.div>

              {/* Toolbelt */}
              <m.div
                variants={item}
                className={`p-10 rounded-2xl border ${BRAND.cardBorder} bg-white/85 backdrop-blur-xl shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Code2 className="w-5 h-5 text-teal-700" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">Toolbelt</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  {TOOLBELT.map((group) => (
                    <div key={group.label}>
                      <div className="text-sm font-semibold text-slate-700 mb-2">{group.label}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((t) => (
                          <span
                            key={t}
                            className={`px-2.5 py-1.5 rounded-lg text-sm ${BRAND.chipBg}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            </div>

            {/* RIGHT: Career timeline */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-700" />
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Career trajectory
                </h3>
              </div>

              <div className="relative">
                {/* static spine */}
                <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-slate-200 rounded-full" />
                {/* progress fill */}
                <m.div
                  className="absolute left-6 top-0 w-[3px] origin-top rounded-full"
                  style={{
                    scaleY: reduce ? 1 : spineScaleY,
                    background: "linear-gradient(180deg,#10b981,#0ea5e9)",
                    boxShadow: "0 0 12px rgba(14,165,233,.22)",
                  }}
                />

                {EXPERIENCES.map((exp) => (
                  <m.div
                    key={exp.company}
                    variants={item}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    className="relative mb-10 last:mb-0"
                  >
                    {/* node */}
                    <div className="absolute left-[1rem] top-2">
                      <span
                        className="relative block w-4 h-4 rounded-full border-4 border-white shadow-sm"
                        style={{ background: "linear-gradient(90deg,#10b981,#0ea5e9)" }}
                      />
                    </div>

                    {/* card */}
                    <m.div
                      className={`ml-12 p-7 rounded-xl border ${BRAND.cardBorder} bg-white/85 backdrop-blur-xl shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-700 font-mono text-sm">{exp.year}</span>
                        <exp.icon
                          className={`w-6 h-6 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div className="text-slate-900 font-semibold text-xl">{exp.title}</div>
                      <div className="text-teal-800 font-mono">{exp.company}</div>
                      <div className="text-slate-600 text-sm mb-4">{exp.location}</div>

                      <ul className="space-y-1.5 text-slate-700">
                        {exp.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-emerald-400/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </m.div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>

          {/* Specs snapshot */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Award, title: "Experience", value: "6+ years", desc: "Product & platform" },
                { icon: Layers, title: "Specialisation", value: "Full-Stack", desc: "Frontend ↔ Backend ↔ Data" },
                { icon: Lightbulb, title: "Focus", value: "DX & Perf", desc: "Tooling, CI/CD, profiling" },
                { icon: Webhook, title: "Approach", value: "API-first", desc: "Contracts before screens" },
              ].map((s) => (
                <m.div
                  key={s.title}
                  variants={item}
                  className={`p-7 rounded-xl border ${BRAND.cardBorder} bg-white/85 backdrop-blur-xl shadow-sm text-center`}
                >
                  <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 grid place-items-center">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-slate-600 text-xs tracking-wide">{s.title}</div>
                  <div className="text-slate-900 font-black text-2xl">{s.value}</div>
                  <div className="text-slate-700">{s.desc}</div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Footer strip */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className={`mt-16 p-7 rounded-xl border ${BRAND.cardBorder} bg-white/85 backdrop-blur-xl shadow-sm`}
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                <span className="text-slate-800 font-mono text-base">STATUS: AVAILABLE</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Navigation className="w-5 h-5 text-teal-700" />
                <span className="text-slate-800 font-mono text-base">RESPONSE: &lt; 24H</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Server className="w-5 h-5 text-sky-700" />
                <span className="text-slate-800 font-mono text-base">DELIVERY: RELIABLE</span>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
