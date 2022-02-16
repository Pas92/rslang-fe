import { htmlToElement } from "../../utils/htmlToElement";
import { Word } from "../../utils/types/schemas";

import { baseURL, changeWordStatus } from "../../utils/requests";

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
  isDifficult: boolean
  isStudied: boolean

  constructor(word: Word) {
    //Data
    this.wordData = word;
    this.DOM = htmlToElement(HTML) as HTMLElement;
    this.isDifficult = false
    this.isStudied = false

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

    if(localStorage.getItem('token')) {
      this.insertButtons()
    }

    //Styles for Difficult Word
    if(this.wordData.userWord?.difficulty === 'hard') {
      this.isDifficult = true
      this.DOM.classList.add('difficult')
    }

    if (this.wordData.userWord?.difficulty === 'studied') {
      this.isStudied = true
      this.DOM.classList.add('studied')
    }

    // console.log(this)
    document.addEventListener('signin', this.insertButtons)
    document.addEventListener('logout', this.deleteButtons)
  }

  private insertButtons = () => {
    const userButtons = document.createElement('fieldset')
    const hardWordButton = document.createElement('button')
    const studiedWordButton = document.createElement('button')

    userButtons.classList.add('word__buttons')
    hardWordButton.classList.add('word__hard-button')
    studiedWordButton.classList.add('word__studied-button')

    hardWordButton.type = 'button'
    studiedWordButton.type = 'button'

    if (this.wordData.userWord?.difficulty === 'hard') {
      hardWordButton.textContent = 'Удалить из сложных слов'
    } else {
      hardWordButton.textContent = 'Добавить в сложные слова'
    }

    if (this.wordData.userWord?.difficulty === 'studied') {
      studiedWordButton.textContent = 'Пометить как неизученное'
    } else {
      studiedWordButton.textContent = 'Пометить как изученное'
    }
    
    userButtons.append(hardWordButton)
    userButtons.append(studiedWordButton)

    hardWordButton.addEventListener('click', this.addOrDeleteHardWord)
    studiedWordButton.addEventListener('click', this.addOrDeleteStudiedWord)

    this.DOM.append(userButtons)
  }

  private deleteButtons = () => {
    const userButtons = this.DOM.querySelector('.word__buttons')
    userButtons?.remove()
  }

  private addOrDeleteHardWord = async (ev: Event) => {
    if(!this.isDifficult) {
      this.isDifficult = true
      this.isStudied = false
      changeWordStatus(this.wordData._id, `hard`)
      this.DOM.classList.add('difficult');
      this.DOM.classList.remove('studied');
      (ev.target as HTMLButtonElement).textContent = 'Удалить из сложных слов'

      const hardButton = this.DOM.querySelector('.word__studied-button') as HTMLButtonElement;
      hardButton.textContent = 'Пометить как изученное';
    } else {
      this.isDifficult = false
      changeWordStatus(this.wordData._id, `normal`)
      this.DOM.classList.remove('difficult');
      (ev.target as HTMLButtonElement).textContent = 'Добавить в сложные слова'
      if (this.DOM.parentElement?.classList.contains('ebook_difficult')) {
        this.delete()
      }
      // console.log(`TODO - delete from difficult words`)
    }
  }

  private addOrDeleteStudiedWord = async (ev: Event) => {
    if (!this.isStudied) {
      this.isStudied = true
      this.isDifficult = false
      console.log(this.wordData)
      changeWordStatus(this.wordData._id, `studied`)
      this.DOM.classList.add('studied');
      this.DOM.classList.remove('difficult');
      (ev.target as HTMLButtonElement).textContent = 'Пометить как неизученное'

      const hardButton = this.DOM.querySelector('.word__hard-button') as HTMLButtonElement;
      hardButton.textContent = 'Добавить в сложные слова';
    } else {
      this.isStudied = false
      changeWordStatus(this.wordData._id, `normal`)
      console.log(this.wordData)
      this.DOM.classList.remove('studied');
      (ev.target as HTMLButtonElement).textContent = 'Пометить как изученное';
      if (this.DOM.parentElement?.classList.contains('ebook_difficult')) {
        this.delete()
      }
      // console.log(`TODO - delete from difficult words`)
    }
  }

  insert() {
    return this.DOM
  }

  delete() {
    this.DOM.remove()
  }
}
