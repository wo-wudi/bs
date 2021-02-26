import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:main
  },
  {
    path:'/index',
    component:() => import(/* webpackChunkName: "index" */ '../views/index.vue')
  },
  {
    path:'/discuss',
    component:() => import(/* webpackChunkName: "discuss" */ '../views/discuss.vue')
  },
  {
    path:'/list',
    component:() => import(/* webpackChunkName: "list" */ '../views/list.vue')
  },
  {
    path:'/listtwo',
    component:() => import(/* webpackChunkName: "list2" */ '../views/listtwo.vue')
  },
  {
    path:'/listthree',
    component:() => import(/* webpackChunkName: "list3" */ '../views/listthree.vue')
  },
  {
    path:'/listfour',
    component:() => import(/* webpackChunkName: "list4" */ '../views/listfour.vue')
  },
  {
    path:'/listfive',
    component:() => import(/* webpackChunkName: "list5" */ '../views/listfive.vue')
  },
  {
    path:'/listsix',
    component:() => import(/* webpackChunkName: "list6" */ '../views/listsix.vue')
  },
  {
    path:'/log',
    component:() => import(/* webpackChunkName: "log" */ '../views/user_log.vue')
  },
  {
    path:'/reg',
    component:() => import(/* webpackChunkName: "reg" */ '../views/user_reg.vue')
  },
  {
    path:'/alog',
    component:() => import(/* webpackChunkName: "alog" */ '../views/admin_log.vue')
  },
  {
    path:'/areg',
    component:() => import(/* webpackChunkName: "areg" */ '../views/admin_reg.vue')
  },
  {
    path:'/au',
    component:() => import(/* webpackChunkName: "au" */ '../views/admin_u.vue')
  },
  {
    path:'/ap',
    component:() => import(/* webpackChunkName: "ap" */ '../views/admin_p.vue')
  },
  {
    path:'/ad',
    component:() => import(/* webpackChunkName: "ad" */ '../views/admin_d.vue')
  },
  {
    path:'/data',
    component:() => import(/* webpackChunkName: "data" */ '../views/data.vue')
  },
  {
    path:'/infor',
    component:() => import(/* webpackChunkName: "infor" */ '../views/user_information.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
