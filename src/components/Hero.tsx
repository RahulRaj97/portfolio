import { useMemo } from "react";
import {
  m,
  LazyMotion,
  domAnimation,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import type { Variants } from "framer-motion";

import {
  Mail,
  Globe,
  MapPin,
  Satellite,
  Database,
  Code2,
  Zap,
  Github,
  Linkedin,
  Layers,
  Cpu,
  Signal,
  Rocket,
  Webhook,
  Server,
  FileText,
} from "lucide-react";

/* --------------------------- Variants (outside) --------------------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const floatingVariants: Variants = {
  animate: {
    y: [-20, 20, -20],
    rotate: [0, 5, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

const bobVariants: Variants = {
  animate: {
    y: [0, -12, 0],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* Subtle star field for the grid */
const STARS = Array.from({ length: 28 }).map((_, i) => ({
  x: (i * 137.5) % 100,
  y: (i * 41.8) % 100,
  delay: (i % 8) * 0.2,
}));

/* Shooting stars (comets) */
const COMETS = [
  { delay: 1.2, y: "15%", fromX: "110%", toX: "-10%" },
  { delay: 4.6, y: "35%", fromX: "110%", toX: "-10%" },
  { delay: 7.8, y: "65%", fromX: "-10%", toX: "110%" },
];

/* Core tech (unchanged content) */
const CORE_TECH = [
  { name: "Angular", icon: Code2, color: "from-red-500 to-orange-500" },
  { name: "TypeScript", icon: Cpu, color: "from-blue-500 to-cyan-500" },
  { name: "Python", icon: Database, color: "from-yellow-500 to-green-500" },
  { name: "C++", icon: Zap, color: "from-purple-500 to-pink-500" },
  { name: "React", icon: Layers, color: "from-cyan-500 to-blue-500" },
  { name: "Node.js", icon: Server, color: "from-indigo-500 to-purple-500" },
];

const Hero = () => {
  /* -------------------- Parallax (no state re-renders) -------------------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.2 });
  const smy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.2 });

  const gridTx = useMotionTemplate`translate(${useTransform(smx, (v) => v * 0.02)}px, ${useTransform(
    smy,
    (v) => v * 0.02
  )}px)`;

  const globeTx = useMotionTemplate`translate3d(${useTransform(
    smx,
    (v) => (v - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) * 0.005
  )}px, ${useTransform(
    smy,
    (v) => (v - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) * 0.005
  )}px, 0)`;

  const magX = useSpring(0, { stiffness: 250, damping: 15, mass: 0.15 });
  const magY = useSpring(0, { stiffness: 250, damping: 15, mass: 0.15 });

  const onPointerMove = (e: React.PointerEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  const socials = useMemo(
    () => [
      { href: "https://github.com/rahulraj97", icon: Github, label: "GitHub" },
      { href: "https://www.linkedin.com/in/rahulraj97/", icon: Linkedin, label: "LinkedIn" },
      { href: "mailto:rahule.lohana97@gmail.com", icon: Mail, label: "Email" },
    ],
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <div
        onPointerMove={onPointerMove}
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
      >
        {/* -------------------- Aurora Ribbons (new, subtle) -------------------- */}
        <m.div
          className="pointer-events-none absolute -inset-1 opacity-40 blur-3xl"
          animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(60% 50% at 30% 30%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(50% 40% at 70% 60%, rgba(34,211,238,0.15), transparent 60%)",
          }}
        />
        <m.div
          className="pointer-events-none absolute inset-0 opacity-30 blur-2xl"
          animate={{ rotate: [0, -8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(168,85,247,0.08), transparent 30%, rgba(14,165,233,0.08), transparent 60%, rgba(99,102,241,0.08))",
          }}
        />

        {/* -------------------- Constellation Grid + Stars -------------------- */}
        <m.div
          className="absolute inset-0 opacity-30 will-change-transform"
          style={{
            transform: gridTx as any,
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map((s, i) => (
            <m.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: 3.2, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[2px] h-[2px] bg-cyan-300/70 rounded-full"
              style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translateZ(0)" }}
            />
          ))}
        </div>

        {/* -------------------- Shooting Stars (comets) -------------------- */}
        <div className="absolute inset-0 pointer-events-none">
          {COMETS.map((c, idx) => (
            <m.div
              key={idx}
              initial={{ x: c.fromX, y: c.y, opacity: 0 }}
              animate={{ x: c.toX, opacity: [0, 1, 0] }}
              transition={{ delay: c.delay, duration: 3.2, repeat: Infinity, repeatDelay: 6 + idx }}
              className="absolute h-px w-32"
              style={{
                background:
                  "linear-gradient(90deg, rgba(34,211,238,0), rgba(34,211,238,0.8), rgba(34,211,238,0))",
                boxShadow: "0 0 12px rgba(34,211,238,0.6)",
              }}
            />
          ))}
        </div>

        {/* -------------------- Floating Icons (unchanged) -------------------- */}
        <m.div variants={floatingVariants} animate="animate" className="absolute top-20 right-20 text-cyan-400/40">
          <Satellite className="w-12 h-12" />
        </m.div>
        <m.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" as any }}
          className="absolute bottom-20 left-20 text-blue-400/40"
        >
          <MapPin className="w-12 h-12" />
        </m.div>

        {/* -------------------- Globe Cluster (kept, enhanced) -------------------- */}
        <m.div className="absolute inset-0 pointer-events-none">
          <m.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] will-change-transform transform-gpu"
            style={{ transform: globeTx as any }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl" />

              {/* Scan ring */}
              <m.div
                variants={bobVariants}
                animate="animate"
                className="absolute inset-0 rounded-full border-2 border-cyan-400/50 will-change-transform"
              >
                <div
                  className="absolute inset-0 rounded-full pointer-events-none transform-gpu animate-spin"
                  style={{
                    animationDuration: "2.2s",
                    WebkitMaskImage: "conic-gradient(transparent 66%, black 66%)",
                    maskImage: "conic-gradient(transparent 66%, black 66%)",
                    background:
                      "radial-gradient(closest-side, rgba(34,211,238,0.35), rgba(34,211,238,0.0))",
                    borderRadius: "9999px",
                  }}
                />
              </m.div>

              {/* Data points + light links */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI) / 4;
                const tx = 40 * Math.sin(angle);
                const ty = 40 * Math.cos(angle);
                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12 }}
                    className="absolute w-3 h-3 bg-cyan-400 rounded-full will-change-transform"
                    style={{ transform: `translate(${tx}%, ${ty}%)` }}
                  />
                );
              })}

              {/* Thin polygonal connections (SVG, very light) */}
              <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g stroke="rgba(34,211,238,0.25)" strokeWidth="0.2">
                  <polyline
                    fill="none"
                    points="50,10 80,35 65,80 35,80 20,35 50,10"
                  />
                  <polyline
                    fill="none"
                    points="50,20 70,40 60,70 40,70 30,40 50,20"
                  />
                </g>
              </svg>
            </div>
          </m.div>
        </m.div>

        {/* ------------------------------- Content ------------------------------- */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <m.header variants={containerVariants} initial="hidden" animate="visible" className="px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <m.div variants={itemVariants} className="flex justify-between items-center">
                <m.div className="flex items-center space-x-3 group cursor-pointer" whileHover={{ scale: 1.05 }}>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    RAHUL_DEV
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </m.div>

                <m.div variants={itemVariants} className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-cyan-300">AVAILABLE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Signal className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-300">ONLINE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300">READY</span>
                  </div>
                </m.div>
              </m.div>
            </div>
          </m.header>

          {/* Hero */}
          <m.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 flex items-center justify-center px-8">
            <div className="text-center max-w-6xl mx-auto">
              <m.div variants={itemVariants} className="mb-12">
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    RAHUL RAJ
                  </span>
                  <br />
                  <span className="text-white text-shadow-lg">FULL STACK ENGINEER</span>
                </h1>

                <div className="flex items-center justify-center space-x-4 text-xl text-gray-300 mb-6">
                  <span className="text-cyan-400">🇵🇰</span>
                  <span className="text-blue-400">→</span>
                  <span className="text-purple-400">🇩🇪</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-cyan-300">Available for Freelance Projects</span>
                </div>
              </m.div>

              {/* Description */}
              <m.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-16 leading-relaxed max-w-5xl mx-auto">
                <span className="text-cyan-400 font-semibold">Versatile Software Engineer</span> with expertise in
                <span className="text-blue-400 font-semibold"> frontend, backend, and data solutions</span>. <br className="hidden md:block" />
                From <span className="text-purple-400 font-semibold">web applications</span> to
                <span className="text-cyan-400 font-semibold"> enterprise systems</span> – <br className="hidden md:block" />
                I build <span className="text-blue-400 font-semibold">scalable, robust solutions</span> for any business need.
              </m.p>

              {/* CTAs */}
              <m.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <m.button
                  className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 will-change-transform"
                  onPointerMove={(e) => {
                    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                    magX.set((e.clientX - (rect.left + rect.width / 2)) * 0.1);
                    magY.set((e.clientY - (rect.top + rect.height / 2)) * 0.1);
                  }}
                  onPointerLeave={() => {
                    magX.set(0);
                    magY.set(0);
                  }}
                  style={{ translateX: magX as any, translateY: magY as any }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Rocket className="w-6 h-6 mr-3" />
                    START_PROJECT
                  </span>
                </m.button>

                <m.a
                  href="/Rahul-CV.pdf"
                  download="Rahul-Raj-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 font-bold rounded-xl hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 will-change-transform"
                >
                  <span className="flex items-center">
                    <FileText className="w-6 h-6 mr-3" />
                    DOWNLOAD_CV
                  </span>
                </m.a>

                <m.button
                  className="px-10 py-5 border-2 border-purple-400 text-purple-400 font-bold rounded-xl hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25 will-change-transform"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Webhook className="w-6 h-6 mr-3" />
                    VIEW_PORTFOLIO
                  </span>
                </m.button>
              </m.div>

              {/* Core tech */}
              <m.div variants={itemVariants} className="mb-16">
                <p className="text-cyan-300 mb-6 font-medium text-lg">CORE_TECHNOLOGIES</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {CORE_TECH.map((tech, index) => (
                    <m.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div
                        className={`p-4 rounded-xl border-2 border-cyan-400/40 bg-gradient-to-r ${tech.color} bg-clip-text text-transparent font-bold text-lg transition-transform duration-300 hover:scale-110 hover:border-cyan-400/60 will-change-transform`}
                      >
                        <div className="flex items-center space-x-2">
                          <tech.icon className="w-5 h-5" />
                          <span className="font-mono">{tech.name}</span>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </m.div>

              {/* Socials */}
              <m.div variants={itemVariants} className="flex justify-center space-x-6">
                {socials.map((s) => (
                  <m.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 group will-change-transform"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <s.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                  </m.a>
                ))}
              </m.div>
            </div>
          </m.div>

          {/* Status bar (unchanged) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="px-8 py-4 border-t border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-cyan-200 font-mono">
              <div className="flex items-center space-x-4">
                <span>STATUS: AVAILABLE_FOR_PROJECTS</span>
                <span>LOCATION: AUGSBURG_DE</span>
                <span>LANG: EN/UR/DE</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>RESPONSE: &lt;24H</span>
                <span>AVAILABILITY: IMMEDIATE</span>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default Hero;
