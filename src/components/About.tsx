"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Globe,
  Database,
  Code2,
  Award,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Rocket,
  Target,
  Layers,
  Navigation,
  Signal,
  Webhook,
  Server,
} from "lucide-react";

/* Variants */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { y: 22, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* Content */
const SKILLS = [
  { name: "Frontend Development", icon: Code2, textColor: "text-red-400", desc: "Angular, React, TypeScript, modern UI frameworks" },
  { name: "Backend Development", icon: Server, textColor: "text-yellow-400", desc: "Node.js, Python, C++, REST APIs, microservices" },
  { name: "Data Engineering", icon: Database, textColor: "text-purple-400", desc: "ETL pipelines, data processing, analytics" },
  { name: "DevOps & Cloud", icon: Navigation, textColor: "text-indigo-400", desc: "Kubernetes, Docker, GCP, CI/CD pipelines" },
  { name: "System Architecture", icon: Layers, textColor: "text-cyan-400", desc: "Scalable software design, enterprise solutions" },
  { name: "Full Stack Solutions", icon: Webhook, textColor: "text-green-400", desc: "End-to-end application development" },
] as const;

const EXPERIENCES = [
  {
    year: "2022–Present",
    title: "Software Engineer",
    company: "NavVis GmbH",
    location: "Munich, Germany",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    tech: ["Angular", "TypeScript", "Python", "C++", "Electron", "ROS", "Ubuntu"],
  },
  {
    year: "2021–2022",
    title: "Software Engineer I (Data & AI)",
    company: "Careem",
    location: "Karachi, Pakistan",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    tech: ["Python", "Kubernetes", "Airflow", "Jenkins", "Superset"],
  },
  {
    year: "2020–2021",
    title: "Junior Full Stack Engineer",
    company: "Brandverse",
    location: "Karachi, Pakistan",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Kubernetes", "GCP"],
  },
] as const;

/* Stars (match Hero) */
const STARS = Array.from({ length: 24 }).map((_, i) => ({
  x: (i * 137.5) % 100,
  y: (i * 41.8) % 100,
  delay: (i % 8) * 0.2,
}));

const About = () => {
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 25%"] });
  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={sectionRef}
        className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-[15px] md:text-[16px]"
      >
        {/* grid + stars */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map((s, i) => (
            <m.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 3.2, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[2px] h-[2px] bg-cyan-300/70 rounded-full"
              style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translateZ(0)" }}
            />
          ))}
        </div>

        {/* content */}
        <div className="relative z-10 mx-auto px-6 max-w-7xl xl:max-w-[90rem]">
          {/* boot line */}
          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <p className="font-mono text-cyan-300/90 text-xs tracking-widest mb-3">
              &gt; INITIALIZING: ABOUT_ME_MODULE …
            </p>
            <div className="h-[3px] w-56 bg-gradient-to-r from-cyan-400/0 via-cyan-400/70 to-cyan-400/0 rounded-full" />
          </m.div>

          {/* grid */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 xl:gap-16 mb-20"
          >
            {/* left */}
            <div className="space-y-12">
              {/* mission */}
              <m.div variants={item} className="relative p-10 rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 tracking-wide">
                  MISSION_BRIEF
                </h3>
                <p className="text-gray-200 text-[17px] md:text-lg leading-8">
                  From <span className="text-cyan-400">Pakistan’s tech scene</span> to <span className="text-blue-400">Germany’s innovation hub</span>, I operate across
                  <span className="text-purple-400"> frontend</span>, <span className="text-purple-400">backend</span>, and <span className="text-purple-400">data</span>,
                  shipping reliable systems and measurable outcomes. Currently at <span className="text-cyan-300">NavVis</span>, building enterprise-grade software and platform tooling.
                </p>
                {!reduce && (
                  <m.div
                    className="absolute inset-0"
                    animate={{ x: ["-30%", "130%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.08), transparent)", mixBlendMode: "screen" }}
                  />
                )}
              </m.div>

              {/* skills */}
              <m.div variants={item} className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  CORE_COMPETENCIES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {SKILLS.map((s, i) => (
                    <m.div key={s.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}>
                      <div className="relative p-5 rounded-xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md hover:border-cyan-400/40 transition-colors overflow-hidden">
                        <div className="flex items-center gap-3 mb-2">
                          <s.icon className={`w-7 h-7 ${s.textColor}`} />
                          <span className="text-white font-semibold text-lg">{s.name}</span>
                        </div>
                        <p className="text-cyan-100/95 text-[15px] leading-7">{s.desc}</p>
                        {!reduce && (
                          <m.div
                            className="absolute top-0 bottom-0 w-1/3"
                            animate={{ x: ["-120%", "120%"] }}
                            transition={{ duration: 7, repeat: Infinity }}
                            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.06), transparent)", mixBlendMode: "screen" }}
                          />
                        )}
                      </div>
                    </m.div>
                  ))}
                </div>
              </m.div>
            </div>

            {/* right: timeline */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-cyan-400" /> CAREER_TRAJECTORY
              </h3>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-cyan-400/20" />
                <m.div
                  className="absolute left-6 top-0 w-[2px] origin-top"
                  style={{ scaleY: reduce ? 1 : spineScaleY, background: "linear-gradient(180deg,#22d3ee,#3b82f6)", boxShadow: "0 0 10px rgba(34,211,238,.35)" }}
                />
                {EXPERIENCES.map((exp) => (
                  <m.div key={exp.company} variants={item} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative mb-10 last:mb-0">
                    <div className="absolute left-4 top-2">
                      <span className="relative block w-4 h-4 rounded-full border-4 border-slate-950" style={{ background: "linear-gradient(90deg,#22d3ee,#3b82f6)" }}>
                        {!reduce && <span className="absolute inset-0 rounded-full animate-[ping_5s_ease-out_infinite] bg-cyan-400/30" />}
                      </span>
                    </div>
                    <m.div className="ml-12 relative p-7 rounded-xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md transition-colors overflow-hidden" whileInView={{ borderColor: "#22d3ee55" }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-cyan-300 font-mono">{exp.year}</span>
                        <exp.icon className={`w-7 h-7 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`} />
                      </div>
                      <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                      <p className="text-cyan-300 font-mono">{exp.company}</p>
                      <p className="text-blue-200 text-sm md:text-base mb-4">{exp.location}</p>
                      <div className="flex flex-wrap gap-2.5">
                        {exp.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1.5 bg-cyan-500/10 border border-cyan-400/25 rounded text-sm text-cyan-200 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                      {!reduce && (
                        <m.div
                          className="absolute inset-0"
                          animate={{ x: ["-25%", "125%"] }}
                          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                          style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.08), transparent)", mixBlendMode: "screen" }}
                        />
                      )}
                    </m.div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>

          {/* specs */}
          <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
              DEVELOPER_SPECS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Award, title: "EXPERIENCE_LEVEL", value: "SENIOR_DEV", desc: "4+ years across multiple domains" },
                { icon: BookOpen, title: "SPECIALIZATION", value: "FULL_STACK", desc: "Frontend ↔ Backend ↔ Data" },
                { icon: Lightbulb, title: "INNOVATION", value: "HIGH", desc: "Automation, DX tooling, CI/CD" },
                { icon: Target, title: "ADAPTABILITY", value: "GLOBAL", desc: "Pakistan → Germany" },
              ].map((spec) => (
                <m.div key={spec.title} variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative p-6 rounded-xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md">
                  <div className="relative w-18 h-18 mx-auto mb-4">
                    {!reduce && <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />}
                    <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <spec.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-cyan-300 font-mono text-xs">{spec.title}</div>
                  <div className="text-white font-black text-2xl">{spec.value}</div>
                  <div className="text-cyan-100/95 text-[15px]">{spec.desc}</div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* footer strip */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 p-6 rounded-xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-cyan-200 font-mono text-base">STATUS: AVAILABLE</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Signal className="w-5 h-5 text-blue-400" />
                <span className="text-blue-200 font-mono text-base">RESPONSE: FAST</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Database className="w-5 h-5 text-purple-400" />
                <span className="text-purple-200 font-mono text-base">QUALITY: PREMIUM</span>
              </div>
            </div>
          </m.div>
        </div>

        <style jsx>{`
          @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        `}</style>
      </section>
    </LazyMotion>
  );
};

export default About;
