'use strict'
export var AnswerService = (type, word, answer) => {
  if(AnswerTypes[type])
    return AnswerTypes[type](word, answer)
  else
    console.log("Error!")
}
var AnswerTypes = {
  "DECLENSION": (word, answer) => word.answer === answer,
  "VOCABULARY": (word, answer) => word.answer.indexOf(answer) > -1
}
  