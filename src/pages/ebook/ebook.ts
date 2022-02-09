import { htmlToElement } from "../../utils/htmlToElement";
import { getWords } from "../../utils/requests";

import HTML from "./ebook.html";
import "./ebook.scss";

const insertWords = async () => {
  const words = await getWords(1,1)
  console.log(words)
}

insertWords()

export const ebookPage = htmlToElement(HTML);
