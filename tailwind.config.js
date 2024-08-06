/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
    },
    screens: {
      "3xl": { max: "1800px" },
      m2xl: { min: "1500px" },
      "2xl": { max: "1500px" },
      xl: { max: "1200px" },
      "2lg": { max: "1024px" },
      m2lg: { min: "1024px" },
      lg: { max: "920px" },
      md: { max: "768px" },
      sm: { max: "600px" },
      xs: { max: "450px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
