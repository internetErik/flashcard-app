'use strict'
import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { AppDesktop } from './components/app-desktop.js!jsx'
import { LANGUAGE_CHANGE, languageChange } from './redux/actions.js'
function appDesktop(state = { language: 'ATTIC GREEK', cardSets: [] }, action) {
  switch(action.type) {
    case LANGUAGE_CHANGE:
      state.cardSets.push(1)
      return { language: action.language, cardSets: state.cardSets }
    default:
      return state
  }
}
const mapStateToProps = (state) => {
  return { 
    language: state.language,
    cardSets: state.cardSets
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageChange: (language) => {
      dispatch(languageChange(language))
    }
  }
}
let App = connect(
  mapStateToProps,
  mapDispatchToProps)
(AppDesktop) 
let appDesktopStore = createStore(appDesktop)
ReactDOM.render(
  <Provider store={ appDesktopStore }>
    <App />
  </Provider>,
  document.getElementById('content')
)