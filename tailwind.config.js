module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
      },
      backgroundImage: {
        'upload-img-color': "url('/assets/up-color.svg')",
        'upload-img-gray': "url('/assets/up-gray.svg')",
      }
    },
  },
  plugins: [],
}