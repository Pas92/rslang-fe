import { htmlToElement } from "../../utils/htmlToElement";
import { getWords } from "../../utils/requests";

import { Word } from "../../utils/types/schemas";
import { WordCard } from "../../components/word-card/word-card";

import HTML from "./ebook.html";
import "./ebook.scss";

export const ebookPage = htmlToElement(HTML);
let wordsArr: WordCard[] = [];

const groupSelect: HTMLSelectElement = ebookPage?.querySelector('.ebook__group') as HTMLSelectElement;
let group: number
const cacheGroup: string | null = localStorage.getItem('group')
if (cacheGroup) {
  group = +cacheGroup;
  groupSelect.value = `${group}`
} else {
  group = 0
}

const insertWords = async (ebookGroup: number) => {
  if (wordsArr.length) {
    wordsArr.forEach(e => {
      e.delete()
    })
  }

  const words = await getWords(ebookGroup,1);
  wordsArr = words.map((e: Word) => new WordCard(e))
  wordsArr.forEach(e => {
    ebookPage?.append(e.insert())
  })
  // console.log(words)
}

insertWords(group)

groupSelect?.addEventListener('change',async () => {
  localStorage.setItem('group', groupSelect.value)
  await insertWords(+groupSelect.value)
})
