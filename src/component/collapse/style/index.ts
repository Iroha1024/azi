import { computed } from 'vue'
import classNames from 'classnames'

export const ClassName = {
  collapseContent: 'collapseContent',
}

export const injectClass = () => {
  return {
    [ClassName.collapseContent]: computed(() => classNames('p-[1em]')),
  }
}
