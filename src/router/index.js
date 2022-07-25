import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    meta: {title: "TPCraft 时代先锋"}
  },
  {
    path: '/Account',
    meta: {title: "通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Auth',
    meta: {title: "互联 | TPCraft 时代先锋"}
  },
  {
    path: '/Pay',
    meta: {title: "支付 | TPCraft 时代先锋"}
  },
  {
    path: '/Doc',
    meta: {title: "文档 | TPCraft 时代先锋"}
  }
]

const Router = new VueRouter({
  mode: "history",
  routes: Routes
})

export default Router
