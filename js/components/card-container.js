'use strict'
import React from 'react'
import {Card} from './card.js!jsx'
import {AnswerForm} from './answer-form.js!jsx'
import {WordService} from '../services/word-service.js'
export class CardContainer extends React.Component{
  constructor() {
    super()
    this.state = { 
      words: [{word: '', answer: 0}],
      currentWord: 0,
      correct: 0,
      incorrect: 0
    } 
  }
  randomPosition(length) {
    return Math.ceil(Math.random() * length)
  }
  componentDidMount() {
    WordService.getDeclensionWords()
      .fail((err) => console.log(err))
      .done((data) => {
          var start = this.randomPosition(data.length-1)
          this.setState({ words: data, currentWord: start })
        })
  }
  handleAnswerSubmit(answer) {
    var cur = this.state.currentWord
    if(this.state.words[cur].answer === answer)
      this.setState({ 
        currentWord: this.randomPosition(this.state.words.length-1), 
        correct: this.state.correct+1 
      })
    else
      this.setState({ incorrect: this.state.incorrect+1 })
  }
  render() {
    return (
      <div className="app">
        <h1>Declension Practice</h1>
        <div>Correct: { this.state.correct }</div>
        <div>Incorrect: { this.state.incorrect }</div>
        <Card word={ this.state.words[this.state.currentWord].word } />
        <AnswerForm onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      </div>
    )
  }
}