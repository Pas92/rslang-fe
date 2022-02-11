import { htmlToElement } from "../../utils/htmlToElement";
import { Word } from "../../utils/types/schemas";

import { baseURL } from "../../utils/requests";

import HTML from './word-card.html';
import './word-card.scss'

export class WordCard {
  wordData: Word
  DOM: HTMLElement
  wordEngContainer: HTMLHeadingElement | null
  wordRuContainer: HTMLParagraphElement | null
  wordMeaningEngContainer: HTMLSpanElement | null
  wordMeaningRuContainer: HTMLSpanElement | null
  imgDOM: HTMLImageElement | null
  constructor(word: Word) {
    //Data
    this.wordData = word;
    this.DOM = htmlToElement(HTML) as HTMLElement;

    // Word
    this.wordEngContainer = this.DOM.querySelector('.word__description_eng .word__english');
    if (this.wordEngContainer) {
      this.wordEngContainer.textContent = `${this.wordData.word} ${this.wordData.transcription}`
    }

    this.wordRuContainer = this.DOM.querySelector('.word__description_ru .word__translate');
    if (this.wordRuContainer) {
      this.wordRuContainer.textContent = `${this.wordData.wordTranslate}`
    }

    // Meaning
    this.wordMeaningEngContainer = this.DOM.querySelector('.word__description_eng .word__meaning');
    if (this.wordMeaningEngContainer) {
      this.wordMeaningEngContainer.innerHTML = `${this.wordData.textMeaning}`
    }

    this.wordMeaningRuContainer = this.DOM.querySelector('.word__description_ru .word__meaning');
    if (this.wordMeaningRuContainer) {
      this.wordMeaningRuContainer.innerHTML = `${this.wordData.textMeaningTranslate}`
    }

    // Image
    this.imgDOM = this.DOM.querySelector('.word__img');
    if (this.imgDOM) {
      this.imgDOM.src = `${baseURL}${this.wordData.image}`
    }

    console.log(this)
  }

  insert() {
    return this.DOM
  }

  delete() {
    this.DOM.remove()
  }
}
