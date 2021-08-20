const baseURL = 'http://localhost:3333/cars'

export const GET = () => {
  return fetch(baseURL, {
    method: 'GET'
  })
}
