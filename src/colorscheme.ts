export type Colorscheme = {
  main: string
  primary: string
  secondary: string
  background: string
  opacityBackground: string
  text: string
  opacityText: string
}

const darkTheme: Colorscheme = {
  main: '#000000',
  primary: '#aeb6bf',
  secondary: '#e5e7e9',
  background: '#1a1a1a',
  opacityBackground: 'rgba(0, 0, 0, .6)',
  text: '#ffffff',
  opacityText: 'rbga(255, 255, 255, .6)',
}

const lightTheme: Colorscheme = {
  main: '#ffffff',
  primary: '#ffab90',
  secondary: '#ffe390',
  background: '#efefef',
  opacityBackground: 'rgba(255, 255, 255, .6)',
  text: '#000000',
  opacityText: 'rbga(0, 0, 0, .6)',
}

export const theme = {
  dark: darkTheme,
  light: lightTheme,
}
