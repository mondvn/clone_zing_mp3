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
        'button-primary-bg': '#9B4DE0',
        'button-bg': '#FFFFFF1A',
        'input-bg': '#FFFFFF1A',
        'black-#181818': '#181818',
        'black-#ffffff1a': '#ffffff1a',
        'black-#ffffff33': '#ffffff33',
        'black-#ffffff4d': '#ffffff4d',
        'white-#ffffff26': '#ffffff26',
      },
      colors: {
        'primary-text-color': '#FFFFFF',
        'slider-text-color': '#a0a0a0',
        'button-header-color': '#C273ED',
        'player-text-color': '#FFFFFF80',
        'black-#FFFFFF80': '#FFFFFF80',
        'black-#ffffff1a': '#ffffff1a',
        'black-#32323d': '#32323d',
        'blue-#5a4be7': '#5a4be7',
        'pink-#c86dd7': '#c86dd7',
        'pink-#c273ed': '#c273ed',
        'pink-#9b4de0': '#9b4de0',
        'yellow-#ffdb00': '#ffdb00',
        'grey-#a0a0a0': '#a0a0a0',
      },
      borderColor: {
        'black-#353535': '#353535',
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
      flex: {
        '4': '4 4 0%',
        '6': '6 6 0%',
      }
    },
    screens: {
      '1600': '1600px',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}