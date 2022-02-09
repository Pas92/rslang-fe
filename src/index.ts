//Server: https://rslang-pas92.herokuapp.com/

import { Router } from "./utils/parseRequestURL";

import { header } from "./components/header/header";
import { mainPage } from "./pages/main/main";
import { ebookPage } from "./pages/ebook/ebook";
import { statisticPage } from "./pages/statistic/statistic";
import { sprintGamePage } from "./pages/sprint-game/sprint-game";
import { audioCallPage } from "./pages/audio-call/audio-call";
import { authPage } from "./pages/auth/auth";

import "./index.scss";
type Routes = {
  [key: string]: Element | null;
};

const HEADER = document.createElement("header");
HEADER.append(header as Node);
document.body.append(HEADER);

const MAIN = document.createElement("main");
MAIN.classList.add("app-main");
MAIN.append(mainPage as Node);
MAIN.append(ebookPage as Node);
MAIN.append(statisticPage as Node);
MAIN.append(sprintGamePage as Node);
MAIN.append(audioCallPage as Node);
MAIN.append(authPage as Node);
document.body.append(MAIN);

const FOOTER = document.createElement("footer");
document.body.append(FOOTER);

function showPage(page: Element | null) {
  Array.from(MAIN.children).forEach((e) => {
    e.classList.add("page_hidden-page");
  });

  if (page) {
    page.classList.remove("page_hidden-page");
  }
}

const routes: Routes = {
  "/": mainPage,
  "/ebook": ebookPage,
  "/statistic": statisticPage,
  "/sprint-game": sprintGamePage,
  "/audio-call": audioCallPage,
  "/auth": authPage,
};

function router() {
  const request = Router.parseRequestURL();
  const parsedURL =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const page = routes[parsedURL] ? routes[parsedURL] : null;

  showPage(page);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
