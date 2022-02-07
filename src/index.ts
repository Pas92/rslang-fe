import { Router } from './utils/parseRequestURL';

import './index.scss';
type Routes = {
  [key: string]: Element
};

const HEADER = document.createElement('header');
HEADER.append(header);
document.body.append(HEADER);

const MAIN = document.createElement('main');
MAIN.classList.add('app-main');

document.body.append(MAIN);

const FOOTER = document.createElement('footer');
document.body.append(FOOTER);

function showPage(page: Element | null) {
  Array.from(MAIN.children).forEach(e => {
    e.classList.add('page_hidden-page');
  });
  page.classList.remove('page_hidden-page');
}

const routes: Routes = {
  '/': mainPage,
  '/ebook': ebookPage,
  '/statistic': statisticPage,
  '/sprint-game': sprintGamePage,
  '/audio-call': audioCallPage,
  '/auth': authPage,
};

function router() {
  const request = Router.parseRequestURL();
  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
  const page = routes[parsedURL] ? routes[parsedURL] : null;

  showPage(page);
}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);
