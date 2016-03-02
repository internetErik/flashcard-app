'use strict'
import fetch from 'isomorphic-fetch'
export var QuestionService = (topic, questionType) => {
  if(TOPIC_FOLDERS[topic] && QUESTION_TYPES[questionType])
    return QUESTION_TYPES[questionType](TOPIC_FOLDERS[topic])
  else
    console.log("Error!")
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