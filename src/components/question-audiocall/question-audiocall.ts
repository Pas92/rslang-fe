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
  image: HTMLImageElement | null
  text: HTMLElement | null
  answerContainer: HTMLElement | null
  isCorrect: boolean
  constructor(word: Word, answers: string[]) {
    this.wordData = word
    this.DOM = htmlToElement(HTML) as HTMLElement
    this.isCorrect = false

    this.audio = new Audio(`${baseURL}${this.wordData.audio}`)

    this.answerContainer = this.DOM.querySelector('.auniocall__answer')
    this.image = this.DOM.querySelector('.answer__img')
    if(this.image) {
      this.image.src = `${baseURL}${this.wordData.image}`
    }
    this.text = this.DOM.querySelector('.answer__word')

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

    this.answersButtons.addEventListener('click', (e: Event) => {
      const target = (e.target as HTMLButtonElement)
      if (target.classList.contains('question__answer')) {
        console.log(target.value)
        this.audio.play()
        this.answerContainer?.classList.remove('hidden')

        if (this.text) {
          this.text.textContent = `${this.wordData.word} ${this.wordData.transcription}`
        }

        const answerEvent = new Event('answer')
        document.dispatchEvent(answerEvent)

        if(+target.value === this.answerPosition) {
          this.isCorrect = true
          target.classList.add('question__answer_correct')
        } else {
          this.isCorrect = false
          target.classList.add('question__answer_incorrect')
          Array.from(this.answersButtons.children)[this.answerPosition].classList.add('question__answer_correct')
        }
      }
    })
  }

  playAudio() {
    this.audio.play()
  }

  insert() {
    this.playAudio()
    return this.DOM
  }

  delete() {
    this.DOM.remove()
  }
} 
