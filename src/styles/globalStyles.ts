import { css } from "@emotion/react";
import { cssVariables } from "./theme";

export const globalStyles = css`
  ${cssVariables}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    background: var(--color-neutral-50);
    color: var(--color-neutral-900);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }

  /* Optimized scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-neutral-100);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-neutral-300);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-neutral-400);
  }

  /* Selection styling */
  ::selection {
    background: var(--color-primary-200);
    color: var(--color-neutral-900);
  }

  /* Focus management */
  *:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Skip to content for accessibility */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-primary-500);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 6px;
    z-index: 10000;
    font-weight: 500;
  }
  .skip-link:focus {
    top: 6px;
  }

  /* Optimized transitions */
  * {
    transition: color var(--transition-fast),
      background-color var(--transition-fast),
      transform var(--transition-normal);
  }

  /* Performance optimizations */
  img,
  video,
  canvas,
  svg {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :root {
      --color-primary-500: #000000;
      --color-neutral-900: #000000;
    }
  }

  /* Typography improvements */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.025em;
  }
  p {
    margin-bottom: 1rem;
  }

  /* Link styling
     IMPORTANT: Do NOT style MUI buttons rendered as <a>.
     Exclude .MuiButton-root, .MuiIconButton-root, and .MuiButtonBase-root. */
  a:not(.MuiButton-root):not(.MuiIconButton-root):not(.MuiButtonBase-root) {
    color: var(--color-primary-600);
    text-decoration: none;
    transition: color var(--transition-fast);
  }
  a:not(.MuiButton-root):not(.MuiIconButton-root):not(
      .MuiButtonBase-root
    ):hover {
    color: var(--color-primary-700);
  }

  /* Button focus states */
  button:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;
