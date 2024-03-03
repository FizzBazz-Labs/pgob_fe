export interface Position {
  id: number
  name: string
  subPositions: Array<SubPosition>
}

export interface SubPosition {
  id: number
  name: string
}
