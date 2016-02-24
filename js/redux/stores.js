'use strict'
import { createStore } from 'redux'
import { appDesktop } from './reducers.js'
export var appDesktopStore = createStore(appDesktop)