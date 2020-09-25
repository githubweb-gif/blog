import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
        meta: { KeepAlive: true }
      },
      {
        path: 'article/:id',
        component: () => import('../views/article/index.vue'),
        meta: { KeepAlive: false }
      },
      {
        path: 'sort/:sortID',
        component: () => import('../views/sort/index.vue'),
        meta: { KeepAlive: true }
      },
      {
        path: 'archive',
        component: () => import('../views/archive/index.vue'),
        meta: { KeepAlive: true }
      },
      {
        path: 'about',
        component: () => import('../views/about/index.vue'),
        meta: { KeepAlive: true }
      }
    ]
  },
  {
    path: '*',
    component: () => import('../views/404/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 300)
      }
    })
  }
})

// 解决跳转相同路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
