//////////////////
//action types
export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE'
//////////////////
//action creators
export function languageChange(language) {
  return { type: LANGUAGE_CHANGE, language }
}