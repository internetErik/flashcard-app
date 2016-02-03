'use strict'

import React from 'react'

export class Card extends React.Component {
  constructor(){super()}
  render() {
    return (
      <div className="card">
        <h2 className="card-word">
          { this.props.word }
        </h2>
      </div>
    )
  }
}