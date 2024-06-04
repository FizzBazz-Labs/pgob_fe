export interface HelpSection {
  id: number
  title: string
  description: string
  accreditation: Array<any>
  items: Array<{
    id: number
    title: string
    url: string
    groups: Array<any>
  }>
}
