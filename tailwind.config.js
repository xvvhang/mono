import { radixThemePreset } from 'radix-themes-tw';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  presets: [radixThemePreset],
  plugins: ["postcss-import"]
}