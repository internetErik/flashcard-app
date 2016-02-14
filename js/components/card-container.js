'use strict'
import React from 'react'
import {Card} from './card.js!jsx'
import {AnswerButtons} from './answer-buttons.js!jsx'
import {AnswerText} from './answer-text.js!jsx'
import {WordService} from '../services/word-service.js'
import {AnswerService} from '../services/answer-service.js'
export class CardContainer extends React.Component{
  constructor() {
    super()
    this.state = { 
      words: [{word: '', answer: 0}],
      currentWord: 0,
      correct: 0,
      incorrect: 0,
      type: 'DECLENSION'
    } 
  }
  handleTypeClick(e) {
    e.preventDefault()
    this.setState({type: e.target.value})
    this.getWords()
  }
  randomPosition(length) {
    return Math.ceil(Math.random() * length-1)
  }
  getWords() {
    var p
    if(this.state.type === 'DECLENSION')
      p = WordService.getDeclensionWords()
    else 
      p = WordService.getVocabularyWords()
      
    p
    .fail((err) => console.log(err))
    .done((data) => {
        var start = this.randomPosition(data.length)
        this.setState({ words: data, currentWord: start })
      })
  }
  componentDidMount() {
    this.getWords()
  }
  handleAnswerSubmit(answer) {
    var cur = this.state.currentWord
    if(AnswerService(this.state.words[cur], answer))
      this.setState({ 
        currentWord: this.randomPosition(this.state.words.length), 
        correct: this.state.correct+1 
      })
    else
      this.setState({ incorrect: this.state.incorrect+1 })
  }
  render() {
    var answerForm = ""
    if(this.state.words.length > 0) {
      let word = this.state.words[this.state.currentWord]
      if(word.type === "DECLENSION") {
        answerForm = <AnswerButtons onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      }
      else {
        answerForm = <AnswerText onAnswerSubmit={ this.handleAnswerSubmit.bind(this) } />
      }
    }
    return (
      <div className="app">
        <button value="VOCABULARY" onClick={ this.handleTypeClick.bind(this) }>Vocabulary</button>
        <button value="DECLENSION" onClick={ this.handleTypeClick.bind(this) }>Declension</button>
        <h1>Declension Practice</h1>
        <div>Correct: { this.state.correct }</div>
        <div>Incorrect: { this.state.incorrect }</div>
        <Card word={ this.state.words[this.state.currentWord].word } />
        { answerForm }
      </div>
    )
  }
}