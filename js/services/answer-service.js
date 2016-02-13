'use strict'
export var AnswerService = (word, answer) => {
  if(word.type && AnswerTypes[word.type])
    return AnswerTypes[word.type](word, answer)
  else
    console.log("Error!")
}

var AnswerTypes = {
  "DECLENSION": (word, answer) => word.answer === answer,
  "VOCABULARY": (word, answer) => word.answer.indexOf(answer) > -1
}
  