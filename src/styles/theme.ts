import { createTheme, type ThemeOptions } from "@mui/material/styles";

// CSS Variables for better performance
export const cssVariables = `
  :root {
    /* Primary Colors - Professional Blue */
    --color-primary-50: #EFF6FF;
    --color-primary-100: #DBEAFE;
    --color-primary-200: #BFDBFE;
    --color-primary-300: #93C5FD;
    --color-primary-400: #60A5FA;
    --color-primary-500: #3B82F6;
    --color-primary-600: #2563EB;
    --color-primary-700: #1D4ED8;
    
    /* Secondary Colors - Subtle Accents */
    --color-secondary-50: #F8FAFC;
    --color-secondary-100: #F1F5F9;
    --color-secondary-200: #E2E8F0;
    --color-secondary-300: #CBD5E1;
    --color-secondary-400: #94A3B8;
    --color-secondary-500: #64748B;
    --color-secondary-600: #475569;
    --color-secondary-700: #334155;
    
    /* Accent Colors */
    --color-accent-emerald: #10B981;
    --color-accent-purple: #8B5CF6;
    --color-accent-amber: #F59E0B;
    --color-accent-rose: #F43F5E;
    
    /* Neutral Colors */
    --color-neutral-50: #FFFFFF;
    --color-neutral-100: #FAFAFA;
    --color-neutral-200: #F5F5F5;
    --color-neutral-300: #E5E5E5;
    --color-neutral-400: #D4D4D4;
    --color-neutral-500: #737373;
    --color-neutral-600: #525252;
    --color-neutral-700: #404040;
    --color-neutral-800: #262626;
    --color-neutral-900: #171717;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-2xl: 4rem;
    --spacing-3xl: 6rem;

    /* Typography */
    --font-size-xs: 0.875rem;
    --font-size-sm: 1rem;
    --font-size-base: 1.125rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 1.875rem;
    --font-size-3xl: 2.25rem;
    --font-size-4xl: 3rem;

    /* Shadows - Stripe/Vercel Style */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

    /* Transitions */
    --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
  }
`;

// Material-UI Theme Integration
export const createAppTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#3B82F6", // Professional blue
        light: "#60A5FA",
        dark: "#1D4ED8",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#64748B", // Subtle gray
        light: "#94A3B8",
        dark: "#334155",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#FFFFFF", // Clean white
        paper: "#FAFAFA",
      },
      text: {
        primary: "#171717", // Dark gray
        secondary: "#525252",
      },
      common: {
        white: "#FFFFFF",
        black: "#000000",
      },
    },

    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: 1.2,
        letterSpacing: "-0.025em",
      },
      h2: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: "2.25rem",
        lineHeight: 1.3,
        letterSpacing: "-0.025em",
      },
      h3: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: "1.875rem",
        lineHeight: 1.4,
        letterSpacing: "-0.025em",
      },
      h4: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.4,
        letterSpacing: "-0.025em",
      },
      h5: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.5,
        letterSpacing: "-0.025em",
      },
      h6: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.5,
        letterSpacing: "-0.025em",
      },
      body1: {
        fontSize: "1.125rem",
        lineHeight: 1.6,
        letterSpacing: "-0.01em",
      },
      body2: {
        fontSize: "1rem",
        lineHeight: 1.6,
        letterSpacing: "-0.01em",
      },
    },

    shape: {
      borderRadius: 8,
    },

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
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            padding: "12px 24px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            letterSpacing: "-0.01em",
          },
          contained: {
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            "&:hover": {
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderWidth: 1.5,
            "&:hover": {
              borderWidth: 1.5,
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
};

export type AppTheme = ReturnType<typeof createAppTheme>;
