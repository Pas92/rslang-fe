import { Word } from "../../utils/types/schemas";
import { AudioCallQuestion } from "../../components/question-audiocall/question-audiocall";

export class AudioCallGame {
  words: Word[]
  DOM: HTMLElement | null
  private answers: string[]
  questions: AudioCallQuestion[]
  constructor(words: Word[], gameContainer: HTMLElement | null) {
    this.words = words
    this.DOM = gameContainer

    this.answers = this.words.map(e => e.wordTranslate)
    this.questions = this.words.map(e => new AudioCallQuestion(e, this.answers))
  }

  start() {
    console.log(`Game started`)
    console.log(this.questions)
  }
}
