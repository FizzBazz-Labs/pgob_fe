import { Serializer } from '@/serializers/serializer'

export class VehicleSerializer extends Serializer {
  constructor() {
    super(
      ['type', 'typeOther', 'brand', 'model', 'color', 'plate', 'driverName', 'driverId', 'phone'],
      [],
      ['driverLicense', 'tpv']
    )
  }
}
