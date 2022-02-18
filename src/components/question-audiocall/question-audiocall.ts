import { htmlToElement } from "../../utils/htmlToElement";
import { Word } from "../../utils/types/schemas";

import HTML from './question-audiocall.html';
import './question-audiocall.scss'

export class AudioCallQuestion {
  wordData: Word
  DOM: HTMLElement
  answers: string[]
  constructor(word: Word, answers: string[]) {
    this.wordData = word
    this.DOM = htmlToElement(HTML) as HTMLElement

    this.answers = answers
  }
}
