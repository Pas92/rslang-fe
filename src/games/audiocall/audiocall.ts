import { Word } from "../../utils/types/schemas";
import { AudioCallQuestion } from "../../components/question-audiocall/question-audiocall";
import { GameReport } from "../../components/game-report/game-report";
export class AudioCallGame {
  words: Word[]
  DOM: HTMLElement | null
  private answers: string[]
  questions: AudioCallQuestion[]
  currentQuestion: AudioCallQuestion
  private currentQuestionPosition: number
  nextQuestionButton: HTMLButtonElement
  constructor(words: Word[], gameContainer: HTMLElement | null) {
    this.words = words
    this.DOM = gameContainer

    this.answers = this.words.map(e => e.wordTranslate)
    this.questions = this.words.map(e => new AudioCallQuestion(e, this.answers))

    this.currentQuestionPosition = 0
    this.currentQuestion = this.questions[this.currentQuestionPosition]

    this.nextQuestionButton = this.DOM?.querySelector('.audiocall__next-question') as HTMLButtonElement
  }

  start() {
    console.log(this.questions)
    this.DOM?.prepend(this.currentQuestion.insert())

    document.addEventListener('answer', () => {
      this.nextQuestionButton.classList.remove('hidden')

      if (this.currentQuestionPosition >= this.questions.length - 1) {
        this.nextQuestionButton.textContent = 'Показать результаты'
      }
    })

    this.nextQuestionButton.addEventListener('click', () => {
      console.log(this.questions[this.currentQuestionPosition])
      this.nextQuestionButton.classList.add('hidden')
      this.currentQuestion.delete()
      this.currentQuestionPosition += 1

      if (this.currentQuestionPosition >= this.questions.length) {
        const correctAnswers = this.questions.filter((e) => e.isCorrect).map(e => e.wordData)
        const wrongAnswers = this.questions.filter((e) => !e.isCorrect).map(e => e.wordData)

        const report = new GameReport(correctAnswers, wrongAnswers)
        this.DOM?.prepend(report.insert())

        const event = new Event('audiocall-game-over')
        document.dispatchEvent(event)
        console.log('Game over')
      } else {
        this.currentQuestion = this.questions[this.currentQuestionPosition]
        this.DOM?.prepend(this.currentQuestion.insert())
      }
    })
  }
}
