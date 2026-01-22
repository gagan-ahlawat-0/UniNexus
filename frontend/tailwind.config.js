/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Important for the dark theme
  theme: {
    extend: {
      colors: {
        "primary": "#00a385",
        "background-light": "#ffffff",
        "background-dark": "#0a0c0c",
        "container-dark": "#161b1b",
        "nested-dark": "#1f2626",
        "card-dark": "#161b1b",
        "border-dark": "#1f2626",
        "input-dark": "#1f2626",
        "off-white": "#eef2f2",
        "accent-yellow": "#FCDA6D",
        "yellow-accent": "#FCDA6D",
        "deep-indigo": "#5c6bb1",
        "indigo-custom": "#5c6bb1"
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Noto Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      backgroundImage: {
        // You can add the gradient overlays here if you want to reuse them
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Uncomment if you have installed this plugin
  ],
}