// This file is used to configure Tailwind CSS. It is used to add custom classes, extend the default configuration, and add plugins.
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
            pre: {
              fontSize: '0.9rem',
              code: {
                fontSize: 'inherit',
              }
            },
            blockquote: {
              fontStyle: "normal",
              fontWeight: "light",
              color: "text-gray-600",
              blockquote:{
                borderLeftWidth: '2px',
              },
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
