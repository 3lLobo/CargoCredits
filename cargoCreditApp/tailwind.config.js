/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        500: "5",
        300: "3",
      },
      animation: {
        "spin-bezier": "myspin 11s cubic-bezier(0.9, 0.26, 0.97, 1) infinite",
        "slow-spin": "spin 56s ease-in-out reverse infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        myspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        ccgreen1: "#A8E6CE",
        ccgreen2: "#45ADA8",
        ccgreen3: "#547980",
        white: "#E5FCC2",
        "gray-100": "#EDE574",
        ccDarkText: "#2A363B",
        ccRedError: "#E84A5F",
        blocqpurple: "#B88DFF",
        neonPurple: "rgba(111,76,255,1.0)",
        navy: "#0b3a53",
        "navy-muted": "#244e66",
        aqua: "#69c4cd",
        "aqua-muted": "#9ad4db",
        ipfsgray: "#b7bbc8",
        "ipfsgray-muted": "#d9dbe2",
        charcoal: "#34373f",
        "charcoal-muted": "#7f8491",
        ipfsred: "#ea5037",
        "ipfsred-muted": "#f36149",
        ipfsyellow: "#f39021",
        "ipfsyellow-muted": "#f9a13e",
        ipfsteal: "#378085",
        "ipfsteal-muted": "#439a9d",
        ipfsgreen: "#0cb892",
        "ipfsgreen-muted": "#0aca9f",
        snow: "#edf0f4",
        "snow-muted": "#f7f8fa",
        link: "#117eb3",
        "washed-blue": "#F0F6FA",
      },
      backgroundImage: {
        "mybg-dark": "linear-gradient(170deg, #547980  , 90%, #E5FCC2   )",
        "mybg-light": "linear-gradient(170deg, #A8E6CE , 90%, #DCEDC2)",
        // 'hero-pattern': 'url("/hero.svg")',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
    plugin(function ({ addComponents }) {
      addComponents({});
    }),
  ],
};
