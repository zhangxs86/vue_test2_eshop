import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css';
import Myserver from '@/plugins/http.js'
//import axios from 'axios'
//Vue.prototype.$htpp = axios

//生产环境切换
Vue.config.productionTip = false

Vue.use(Myserver);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
