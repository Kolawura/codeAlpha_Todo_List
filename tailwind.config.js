/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.ts",
    "./src/**/*.js",
    "./src/**/*.html",
  ],
  theme: {
    extend: {
      spacing: {
        95: "95vw",
        30: "30rem",
      },
    },
  },
  plugins: [],
};
