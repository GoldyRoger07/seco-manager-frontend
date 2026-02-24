/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'win-bg': '#f0f3f9',        // Le fond gris bleuté typique de Win11
        'win-card': '#ffffff',      // Fond des cartes
        'win-hover': '#eef2f5',     // Couleur au survol
        'win-primary': '#0067c0',   // Bleu système
        'win-text': '#1f1f1f',      // Texte principal
        'win-text-sec': '#5d5d5d',  // Texte secondaire
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}