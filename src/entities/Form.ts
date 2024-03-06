export type MultiStepForm = {
  'multi-step': {
    accreditation: {
      position: number
      [key: string]: string | number | unknown
    }
    security: Record<string, string | number | unknown>
  }
  [key: string]: string | number | unknown
}
