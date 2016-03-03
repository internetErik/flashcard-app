'use strict'
export var AnswerService = (questionType, question, answer, step) => {
  if(IN_LIST.indexOf(questionType) > -1)
    return question.answer.indexOf(answer) > -1
  else if(STEP.indexOf(questionType) > -1)
    return question.answer[step] == answer
  else if(FIRST_IN_LIST.indexOf(questionType) > -1)
    return question.answer[0] == answer
  else
    console.log("Error!")
}
//configure here how different question types are checked
const IN_LIST = ["VOCABULARY"]
const STEP = ["STEPS"]
const FIRST_IN_LIST = ["DECLENSION", "MULTIPLE"]