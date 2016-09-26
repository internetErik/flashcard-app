'use strict'
import React from 'react'
import { CardSet } from './card-set.js!jsx'
export class AppDesktop extends React.Component {
  render() {
    const { cardSets, onAddLanguage } = this.props
    var sets = cardSets.map((set, i) => <CardSet key={ i } set={ set } />)
    return (
      <div className="app-desktop">
        <div>
          Add Language:
          <button value="ATTIC_GREEK" onClick={ (e) => onAddLanguage(e.target.value) }>ATTIC GREEK</button>
          <button value="GERMAN"      onClick={ (e) => onAddLanguage(e.target.value) }>GERMAN</button>
        </div>
        <h1>Card Sets</h1>
        { sets }
      </div>
    )
  }
}
AppDesktop.propTypes = {
  cardSets: React.PropTypes.arrayOf(React.PropTypes.shape({
    language:     React.PropTypes.string.isRequired,
    questions:    React.PropTypes.array.isRequired,
    curQuestion:  React.PropTypes.number.isRequired,
    correct:      React.PropTypes.number.isRequired,
    incorrect:    React.PropTypes.number.isRequired,
    questionType: React.PropTypes.string.isRequired,
    step:         React.PropTypes.number.isRequired,
    isFetching:   React.PropTypes.bool.isRequired 
  })).isRequired,
  onAddLanguage: React.PropTypes.func.isRequired
}