/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, #F7F8FA 0%, #E2E6FC 100%)',
      },
      colors: {
        primary: {
          100: "#ceccd1",
          200: "#9c99a4",
          300: "#6b6676",
          400: "#393349",
          500: "#08001b",
          600: "#060016",
          700: "#050010",
          800: "#03000b",
          900: "#020005",
        },
        bodycolur: "rgba(244, 245, 250, 1)",
        navblue: "#2f4eff",
        onlinecolur: "rgba(3, 170, 0, 1)",
        notificolor: "rgba(219, 48, 34, 1)",
        containerWhite: "rgba(255, 255, 255, 1)",
        secondary: {
          100: "#e1dbeb",
          200: "#c3b6d7",
          300: "#a592c2",
          400: "#876dae",
          500: "#69499a",
          600: "#543a7b",
          700: "#3f2c5c",
          800: "#2a1d3e",
          900: "#150f1f",
        },
        invoiceBlue: "#2F4EFF",
        containerBlue: "#030C40",
        customTrBg: "#F4F5FA",
      },
    },
    fontFamily: {
      // sans: ['"Jakarta Sans"', 'Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};
