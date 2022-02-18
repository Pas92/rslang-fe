import { htmlToElement } from "../../utils/htmlToElement";
import { AudioCallGame } from "../../games/audiocall/audiocall";
import { Word } from "../../utils/types/schemas";
import { AudioCallQuestion } from "../../components/question-audiocall/question-audiocall";
import { getWordsForGame } from "../../utils/requests";

import HTML from "./audio-call.html";
import "./audio-call.scss";

export const audioCallPage = htmlToElement(HTML);

const gameCategories = audioCallPage?.querySelector('.audiocall__groups')
const gameContainer = audioCallPage?.querySelector('.audiocall__game') as HTMLElement | null
let game: AudioCallGame | null
let wordsForGame: Word[] | []

gameCategories?.addEventListener('click', async (ev) => {
  const evTarget: HTMLElement | HTMLButtonElement | null = ev.target as HTMLElement | HTMLButtonElement | null
  if (evTarget instanceof HTMLButtonElement) {
    wordsForGame = await getWordsForGame(+evTarget.value)
  }

  const game = new AudioCallGame(wordsForGame, gameContainer)
  game.start()
})
