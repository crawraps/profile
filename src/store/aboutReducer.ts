import { AboutText, getAboutText } from './../firebase/database'
import { AnyAction } from '@reduxjs/toolkit'

interface DefaultState {
  text: Promise<AboutText>
}

const defaultState: DefaultState = {
  text: getAboutText(),
}

export const aboutReducer = (state = defaultState, action: AnyAction) => {
  return state
}
