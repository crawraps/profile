import { Project } from './apis/types'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useLocation, useOutletContext } from 'react-router-dom'
import { AppDispatch, RootState } from './store'

export type PageInfo = {
  name: string
  page: 'home' | 'about' | 'project'
  project?: Project
}

// Custom hook to access page information
export function usePageInfo() {
  return useOutletContext<React.Dispatch<React.SetStateAction<PageInfo | null>>>()
}

// Custom hook to parse query string
export function useQuery(): URLSearchParams {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

// Custom hooks to useSelector and useDispatch with types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
