import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/button',
      component: () => import('../component/Button.vue'),
    },
    {
      path: '/ellipsis',
      component: () => import('../component/Ellipsis.vue'),
    },
    {
      path: '/',
      redirect: '/button',
    },
  ],
})
