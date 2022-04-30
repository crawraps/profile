import { AnyAction } from '@reduxjs/toolkit'

interface DefaultState {
  theme: 'dark' | 'light'
  lang: 'en' | 'ru'
}

const defaultState = {
  theme: localStorage.getItem('theme') ?? 'dark',
  lang: localStorage.getItem('lang') ?? 'en',
} as DefaultState

export const settingsReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'lang':
      localStorage.setItem('lang', action.value)
      return { ...state, lang: action.value }
    case 'theme':
      localStorage.setItem('theme', action.value)
      return { ...state, theme: action.value }
    default:
      return state
  }
}
