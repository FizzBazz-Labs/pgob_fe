import * as API from '@/services/api'

export interface PowerBi {
  id: number
  name: string
  reportId: string
}

export interface PowerBiReport {
  label: string
  to: Record<string, unknown>
  reportId: string
  canView: boolean
}

export async function getReports(): Promise<PowerBi[]> {
  const response = await API.get('/powerbi-reports')
  return await response.json()
}
