//////////////////
//action types
export const ADD_LANGUAGE = 'ADD_LANGUAGE'
//////////////////
//action creators
export function addLanguage(language) {
  return { type: ADD_LANGUAGE, language }
}