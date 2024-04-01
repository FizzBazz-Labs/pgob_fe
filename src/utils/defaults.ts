import type { MultiStepForm } from '@/entities/Form'
import type { National } from '@/entities/National'

export function initWeapon() {
  return {
    weapon: '',
    brand: '',
    model: '',
    type: '',
    serial: '',
    chargers: '0',
    ammunition: '0',
  }
}

export function initEquipment() {
  return {
    brand: '',
    model: '',
    type: '',
    serial: '',
    frequency: '',
  }
}

export function initCommunication() {
  return {
    type: '',
    brand: '',
    model: '',
    serial: '',
    value: '',
  }
}

export function initNational(item?: National): MultiStepForm {
  if (item && 'id' in item)
    return {
      'multi-step': {
        accreditation: {
          ...item,
          position: item.position.id,
          subPosition: item.subPosition?.id,
          passport: item.passportId,
          image: [item.image],
          blood: item.bloodType,
        },
        security: {
          controlDatetime: '',
          observations: '',
          weapons: [initWeapon()],
          equipments: [initEquipment()],
        },
      },
    }

  return {
    'multi-step': {
      accreditation: {
        position: 0,
      },
      security: {
        controlDatetime: '',
        observations: '',
        weapons: [initWeapon()],
        equipments: [initEquipment()],
      },
    },
  }
}
