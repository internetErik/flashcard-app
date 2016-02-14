'use strict'
import React from 'react'
export class AnswerButtons extends React.Component {
  constructor() { super() }
  handleButtonAnswer(e) {
    e.preventDefault()
    this.props.onAnswerSubmit(e.target.value*1)
  }
  render() {
    return (
      <section className="answerButtons">
        <button value="1"
          onClick={ this.handleButtonAnswer.bind(this) }>First</button>
        <button value="2"
          onClick={ this.handleButtonAnswer.bind(this) }>Second</button>
        <button value="3"
          onClick={ this.handleButtonAnswer.bind(this) }>Third</button>
      </section>
    )
  }
}