import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(221, 83%, 97%)",
          100: "hsl(221, 83%, 94%)",
          200: "hsl(221, 83%, 88%)",
          300: "hsl(221, 83%, 79%)",
          400: "hsl(221, 83%, 66%)",
          500: "hsl(var(--primary))",
          600: "hsl(221, 83%, 43%)",
          700: "hsl(221, 83%, 36%)",
          800: "hsl(221, 83%, 29%)",
          900: "hsl(221, 83%, 23%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(263, 85%, 97%)",
          100: "hsl(263, 85%, 93%)",
          200: "hsl(263, 85%, 87%)",
          300: "hsl(263, 85%, 78%)",
          400: "hsl(263, 85%, 65%)",
          500: "hsl(263, 85%, 52%)",
          600: "hsl(263, 85%, 42%)",
          700: "hsl(263, 85%, 35%)",
          800: "hsl(263, 85%, 28%)",
          900: "hsl(263, 85%, 22%)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(142, 76%, 95%)",
          100: "hsl(142, 76%, 89%)",
          200: "hsl(142, 76%, 78%)",
          300: "hsl(142, 76%, 65%)",
          400: "hsl(142, 76%, 51%)",
          500: "hsl(var(--accent))",
          600: "hsl(142, 76%, 29%)",
          700: "hsl(142, 76%, 24%)",
          800: "hsl(142, 76%, 19%)",
          900: "hsl(142, 76%, 15%)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      boxShadow: {
        "soft": "0 2px 8px 0 rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 8px 24px 0 rgba(0, 0, 0, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
