/* Vue */
import Vue from 'vue'
import App from './App.vue'

/* 插件 */
import Store from './store'
import Router from './router'
import Vuetify from './plugins/vuetify'
import Axios from 'axios'

/* Vue设置 */
Vue.config.productionTip = false

/* Router设置 */
Router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name:from.name }) : next('/')
  } else {
    next()
  }
})

/* Axios设置 */
Axios.defaults.withCredentials = true
Axios.defaults.headers.post['Content-Type'] = "application/json"
Axios.defaults.headers.get['Content-Type'] = "application/json"

/* 初始化应用 */
new Vue({
  store: Store,
  router: Router,
  vuetify: Vuetify,
  render: h => h(App)
}).$mount('#App')
