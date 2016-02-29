'use strict'
export var AnswerService = (questionType, question, answer, step) => {
  if(AnswerTypes[questionType])
    return AnswerTypes[questionType](question, answer, step)
  else
    console.log("Error!")
}
var AnswerTypes = {
  "DECLENSION": (question, answer) => question.answer === answer,
  "VOCABULARY": (question, answer) => question.answer.indexOf(answer) > -1,
  "STEPS"     : (question, answer, step) => question.answer[step] === answer,
  "MULTIPLE"  : (question, answer) => question.answer[0] === answer
}
  