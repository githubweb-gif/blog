import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/untils/date'
import './style/global.scss' // global css

import { Pagination, Icon } from 'element-ui'

Vue.use(Pagination)
Vue.use(Icon)
Vue.config.productionTip = false

// Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

