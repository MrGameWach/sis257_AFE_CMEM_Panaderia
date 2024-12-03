import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getTokenFromLocalStorage } from '@/helpers'
//import { useAuthStore } from '@/stores/index'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/prueba',
      name: 'prueba',
      component: () => import('../views/PruebaView.vue')
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue')
    },
    {
      path:'/empleados',
      name:'empleados',
      component:()=> import('../views/EmpleadoView.vue')
    },
    {
      path:'/inventarios',
      name:'inventarios',
      component:()=> import('../views/InventarioView.vue')
    },
    {
      path:'/pedidos',
      name:'pedidos',
      component:()=> import('../views/PedidoView.vue')
    },
    {
      path:'/productos',
      name:'productos',
      component:()=> import('../views/ProductoView.vue')
    },
    
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/LoginView.vue')
    // },
  ]
});
// router.beforeEach(async (to) => {
//   const publicPages = ['/', '/login']
//   const authRequired = !publicPages.includes(to.path)
//   const authStore = useAuthStore()

//   if (authRequired && !getTokenFromLocalStorage()) {
//     if (authStore) authStore.logout()
//     authStore.returnUrl = to.fullPath
//     return '/login'
//   }
// })

export default router
