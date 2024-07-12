import 'whatwg-fetch';
import 'custom-event-polyfill';
import 'core-js/stable/promise';
import 'core-js/stable/symbol';
import 'core-js/stable/string/starts-with';
import 'core-js/web/url';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zh from '@/assets/languages/zh.json'
import en from '@/assets/languages/en.json'
import './assets/css/element.scss'
import './assets/css/gbjd.scss'
import './assets/css/global.scss'
import './assets/css/scrollbar.scss'
import './assets/svg.js'
import VueI18n from 'vue-i18n'
import { registerMicroApps, start } from 'qiankun';
Vue.prototype.$trans = function (val) {
  val += ''
  val = val.toLowerCase()
  if (val !== i18n.t(val)) {
    return i18n.t(val)
  } else {
    const s3Msg = store.state.statusCode.find(item => (item.description && (item.description).toLowerCase().indexOf(val.toLowerCase().substr(0, 50)) > -1))
    return (s3Msg && s3Msg.description_cn) || val
  }
}
Vue.config.productionTip = false
Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
  locale: sessionStorage.getItem('lang') || 'zh-CN', // 语言标识
  messages: {
    'zh-CN': {
      ...zh,
      ...zhLocale
    },
    'en-US': {
      ...en,
      ...enLocale
    }
  }
})
ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.use(ElementUI)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

registerMicroApps([
  {
    name: 'project1',
    entry: 'http://localhost:2222',
    container: '#appContainer',
    activeRule: '/project1',
    props: { data: store }
  },
  {
    name: 'dbs',
    entry: 'http://localhost:3333',
    container: '#appContainer',
    activeRule: '/dbs',
    props: { data: store },
    // loader
  },
]);

start(
  // {
  //   sandbox: {
  //     experimentalStyleIsolation: true // 样式隔离
  //   }
  // }
);
