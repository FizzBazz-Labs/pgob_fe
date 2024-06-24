import * as API from '@/services/api'

import { Service } from './service'

import type { Credential } from '@/entities/Credential'

export class CredentialService extends Service<Credential> {
  constructor() {
    super('/certifications/vehicles')
  }

  async list(): Promise<Array<Credential>> {
    const response = await API.get(this.url)
    return await response.json()
  }
}
