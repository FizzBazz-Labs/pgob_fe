import { Serializer } from '@/serializers/serializer'

export class HousingSerializer extends Serializer {
  constructor() {
    super(
      [
        'address',
        'buildingType',
        'houseNumber',
        'apartmentTower',
        'buildingAdminName',
        'apartmentNumber',
        'apartmentFloor',
        'isOwner',
        'ownerName',
        'ownerPhoneNumber',
      ],
      ['vehicles']
    )
  }
}
