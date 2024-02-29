import { defaultConfig } from '@formkit/vue'
import { es } from '@formkit/i18n'

import { rootClasses } from './formkit.theme'

export default defaultConfig({
  locales: { es },
  locale: 'es',
  config: {
    rootClasses,
  },
})
