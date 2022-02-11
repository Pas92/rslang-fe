import { UserReg, UserSingIn, Auth } from "./types/schemas";

export const baseURL = "https://rslang-pas92.herokuapp.com/";

export const getWords = async (group:number, page:number) => {
  const res = await fetch(`${baseURL}words?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  const data = res.json()

  return data
}

export const createUser = async (user: UserReg): Promise<string> => {
  const rawResponse = await fetch(`${baseURL}users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return `${rawResponse.status}`
  // const content = await rawResponse.json();
  // console.log(content);
};


export const loginUser = async (user: UserSingIn) => {
  const rawResponse = await fetch(`${baseURL}signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (rawResponse.status === 200) {
    const content: Auth = await rawResponse.json();
    return content
  } else {
    return rawResponse.status
  }
};
