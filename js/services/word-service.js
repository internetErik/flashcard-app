'use strict'
import * as $ from 'jquery'
class _WordService {
  getDeclensionWords() {
    return $.get('api/words.json')
  } 
}
export var WordService = new _WordService()