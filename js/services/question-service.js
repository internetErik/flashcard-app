'use strict'
import fetch from 'isomorphic-fetch'
export var QuestionService = (language, questionType) => {
  if(LANGUAGE_FOLDERS[language] && QUESTION_TYPES[questionType])
    return QUESTION_TYPES[questionType](LANGUAGE_FOLDERS[language])
  else
    console.log("Error!")
}
const QUESTION_TYPES = {
  "DECLENSION": (f) => fetch(`api/${ f }/declension.json`),
  "VOCABULARY": (f) => fetch(`api/${ f }/vocabulary.json`),
  "STEPS"     : (f) => fetch(`api/${ f }/steps.json`),
  "MULTIPLE"  : (f) => fetch(`api/${ f }/multiple.json`)
}
const LANGUAGE_FOLDERS = {
  'ATTIC_GREEK': 'attic-greek',
  'GERMAN'     : 'german'
}