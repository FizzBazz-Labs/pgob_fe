import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_URL

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: Array<T>
}

function getHeaders(contentType = true) {
  const store = useAuthStore()

  const headers = new Headers()

  if (contentType) headers.append('Content-Type', 'application/json')

  if (store.token) headers.set('Authorization', `Bearer ${store.token}`)

  return headers
}

export function get(url: string) {
  return fetch(`${BASE_URL}${url}`, {
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

export function form(url: string, body: FormData, method = 'POST') {
  return fetch(`${BASE_URL}${url}/`, {
    method: method,
    headers: getHeaders(false),
    body: body,
  })
}

export function patch(url: string, body: any = {}) {
  return fetch(`${BASE_URL}${url}/`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
}

export function del(url: string) {
  return fetch(`${BASE_URL}${url}/`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
}
