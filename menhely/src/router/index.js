import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user';
import { ApiService } from "@/service/api.service";


const api = new ApiService();
let user_status = null;
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
      path: '/petdetails/:id',
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
      path: '/petadoption/:id',
      name: 'petadoption',
      component: () => import('../views/PetAdoption.vue')
    },

    {
      path: '/passwordrecovery',
      name: 'passwordrecovery',
      component: () => import('../views/ForgotPasswordView.vue')
    },

    {
      path: '/newpassword/:id',
      name: 'newpassword',
      component: () => import('../views/NewPasswordView.vue')
    },

    {
      path: '/revertpassword/:id',
      name: 'revertpassword',
      component: () => import('../views/RevertPasswordView.vue')
    },

    {
      path: '/peteditor/:id',
      name: 'peteditor',
      component: () => import('../views/PetEditPage.vue')
    }
  ],
})

// Guard

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  console.log(`${from.name} -> ${to.name}`);
  if (userStore.isLoggedIn()){
    api.userDataByID(userStore.loggedUser().id).then((res) => {
      user_status = res.data.status;
      
    if (to.name == 'login' && userStore.isLoggedIn()){
      return {name: 'home'};
    }
    
    if (to.name == 'adminpage' && (user_status != 'admin' || user_status != 'moderator')){
      return {name: from.name};
    }
    })
  }
  else{
    if (to.name == 'adminpage'){
      return {name: 'login'};
    }
  }
  

  
})


export default router
