import { createRouter, createWebHistory } from 'vue-router'
import Monitoramento from '../views/Monitoramento.vue'
import ListaEventos from "@/views/ListaEventos.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/eventos',
    },
    {
      path: '/monitoramento/:id',
      name: 'monitoramento',
      component: Monitoramento,
    },
    {
      path: '/eventos',
      name: 'lista de eventos',
      component: ListaEventos,
    },
  ],
})

export default router
