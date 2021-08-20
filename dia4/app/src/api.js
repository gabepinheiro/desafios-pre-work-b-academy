const baseURL = 'http://localhost:3333/cars'

export const GET = () => {
  return fetch(baseURL, {
    method: 'GET'
  })
}

export const POST = (data) => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
