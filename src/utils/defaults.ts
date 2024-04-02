import type { MultiStepForm } from '@/entities/Form'
import type { International } from '@/entities/International'
import type { National } from '@/entities/National'
import type { WeaponValue } from '@/entities/Weapon'

export function initWeapon(): WeaponValue {
  return {
    weapon: '',
    brand: '',
    model: '',
    type: '',
    serial: '',
    chargers: 0,
    ammunition: 0,
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
          weapons: [initWeapon() as any],
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
        weapons: [initWeapon() as any],
        equipments: [initEquipment()],
      },
    },
  }
}

export function initInternational(item?: International): MultiStepForm {
  function formatDateTime(date: Date) {
    const yyyy = date.getFullYear()
    const MM = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')
    const ss = String(date.getSeconds()).padStart(2, '0')

    return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`
  }

  if (item && 'id' in item)
    return {
      'multi-step': {
        accreditation: {
          ...item,
          country: item.country.id,
          position: item.position.id,
          subPosition: item.subPosition?.id,
          mediaChannel: item.mediaChannel?.id,
          passport: item.passportId,
          image: [item.image],
          blood: item.bloodType,
          flightFrom: item.flightFrom.id,
          flightTo: item.flightTo.id,
          hasAllergies: item.allergies.length > 0,
          allergies: item.allergies.map(i => i.id),
          hasImmunization: item.immunizations.length > 0,
          immunizations: item.immunizations.map(i => i.id),
          hasMedicalHistory: item.medicals.length > 0,
          medicals: item.medicals.map(i => i.id),
          hasMedicalStaff: item.doctorName !== '',
          hotelPhoneNumber: item.hotelPhone,
          hasPrivateInsurance: item.privateInsurance !== '',
          flightArrivalDatetime: formatDateTime(new Date(item.flightArrivalDatetime)),
          flightDepartureDatetime: formatDateTime(new Date(item.flightDepartureDatetime)),
        },
        security: {
          controlDatetime: '',
          observations: '',
          weapons: [initWeapon() as any],
          equipments: [initEquipment()],
        },
      },
    }

  return {
    'multi-step': {
      accreditation: {
        country: 0,
        position: 0,
        images: [],
        hasAllergies: false,
        hasImmunization: false,
        hasMedicalHistory: false,
        hasMedicalStaff: false,
        hasPrivateInsurance: false,
      },
      security: {
        controlDatetime: '',
        observations: '',
        weapons: [initWeapon() as any],
        equipments: [initEquipment()],
      },
    },
  }
}
