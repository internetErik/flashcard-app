'use strict'
import React, { PropTypes } from 'react'
import { CardSet } from './card-set.js!jsx'
export class AppDesktop extends React.Component {
  render() {
    const { cardSets, onAddLanguage } = this.props
    var sets = cardSets.map(set => <CardSet set={ set } />)
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
  cardSets: PropTypes.arrayOf(PropTypes.shape({
    language:     PropTypes.string.isRequired,
    questions:    PropTypes.array.isRequired,
    curQuestion:  PropTypes.number.isRequired,
    correct:      PropTypes.number.isRequired,
    incorrect:    PropTypes.number.isRequired,
    questionType: PropTypes.string.isRequired,
    step:         PropTypes.number.isRequired,
    isFetching:   PropTypes.bool.isRequired 
  })).isRequired,
  onAddLanguage: PropTypes.func.isRequired
}