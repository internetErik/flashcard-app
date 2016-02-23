'use strict'
import React from 'react'
export class Card extends React.Component {
  constructor() { super() }
  questionText() {
    return { __html: this.props.question }
  }
  render() {
    return (
      <div className="card">
        <h1 className="card-word" dangerouslySetInnerHTML={ this.questionText() }>
        </h1>
      </div>
    )
  }
}