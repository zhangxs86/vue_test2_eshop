//插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    //设置基准地址
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    //设置头部拦截器，判断headers中token的存在
    //请求拦截
    //所有的网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的类容
    axios.interceptors.request.use(
        function (config) {
            // console.group("触发全局请求拦截器");
            // console.log(config);
            if (config.url !== 'login') {
                const AUTH_TOKEN = localStorage.getItem('token')
                config.headers['Authorization'] = AUTH_TOKEN
            }
            return config
        },
        function (err) {
            return Promise.reject(err);
        }
    );

    Vue.prototype.$http = axios
}

export default MyHttpServer
