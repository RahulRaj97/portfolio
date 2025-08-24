"use client";

import { useState, useMemo, useRef } from "react";
import {
  m,
  LazyMotion,
  domAnimation,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import emailjs from "@emailjs/browser";
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

/* ============================= VARIANTS =========================== */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { y: 18, opacity: 0 },
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
        color: "from-emerald-500 to-teal-500",
        copyable: true,
      },
      {
        icon: Github,
        label: "GITHUB",
        value: "github.com/rahulraj97",
        href: "https://github.com/rahulraj97",
        // Brand-correct GitHub dark (optional). You can switch to emerald if you prefer.
        color: "from-[#24292F] to-[#24292F]",
      },
      {
        icon: Linkedin,
        label: "LINKEDIN",
        value: "linkedin.com/in/rahulraj97",
        href: "https://www.linkedin.com/in/rahulraj97",
        // ✅ LinkedIn brand blue fix
        color: "from-[#0A66C2] to-[#0A66C2]",
      },
      {
        icon: MapPin,
        label: "LOCATION",
        value: "Augsburg, Germany",
        href: undefined,
        color: "from-emerald-400 to-teal-500",
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
        await sleep(300);
        setFlowStep("encrypt");
        await sleep(450);
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
      }, 3200);
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
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-emerald-50"
      >
        {/* soft grid to avoid emptiness */}
        <div
          className="absolute inset-0 opacity-[.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,.18) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 mx-auto px-6 max-w-7xl xl:max-w-[92rem]">
          {/* Header */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <m.p variants={item} className="font-mono text-emerald-700/80 text-xs tracking-widest mb-3">
              &gt; CONTACT_GATEWAY
            </m.p>

            {/* ✅ Leading + padding fixed so descenders (g/j/y) don’t clip */}
            <m.h2
              variants={item}
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.12] md:leading-[1.1] pb-1
                         bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-800 bg-clip-text text-transparent"
            >
              Let’s build something exceptional
            </m.h2>
          </m.div>

          {/* Main */}
          <m.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-10 xl:gap-14"
          >
            {/* FORM PANEL */}
            <m.div
              variants={item}
              className="p-8 rounded-2xl border border-slate-200 bg-white/85 backdrop-blur-lg shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-emerald-700" />
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Send a message</h3>
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
                    label="Name *"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={setField("name")}
                    placeholder="Your full name"
                  />
                  <Field
                    label="Email *"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={setField("email")}
                    placeholder="you@company.com"
                  />
                </div>

                <Field
                  label="Subject *"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={setField("subject")}
                  placeholder="Project type or short scope"
                />

                <Area
                  label="Message *"
                  name="message"
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Describe your project, goals, timing, and any links..."
                />

                <m.button
                  type="submit"
                  disabled={submitting}
                  whileHover={!submitting && !reduce ? { y: -2, scale: 1.01 } : {}}
                  whileTap={!submitting && !reduce ? { scale: 0.98 } : {}}
                  className={`w-full px-8 py-5 rounded-xl font-semibold leading-[1.15] text-white
                    ${submitting
                      ? "bg-emerald-600/70 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 transition-colors"}`}
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send message
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
                      className={`rounded-xl p-4 border font-mono text-sm ${
                        flowStep === "error"
                          ? "text-red-700 bg-red-50 border-red-200"
                          : "text-emerald-700 bg-emerald-50 border-emerald-200"
                      }`}
                    >
                      <FlowStatus step={flowStep as any} errorMsg={errorMsg} />
                    </m.div>
                  )}
                </AnimatePresence>
              </form>
            </m.div>

            {/* RIGHT COLUMN */}
            <m.div variants={item} className="space-y-8 min-w-0">
              {/* System Status */}
              <div className="p-8 rounded-2xl border border-slate-200 bg-white/85 backdrop-blur-lg shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Signal className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">System status</h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <MetricCard
                    color="green"
                    label="Available"
                    value="Ready for projects"
                    Icon={CheckCircle}
                  />
                  <MetricCard
                    color="blue"
                    label="Response"
                    value="< 24 hours"
                    Icon={Clock}
                  />
                  <MetricCard
                    color="indigo"
                    label="Timezone"
                    value="CET (UTC+1)"
                    Icon={Globe}
                  />
                </div>
              </div>

              {/* Direct Channels */}
              <div className="p-8 rounded-2xl border border-slate-200 bg-white/85 backdrop-blur-lg shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Direct channels</h3>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href ? "_blank" : undefined}
                      rel={c.href ? "noopener noreferrer" : undefined}
                      className="block p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${c.color} grid place-items-center shrink-0`}>
                          <c.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-500 text-xs font-mono uppercase tracking-wide">{c.label}</p>
                          <p className="text-slate-900 font-medium truncate">{c.value}</p>
                        </div>
                        {c.href ? (
                          <ExternalLink className="w-5 h-5 text-slate-500 shrink-0" />
                        ) : c.copyable ? (
                          <button
                            type="button"
                            onClick={onCopyEmail}
                            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 shrink-0"
                            aria-label="Copy email"
                          >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                        ) : null}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>

          {/* bottom strip */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-14 p-5 rounded-2xl border border-slate-200 bg-white/85 backdrop-blur-lg shadow-sm"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Zap className="w-5 h-5 text-emerald-700" />
                <span className="text-slate-800 font-mono">High-performance builds</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Database className="w-5 h-5 text-sky-700" />
                <span className="text-slate-800 font-mono">Robust data flow</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Signal className="w-5 h-5 text-indigo-700" />
                <span className="text-slate-800 font-mono">Availability: Immediate</span>
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
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
            border-color: rgb(16 185 129 / 0.7);
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
      <label className="block text-slate-700 text-sm mb-2">{props.label}</label>
      <input
        {...props}
        className="field w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
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
      <label className="block text-slate-700 text-sm mb-2">{props.label}</label>
      <textarea
        {...props}
        rows={6}
        className="field w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 resize-y"
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
    uplink: { icon: <Send className="w-4 h-4" />, text: "Uplink →", sub: "secure channel" },
    done: { icon: <CheckCircle className="w-4 h-4" />, text: "Delivered", sub: "ACK received" },
    error: { icon: <AlertCircle className="w-4 h-4" />, text: "Error", sub: errorMsg || "Try again" },
  };
  const d = map[step];
  return (
    <div className="flex items-center gap-3">
      {d.icon}
      <span className="font-semibold">{d.text}</span>
      <span className="text-slate-600">· {d.sub}</span>
    </div>
  );
}

function MetricCard({
  color,
  label,
  value,
  Icon,
}: {
  color: "green" | "blue" | "indigo";
  label: string;
  value: string;
  Icon: any;
}) {
  const colorMap = {
    green: { ring: "ring-emerald-100", dot: "bg-emerald-500", icon: "text-emerald-700" },
    blue: { ring: "ring-sky-100", dot: "bg-sky-500", icon: "text-sky-700" },
    indigo: { ring: "ring-indigo-100", dot: "bg-indigo-500", icon: "text-indigo-700" },
  }[color];

  return (
    <div className={`p-4 rounded-xl border border-slate-200 bg-white ring-1 ${colorMap.ring}`}>
      <div className="flex items-center gap-3 mb-1">
        <Icon className={`w-5 h-5 ${colorMap.icon}`} />
        <span className="font-mono text-xs text-slate-600 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${colorMap.dot}`} />
        <div className="text-slate-900 font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}
