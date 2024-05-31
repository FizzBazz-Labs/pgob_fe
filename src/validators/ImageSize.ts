import { type FormKitNode } from '@formkit/core'
import { type FormKitValidationRule } from '@formkit/validation'

export const pixelSize: FormKitValidationRule = ({ value }: FormKitNode) => {
  const maxWidth = 800
  const maxHeight = 600

  return new Promise<boolean>(resolve => {
    const image = new Image()

    image.onload = function () {
      const isValid = image.width <= maxWidth && image.height <= maxHeight

      resolve(isValid)
    }

    image.src = URL.createObjectURL(value as File)
  })
}
