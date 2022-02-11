import { htmlToElement } from "../../utils/htmlToElement";
import { getWords } from "../../utils/requests";

import { Word } from "../../utils/types/schemas";
import { WordCard } from "../../components/word-card/word-card";

import HTML from "./ebook.html";
import "./ebook.scss";

export const ebookPage = htmlToElement(HTML);
let wordsArr: WordCard[] = []

const insertWords = async () => {
  const words = await getWords(1,1);
  wordsArr = words.map((e: Word) => new WordCard(e))
  wordsArr.forEach(e => {
    ebookPage?.append(e.insert())
  })
  console.log(words)
}

insertWords()
