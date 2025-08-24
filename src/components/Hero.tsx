"use client";

import { useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Mail,
  Globe,
  Github,
  Linkedin,
  Download,
  ArrowRight,
  Clock,
  MapPin,
  Layers,
  Zap,
} from "lucide-react";

/* ───────────────────────────── Brand tokens: Pearl Mint Shine ───────────────────────────── */
const BRAND = {
  pageBg: "from-zinc-50 via-white to-emerald-50",
  accent: "from-emerald-600 to-teal-600",
  headline: "from-emerald-800 via-teal-800 to-slate-800",
  cardRing: "ring-slate-200/70",
  pillBorder: "border-slate-200/70",
  pillText: "text-slate-800",
  chipBorder: "border-slate-200/70",
  chipText: "text-slate-800",
  socialIcon: "text-slate-600",
  infoIcon: "text-emerald-700",
  infoText: "text-slate-900",
};

/* ─────────────────────── Anim variants ─────────────────── */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.975 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  /* Pointer-reactive page glow (no re-renders) */
  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.2 });
  const glow = useMotionTemplate`radial-gradient(900px circle at ${sx}px ${sy}px, rgba(16,185,129,.12), transparent 60%)`;
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  /* Magnetic CTA */
  const magX = useSpring(0, { stiffness: 250, damping: 18, mass: 0.15 });
  const magY = useSpring(0, { stiffness: 250, damping: 18, mass: 0.15 });

  const socials = useMemo(
    () => [
      { href: "https://github.com/rahulraj97", icon: Github, label: "GitHub" },
      { href: "https://www.linkedin.com/in/rahulraj97/", icon: Linkedin, label: "LinkedIn" },
      { href: "mailto:rahule.lohana97@gmail.com", icon: Mail, label: "Email" },
    ],
    []
  );

  // Focus chips — gentle tints
  const focus = [
    { text: "Product UX", hue: "from-emerald-50 to-white" },
    { text: "System Architecture", hue: "from-teal-50 to-white" },
    { text: "APIs & Services", hue: "from-cyan-50 to-white" },
    { text: "Data Workflows", hue: "from-sky-50 to-white" },
    { text: "DevEx & Tooling", hue: "from-lime-50 to-white" },
    { text: "Performance", hue: "from-slate-50 to-white" },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div
        onPointerMove={onPointerMove}
        className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${BRAND.pageBg}`}
      >
        {/* Pointer glow */}
        <m.div className="pointer-events-none absolute inset-0" style={{ background: glow as any }} />

        {/* Subtle grid (ultra-low opacity) */}
        <div
          className="absolute inset-0 opacity-[.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45,212,191,.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,212,191,.12) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Gentle “shoreline” ribbons (soft + slow) */}
        {!reduce && (
          <>
            <m.div
              className="pointer-events-none absolute top-[22%] left-[-15%] w-[130%] h-36 opacity-20 blur-3xl"
              animate={{ x: ["0%", "-5%", "0%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(90deg, rgba(16,185,129,.18), rgba(20,184,166,.14), rgba(5,150,105,.16))",
                borderRadius: "9999px",
              }}
            />
            <m.div
              className="pointer-events-none absolute bottom-[18%] left-[-10%] w-[120%] h-32 opacity-16 blur-3xl"
              animate={{ x: ["0%", "6%", "0%"] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                background:
                  "linear-gradient(90deg, rgba(45,212,191,.16), rgba(16,185,129,.14), rgba(15,118,110,.16))",
                borderRadius: "9999px",
              }}
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* App bar */}
          <m.header variants={container} initial="hidden" animate="visible" className="px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <m.div variants={item} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 bg-gradient-to-r ${BRAND.accent} rounded-2xl grid place-items-center shadow-md`}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-[22px] md:text-[24px] font-bold text-slate-900">Rahul Raj</div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <div className={`px-4 py-2 rounded-full border ${BRAND.pillBorder} bg-white/85 backdrop-blur-sm text-sm text-slate-700`}>
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Available for projects
                    </span>
                  </div>
                </div>
              </m.div>
            </div>
          </m.header>

          {/* Hero core */}
          <m.div variants={container} initial="hidden" animate="visible" className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <m.div variants={item} className="space-y-8">
                {/* Pill */}
                <m.div
                  variants={fadeIn}
                  className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border ${BRAND.pillBorder} bg-white/85 backdrop-blur-sm`}
                >
                  <span className="text-[12px] font-semibold tracking-wide text-slate-700">
                    Let’s build something exceptional
                  </span>
                </m.div>

                {/* Headline with subtle sheen on hover */}
                <div className="group">
                  <h1 className="text-[42px] md:text-[56px] xl:text-[64px] font-extrabold text-slate-900 leading-[1.05] tracking-tight relative overflow-hidden">
                    Full-Stack{" "}
                    <span className={`block bg-gradient-to-r ${BRAND.headline} bg-clip-text text-transparent`}>
                      Software Engineer
                    </span>
                    {!reduce && (
                      <m.span
                        initial={{ x: "-120%" }}
                        whileHover={{ x: "120%" }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-x-0 top-0 h-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.35) 50%, rgba(255,255,255,0) 100%)",
                          mixBlendMode: "soft-light",
                        }}
                      />
                    )}
                  </h1>
                </div>

                <p className="text-[18px] md:text-[20px] text-slate-700 leading-relaxed max-w-3xl">
                  I design & ship elegant products—balancing <b>UX</b>, <b>performance</b>, and <b>scalability</b>.
                  From discovery to deployment, I turn ideas into reliable software.
                </p>

                {/* Focus chips */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl">
                  {focus.map((f) => (
                    <div
                      key={f.text}
                      className={`px-4 py-2 rounded-xl text-sm font-medium ${BRAND.chipText} bg-gradient-to-br ${f.hue} border ${BRAND.chipBorder} shadow-sm`}
                    >
                      {f.text}
                    </div>
                  ))}
                </div>

                {/* CTAs with “sheen” that slides on hover */}
                <m.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-1">
                  <m.button
                    onPointerMove={(e) => {
                      const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                      magX.set((e.clientX - (r.left + r.width / 2)) * 0.12);
                      magY.set((e.clientY - (r.top + r.height / 2)) * 0.12);
                    }}
                    onPointerLeave={() => {
                      magX.set(0);
                      magY.set(0);
                    }}
                    style={{ translateX: magX as any, translateY: magY as any }}
                    className={`relative overflow-hidden px-8 py-5 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform bg-gradient-to-r ${BRAND.accent}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="inline-flex items-center gap-2 relative z-10">
                      Start a Project <ArrowRight className="w-5 h-5" />
                    </span>
                    {!reduce && (
                      <m.span
                        className="absolute inset-0 pointer-events-none"
                        initial={false}
                      >
                        <m.span
                          variants={{ hover: { x: ["-120%", "120%"] } }}
                          whileHover="hover"
                          transition={{ duration: 1.4, ease: "easeInOut" }}
                          className="block absolute top-0 bottom-0 w-[45%] -skew-x-12"
                          style={{
                            left: "-20%",
                            background:
                              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.35) 50%, rgba(255,255,255,0) 100%)",
                            mixBlendMode: "soft-light",
                          }}
                        />
                      </m.span>
                    )}
                  </m.button>

                  <m.a
                    href="/Rahul-CV.pdf"
                    download="Rahul-Raj-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-5 border-2 border-slate-300 text-slate-900 text-lg font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Download className="w-5 h-5" /> Download CV
                    </span>
                  </m.a>
                </m.div>

                {/* Socials */}
                <m.div variants={item} className="flex gap-3 pt-1">
                  {socials.map((s) => (
                    <m.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 backdrop-blur-sm border border-slate-200/70 rounded-xl hover:bg-white hover:border-slate-300 transition-colors shadow-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={s.label}
                    >
                      <s.icon className={`w-6 h-6 ${BRAND.socialIcon}`} />
                    </m.a>
                  ))}
                </m.div>
              </m.div>

              {/* Right: portrait with calm ambient ring (no overlay on photo) */}
              <m.div variants={fadeIn} className="relative w-full">
                <div className="relative w-full max-w-[26rem] mx-auto">
                  {/* Ambient conic ring behind photo */}
                  <div className="absolute -inset-6 -z-10 rounded-[2rem]">
                    <div
                      className="w-full h-full rounded-[2rem] opacity-60 blur-xl"
                      style={{
                        background:
                          "conic-gradient(from 180deg at 50% 50%, rgba(16,185,129,.14), rgba(20,184,166,.14), rgba(99,102,241,.12), rgba(16,185,129,.14))",
                      }}
                    />
                  </div>

                  {/* Photo card */}
                  <div className={`relative rounded-3xl shadow-2xl overflow-hidden ring-1 ${BRAND.cardRing} bg-white`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/profile_picture.jpeg"
                      alt="Rahul Raj — Full-Stack Software Engineer"
                      className="w-full h-[26rem] object-cover"
                    />
                  </div>
                </div>
              </m.div>
            </div>
          </m.div>

          {/* Bottom info bar */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="px-6 py-6 border-t border-slate-200/60 bg-white/70 backdrop-blur-sm"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <Info icon={Zap} text="High-performance builds" />
              <Info icon={Clock} text="Response &lt; 24h" />
              <Info icon={MapPin} text="Augsburg, DE" />
              <Info icon={Layers} text="Design • Build • Ship" />
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}

/* Small UI helper */
function Info({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${BRAND.infoText}`}>
      <Icon className={`w-5 h-5 ${BRAND.infoIcon}`} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
