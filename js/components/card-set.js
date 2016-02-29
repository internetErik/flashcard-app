'use strict'
import React from 'react'
import { Card } from './card.js!jsx'
import { ScoreBoard } from './score-board.js!jsx'
import { QuestionTypeMenu } from './question-type-menu.js!jsx'
import { AnswerButtons } from './answer-buttons.js!jsx'
import { AnswerText } from './answer-text.js!jsx'
import { AnswerMultiple } from './answer-multiple.js!jsx'
import { QuestionService } from '../services/question-service.js'
import { AnswerService } from '../services/answer-service.js'
import { appDesktopStore } from '../redux/stores.js'
import { fetchQuestionsIfNeeded, answerQuestion, changeQuestionType } from '../redux/actions.js'
export class CardSet extends React.Component {
  handleTypeClick(questionType) {
    appDesktopStore.dispatch(changeQuestionType(this.props.set.language, questionType))
  }
  handleAnswerSubmit(answer) {
    appDesktopStore.dispatch(answerQuestion(this.props.set.language, answer))
  }
  render() {
    var set = this.props.set
    if(set.isFetching) {
      appDesktopStore.dispatch(fetchQuestionsIfNeeded(set.language, set.questionType))
      return <h1>Loading</h1>
    }
    else {
      let answerForm = ""
      let question = (set.step > -1) ? 
        set.questions[set.curQuestion].question[set.step] :
        set.questions[set.curQuestion].question
      let answer = set.questions[set.curQuestion].answer
      
      if(set.questionType === "DECLENSION")
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(set.questionType === "VOCABULARY")
        answerForm = <AnswerText onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(set.questionType === "STEPS")
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(set.questionType === "MULTIPLE")
        answerForm = <AnswerMultiple answers={ answer } onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      return (
        <div className="card-set">
          <QuestionTypeMenu onTypeClicked={ this.handleTypeClick.bind(this) } />
          <ScoreBoard correct={ set.correct } incorrect={ set.incorrect } />
          <Card question={ question } />
          { answerForm }
        </div>
      )
    }
  }
}