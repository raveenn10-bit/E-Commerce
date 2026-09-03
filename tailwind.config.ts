import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50: "#fdf6f0",
          100: "#f9e8d5",
          200: "#f2ceaa",
          300: "#e9ae75",
          400: "#de8440",
          500: "#d6691c",
          600: "#c75212",
          700: "#a53c10",
          800: "#843015",
          900: "#6b2914",
          950: "#3d1207",
        },
        espresso: {
          50: "#f7f3f0",
          100: "#ede3db",
          200: "#d9c3b3",
          300: "#bf9b83",
          400: "#a67258",
          500: "#8d5a3d",
          600: "#7a4830",
          700: "#643a27",
          800: "#523122",
          900: "#44291e",
          950: "#1a0a00",
        },
        ivory: "#FAF6EF",
        champagne: {
          DEFAULT: "#C9A84C",
          light: "#E8C86D",
          dark: "#A88530",
        },
        blush: {
          DEFAULT: "#F2C0C0",
          light: "#FAE0E0",
          dark: "#E09090",
        },
        cream: "#FFF8F0",
        gold: {
          DEFAULT: "#C9A84C",
          50: "#fdf9ec",
          100: "#f9f0ca",
          200: "#f2df91",
          300: "#e9c84f",
          400: "#e2b227",
          500: "#c9951a",
          600: "#ae7314",
          700: "#8d5214",
          800: "#764217",
          900: "#653818",
          950: "#3b1d08",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      backgroundImage: {
        "chocolate-gradient":
          "linear-gradient(135deg, #1a0a00 0%, #3d1207 50%, #1a0a00 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #E8C86D 50%, #A88530 100%)",
        "hero-gradient":
          "linear-gradient(to right, rgba(26,10,0,0.95) 0%, rgba(26,10,0,0.8) 50%, rgba(26,10,0,0.3) 100%)",
      },
      boxShadow: {
        luxury: "0 4px 24px rgba(201,168,76,0.15), 0 1px 4px rgba(0,0,0,0.1)",
        "luxury-lg":
          "0 8px 40px rgba(201,168,76,0.2), 0 2px 8px rgba(0,0,0,0.15)",
        card: "0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        "card-hover":
          "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        "inner-luxury": "inset 0 1px 0 rgba(201,168,76,0.2)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
        "slide-in-left": "slideInLeft 0.3s ease-out forwards",
        "bounce-subtle": "bounceSubtle 0.4s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(201,168,76,0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
