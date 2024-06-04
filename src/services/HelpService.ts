import * as API from '@/services/api'
import { Service } from '@/services/service'

import { type HelpSection } from '@/entities/Help'

export class HelpService extends Service<HelpSection> {
  constructor() {
    super('/help')
  }

  async list(): Promise<Array<HelpSection>> {
    const response = await API.get('/help')
    return await response.json()
  }
}
