import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css';
import Myserver from '@/plugins/http.js';
import moment from 'moment';
import Mybread from '@/components/cuscom/myBread'
//import axios from 'axios'
//Vue.prototype.$htpp = axios

// 加入全局过滤器，处理日期格式
Vue.filter('fmdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
//层级别名过滤器
Vue.filter('levelfilter', (v) => {
  let lv = ""
  if (v === '0') { lv = '一' } else if (v === '1') {
    lv = '二'
  } else if (v === '2') {
    lv = '三'
  }
  return `第${lv}级`
})
//生产环境切换
Vue.config.productionTip = false

Vue.use(Myserver);
Vue.use(ElementUI);
//全局自定义组件
Vue.component(Mybread.name, Mybread)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
