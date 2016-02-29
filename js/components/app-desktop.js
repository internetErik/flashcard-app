'use strict'
import React from 'react'
import { CardSet } from './card-set.js!jsx'
export class AppDesktop extends React.Component {
  constructor() {
    super()
    this.state = { cardSets: [] } 
  }
  onLanguageAdd(e) {
    e.stopPropagation()
    var language = e.target.value
    if(this.isLanguageSelected(this.state, language)) {
      let state = { cardSets: this.state.cardSets }
      state.cardSets.push({
        language: language,
        questions: [],
        curQuestion: 0,
        correct: 0,
        incorrect: 0,
        questionType: 'STEPS',
        isFetching: true,
        step: 0
      })
      this.setState(state)
    }
  }
  ndxOfSet(state, language) {
    for(let i = 0; i < state.cardSets.length; i++)
      if(state.cardSets[i].language === language)
        return i
    return -1
  }
  isLanguageSelected(state, language) {
    return (this.ndxOfSet(state, language) > -1) ? false : true
  }
  render() {
    var sets = this.state.cardSets.map(set => <CardSet set={ set }/>)
    return (
      <div className="app-desktop">
        <div>
          Add Language:
          <button value="ATTIC_GREEK" onClick={ this.onLanguageAdd.bind(this) }>ATTIC GREEK</button>
          <button value="GERMAN"      onClick={ this.onLanguageAdd.bind(this) }>GERMAN</button>
        </div>
        <h1>Card Sets</h1>
        { sets }
      </div>
    )
  }
}