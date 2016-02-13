'use strict'
import React from 'react'
export class AnswerForm extends React.Component {
  constructor() { super() }
  handleAnswerClick(e) {
    e.preventDefault()
    console.dir(e)
    this.props.onAnswerSubmit(e.value)
  }
  render() {
    return (
      <section className="answerForm">
        <button value="1"
          onClick={ this.handleAnswerClick.bind(this) }>First</button>
        <button value="2"
          onClick={ this.handleAnswerClick.bind(this) }>Second</button>
        <button value="3"
          onClick={ this.handleAnswerClick.bind(this) }>Third</button>
      </section>
    )
  }
}