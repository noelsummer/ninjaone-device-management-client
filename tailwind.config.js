/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#337AB7",
        accent: "#002A42",
      },
    },
  },
  plugins: [],
}
