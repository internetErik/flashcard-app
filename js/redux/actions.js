'use strict'
import { QuestionService } from '../services/question-service.js'
//action types
export const ADD_LANGUAGE         = 'ADD_LANGUAGE'
export const ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS'
export const ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE'
export const ANSWER_QUESTION      = 'ANSWER_QUESTION'
export const CHANGE_QUESTION_TYPE = 'CHANGE_QUESTION_TYPE'
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
export function answerQuestion(language, answer) {
  return { type: ANSWER_QUESTION, language, answer }
}
export function changeQuestionType(language, questionType) {
  return { type: CHANGE_QUESTION_TYPE, language, questionType }
}
//fetching
function fetchQuestions(language, questionType) {
  return dispatch => {
    dispatch(addLanguage(language))
    return QuestionService(language, questionType)
      .then(response => response.json())
      .then(json => dispatch(addLanguageSuccess(language, json)))
  }
}
function shouldFetchQuestions(state, language) {
  const set = state.cardSets.filter(s => s.language === language)[0]
  return set.isFetching ? true : false
}
export function fetchQuestionsIfNeeded(language, questionType) {
  return (dispatch, getState) => {
    if (shouldFetchQuestions(getState(), language))
      return dispatch(fetchQuestions(language, questionType))
    else
      return Promise.resolve()
  }
}