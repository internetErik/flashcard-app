'use strict'
import React from 'react'
import {Card} from './card.js!jsx'
import {AnswerButtons} from './answer-buttons.js!jsx'
import {AnswerText} from './answer-text.js!jsx'
import {QuestionService} from '../services/question-service.js'
import {AnswerService} from '../services/answer-service.js'
export class AppDesktop extends React.Component {
  constructor() {
    super()
    this.state = { 
      questions: [{question: '', answer: 0}],
      curQuestion: 0,
      correct: 0,
      incorrect: 0,
      type: 'DECLENSION',
      language: 'ATTIC GREEK'
    } 
  }
  handleTypeClick(e) {
    e.preventDefault()
    this.setState({question: [], type: e.target.value})
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
    if(AnswerService(this.state.type, this.state.questions[cur], answer))
      this.setState({ 
        curQuestion: this.randomPosition(this.state.questions.length), 
        correct: this.state.correct+1 
      })
    else
      this.setState({ incorrect: this.state.incorrect+1 })
  }
  render() {
    var answerForm = ""
    if(this.state.questions.length > 0) {
      let type = this.state.type
      if(type === "DECLENSION") {
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      }
      else if(type === "VOCABULARY") {
        answerForm = <AnswerText onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      }
    }
    return (
      <div className="card-container">
        <button value="VOCABULARY" onClick={ this.handleTypeClick.bind(this) }>Vocabulary</button>
        <button value="DECLENSION" onClick={ this.handleTypeClick.bind(this) }>Declension</button>
        <h1>Greek Practice</h1>
        <div>Correct: { this.state.correct }</div>
        <div>Incorrect: { this.state.incorrect }</div>
        <Card question={ this.state.questions[this.state.curQuestion].question } />
        { answerForm }
      </div>
    )
  }
}