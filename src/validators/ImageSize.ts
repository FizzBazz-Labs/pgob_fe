import { type FormKitNode } from '@formkit/core'
import { type FormKitValidationRule } from '@formkit/validation'

export const pixelSize: FormKitValidationRule = (node: FormKitNode) => {
  const maxWidth = 800
  const maxHeight = 600

  return new Promise<boolean>(resolve => {
    const image = new Image()

    image.onload = function () {
      const isValid = image.width <= maxWidth && image.height <= maxHeight

      resolve(isValid)
    }

    const value = node.value as Array<{ file: File }>
    if (value.length === 0) {
      resolve(true)
      return
    }

    image.src = URL.createObjectURL(value[0].file)
  })
}

pixelSize.blocking = true
