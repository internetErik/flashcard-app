'use strict'
import React from 'react'
export class Card extends React.Component {
  constructor() { super() }
  render() {
    return (
      <div className="card">
        <h1 className="card-word">
          { this.props.question }
        </h1>
      </div>
    )
  }
}