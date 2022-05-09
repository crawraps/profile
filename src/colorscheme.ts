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
  link: string
  elevation: ElevationLevel[]
}

export type ElevationLevel = {
  shadow: string
  color: string
}

const darkTheme: Colorscheme = {
  main: '#000000',
  primary: '#00695c',
  secondary: '#353a3f',
  background: '#181818',
  opacityBackground: '#151515',
  text: '#ffffff',
  opacityText: 'rgba(255, 255, 255, .8)',
  link: '#60a199',
  elevation: [
    {
      shadow: '',
      color: '#212121',
    },
    {
      shadow: '',
      color: '#292929',
    },
    {
      shadow: '',
      color: '#303030',
    },
    {
      shadow: '',
      color: '#373737',
    },
  ],
}

const lightTheme: Colorscheme = {
  main: '#ffffff',
  primary: '#ffab90',
  secondary: '#ffd7d2',
  background: '#f1f1f1',
  opacityBackground: '#e3e3e3',
  text: '#000000',
  opacityText: 'rgba(0, 0, 0, .8)',
  link: '#bf806c',
  elevation: [
    {
      shadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      color: '',
    },
    {
      shadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      color: '',
    },
    {
      shadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      color: '',
    },
    {
      shadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      color: '',
    },
  ],
}

export const theme = {
  dark: darkTheme,
  light: lightTheme,
}
