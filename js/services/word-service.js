'use strict'
import * as $ from 'jquery'
export var WordService = {
  getDeclensionWords() {
    return $.get('api/declensions.json')
  },
  getVocabularyWords() {
    return $.get('api/vocabulary.json')
  }
}