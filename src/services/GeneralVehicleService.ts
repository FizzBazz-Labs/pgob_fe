import * as API from '@/services/api'
import { Service } from '@/services/service'

import type { GeneralVehicle as Entity } from '@/entities/GeneralVehicles'

const ENDPOINT = '/general-vehicles'
const VEHICLE_ENDPOINT = '/vehicles'

export async function create(body: Record<string, unknown>) {
  const vehicleId = await createVehicle(body)

  const data = {
    assignedTo: body.assignedTo,
    accreditationType: body.accreditationType,
    country: body.country,
    observations: body.observations,
    vehicles: [vehicleId.vehicleId],
  }

  const response = await API.post(ENDPOINT, data)
  return await response.json()
}

export async function createVehicle(body: Record<string, unknown>) {
  const form = new FormData()

  const image = body.driverLicense as Array<{ file: File }>
  const tpv = body.tpv as Array<{ file: File }>

  form.append('type', body.type as string)
  form.append('brand', body.brand as string)
  form.append('color', body.color as string)
  form.append('plate', body.plate as string)
  form.append('driverName', body.driverName as string)
  form.append('driverId', body.driverId as string)
  form.append('phone', body.phone as string)
  form.append('driverLicense', image[0].file)
  form.append('tpv', tpv[0].file)

  if ('typeOther' in body) {
    form.append('typeOther', body.typeOther as string)
  }

  const response = await API.form(VEHICLE_ENDPOINT, form)
  return await response.json()
}

export async function getById(id: number): Promise<Entity> {
  const response = await API.get(`${ENDPOINT}/${id}`)
  return await response.json()
}

export async function review(id: number, values: any): Promise<Entity> {
  const response = await API.patch(`${ENDPOINT}/${id}/review`, values)
  return await response.json()
}

export async function approve(id: number): Promise<Entity> {
  const response = await API.patch(`${ENDPOINT}/${id}/approve`)
  return await response.json()
}

export async function reject(id: number): Promise<Entity> {
  const response = await API.patch(`${ENDPOINT}/${id}/reject`)
  return await response.json()
}

export class GeneralVehicleService extends Service<Entity> {
  constructor() {
    super('/general-vehicles')
  }
}
