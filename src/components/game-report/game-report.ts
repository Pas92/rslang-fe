import { htmlToElement } from "../../utils/htmlToElement";
import { Word } from "../../utils/types/schemas";

import HTML from "./game-report.html";
import "./game-report.scss";

export class GameReport {
  DOM: HTMLElement
  correctList: HTMLUListElement
  wrongList: HTMLUListElement
  constructor(correctAnswers: Word[], wrongAnswers: Word[]) {
    this.DOM = htmlToElement(HTML) as HTMLElement
    this.correctList = this.DOM.querySelector('.report__answers_correct') as HTMLUListElement
    this.wrongList = this.DOM.querySelector('.report__answers_wrong') as HTMLUListElement

    correctAnswers.forEach((e: Word) => {
      const item = document.createElement('li')
      item.textContent = `${e.word} ${e.transcription} - ${e.wordTranslate}`
      this.correctList.append(item)
    })

    wrongAnswers.forEach((e: Word) => {
      const item = document.createElement('li')
      item.textContent = `${e.word} ${e.transcription} - ${e.wordTranslate}`
      this.wrongList.append(item)
    })
  }

  insert() {
    return this.DOM
  }

  delete() {
    this.DOM.remove()
  }
}
