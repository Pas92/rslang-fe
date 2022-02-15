import { UserReg, UserSingIn, Auth, } from "./types/schemas";

export const baseURL = "https://rslang-pas92.herokuapp.com/";

export const getWords = async (group:number, page:number) => {
  let res: Response
  if (localStorage.getItem('token')) {
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem('token')

    res = await fetch(`${baseURL}users/${userID}/aggregatedWords?wordsPerPage=20&filter={"$and":[{"page":${page}, "group":${group}}]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    })
    const data = await res.json()
    console.log(data[0].paginatedResults)

    return data[0].paginatedResults
  } else {
    res = await fetch(`${baseURL}words?group=${group}&page=${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    const data = res.json()

    return data
  }
}

export const getDifficultWords = async () => {
  let res: Response
  if (localStorage.getItem('token')) {
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem('token')

    res = await fetch(`${baseURL}users/${userID}/aggregatedWords?wordsPerPage=3600&filter={"$and":[{"userWord.difficulty":"hard"}]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    })
    const data = await res.json()
    console.log(data[0].paginatedResults)

    return data[0].paginatedResults
  }
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


export const changeWordStatus = async (wordID: string, wordDifficulty: string) => {
  const userID = localStorage.getItem('userID')
  const token = localStorage.getItem('token')

  const rawResponse = await fetch(`${baseURL}users/${userID}/words/${wordID}`, {
    method: 'POST',
    
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: wordDifficulty,
      optional: {}
    })
  });

  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    return content
  } else {
    return rawResponse.status
  }
};
