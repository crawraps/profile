import { Project, Tag } from '../apis/types'
import { AnyAction } from '@reduxjs/toolkit'

interface DefaultState {
  projects: Project[]
  tags: Tag[]
  loaded: boolean
}

const defaultState: DefaultState = {
  projects: [],
  tags: [],
  loaded: false,
}

export const dataReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'addProjects':
      return { ...state, projects: action.value }
    case 'addTags':
      return { ...state, tags: action.value }
    case 'setLoaded':
      return { ...state, loaded: action.value }
    default:
      return state
  }
}
