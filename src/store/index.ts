import { dataReducer } from './dataReducer'
import { setLang, setTheme, settingsReducer } from './settingsReducer'
import { configureStore } from '@reduxjs/toolkit'
import { addDescriptions, fetchAboutText, fetchProjects, fetchTags } from '../apis/database'
import i18next from 'i18next'

export const store = configureStore({
  reducer: { settings: settingsReducer, data: dataReducer },
  middleware: getDeaultMiddleware => getDeaultMiddleware({ serializableCheck: false }),
})

// Setup storae
export function setupStore() {
  // Fetch database
  store.dispatch(fetchTags)
  store.dispatch(fetchProjectsWithDescriptions)

  // Set language and theme by user preferences
  store.dispatch(setLang((localStorage.getItem('lang') ?? i18next.language.split('-')[0]) as 'en' | 'ru'))
  const theme = localStorage.getItem('theme')
  if (theme) {
    store.dispatch(setTheme(localStorage.getItem('theme') as 'light' | 'dark'))
  } else {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      store.dispatch(setTheme('light'))
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      store.dispatch(setTheme('dark'))
    }
  }
}

export function fetchProjectsWithDescriptions(dispatch: AppDispatch, getState: () => RootState) {
  fetchProjects(dispatch, getState).then(() => addDescriptions(dispatch, getState))
}

// Define store types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
