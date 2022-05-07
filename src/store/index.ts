import { projectsReducer } from './projectsReducer'
import { settingsReducer } from './settingsReducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: { settingsReducer, projectsReducer },
})

// Define store types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Define typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
