import Vue from 'vue'
import VueRouter from 'vue-router'

import InDevelopment from '../views/InDevelopment'
import Error from '../views/Error'

import Doc_Documentation from '../apps/doc/Documentation'

import Www_Home from '../apps/www/Home'

import Account_View_BanList from '../apps/account/view/BanList'

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
import Auth_Oauth_Client from '../apps/auth/oauth/Client'

import Pay_Coin from '../apps/pay/Coin'
import Pay_PayOrder from '../apps/pay/PayOrder'

import Admin_Home from '../apps/admin/Home'
import Admin_Pass from '../apps/admin/pass/List'
import Admin_Order from '../apps/admin/order/List'
import Admin_RedemptionCode from '../apps/admin/coin/RedemptionCode'
import Admin_OauthClient from '../apps/admin/oauth/List'
import Admin_Documentation from '../apps/admin/doc/Documentation'

Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    component: Www_Home,
    meta: {title: "TPCraft 时代先锋"}
  },
  {
    path: '/InDevelopment',
    component: InDevelopment,
    meta: {title: "开发中 - TPCraft 时代先锋"}
  },
  {
    path: '/Error',
    component: Error,
    meta: {title: "错误 - TPCraft 时代先锋"}
  },
  {
    path: '/Doc/Documentation',
    component: Doc_Documentation,
    meta: {title: "文档 | TPCraft 时代先锋"}
  },
  {
    path: '/Account/BanList',
    component: Account_View_BanList,
    meta: {title: "封禁列表 - TPCraft 时代先锋"}
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
    path: '/Auth/Oauth/Client',
    component: Auth_Oauth_Client,
    meta: {title: "OauthClient - 互联 | TPCraft 时代先锋"}
  },
  {
    path: '/Auth/Oauth/Authorize',
    component: Auth_Oauth_Authorize,
    meta: {title: "授权第三方 - 互联 | TPCraft 时代先锋"}
  },
  {
    path: '/Pay/Coin',
    component: Pay_Coin,
    meta: {title: "先锋币 - 支付 | TPCraft 时代先锋"}
  },
  {
    path: '/Pay/PayOrder',
    component: Pay_PayOrder,
    meta: {title: "支付订单 - 支付 | TPCraft 时代先锋"}
  },
  {
    path: '/Admin/Home',
    component: Admin_Home,
    meta: {title: "仪盘表 - 管理 | TPCraft 时代先锋"}
  },
  {
    path: '/Admin/Pass',
    component: Admin_Pass,
    meta: {title: "通行证 - 管理 | TPCraft 时代先锋"}
  },
  {
    path: '/Admin/Order',
    component: Admin_Order,
    meta: {title: "先锋币订单 - 管理 | TPCraft 时代先锋"}
  },
  {
    path: '/Admin/RedemptionCode',
    component: Admin_RedemptionCode,
    meta: {title: "先锋币激活码 - 管理 | TPCraft 时代先锋"}
  },
  {
    path: '/Admin/OauthClient',
    component: Admin_OauthClient,
    meta: {title: "OauthClient - 管理 | TPCraft 时代先锋"}
  },
  {
    path: '/Admin/Documentation',
    component: Admin_Documentation,
    meta: {title: "文档 - 管理 | TPCraft 时代先锋"}
  }
]

const Router = new VueRouter({
  mode: "history",
  routes: Routes
})

export default Router
