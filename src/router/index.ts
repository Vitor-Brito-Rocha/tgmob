import { createRouter, createWebHistory } from 'vue-router'
import Monitoramento from '../views/Monitoramento.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/monitoramento',
    },
    {
      path: '/monitoramento',
      name: 'monitoramento',
      component: Monitoramento,
    },
  ],
})

export default router
