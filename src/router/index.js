import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    meta: {title: "通行证 | TPCraft 时代先锋"}
  }
]

const Router = new VueRouter({
  mode: "history",
  routes: Routes
})

export default Router
