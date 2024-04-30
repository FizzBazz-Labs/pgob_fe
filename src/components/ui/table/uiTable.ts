export type UITableColumn = {
  key: string
  label: string
  show?: () => boolean
  transform?: (value: any) => any
}

export type UITableRow = Record<string, any>

export type UITablePagination = {
  page: number
  limit: number
  count: number
}
