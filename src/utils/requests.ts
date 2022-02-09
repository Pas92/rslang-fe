const baseURL = "https://rslang-pas92.herokuapp.com/";

export const getWords = async (group:number, page:number) => {
  const res = await fetch(`${baseURL}words?group=${group}&number=${page}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  console.log(res)
  const data = res.json()

  return data
}
