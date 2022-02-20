import { htmlToElement } from "../../utils/htmlToElement";
import { Word } from "../../utils/types/schemas";
import { baseURL } from "../../utils/requests";

import HTML from './question-audiocall.html';
import './question-audiocall.scss'

export class AudioCallQuestion {
  wordData: Word
  DOM: HTMLElement
  answers: string[]
  answersButtons: HTMLElement
  answerPosition: number
  audio: HTMLAudioElement
  audioButton: HTMLButtonElement
  constructor(word: Word, answers: string[]) {
    this.wordData = word
    this.DOM = htmlToElement(HTML) as HTMLElement

    this.audio = new Audio(`${baseURL}${this.wordData.audio}`)

    this.audioButton = this.DOM.querySelector('.question__audio') as HTMLButtonElement
    this.audioButton.addEventListener('click', () => {
      this.playAudio()
    })

    this.answers = answers.sort(() => {
      if(Math.random() > 0.5) {
        return 1
      } else return -1
    })
    this.answers = this.answers.filter(e => e !== this.wordData.wordTranslate)

    this.answersButtons = this.DOM.querySelector('.audiocall__answers') as HTMLElement
    Array.from(this.answersButtons.children).forEach(e => {
      e.textContent = this.answers.pop() as string
    })
    this.answers = []

    this.answerPosition = Math.floor(Math.random() * 5)
    Array.from(this.answersButtons.children)[this.answerPosition].textContent = this.wordData.wordTranslate

    console.log(this.audio)
  }

  playAudio() {
    this.audio.play()
  }

  insert() {
    return this.DOM
  }

  delete() {
    this.DOM.remove()
  }
} 
