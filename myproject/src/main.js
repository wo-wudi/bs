import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment';

axios.defaults.baseURL="/"
Vue.prototype.axios=axios
Vue.prototype.qs=qs
Vue.prototype.moment = moment;

Vue.use(ElementUI)

// 将全局的echarts对象挂载到Vue的原型对象上
// 别的组件中 this.$echarts
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false
Vue.component("my-header",MyHeader)
Vue.component("my-footer",MyFooter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
