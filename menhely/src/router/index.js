import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user';


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
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
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
      path: '/hogyansegithet', // Ha a többi route angolul van akkor legyen ez is.
      name: 'hogyansegithet',
      component: () => import('../views/HogyanSegithet.vue')
    },

    {
      path: '/emailconfirm/:id',
      name: 'emailconfirm',
      component: () => import('../views/EmailConfirm.vue')
    },
    {
      path: '/petdetails',
      name: 'petdetails',
      component: () => import('../views/PetDetailsView.vue')
    },

    {
      path: '/adminpage',
      name: 'adminpage',
      component: () => import('../views/AdminPage.vue')
    }, 

    {
      path: '/petsurrender',
      name: 'petsurrender',
      component: () => import('../views/AllatLeadas.vue')
    },
    {
      path: '/petadoption',
      name: 'petadoption',
      component: () => import('../views/PetAdoption.vue')
    }
  ],
})

// Guard, ami gyakorlatban csak az admin felületet védi, mert a többi úgy is megtekinthető

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  console.log(`${from.name} -> ${to.name}`);

  if (to.name == 'login' && userStore.isLoggedIn()){
    return {name: 'home'};
  }
  /*
  if (to.name == 'adminpage'){
    return {name: from.name};
  }
    */
})


export default router
