import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends Colorscheme {}
}

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
  primary: '#00695c',
  secondary: '#353a3f',
  background: '#1a1a1a',
  opacityBackground: '#131b28',
  text: '#ffffff',
  opacityText: 'rbga(255, 255, 255, .6)',
}

const lightTheme: Colorscheme = {
  main: '#ffffff',
  primary: '#ffab90',
  secondary: '#ffd7d2',
  background: '#efefef',
  opacityBackground: 'rgba(255, 255, 255, .6)',
  text: '#000000',
  opacityText: 'rbga(0, 0, 0, .6)',
}

export const theme = {
  dark: darkTheme,
  light: lightTheme,
}
