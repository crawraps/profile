import { getProjects, getTags, Project, Tag } from './../firebase/database'
import { AnyAction } from '@reduxjs/toolkit'

interface DefaultState {
  projects: Promise<Project[]>
  tags: Promise<Tag[]>
  currentTag: Tag | null
}

const defaultState: DefaultState = {
  projects: getProjects(),
  tags: getTags(),
  currentTag: null,
}

export const projectsReducer = (state = defaultState, action: AnyAction) => {
  return state
}
