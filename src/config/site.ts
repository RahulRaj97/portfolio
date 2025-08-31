export type NavItem = { label: string; href: string };

export type SocialItem = {
  label: "LinkedIn" | "GitHub" | "Email";
  href: string;
  icon: "Linkedin" | "Github" | "Mail";
  color: string;
};

export const NAV: readonly NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL: readonly SocialItem[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rahulraj97",
    icon: "Linkedin",
    color: "#0A66C2",
  },
  {
    label: "GitHub",
    href: "https://github.com/RahulRaj97",
    icon: "Github",
    color: "#24292F",
  },
  {
    label: "Email",
    href: "mailto:rahule.lohana97@gmail.com",
    icon: "Mail",
    color: "#EA4335",
  },
] as const;
