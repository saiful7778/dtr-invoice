/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/styles/*.js",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
