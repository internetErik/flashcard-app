'use strict'
import { ADD_LANGUAGE } from './actions.js'
export function appDesktop(state = { cardSets: [] }, action) {
  switch(action.type) {
    case ADD_LANGUAGE:
      state.cardSets.push({
        language: action.language,
        questions: [{ question: '', answer: 0 }],
        curQuestion: 0,
        correct: 0,
        incorrect: 0,
        type: 'STEPS',
        step: 0
      })
      return { cardSets: state.cardSets }
    default:
      return state
  }
}