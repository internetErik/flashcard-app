'use strict'
import fetch from 'isomorphic-fetch'
export var QuestionService = {
  fetch(topic, questionType) {
    if(TOPIC_FOLDERS[topic] && QUESTION_TYPES[questionType])
      return QUESTION_TYPES[questionType](TOPIC_FOLDERS[topic])
    else
      console.log("Error!")
  },
  hasSteps(questionType) {
    return QUESTIONS_WITH_STEPS.indexOf(questionType) > -1
  },
  answerFormType(questionType, answerType) {
    if(QUESTION_TYPES[questionType] && QUESTION_ANSWER_TYPES[answerType])
      return QUESTION_ANSWER_TYPES[answerType].indexOf(questionType) > -1
    else
      console.log("Error!")
  }
}
//this stuff needs configuration
const QUESTIONS_WITH_STEPS = ["STEPS"] 
const QUESTION_ANSWER_TYPES = {
  "TEXT":                ["VOCABULARY"],
  "MULTIPLE_CHOICE":     ["DECLENSION", "MULTIPLE", "STEPS"]
}
const QUESTION_TYPES = {
  "DECLENSION": (f) => fetch(`api/${ f }/declensions.json`),
  "VOCABULARY": (f) => fetch(`api/${ f }/vocabulary.json`),
  "STEPS"     : (f) => fetch(`api/${ f }/steps.json`),
  "MULTIPLE"  : (f) => fetch(`api/${ f }/multiple.json`)
}
const TOPIC_FOLDERS = {
  'ATTIC_GREEK': 'attic-greek',
  'GERMAN'     : 'german'
}