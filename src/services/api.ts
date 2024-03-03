import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_URL

function getHeaders() {
  const store = useAuthStore()

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  if (store.token) headers.set('Authorization', `Bearer ${store.token}`)

  return headers
}

export function get(url: string) {
  return fetch(`${BASE_URL}${url}/`, {
    method: 'GET',
    headers: getHeaders(),
  })
}

export function post<Body>(url: string, body: Body) {
  return fetch(`${BASE_URL}${url}/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
}
