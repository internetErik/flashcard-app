'use strict'
export var AnswerService = (type, word, answer, step) => {
  if(AnswerTypes[type])
    return AnswerTypes[type](word, answer, step)
  else
    console.log("Error!")
}
var AnswerTypes = {
  "DECLENSION": (word, answer) => word.answer === answer,
  "VOCABULARY": (word, answer) => word.answer.indexOf(answer) > -1,
  "STEPS"     : (word, answer, step) => word.answer[step] === answer
}
  