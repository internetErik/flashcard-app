'use strict'
import React from 'react'
export class AnswerMultiple extends React.Component {
  constructor() { super() }
  handleButtonAnswer(e) {
    e.preventDefault()
    this.props.onAnswerSubmit(e.target.value)
  }
  render() {
    var answers = ""
    if(Object.prototype.toString.call(this.props.answers) === '[object Array]') {
      let correctAnswer = <button value={ this.props.answers[0] } onClick={ this.handleButtonAnswer.bind(this) }>{ this.props.answers[0] }</button> 
      let falseAnswers = shuffle(this.props.answers.slice(1)).map((a) => {
        return <button value={ a } onClick={ this.handleButtonAnswer.bind(this) }>{ a }</button>
      })
      .slice(0,3)
      answers = shuffle([correctAnswer].concat(falseAnswers))
    }
    return (
      <form class="answerMultiple">
        { answers }
      </form>
    )
  }
}
//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}