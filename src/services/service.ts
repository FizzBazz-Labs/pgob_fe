import type { Serializer } from '@/serializers/serializer'
import * as API from '@/services/api'

type AllParams = {
  pagination: {
    page: number
    limit: number
  }
  query: Record<string, any>
}

export abstract class Service<E> {
  constructor(
    protected url: string,
    private serializer?: Serializer
  ) {}

  async all({ pagination: { page, limit }, query }: AllParams): Promise<API.PaginatedResponse<E>> {
    const search = Object.entries(query)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    let url = `${this.url}/?offset=${page * limit}&limit=${limit}`
    url += search ? `&${search}` : ''

    const response = await API.get(url)
    return await response.json()
  }

  async create<T = any>(data: T): Promise<E> {
    const values = this.serializer?.serialize(data) ?? data
    const response = await API.post(this.url, values)
    return await response.json()
  }

  async form<T = any>(data: T): Promise<E> {
    const values = this.serializer?.serialize(data) ?? (data as Record<string, any>)

    const body = Object.entries(values).reduce((acc, [key, value]) => {
      acc.append(key, value)
      return acc
    }, new FormData())

    const response = await API.form(this.url, body)
    return await response.json()
  }

  async retrieve(id: number): Promise<E> {
    const response = await API.get(`${this.url}/${id}`)
    return await response.json()
  }

  async update<T = any>(id: number, data: T): Promise<E> {
    const response = await API.patch(`${this.url}/${id}`, data)
    return await response.json()
  }

  async updateForm<T = any>(id: number, data: T): Promise<E> {
    const values = this.serializer?.serialize(data) ?? (data as Record<string, any>)

    const body = Object.entries(values).reduce((acc, [key, value]) => {
      acc.append(key, value)
      return acc
    }, new FormData())

    const response = await API.form(`${this.url}/${id}`, body, 'PUT')
    return await response.json()
  }

  async destroy(id: number): Promise<void> {
    await API.del(`${this.url}/${id}`)
  }

  async review<T = any>(id: number, data?: T): Promise<E> {
    const response = await API.patch(`${this.url}/${id}/review`, data)
    return await response.json()
  }

  async approve<T = any>(id: number, data?: T): Promise<E> {
    const response = await API.patch(`${this.url}/${id}/approve`, data)
    return await response.json()
  }

  async reject<T = any>(id: number, data?: T): Promise<E> {
    const response = await API.patch(`${this.url}/${id}/reject`, data)
    return await response.json()
  }

  async certificate(id: number): Promise<E> {
    const response = await API.patch(`${this.url}/${id}/certificate`)
    return await response.json()
  }
}
