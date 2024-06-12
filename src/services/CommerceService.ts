import * as API from '@/services/api'
import { Service } from './service'

import type { Commerce as Entity, CommerceEmployee } from '@/entities/Commerce'

export class CommerceService extends Service<Entity> {
  constructor() {
    super('/commerces')
  }

  async importData(values: any): Promise<void> {
    const form = new FormData()

    const files = values.data as Array<{ file: File }>
    const file = files[0].file

    form.append('data', file)

    const response = await API.form(`/commerces/import`, form)
    return await response.json()
  }
}

export class CommerceEmployeeService extends Service<CommerceEmployee> {
  constructor() {
    super('/commerce-employees')
  }
}
