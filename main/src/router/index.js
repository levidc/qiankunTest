import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  // { path: '*', redirect: '/about', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  const usrString = localStorage.getItem('userInfo')
  store.commit('setUserData', JSON.parse(usrString))
  const userData = store.state.userData
  // console.log(userData, 'userData')
  if (to.name !== 'Login') {
    if (!userData) {
      router.push({ name: 'Login' })
    } else {
      next()
    }

    // else if (routes.find(x => x.path.indexOf(to.path) > -1)) {
    //   next()
    // } else {
    //   router.push({ name: '/about' })
    // }
  } else {
    next()
  }
})
export default router
