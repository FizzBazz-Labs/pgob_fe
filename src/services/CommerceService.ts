import { Service } from './service'

import type { Commerce as Entity, CommerceEmployee } from '@/entities/Commerce'

export class CommerceService extends Service<Entity> {
  constructor() {
    super('/commerces')
  }
}

export class CommerceEmployeeService extends Service<CommerceEmployee> {
  constructor() {
    super('/commerce-employees')
  }
}
