import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <svg
        class="z-loading"
        width="24"
        height="24"
        viewBox="0 0 70 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="z-loading-path"
          fill="none"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          cx="50%"
          cy="50%"
          r="30"
        ></circle>
      </svg>
    )
  },
})
