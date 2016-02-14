'use strict'
import React from 'react'
export class AnswerText extends React.Component {
  constructor() { 
    super() 
    this.state = { text: "" }
  }
  handleTextAnswer(e) {
    e.preventDefault()
    this.props.onAnswerSubmit(this.state.text)
  }
  handleTextAnswerChange(e) {
    e.preventDefault()
    this.setState({ text: e.target.value })
  }
  render() {
    return (
      <form className="answerText" onSubmit={ this.handleTextAnswer.bind(this) }>
        <input type="text" 
          value={ this.state.text }
          onChange={ this.handleTextAnswerChange.bind(this) } />
        <input type="submit" value="submit" />
      </form>
    )
  }
}