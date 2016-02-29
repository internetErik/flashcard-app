'use strict'
import { 
  ADD_LANGUAGE, 
  ADD_LANGUAGE_SUCCESS,
  ANSWER_QUESTION, 
  CHANGE_QUESTION_TYPE
} from './actions.js'
import { AnswerService } from '../services/answer-service'
export function appDesktop(state = { cardSets: [] }, action) {
  console.log(action.type)
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
            step: -1,
            isFetching: true
          }
        ]
      } : state
    case ADD_LANGUAGE_SUCCESS:
      let ndx = ndxOfSet(state, action.language)
      state.cardSets[ndx].questions = action.data
      state.cardSets[ndx].isFetching = false
      state.cardSets[ndx].curQuestion = nextQuestion(action.data.length)
      return {
        cardSets: [
          ...state.cardSets
        ]
      }
    case ANSWER_QUESTION:
      state = checkAnswer(state, action.language, action.answer)
      return {
        cardSets: [
          ...state.cardSets
        ]
      }
    case CHANGE_QUESTION_TYPE:
      state = changeQuestionType(state, action.language, action.questionType)
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
function ndxOfSet(state, language) {
  for(let i = 0; i < state.cardSets.length; i++)
    if(state.cardSets[i].language === language)
      return i
  return -1
}
function isLanguageSelected(state, language) {
  return (ndxOfSet(state, language) > -1) ? false : true
}
function nextQuestion(length) {
  return Math.ceil(Math.random() * length-1)
}
function checkAnswer(state, language, answer) {
  var ndx = ndxOfSet(state, language)
  var set = state.cardSets[ndx]
  var cur = set.curQuestion
  if(AnswerService(set.type, set.questions[cur], answer, set.step)) {
    set.correct++
    if(set.step >= 0)
      if(set.step < set.questions[cur].answer.length -1)
        set.step++
      else {
        set.step = 0
        set.curQuestion = nextQuestion(set.questions.length)
      }
    else
      set.curQuestion = nextQuestion(set.questions.length)
  }
  else
    set.incorrect++
  return state
}
function changeQuestionType(state, language, type) {
  var ndx = ndxOfSet(state, language)
  var set = state.cardSets[ndx]
  set.type = type
  set.isFetching = true
  set.steps = type === 'STEPS' ? 0 : -1
  return state
}