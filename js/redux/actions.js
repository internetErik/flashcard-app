//action types
export const ADD_LANGUAGE = 'ADD_LANGUAGE'
export const ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS'
export const ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE'
//action creators
export function addLanguage(language) {
  return { type: ADD_LANGUAGE, language }
}
export function addLanguageSuccess(language, data) {
  return { type: ADD_LANGUAGE_SUCCESS, language, data }
}
export function addLanguageFailure(language, error) {
  return { type: ADD_LANGUAGE_FAILURE, language, error }
}