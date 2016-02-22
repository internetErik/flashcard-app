'use strict'
import React from 'react'
import { CardSet } from './card-set.js!jsx'
export class AppDesktop extends React.Component {
  constructor() {
    super()
    this.state = { language: 'ATTIC GREEK' } 
  }
  render() {
    return (
      <div className="app-desktop">
        <CardSet />
      </div>
    )
  }
}