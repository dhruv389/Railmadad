/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom': { 'max': '700px' },
        'md': {'max': '1024px'},

        'max-lg': { 'max': '1023px' },
         'account':{ 'max': '1235px' },
    

        
        'sm':{'max':'400px'}

      },
    },
  },
  plugins: [],
}

