import { string, bool } from 'vue-types'

import { cssVar } from './css'

type Size = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

export const size = string<Size>().def('m')

export const getSize = (size: Size) => {
  switch (size) {
    case 's':
      return cssVar('--z-small-size')
    case 'm':
      return cssVar('--z-medium-size')
    case 'l':
      return cssVar('--z-large-size')
    case 'xl':
      return cssVar('--z-x-large-size')
    case 'xxl':
      return cssVar('--z-xx-large-size')
    case 'xxxl':
      return cssVar('--z-xxx-large-size')
  }
}

export const disabled = bool().def(false)
