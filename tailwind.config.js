/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      colors: {
        primary: "#1D6F2B",
        // secondary: "#EEEEEE",
        primeColor: "#262626",
        lightText: "#6D6D6D",
        secondary: "#000000",
        light: "#FFFFFF",
        bgprimary: "#ecfcf4",
        bgsecondary: "#022c23",

        border: "#7c7c7b",
        icon1: "#f4a535",
        icon2: "#1a65ed",
        icon3: "#d13931",
        background: "#D5D5D5",
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
