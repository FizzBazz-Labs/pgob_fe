export interface HelpSection {
  id: number
  title: string
  items: Array<{
    title: string
    url: string
  }>
}
