'use strict'
import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { AppDesktop } from './components/app-desktop.js!jsx'
import { LANGUAGE_CHANGE, languageChange } from './redux/actions.js'
function appDesktop(state = { language: 'ATTIC GREEK' }, action) {
  switch(action.type) {
    case LANGUAGE_CHANGE:
      return { language: action.language }
    default:
      return state
  }
}
let appDesktopStore = createStore(appDesktop)
const mapStateToProps = (state) => {
  console.log(state)
  return { language: state.language }
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
ReactDOM.render(
  <Provider store={ appDesktopStore }>
    <App />
  </Provider>,
  document.getElementById('content')
)