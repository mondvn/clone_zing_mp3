/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'layout-bg': '#1E1E1E',
        'slider-bg': '#292929',
        'slider-hover-bg': '#404040',
        'player-bg': '#181818',
        'button-primary-bg': '#9B4DE0',
        'button-bg': '#FFFFFF1A',
        'input-bg': '#FFFFFF1A',
      },
      colors: {
        'primary-color': '#FFFFFF',
        'slider-color': '#a0a0a0',
        'button-header-color': '#C273ED',
      },
      borderColor: {
        'player-border-color': '#353535',
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px)',
            'transform': 'translateX(-500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)',
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            'transform': 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)',
          }
        },
        'slide-left-2': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
            'transform': 'translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            'transform': 'translateX(0)',
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left-2': 'slide-left-2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
    },
  },
  plugins: [],
}