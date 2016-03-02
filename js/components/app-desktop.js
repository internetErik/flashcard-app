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
    var topic = e.target.value
    if(this.isLanguageSelected(this.state, topic)) {
      let state = { cardSets: this.state.cardSets }
      state.cardSets.push({
        topic: topic,
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
  ndxOfSet(state, topic) {
    for(let i = 0; i < state.cardSets.length; i++)
      if(state.cardSets[i].topic === topic)
        return i
    return -1
  }
  isLanguageSelected(state, topic) {
    return (this.ndxOfSet(state, topic) > -1) ? false : true
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