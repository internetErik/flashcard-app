'use strict'
export var AnswerService = (questionType, question, answer, step) => {
  if(ANSWER_TYPES[questionType])
    return ANSWER_TYPES[questionType](question, answer, step)
  else
    console.log("Error!")
}
const ANSWER_TYPES = {
  "DECLENSION": (question, answer)       => question.answer === answer,
  "VOCABULARY": (question, answer)       => question.answer.indexOf(answer) > -1,
  "STEPS"     : (question, answer, step) => question.answer[step] === answer,
  "MULTIPLE"  : (question, answer)       => question.answer[0] === answer
}
  