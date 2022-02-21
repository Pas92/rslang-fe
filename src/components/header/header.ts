import { htmlToElement } from "../../utils/htmlToElement";

import HTML from "./header.html";
import "./header.scss";

export const header = htmlToElement(HTML);
const authLink = header?.querySelector('.nav__auth') as HTMLLinkElement | null

const links = header?.querySelector('ul')
links?.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement
  if (target.classList.contains('header__link')) {
    Array.from(links.children).forEach((e) => {
      e.classList.remove('active')
    })

    target.parentElement?.classList.add('active')
  }
})

const changeLinkToLogout = () => {
  if (authLink) {
    authLink.textContent = 'Выйти'
    authLink.href = '#'

    location.hash = '#'
  }
}

if(localStorage.getItem('token')) {
  changeLinkToLogout()
}

authLink?.addEventListener('click', () => {
  if (authLink.textContent === 'Выйти') {
    authLink.textContent = 'Войти'
    authLink.href = '#auth'

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userID')
    localStorage.removeItem('userName')

    const logOutEvent = new Event('logout')
    document.dispatchEvent(logOutEvent)
  }
})

document.addEventListener('signin', changeLinkToLogout)
