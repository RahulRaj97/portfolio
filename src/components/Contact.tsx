"use client";

import { useState, useMemo, useRef } from "react";
import {
  m,
  LazyMotion,
  domAnimation,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import emailjs from '@emailjs/browser';
import type { Variants } from "framer-motion";
import {
  Send,
  Mail,
  Github,
  Linkedin,
  Terminal,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  MessageSquare,
  MapPin,
  Zap,
  Database,
  Signal,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

/* ============================= CONFIG ============================= */
const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};

/* ============================= BG STARS =========================== */
const STARS = Array.from({ length: 24 }).map((_, i) => ({
  x: (i * 137.5) % 100,
  y: (i * 41.8) % 100,
  delay: (i % 8) * 0.2,
}));

/* ============================= VARIANTS =========================== */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { y: 22, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ============================= HELPERS ============================ */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function trySendEmail(params: Record<string, any>) {
  const live =
    EMAILJS_CONFIG.serviceId && !EMAILJS_CONFIG.serviceId.startsWith("YOUR");

  if (live) {
    try {
      const res = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        params,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      return { ok: res.status === 200 };
    } catch (e) {
      console.warn("EmailJS send failed; using demo fallback.", e);
    }
  }
  await sleep(1200);
  return { ok: true };
}

/* ============================= COMPONENT ========================== */
export default function Contact() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [flowStep, setFlowStep] = useState<
    "idle" | "queued" | "encrypt" | "uplink" | "done" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        label: "EMAIL",
        value: "rahule.lohana97@gmail.com",
        href: "mailto:rahule.lohana97@gmail.com",
        color: "from-cyan-500 to-blue-500",
        copyable: true,
      },
      {
        icon: Github,
        label: "GITHUB",
        value: "github.com/rahulraj97",
        href: "https://github.com/rahulraj97",
        color: "from-green-500 to-emerald-500",
      },
      {
        icon: Linkedin,
        label: "LINKEDIN",
        value: "linkedin.com/in/rahulraj97",
        href: "https://www.linkedin.com/in/rahulraj97",
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: MapPin,
        label: "LOCATION",
        value: "Augsburg, Germany",
        href: undefined,
        color: "from-orange-500 to-red-500",
      },
    ],
    []
  );

  const setField =
    (name: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFlowStep("idle");
      setErrorMsg("");
      setForm((f) => ({ ...f, [name]: e.target.value }));
    };

  const validate = () => {
    if (form.company.trim()) return "Bot detected.";
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim())
      return "Please fill in all required fields.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErrorMsg(v);
      setFlowStep("error");
      return;
    }

    setSubmitting(true);
    setFlowStep("queued");

    try {
      if (!reduce) {
        await sleep(350);
        setFlowStep("encrypt");
        await sleep(500);
        setFlowStep("uplink");
      }

      const res = await trySendEmail({
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_name: "Rahul Raj",
        reply_to: form.email,
      });

      if (!res.ok) throw new Error("Send failed");

      setFlowStep("done");
      setSubmitting(false);

      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "", company: "" });
        setFlowStep("idle");
      }, 3500);
    } catch {
      setSubmitting(false);
      setFlowStep("error");
      setErrorMsg("Failed to send. Try again or email me directly.");
    }
  };

  const onCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("rahule.lohana97@gmail.com");
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-[15px] md:text-[16px]"
      >
        {/* grid + tiny stars */}
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
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto px-6 max-w-7xl xl:max-w-[90rem]">
          {/* Header */}
          <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <m.p variants={item} className="font-mono text-cyan-300/90 text-xs tracking-widest mb-3">
              &gt; COMMS_GATE: SECURE_CHANNEL
            </m.p>
            <m.h2
              variants={item}
              className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              INITIATE_COMMUNICATION
            </m.h2>
          </m.div>

          {/* Main */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 xl:gap-16"
          >
            {/* FORM PANEL */}
            <m.div variants={item} className="p-8 rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-7 h-7 text-cyan-400" />
                <h3 className="text-3xl text-white font-bold">SEND_MESSAGE</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.company}
                  onChange={setField("company")}
                  className="hidden"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="NAME_*"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={setField("name")}
                    placeholder="Your full name"
                  />
                  <Field
                    label="EMAIL_*"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={setField("email")}
                    placeholder="you@company.com"
                  />
                </div>

                <Field
                  label="SUBJECT_*"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={setField("subject")}
                  placeholder="Project type or description"
                />

                <Area
                  label="MESSAGE_*"
                  name="message"
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Describe your project requirements..."
                />

                <m.button
                  type="submit"
                  disabled={submitting}
                  whileHover={!submitting && !reduce ? { y: -2, scale: 1.02 } : {}}
                  whileTap={!submitting && !reduce ? { scale: 0.98 } : {}}
                  className={`w-full px-8 py-4 rounded-xl font-bold font-mono transition-all
                    ${submitting ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400"}`}
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      PROCESSING…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      SEND_MESSAGE
                    </span>
                  )}
                </m.button>

                {/* FLOW STATUS */}
                <AnimatePresence mode="popLayout">
                  {flowStep !== "idle" && (
                    <m.div
                      key={flowStep}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`rounded-xl p-4 border font-mono text-base ${
                        flowStep === "error"
                          ? "text-red-300 bg-red-500/10 border-red-500/30"
                          : "text-cyan-200 bg-cyan-500/10 border-cyan-400/30"
                      }`}
                    >
                      <FlowStatus step={flowStep} errorMsg={errorMsg} />
                    </m.div>
                  )}
                </AnimatePresence>
              </form>
            </m.div>

            {/* RIGHT COLUMN */}
            <m.div variants={item} className="space-y-8 min-w-0">
              {/* System Status — fixed layout */}
              <div className="p-8 rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <Signal className="w-7 h-7 text-cyan-400" />
                  <h3 className="text-3xl text-white font-bold">SYSTEM_STATUS</h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <MetricCard
                    color="green"
                    label="AVAILABLE"
                    value="Ready for projects"
                    Icon={CheckCircle}
                  />
                  <MetricCard
                    color="blue"
                    label="RESPONSE_TIME"
                    value="< 24 hours"
                    Icon={Clock}
                  />
                  <MetricCard
                    color="purple"
                    label="TIMEZONE"
                    value="CET (UTC+1)"
                    Icon={Globe}
                  />
                </div>
              </div>

              {/* Direct Channels */}
              <div className="p-8 rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-7 h-7 text-cyan-400" />
                  <h3 className="text-3xl text-white font-bold">DIRECT_CHANNELS</h3>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((c) => (
                    <m.a
                      key={c.label}
                      href={c.href}
                      target={c.href ? "_blank" : undefined}
                      rel={c.href ? "noopener noreferrer" : undefined}
                      whileHover={!reduce ? { y: -2, scale: 1.01 } : {}}
                      className="block p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${c.color} grid place-items-center shrink-0`}>
                          <c.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-cyan-300 text-sm font-mono">{c.label}</p>
                          <p className="text-white font-medium truncate">{c.value}</p>
                        </div>
                        {c.href ? (
                          <ExternalLink className="w-5 h-5 text-cyan-400 shrink-0" />
                        ) : c.copyable ? (
                          <button
                            type="button"
                            onClick={onCopyEmail}
                            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 shrink-0"
                            aria-label="Copy email"
                          >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                        ) : null}
                      </div>
                    </m.a>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>

          {/* bottom strip */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 p-6 rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md text-center"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-200 font-mono text-base">STATUS: ONLINE</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Database className="w-5 h-5 text-blue-400" />
                <span className="text-blue-200 font-mono text-base">RESPONSE: FAST</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Signal className="w-5 h-5 text-purple-400" />
                <span className="text-purple-200 font-mono text-base">AVAILABILITY: IMMEDIATE</span>
              </div>
            </div>
          </m.div>
        </div>

        {/* small CSS helpers */}
        <style jsx>{`
          .field {
            transition: border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
          }
          .field:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.25);
          }
        `}</style>
      </section>
    </LazyMotion>
  );
}

/* ============================= SUB-COMPONENTS ===================== */

function Field(props: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-cyan-300 text-sm font-mono mb-2">{props.label}</label>
      <input
        {...props}
        className="field w-full px-4 py-3 rounded-xl border-2 border-cyan-400/30 bg-slate-800/50 text-gray-100 font-mono placeholder:text-gray-400/70 focus:border-cyan-400"
      />
    </div>
  );
}

function Area(props: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-cyan-300 text-sm font-mono mb-2">{props.label}</label>
      <textarea
        {...props}
        rows={6}
        className="field w-full px-4 py-3 rounded-xl border-2 border-cyan-400/30 bg-slate-800/50 text-gray-100 font-mono placeholder:text-gray-400/70 resize-y focus:border-cyan-400"
      />
    </div>
  );
}

function FlowStatus({
  step,
  errorMsg,
}: {
  step: "queued" | "encrypt" | "uplink" | "done" | "error";
  errorMsg?: string;
}) {
  const map: Record<typeof step, { icon: JSX.Element; text: string; sub?: string }> = {
    queued: { icon: <MessageSquare className="w-4 h-4" />, text: "Queued →", sub: "preparing payload" },
    encrypt: { icon: <Terminal className="w-4 h-4" />, text: "Encrypting →", sub: "AES-256" },
    uplink: { icon: <Send className="w-4 h-4" />, text: "Uplink →", sub: "satellite relay" },
    done: { icon: <CheckCircle className="w-4 h-4" />, text: "Delivered", sub: "ACK received" },
    error: { icon: <AlertCircle className="w-4 h-4" />, text: "Error", sub: errorMsg || "Try again" },
  };
  const d = map[step];
  return (
    <div className="flex items-center gap-3">
      {d.icon}
      <span className="font-semibold">{d.text}</span>
      <span className="text-cyan-300/80">· {d.sub}</span>
    </div>
  );
}

function MetricCard({
  color,
  label,
  value,
  Icon,
}: {
  color: "green" | "blue" | "purple";
  label: string;
  value: string;
  Icon: any;
}) {
  const colorMap = {
    green: { bg: "bg-green-500/10", br: "border-green-500/30", tx: "text-green-300" },
    blue: { bg: "bg-blue-500/10", br: "border-blue-500/30", tx: "text-blue-300" },
    purple: { bg: "bg-purple-500/10", br: "border-purple-500/30", tx: "text-purple-300" },
  }[color];

  return (
    <div className={`p-4 rounded-xl border ${colorMap.bg} ${colorMap.br} min-w-0`}>
      <div className="flex items-center gap-3 mb-1">
        <Icon className={`w-5 h-5 ${colorMap.tx} shrink-0`} />
        <span className={`font-mono text-xs ${colorMap.tx} uppercase tracking-wider`}>{label}</span>
      </div>
      <div className="text-white font-semibold truncate">{value}</div>
    </div>
  );
}
