import * as API from '@/services/api'

import type { MedicalHistory } from '@/entities/MedicalHistory'

export async function getAll(): Promise<Array<MedicalHistory>> {
  const response = await API.get('/medical_histories')

  return await response.json()
}
