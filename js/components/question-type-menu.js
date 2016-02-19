'use strict'
import React from 'react'
export class QuestionTypeMenu extends React.Component {
  constructor() { super() }
  handleTypeClick(e) {
    e.stopPropagation()
    this.props.onTypeClicked(e.target.value)
  }
  render() {
    return (
      <div>
        <button value="VOCABULARY" onClick={ this.handleTypeClick.bind(this) }>Vocabulary</button>
        <button value="DECLENSION" onClick={ this.handleTypeClick.bind(this) }>Declension</button>
        <button value="STEPS"      onClick={ this.handleTypeClick.bind(this) }>Steps</button>
      </div>         
    )
  }
}