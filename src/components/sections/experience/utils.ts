import { WORK } from "@/data/resume";

const TECH_KEYWORDS = [
  "React",
  "TypeScript",
  "Angular",
  "Node",
  "Python",
  "C++",
  "Electron",
  "Kubernetes",
  "Docker",
  "GCP",
  "MongoDB",
  "Dgraph",
  "Jenkins",
  "Airflow",
  "Superset",
  "Cypress",
  "Vite",
  "ROS",
  "Ubuntu",
];

export function formatMonthRange(start: string, end?: string) {
  const toLabel = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    const d = new Date(y, (m || 1) - 1);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  const s = toLabel(start);
  const e = end ? toLabel(end) : "Present";
  return `${s} — ${e}`;
}

export function getTechFromBullets(bullets: string[]) {
  return TECH_KEYWORDS.filter((tech) =>
    bullets.some((b) => b.toLowerCase().includes(tech.toLowerCase()))
  ).slice(0, 6);
}

export function summarizeBullets(bullets: string[]) {
  // Keep your first 2–3 lines crisp
  return bullets.slice(0, 3).map((t) =>
    t
      .replace(/^Core contributor on /, "Led development of ")
      .replace(/^Enhanced /, "Improved ")
      .replace(/^Built features for /, "Developed ")
  );
}

export function computeYears(): string {
  try {
    const starts = WORK.map((w) => new Date(w.start + "-01").getTime());
    const min = Math.min(...starts);
    const years = (Date.now() - min) / (1000 * 60 * 60 * 24 * 365.25);
    return years >= 4.5
      ? "5+ yrs"
      : years >= 3.5
      ? "4+ yrs"
      : `${Math.floor(years)} yrs`;
  } catch {
    return "4+ yrs";
  }
}

export function uniqueCountries() {
  const all = WORK.map((w) => (w.location.split(",").pop() || "").trim());
  return Array.from(new Set(all.filter(Boolean)));
}

export function tallyTech() {
  const counts: Record<string, number> = {};
  for (const w of WORK) {
    for (const t of getTechFromBullets(w.bullets)) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
}
