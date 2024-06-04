import * as API from '@/services/api'
import { Service } from './service'

import type { Housing, HousingPerson } from '@/entities/Housing'
import { HousingSerializer } from '@/serializers/HousingSerializer'

export class HousingService extends Service<Housing> {
  constructor() {
    super('/housings', new HousingSerializer())
  }

  async importData(values: any): Promise<void> {
    const form = new FormData()

    const files = values.data as Array<{ file: File }>
    const file = files[0].file

    form.append('data', file)

    console.log(this.url)

    const response = await API.form(`/housings/import`, form)
    return await response.json()
  }
}

export class HousingPersonService extends Service<HousingPerson> {
  constructor() {
    super('/housing-persons')
  }
}
