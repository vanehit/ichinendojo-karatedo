/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "../stories/**/*.{js,ts,jsx,tsx}",
    "./apps/frontend/index.html",
    "./apps/frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
