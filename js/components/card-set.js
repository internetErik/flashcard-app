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
export class CardSet extends React.Component {
  constructor() {
    super()
    this.state = { 
      topic: 'ATTIC_GREEK',
      questions: [],
      curQuestion: 0,
      correct: 0,
      incorrect: 0,
      questionType: 'STEPS',
      isFetching: true,
      step: 0
    }
  }
  componentDidMount() {
    this.getQuestions(true)
  }
  handleTypeClick(questionType) {
    var state = { isFetching: true, questionType: questionType }
    state.step = (questionType === 'STEPS') ? 0 : -1
    this.setState(state)
    setTimeout(this.getQuestions.bind(this), 0)
  }
  randomPosition(length) {
    return Math.ceil(Math.random() * length-1)
  }
  getQuestions(initial) {
    if(initial)
      QuestionService(this.props.set.topic, this.props.set.questionType)
        .then(response => {
          if (response.status >= 400) console.log("Error!")
          return response.json()
        })
        .then(json => {
          var state = Object.create(this.props.set)
          var start = this.randomPosition(json.length)
          state.isFetching = false
          state.questions = json
          state.curQuestion = start
          this.setState(state)
        })
    else
      QuestionService(this.state.topic, this.state.questionType)
        .then(response => {
          if (response.status >= 400) console.log("Error!")
          return response.json()
        })
        .then(json => {
          var start = this.randomPosition(json.length)
          this.setState({ questions: json, curQuestion: start, isFetching: false })
        })
  }
  handleAnswerSubmit(answer) {
    var cur = this.state.curQuestion
    if(AnswerService(this.state.questionType, this.state.questions[cur], answer, this.state.step)) {
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
    var set = this.state
    if(set.isFetching || set.questions.length === 0) {
      return <h1>Loading . . .</h1>
    }
    else {
      let answerForm = "", question = "", answer = ""
      if(set.questions.length > 0) {
        question = set.questions[set.curQuestion].question
        answer = set.questions[set.curQuestion].answer
        if(set.step > -1)
          question = set.questions[set.curQuestion].question[set.step]
        if(set.questionType === "DECLENSION")
          answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
        else if(set.questionType === "VOCABULARY")
          answerForm = <AnswerText onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
        else if(set.questionType === "STEPS")
          answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
        else if(set.questionType === "MULTIPLE")
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
}