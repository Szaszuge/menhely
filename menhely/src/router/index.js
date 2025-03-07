import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },

    {
      path: '/petcatalog',
      name: 'petcatalog',
      component: () => import('../views/PetCatalog.vue')
    },

    {
      path: '/emailsent',
      name: 'emailsent',
      component: () => import('../views/EmailSent.vue')
    },

    {
      path: '/hogyansegithet',
      name: 'hogyansegithet',
      component: () => import('../views/HogyanSegithet.vue')
    }
  ],
})

export default router
