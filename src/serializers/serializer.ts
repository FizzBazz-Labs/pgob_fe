export abstract class Serializer {
  constructor(
    protected fields: string[],
    protected arrays: string[] = [],
    protected files: string[] = []
  ) {}

  serialize(data: any): Record<string, any> {
    const values: Record<string, any> = {}

    this.fields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        values[field] = data[field]
      }
    })

    this.arrays.forEach(field => {
      if (Array.isArray(data[field])) {
        values[field] = data[field]
      }
    })

    this.files.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        const value = data[field] as Array<{ file: File }>

        if (value.length > 0) {
          values[field] = value[0].file
        }
      }
    })

    return values
  }
}
