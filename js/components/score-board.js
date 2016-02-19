'use strict'
import React from 'react'
export class ScoreBoard extends React.Component {
  constructor() { super() }
  render() {
    return (
    <div>
      <div>Correct: { this.props.correct }</div>
      <div>Incorrect: { this.props.incorrect }</div>
    </div>
    )
  }
}