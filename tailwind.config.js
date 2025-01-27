/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              fontStyle: "normal",
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
