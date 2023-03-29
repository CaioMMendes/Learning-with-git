/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        '--bg-color': '#808080',
        '--verde': '#7fff00',
        '--verdeRgba': 'rgb(127, 255, 0, 0.5)',
        '--font-size': '16px',
        '--colorMenuHover': '#f9f9f9',
        '--colorMenu': '#808080',
        '--navbarBackground': '#242424',
        '--alturaNavbar': '64px',
        '--totalNavbar': 'calc(64px + 15px)',
        '--alturaFooter': '60px',
        '--totalFooter': '60px',
        '--alturaContainer': 'calc(100vh - (var(--totalNavbar) + var(--totalFooter)))',
      }
    },
  },
  plugins: [],
}