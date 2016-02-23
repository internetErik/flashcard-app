'use strict'
import React, { PropTypes } from 'react'
import { CardSet } from './card-set.js!jsx'
export class AppDesktop extends React.Component {
  render() {
    const { language, cardSets, onLanguageChange } = this.props
    return (
      <div className="app-desktop">
        <div>Current Language: { language } { cardSets.length }</div>
        <div>
          <button value="ATTIC GREEK" onClick={ (e) => onLanguageChange(e.target.value) }>ATTIC GREEK</button>
          <button value="GERMAN" onClick={ (e) => onLanguageChange(e.target.value) }>GERMAN</button>
        </div>
        <CardSet />
      </div>
    )
  }
}
AppDesktop.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  cardSets: PropTypes.array.isRequired
}