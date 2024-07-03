import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/tasks/:id', component: () => import('@/components/TaskEdit.vue')},
    { path: '/users/add', component: () => import('@/components/PerformerEdit.vue')}
  ]
})

export default router
