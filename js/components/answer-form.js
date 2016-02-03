'use strict'

import React from 'react'

export class AnswerForm extends React.Component {
  constructor() {super()}

  handleAnswerClick(answer, e) {
    e.preventDefault()
    this.props.onAnswerSubmit(answer)
  }
  render() {
    return (
      <section className="answerForm">
        <button onClick={ this.handleAnswerClick.bind(this, 1) }>First</button>
        <button onClick={ this.handleAnswerClick.bind(this, 2) }>Second</button>
        <button onClick={ this.handleAnswerClick.bind(this, 3) }>Third</button>
      </section>
    )
  }
}