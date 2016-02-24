'use strict'
import { ADD_LANGUAGE } from './actions.js'
export function appDesktop(state = { cardSets: [] }, action) {
  switch(action.type) {
    case ADD_LANGUAGE:
      return {
        cardSets: [
          ...state.cardSets,
          {
            language: action.language,
            questions: [{ question: '', answer: 0 }],
            curQuestion: 0,
            correct: 0,
            incorrect: 0,
            type: 'VOCABULARY',
            step: 0
          }
        ]
      }
    default:
      return state
  }
}