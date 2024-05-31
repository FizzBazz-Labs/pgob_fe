import { defaultConfig } from '@formkit/vue'
import { es } from '@formkit/i18n'
import { createAutoAnimatePlugin, createMultiStepPlugin } from '@formkit/addons'
import { applicationIcons } from '@formkit/icons'

import { rootClasses } from './formkit.theme'

import { pixelSize } from './src/validators/ImageSize'

export default defaultConfig({
  locales: { es },
  locale: 'es',
  config: { rootClasses },
  plugins: [createAutoAnimatePlugin(), createMultiStepPlugin()],
  icons: {
    ...applicationIcons,
  },
  rules: {
    pixelSize,
  },
})
