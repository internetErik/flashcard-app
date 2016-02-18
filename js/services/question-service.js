'use strict'
import * as $ from 'jquery'
export var QuestionService = (type) => {
  if(QuestionTypes[type])
    return QuestionTypes[type]()
  else
    console.log("Error!")
}
var QuestionTypes = {
  "DECLENSION": () => $.get('api/declensions.json'),
  "VOCABULARY": () => $.get('api/vocabulary.json'),
  "STEPS"     : () => $.get('api/steps.json')
}