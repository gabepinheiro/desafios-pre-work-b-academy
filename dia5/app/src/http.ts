import { Car, Plate } from "./main"

type CreateRequest = (method: string) => (url: string, data?: Car | Plate) => Promise<any>

const request = (url: string, options?: RequestInit) =>
  fetch(url, options)
    .then(r => r.json())
    .catch(e => ({ error: true, message: e.message }))

const createRequest: CreateRequest = (method) => (url, data) => request(url, {
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

export const get = (url: string) => request(url)
export const post = createRequest('POST')
export const del = createRequest('DELETE')
