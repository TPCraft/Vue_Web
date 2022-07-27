import Vue from 'vue'
import VueRouter from 'vue-router'

import Account_Login from '../apps/account/Login'
import Account_LoginOut from '../apps/account/LoginOut'
import Account_ResetPassword from '../apps/account/ResetPassword'
import Account_PassCenter from '../apps/account/PassCenter'
import Account_Register from '../apps/account/Register'
import Account_ChangePassword from '../apps/account/ChangePassword'

import Auth_Bind_Steam from '../apps/auth/bind/Steam'
import Auth_Login_Steam from '../apps/auth/login/Steam'
import Auth_Game_Login from '../apps/auth/game/Login'
import Auth_Oauth_Authorize from '../apps/auth/oauth/Authorize'


Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    meta: {title: "TPCraft 时代先锋"}
  },
  {
    path: '/Account/PassCenter',
    component: Account_PassCenter,
    meta: {title: "通行证中心 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/Login',
    component: Account_Login,
    meta: {title: "登入通行证 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/Register',
    component: Account_Register,
    meta: {title: "注册通行证 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/ResetPassword',
    component: Account_ResetPassword,
    meta: {title: "重置密码 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/ChangePassword',
    component: Account_ChangePassword,
    meta: {title: "修改密码 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/LoginOut',
    component: Account_LoginOut,
    meta: {title: "登出 - 通行证 | TPCraft 时代先锋"}
  },
  {
    path: '/Auth/Bind/Steam',
    component: Auth_Bind_Steam,
    meta: {title: "Steam 绑定 - 互联 | TPCraft 时代先锋"}
  },
  {
    path: '/Auth/Login/Steam',
    component: Auth_Login_Steam,
    meta: {title: "Steam 登入 - 互联 | TPCraft 时代先锋"}
  },
  {
    path: '/Auth/Game/Login',
    component: Auth_Game_Login,
    meta: {title: "游戏登入 - 互联 | TPCraft 时代先锋"}
  },
  {
    path: '/Auth/Oauth/Authorize',
    component: Auth_Oauth_Authorize,
    meta: {title: "授权第三方 - Oauth | TPCraft 时代先锋"}
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
