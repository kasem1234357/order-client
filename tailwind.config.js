const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        digital: ["DigitalFont", ...fontFamily.sans],
      },
      screens: {
      'mobile': { 'max': '700px' },
    },
      colors: {
        primary: "#1E1850",
        primaryYellow: "#CBDB2A",
        primaryRed: "#EF4626",
        primaryGreen: "#34C759",
        secondary: "#66666659",

        primaryLight: "#2b265a",
        primaryMedium: "#E9EBF8",
        primaryGray: "#F3F3F3",
        primaryBorder: "#F3F3F30D",
      },
      writingMode: {
        "vertical-rl": "vertical-rl",
        "vertical-lr": "vertical-lr",
      },
    },
  },
  plugins: [],
};
