// This file is used to configure Tailwind CSS. It is used to add custom classes, extend the default configuration, and add plugins.
/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
              fontWeight: "light",
              color: "text-gray-600",
              blockquote:{
                borderLeftWidth: '2px',
              },
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            a: {
              color: 'inherit',
              textDecorationLine: 'underline',
              textUnderlineOffset: '2px',
              textDecorationThickness: '2px',
              textDecorationColor: '#D1D5DB', // gray-300
              transition: 'color 0.2s ease-in-out, text-decoration-color 0.2s ease-in-out',
              outlineStyle: 'none',
              '&:hover': {
                textDecorationColor: '#6b7280', // gray-500
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
