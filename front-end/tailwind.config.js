/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{html,tsx}',
    './src/pages/**/*.{html,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      backgroundImage: {
        logoHome: "url('components/logo/logoHome.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwindcss-animated'),
  ],
};
