import { cssVar, style } from '../../../shared'

export const ClassName = {
  listDivider: 'listDivider',
}

export const injectStyle = () => {
  return {
    [ClassName.listDivider]: style({
      borderColor: cssVar('--z-gray-color'),
      margin: `${cssVar('--z-list-padding')} 0`,
    }),
  }
}

export const injectClass = () => {
  return {
    [ClassName.listDivider]: 'border-t',
  }
}
