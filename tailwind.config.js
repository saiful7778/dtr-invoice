/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{jsx,tsx}",
    "./node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("keep-react/preset")],
  theme: {
    extend: {
      colors: {
        "royal-blue": "#2405F2",
        "tint-blue": "#1C1E53",
        "dark-blue": "#282938",
        yellow: "#FCD980",
        accent: "#EEF4FA",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
