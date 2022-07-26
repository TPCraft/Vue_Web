import Vue from 'vue'
import VueRouter from 'vue-router'

import Account_Login from '../apps/account/Login'
import Account_LoginOut from '../apps/account/LoginOut'
import Account_ResetPassword from '../apps/account/ResetPassword'

Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    meta: {title: "TPCraft 时代先锋"}
  },
  {
    path: '/Account/PassCenter',
    meta: {title: "通行证中心 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/Login',
    component: Account_Login,
    meta: {title: "登入 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/Register',
    meta: {title: "注册 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/ResetPassword',
    component: Account_ResetPassword,
    meta: {title: "重置密码 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/ChangePassword',
    meta: {title: "修改密码 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/LoginOut',
    component: Account_LoginOut,
    meta: {title: "登出 - 通行证 | TPCraft 时代先锋"}
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
