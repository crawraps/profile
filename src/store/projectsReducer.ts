import { getProjects, getTags, Project, Tag } from './../firebase/database'
import { AnyAction } from '@reduxjs/toolkit'

interface DefaultState {
  projects: Promise<Project[]>
  tags: Promise<Tag[]>
}

const defaultState: DefaultState = {
  projects: getProjects(),
  tags: getTags(),
}

export const projectsReducer = (state = defaultState, action: AnyAction) => {
  return state
}
