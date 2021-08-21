const baseURL = 'http://localhost:3333/cars'

export const GET = () => {
  return fetch(baseURL)
  .then(response => response.json())
  .catch(e => ({error: true, message: e.message}))
}

export const POST = (data) => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(e => ({error: true, message: e.message}))
}

export const DELETE = (data) => {
  return fetch(baseURL, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(e => ({error: true, message: e.message}))
}
