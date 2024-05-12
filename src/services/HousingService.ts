import { Service } from './service'

import type { Housing, HousingPerson } from '@/entities/Housing'
import { HousingSerializer } from '@/serializers/HousingSerializer'

export class HousingService extends Service<Housing> {
  constructor() {
    super('/housings', new HousingSerializer())
  }
}

export class HousingPersonService extends Service<HousingPerson> {
  constructor() {
    super('/housing-persons')
  }
}
