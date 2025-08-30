import { createTheme } from "@mui/material/styles";

export const cssVariables = `
  :root {
    /* Primary — Amber */
    --color-primary-50:  #FFF7ED;
    --color-primary-100: #FFEDD5;
    --color-primary-200: #FED7AA;
    --color-primary-300: #FDBA74;
    --color-primary-400: #FB923C;
    --color-primary-500: #F59E0B; /* key warm amber */
    --color-primary-600: #D97706;
    --color-primary-700: #B45309;

    /* Secondary — Teal */
    --color-secondary-50:  #F0FDFA;
    --color-secondary-100: #CCFBF1;
    --color-secondary-200: #99F6E4;
    --color-secondary-300: #5EEAD4;
    --color-secondary-400: #2DD4BF;
    --color-secondary-500: #14B8A6; /* key teal */
    --color-secondary-600: #0D9488;
    --color-secondary-700: #0F766E;

    /* Accent suggestions (optional use) */
    --color-accent-emerald: #10B981;
    --color-accent-purple: #8B5CF6;
    --color-accent-amber:  #F59E0B;
    --color-accent-rose:   #F43F5E;

    /* Neutral / Background */
    --color-neutral-50:  #FFFCF7;   /* warm paper background */
    --color-neutral-100: #FFF8F0;
    --color-neutral-200: #F5EFE7;
    --color-neutral-300: #E7DED3;
    --color-neutral-400: #D6CDC3;
    --color-neutral-500: #6B7280;   /* slate-ish text secondary */
    --color-neutral-600: #4B5563;
    --color-neutral-700: #374151;
    --color-neutral-800: #1F2937;
    --color-neutral-900: #111827;   /* deep slate for headings */

    /* Spacing (kept) */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-2xl: 4rem;
    --spacing-3xl: 6rem;

    /* Typography scale (kept) */
    --font-size-xs: 0.875rem;
    --font-size-sm: 1rem;
    --font-size-base: 1.125rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 1.875rem;
    --font-size-3xl: 2.25rem;
    --font-size-4xl: 3rem;

    /* Shadows (kept) */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);

    /* Transitions (kept) */
    --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    /* Radius (kept) */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
  }
`;

export const createAppTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#F59E0B", // amber key
        light: "#FDBA74",
        dark: "#D97706",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#14B8A6", // teal key
        light: "#2DD4BF",
        dark: "#0F766E",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#FFFCF7", // warm paper
        paper: "#FFF8F0",
      },
      text: {
        primary: "#111827", // deep slate for headings
        secondary: "#4B5563", // slate for body
      },
      common: { white: "#FFFFFF", black: "#000000" },
    },

    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: 1.2,
        letterSpacing: "-0.025em",
      },
      h2: {
        fontWeight: 600,
        fontSize: "2.25rem",
        lineHeight: 1.3,
        letterSpacing: "-0.025em",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.875rem",
        lineHeight: 1.35,
        letterSpacing: "-0.02em",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.4,
        letterSpacing: "-0.015em",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1.125rem",
        lineHeight: 1.65,
        letterSpacing: "-0.005em",
      },
      body2: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
    },

    shape: { borderRadius: 10 },

    spacing: (factor: number) => `${8 * factor}px`,

    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "12px 24px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            letterSpacing: "-0.01em",
          },
          contained: {
            boxShadow:
              "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px 0 rgba(0,0,0,0.04)",
            "&:hover": {
              boxShadow:
                "0 8px 16px -6px rgba(0,0,0,0.12), 0 4px 6px -4px rgba(0,0,0,0.08)",
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderWidth: 1.5,
            "&:hover": { borderWidth: 1.5, transform: "translateY(-1px)" },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            boxShadow:
              "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.06)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 252, 247, 0.85)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)",
          },
        },
      },
    },

    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
  });
};

export type AppTheme = ReturnType<typeof createAppTheme>;
