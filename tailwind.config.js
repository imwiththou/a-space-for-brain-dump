// This file is used to configure Tailwind CSS. It is used to add custom classes, extend the default configuration, and add plugins.
/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["media"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
