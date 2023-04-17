import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/cadastro', name: 'cadastro', component: () => import('@/views/CadastroView.vue') },
    {
      path: '/concluir-cadastro',
      name: 'concluir-cadastro',
      component: () => import('@/views/ConcluirCadastroView.vue')
    }
  ]
})

export default router
