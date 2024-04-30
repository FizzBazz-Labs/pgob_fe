export type UITableColumn = {
  key: string
  label: string
  show?: boolean
}

export type UITableRow = Record<string, any>

export type UITablePagination = {
  page: number
  limit: number
  count: number
}

export function useUITable() {
  return {}
}
