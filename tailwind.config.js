/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark-blue": "#0A0E31",
        "custom-light-blue": "#1C2141",
        "custom-violet": "#5E69DC",
      },
    },
  },
  plugins: [],
};
