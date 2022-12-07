import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import ProductlistPage from '../views/ProductListPage.vue'
import AddtoCart from '../views/AddtoCart.vue'
import Wishlist from '../views/Wishlist.vue'

const routes= [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: LoginPage,
  },
  {
    path: '/productlistPage',
    name: 'productlistPage',
    component: ProductlistPage,
  },
  {
    path: '/addtocart',
    name: 'addtocart',
    component: AddtoCart,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: Wishlist
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const getDetails = localStorage.getItem("user-info")
  if (to.name !== 'home' && !getDetails) next({ name: 'home' })
  else next()
})

export default router
