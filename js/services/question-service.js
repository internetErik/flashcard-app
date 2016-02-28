'use strict'
import fetch from 'isomorphic-fetch'
export var QuestionService = (language, type) => {
  if(LANGUAGE_FOLDERS[language] && QUESTION_TYPES[type])
    return QUESTION_TYPES[type](LANGUAGE_FOLDERS[language])
  else
    console.log("Error!")
}
const QUESTION_TYPES = {
  "DECLENSION": (f) => fetch(`api/${ f }/declensions.json`),
  "VOCABULARY": (f) => fetch(`api/${ f }/vocabulary.json`),
  "STEPS"     : (f) => fetch(`api/${ f }/steps.json`),
  "MULTIPLE"  : (f) => fetch(`api/${ f }/multiple.json`)
}
const LANGUAGE_FOLDERS = {
  'ATTIC_GREEK': 'attic-greek',
  'GERMAN'     : 'german'
}