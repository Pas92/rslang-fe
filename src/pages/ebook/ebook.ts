import { htmlToElement } from "../../utils/htmlToElement";
import { getWords, getDifficultWords } from "../../utils/requests";

import { Word } from "../../utils/types/schemas";
import { WordCard } from "../../components/word-card/word-card";

import HTML from "./ebook.html";
import "./ebook.scss";

export const ebookPage = htmlToElement(HTML);
let wordsArr: WordCard[] = [];

const ebookControls = ebookPage?.querySelector('.ebook__form')

const groupSelect: HTMLSelectElement = ebookPage?.querySelector('.ebook__group') as HTMLSelectElement;
let group: number
const cacheGroup: string | null = localStorage.getItem('group')
if (cacheGroup) {
  group = +cacheGroup;
  groupSelect.value = `${group}`
} else {
  group = 0
}

const pageSelect: HTMLSelectElement = ebookPage?.querySelector('.ebook__page') as HTMLSelectElement;
const pages = 30
for(let i = 0; i < pages; i += 1) {
  const option: HTMLOptionElement = document.createElement('option')
  option.value = `${i}`
  option.textContent = `Страница ${i + 1}`
  pageSelect.append(option)
}

let page: number
const cachePage: string | null = localStorage.getItem('page')
if (cachePage) {
  page = +cachePage;
  pageSelect.value = `${page}`
} else {
  page = 0
}

const getWordCards = async (ebookGroup: number, groupPage: number) => {
  const words = await getWords(ebookGroup, groupPage);
  wordsArr = words.map((e: Word) => new WordCard(e))
  wordsArr.forEach(e => {
    ebookPage?.append(e.insert())
  })
}

const insertWords = async () => {
  if (wordsArr.length) {
    wordsArr.forEach(e => {
      e.delete()
    })
  }

  const cacheGroup: string | null = localStorage.getItem('group')
  if (cacheGroup) {
    group = +cacheGroup;
  }

  const cachePage: string | null = localStorage.getItem('page')
  if (cachePage) {
    page = +cachePage;
  }



  getWordCards(+group, +page)
  // console.log(words)
}

insertWords()

groupSelect?.addEventListener('change',async () => {
  localStorage.setItem('group', groupSelect.value)
  insertWords()
})

pageSelect?.addEventListener('change', async () => {
  localStorage.setItem('page', pageSelect.value)
  insertWords()
})

const insertHardWords = async (ev: Event) => {
  if (wordsArr.length) {
    wordsArr.forEach(e => {
      e.delete()
    })
  }

  if (ebookControls?.classList.contains('ebook_difficult')) {
    ebookControls.classList.remove('ebook_difficult');
    ebookPage?.classList.add('ebook_difficult');
    (ev.target as HTMLButtonElement).textContent = 'Cложные слова'
    getWordCards(group, page)
  } else {
    ebookPage?.classList.add('ebook_difficult');
    ebookControls?.classList.add('ebook_difficult');
    (ev.target as HTMLButtonElement).textContent = 'Вернуться к учебнику'
    const words = await getDifficultWords();
    wordsArr = words.map((e: Word) => new WordCard(e))
    wordsArr.forEach(e => {
      ebookPage?.append(e.insert())
    })
  }
}

const insertHardWordsButton = () => {
  const hardWordsButton = document.createElement('button')
  hardWordsButton.type = 'button'
  hardWordsButton.classList.add('ebook__difficult-words')
  hardWordsButton.textContent = 'Сложные слова'
  hardWordsButton.addEventListener('click', insertHardWords)
  ebookControls?.append(hardWordsButton)
}

if (localStorage.getItem('token')) {
  insertHardWordsButton()
}

document.addEventListener('signin', insertHardWordsButton)
document.addEventListener('logout', () => {
  const hardWordsButton = ebookControls?.querySelector('.ebook__difficult-words')
  hardWordsButton?.remove()
})
