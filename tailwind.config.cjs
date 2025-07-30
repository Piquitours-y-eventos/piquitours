/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: {
          DEFAULT: '#1e3a8a', // Deep blue for headers, buttons
          light: '#3b82f6',   // Lighter blue for highlights
        },
        background: {
          DEFAULT: '#f8fafc', // Light background
          secondary: '#e2e8f0', // Light secondary background
        },
        text: {
          DEFAULT: '#1f2937', // Dark text for light mode
          muted: '#6b7280',   // Muted text for secondary content
        },
        // Dark mode colors
        dark: {
          primary: {
            DEFAULT: '#38bdf8', // Bright blue for dark mode
            light: '#0ea5e9',   // Slightly darker blue
          },
          background: {
            DEFAULT: '#0f172a', // Dark slate background
            secondary: '#1e293b', // Slightly lighter dark background
          },
          text: {
            DEFAULT: '#e2e8f0', // Light text for dark mode
            muted: '#9ca3af',   // Muted text for dark mode
          },
        },
      },
    },
  },
  plugins: [],
};