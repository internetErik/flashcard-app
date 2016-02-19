'use strict'
import React from 'react'
import { Card } from './card.js!jsx'
import { ScoreBoard } from './score-board.js!jsx'
import { QuestionTypeMenu } from './question-type-menu.js!jsx'
import { AnswerButtons } from './answer-buttons.js!jsx'
import { AnswerText } from './answer-text.js!jsx'
import { QuestionService } from '../services/question-service.js'
import { AnswerService } from '../services/answer-service.js'
export class AppDesktop extends React.Component {
  constructor() {
    super()
    this.state = { 
      questions: [{question: '', answer: 0}],
      curQuestion: 0,
      correct: 0,
      incorrect: 0,
      type: 'STEPS',
      step: 0,
      language: 'ATTIC GREEK'
    } 
  }
  handleTypeClick(type) {
    var state = {question: [], type: type}
    state.step = (type === 'STEPS') ? 0 : -1;
    this.setState(state)
    setTimeout(this.getQuestions.bind(this), 0)
  }
  randomPosition(length) {
    return Math.ceil(Math.random() * length-1)
  }
  getQuestions() {
    QuestionService(this.state.type)
      .fail((err) => console.log(err))
      .done((data) => {
          var start = this.randomPosition(data.length)
          this.setState({ questions: data, curQuestion: start })
        })
  }
  componentDidMount() {
    this.getQuestions()
  }
  handleAnswerSubmit(answer) {
    var cur = this.state.curQuestion
    if(AnswerService(this.state.type, this.state.questions[cur], answer, this.state.step)) {
      let state = { correct: this.state.correct+1 };
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
    var answerForm = ""
    if(this.state.questions.length > 0) {
      let type = this.state.type
      if(type === "DECLENSION")
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(type === "VOCABULARY")
        answerForm = <AnswerText onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      else if(type === "STEPS")
        answerForm = <AnswerButtons onAnswerSubmit= { this.handleAnswerSubmit.bind(this) } />
    }
    return (
      <div className="card-container">
        <h1>Greek Practice</h1>
        <QuestionTypeMenu onTypeClicked={ this.handleTypeClick.bind(this) } />
        <ScoreBoard correct={ this.state.correct } incorrect={ this.state.incorrect } />
        <Card question={ this.state.questions[this.state.curQuestion].question } />
        { answerForm }
      </div>
    )
  }
}