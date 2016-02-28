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
import { fetchQuestionsIfNeeded } from '../redux/actions.js'
export class CardSet extends React.Component {
  constructor() { super() }
  handleTypeClick(type) {
    var state = {question: [], type: type}
    state.step = (type === 'STEPS') ? 0 : -1
    this.setState(state)
    setTimeout(this.getQuestions.bind(this), 0)
  }
  randomPosition(length) {
    return Math.ceil(Math.random() * length-1)
  }
  getQuestions() {
    QuestionService(this.props.set.language, this.props.set.type)
      .then((data) => {
          var start = this.randomPosition(data.length)
          this.setState({ questions: data, curQuestion: start })
        })
  }
  componentDidMount() {
    appDesktopStore.dispatch(fetchQuestionsIfNeeded(this.props.set.language, this.props.set.type))
  }
  handleAnswerSubmit(answer) {
    var cur = this.state.curQuestion
    if(AnswerService(this.state.type, this.state.questions[cur], answer, this.state.step)) {
      let state = { correct: this.state.correct+1 }
      if(this.state.step >= 0) {
        if(this.state.step < this.state.questions[cur].answer.length -1)
          state.step = this.state.step+1
        else {
          state.step = 0
          state.curQuestion = this.randomPosition(this.state.questions.length)
        }
      }
      else
        state.curQuestion = this.randomPosition(this.state.questions.length)
      this.setState(state)
    }
    else
      this.setState({ incorrect: this.state.incorrect+1 })
  }
  render() {
    var set = this.props.set
    if(this.props.set.isFetching)
      return <span>Loading</span>

    var answerForm = "", question = "", answer = ""
    if(set.questions.length > 0) {
      let type = set.type
      question = set.questions[set.curQuestion].question
      answer = set.questions[set.curQuestion].answer
      if(set.step > -1)
        question = set.questions[set.curQuestion].question[set.step]
      if(type === "DECLENSION")
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(type === "VOCABULARY")
        answerForm = <AnswerText onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(type === "STEPS")
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(type === "MULTIPLE")
        answerForm = <AnswerMultiple answers={ answer } onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
    }
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