import type { Vehicle } from '@/entities/Vehicle'
import { Service } from './service'

import { VehicleSerializer } from '@/serializers/VehicleSerializer'

export class VehicleService extends Service<Vehicle> {
  constructor() {
    super('/vehicles', new VehicleSerializer())
  }
}
