import { AnyAction } from '@reduxjs/toolkit'
import i18next from 'i18next'
import { theme } from '../colorscheme'

interface DefaultState {
  theme: 'dark' | 'light'
  lang: 'en' | 'ru'
  navbar: 'visible' | 'hidden'
}

const defaultState = {
  theme: 'dark',
  lang: 'en',
  navbar: 'hidden',
} as DefaultState

export const settingsReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'setLang':
      return { ...state, lang: action.value }
    case 'setTheme':
      return { ...state, theme: action.value }
    case 'setNavbar':
      return { ...state, navbar: action.value }
    default:
      return state
  }
}

export function setLang(value: 'en' | 'ru') {
  i18next.changeLanguage(value)
  localStorage.setItem('lang', value)

  return { type: 'setLang', value }
}

export function setTheme(value: 'dark' | 'light') {
  localStorage.setItem('theme', value)
  document.body.style.backgroundColor = theme[value].background

  return { type: 'setTheme', value }
}

export function setNavbar(value: 'visible' | 'hidden') {
  return { type: 'setNavbar', value }
}
