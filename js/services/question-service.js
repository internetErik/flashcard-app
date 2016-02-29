'use strict'
import * as $ from 'jquery'
export var QuestionService = (language, questionType) => {
  if(LANGUAGE_FOLDERS[language] && QUESTION_TYPES[questionType])
    return QUESTION_TYPES[questionType](LANGUAGE_FOLDERS[language])
  else
    console.log("Error!")
}
const QUESTION_TYPES = {
  "DECLENSION": (f) => $.get(`api/${ f }/declensions.json`),
  "VOCABULARY": (f) => $.get(`api/${ f }/vocabulary.json`),
  "STEPS"     : (f) => $.get(`api/${ f }/steps.json`),
  "MULTIPLE"  : (f) => $.get(`api/${ f }/multiple.json`)
}
const LANGUAGE_FOLDERS = {
  'ATTIC_GREEK': 'attic-greek',
  'GERMAN'     : 'german'
}