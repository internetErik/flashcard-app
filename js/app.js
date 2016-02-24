'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { AppDesktop } from './components/app-desktop.js!jsx'
import { addLanguage } from './redux/actions.js'
import { appDesktopStore } from './redux/stores.js'
const mapStateToProps = (state) => {
  return { cardSets: state.cardSets }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAddLanguage: (language) => {
      dispatch(addLanguage(language))
    }
  }
}
const App = connect(
  mapStateToProps,
  mapDispatchToProps)
(AppDesktop) 
ReactDOM.render(
  <Provider store={ appDesktopStore }>
    <App />
  </Provider>,
  document.getElementById('content')
)