/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "#10A37F",
        "primary-hover": "#1A7F64",
        medium: "hsla(0, 0%, 100%, .15)",
        "medium-hover": "hsla(0, 0%, 100%, .25)",
        outline: "rgba(255, 255, 255, .1)",
        surface: "#171717",
        "surface-light": "#212121",
      },
      gridTemplateColumns: {
        "side-main": "260px 1fr",
      },
    },
    fontFamily: {
      sans: ["Google Sans"],
    },
  },
  plugins: [],
};
