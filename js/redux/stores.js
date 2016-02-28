'use strict'
import { createStore, applyMiddleware } from 'redux'
import { appDesktop } from './reducers.js'
import thunkMiddleware from 'redux-thunk'
export var appDesktopStore = createStore(appDesktop, applyMiddleware(thunkMiddleware))