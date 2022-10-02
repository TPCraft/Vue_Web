/* Vue */
import Vue from 'vue'
import App from './App.vue'

/* 插件 */
import Store from './store'
import Router from './router'
import Vuetify from './plugins/vuetify'
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'
import VueQrcode from 'vue-qrcode-directive'
import VueCropper from 'vue-cropper'
import VueMarkdownEditor from '@kangc/v-md-editor';
import VueMarkdownPreview from '@kangc/v-md-editor/lib/preview';
import VuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import Prism from 'prismjs';

/* 自定义 CSS */
import './assets/css/common.css'
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

/* Markdown 设置 */
VueMarkdownEditor.use(VuepressTheme, {
  Prism
});
VueMarkdownPreview.use(VuepressTheme, {
  Prism
});

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
Axios.defaults.withCredentials = true;
Axios.defaults.headers.post['Content-Type'] = "application/json"
Axios.defaults.headers.get['Content-Type'] = "application/json"

/* 应用插件 */
Vue.use(VueCookies)
Vue.use(VueClipboard)
Vue.use(VueQrcode)
Vue.use(VueCropper)
Vue.use(VueMarkdownEditor);
Vue.use(VueMarkdownPreview);

/* 初始化应用 */
new Vue({
  store: Store,
  router: Router,
  vuetify: Vuetify,
  render: h => h(App)
}).$mount('#App')
