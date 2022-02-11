import { htmlToElement } from "../../utils/htmlToElement";
import { createUser, loginUser } from "../../utils/requests";

import { Auth } from "../../utils/types/schemas";

import HTML from "./auth.html";
import "./auth.scss";

export const authPage = htmlToElement(HTML);

const radioSignIn = authPage?.querySelector('#auth-type-sign-in') as HTMLInputElement
const radioRegister = authPage?.querySelector('#auth-type-reg') as HTMLInputElement
const authButton = authPage?.querySelector('.form__button_auth') as HTMLButtonElement

const userName = authPage?.querySelector('#auth__name') as HTMLInputElement
const userEmail = authPage?.querySelector('#auth__email') as HTMLInputElement
const userPassword = authPage?.querySelector('#auth__password') as HTMLInputElement

const regUser = async () => {
  const resStatus = await createUser({
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value
  })

  if (resStatus === `200`) {
    console.log(`Зарегистрирован`)
  } else {
    console.log(`${resStatus}`)
  }
}

const signIn = async () => {
  const res: number | Auth = await loginUser({
    email: userEmail.value,
    password: userPassword.value
  });

  if (typeof res === 'number') {
    console.log(`Error ${res}`)
  } else {
    localStorage.setItem('token', res.token)
    localStorage.setItem('refreshToken', res.refreshToken)
    localStorage.setItem('userID', res.userId)
    localStorage.setItem('userName', res.name)
    console.log(res)
  }
}

const changeFormType = () => {
  if (radioSignIn.checked) {
    userName.parentElement?.classList.add('hidden')
    console.log(`Вход`)
    authButton.textContent = `Вход`

    authButton.addEventListener('click', signIn)
    authButton.removeEventListener('click', regUser)
  }

  if (radioRegister.checked) {
    userName.parentElement?.classList.remove('hidden')
    console.log(`Регистрация`)
    authButton.textContent = `Регистрация`

    authButton.addEventListener('click', regUser)
    authButton.removeEventListener('click', signIn)
  }
}

window.addEventListener('load', changeFormType)

radioSignIn.addEventListener('change', changeFormType)
radioRegister.addEventListener('change', changeFormType)
