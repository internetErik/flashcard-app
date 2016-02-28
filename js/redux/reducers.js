'use strict'
import { ADD_LANGUAGE, ADD_LANGUAGE_SUCCESS } from './actions.js'
export function appDesktop(state = { cardSets: [] }, action) {
  switch(action.type) {
    case ADD_LANGUAGE:
      return isLanguageSelected(state, action.language) ? {
        cardSets: [
          ...state.cardSets,
          {
            language: action.language,
            questions: [{ question: '', answer: 0 }],
            curQuestion: 0,
            correct: 0,
            incorrect: 0,
            type: 'VOCABULARY',
            step: 0,
            isFetching: true
          }
        ]
      } : state
    case ADD_LANGUAGE_SUCCESS:
      for(let i = 0; i < state.cardSets.length; i++)
        if(state.cardSets[i].language === action.language) {
          state.cardSets[i].questions = action.data
          state.cardSets[i].isFetching = false
          break
        }
      return {
        cardSets: [
          ...state.cardSets
        ]
      }
    default:
      return state
  }
}
//helpers
function isLanguageSelected(state, language) {
  for(let i = 0; i < state.cardSets.length; i++)
    if(state.cardSets[i].language === language)
      return false
  return true
}