/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        bodyFont: "Poppins",
        titleFont: "Nunito Sans"
      },
      screens: {
        "sm": "320px",
        "md": "768px",
        "lg": "1280px",
        "xl": "1920px"
      }
    },
  },
  plugins: [],
}

