import Vue from 'vue';
import App from './App.vue';
import './styles/base.css'; // 导入全局通用样式
import './styles/iconfont.css'; // 导入字体图标样式
import router from './router';
import VueRouter from 'vue-router';
import axios from 'axios';
import { Toast } from 'vant';
import moment from 'moment';
Vue.use(Toast);
Vue.use(VueRouter);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
// 注册全局过滤器
Vue.filter('data', (value) => moment(value).format('YYYY-MM-DD'));
// 解决路由重复报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// 配置响应拦截器(处理token失效或者过期的情况)
axios.interceptors.response.use((res) => {
  console.log('res===>', res);
  const { statusCode, message } = res.data;
  if (statusCode === 401 && message === '用户信息验证失败') {
    //token验证失败
    router.push('/login');
    Toast.fail(message);
    // 删除过期的token
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }
  return res;
});
// 注册全局组件
import HmHeaders from './components/hm-headers.vue';
import HmLogo from './components/hm-logo.vue';
import HmButton from './components/hm-button.vue';
import HmInput from './components/hm-input.vue';
import HmNavbar from './components/hm-navbar.vue';
Vue.component('HmHeaders', HmHeaders);
Vue.component('HmLogo', HmLogo);
Vue.component('HmButton', HmButton);
Vue.component('HmInput', HmInput);
Vue.component('HmNavbar', HmNavbar);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
