/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '668px',
      'lg': '1024px',
      'xl': '1440px',
    },
    extend: {
      colors: {
        lightYellow: '#f1d246',
        darkYellow: 'rgba(241, 210, 70, 0.98)',
        earth: '#383624',
        darkEarth: '#282617',
        peachOrange: 'rgba(250, 176, 103, 0.87)',
        smoke: '#e1dec7',
      },
      fontFamily: {
        sans: ["Roboto Slab", "sans-serif"],
        cursive: ["Caprasimo", "cursive"]
      },
      backgroundImage: {
        'radial-custom': "radial-gradient(circle at top, rgba(241, 210, 70, 0.98), rgba(250, 176, 103, 0.87)), url('/bg-pattern-dark.png')",
      },
      boxShadow: {
        'custom': '0 0 15px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out',
      },
    },
  },
  plugins: [],
}

