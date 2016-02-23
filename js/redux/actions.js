/*
 * action types
 */

export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE'

/*
 * other constants
 */

export const Languages = {
  ATTIC_GREEK: 'ATTIC GREEK',
  GERMAN: 'GERMAN'
}

/*
 * action creators
 */

export function languageChange(language) {
  return { type: LANGUAGE_CHANGE, language }
}