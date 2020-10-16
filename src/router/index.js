import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import login from '../views/login.vue';
import register from '../views/register.vue';
import user from '../views/user.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login', //命名路由,使用params路由传参时必须要使用命名路由
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/user',
    name: 'user',
    component: user,
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// 全局前置导航守卫(拦截未登录的用户,所有的路由跳转都经过导航守卫)
router.beforeEach((to, from, next) => {
  const authrityPage = ['/user']; //需求加权限token的页面
  const token = localStorage.getItem('token');
  if (authrityPage.includes(to.path) && !token) {
    router.push('/login');
  } else {
    next();
  }
});

export default router;
