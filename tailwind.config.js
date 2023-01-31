/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require("@smartive-education/design-system-component-library-bytelight/byteLightTailwind"),
  ],
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@smartive-education/design-system-component-library-bytelight/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
