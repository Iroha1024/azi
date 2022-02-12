import { defineComponent } from 'vue'

import { ClassName, injectClass, injectStyle } from './style/listDivider'

export default defineComponent({
  setup() {
    injectStyle()
    injectClass()

    return () => <li class={ClassName.listDivider}></li>
  },
})
