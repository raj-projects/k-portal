import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // KisanSetu Agricultural Theme Colors
        'kisan-green': {
          DEFAULT: '#2E8B57',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        'kisan-yellow': {
          DEFAULT: '#FFC107',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        'kisan-earth': '#D4A373',
        'kisan-bg': '#F6F7F9',
        'kisan-text': {
          primary: '#222222',
          secondary: '#333333',
          muted: '#666666',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'kisan': '8px',
        'kisan-lg': '12px',
      },
      fontFamily: {
        'devanagari': ['Noto Sans Devanagari', 'Noto Sans', 'sans-serif'],
        'latin': ['Inter', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'kisan-h1': ['2rem', { lineHeight: '2.5rem' }], // 32px
        'kisan-h1-mobile': ['1.5rem', { lineHeight: '2rem' }], // 24px
        'kisan-h2': ['1.5rem', { lineHeight: '2rem' }], // 24px
        'kisan-h2-mobile': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        'kisan-body': ['1rem', { lineHeight: '1.6' }], // 16px
        'kisan-body-mobile': ['0.875rem', { lineHeight: '1.6' }], // 14px
      },
      spacing: {
        'kisan-card': '1rem', // 16px
        'kisan-card-lg': '1.5rem', // 24px
        'kisan-section': '2rem', // 32px
        'kisan-section-lg': '3rem', // 48px
      },
      minHeight: {
        'touch-target': '44px',
        'touch-target-lg': '48px',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
