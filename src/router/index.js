import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import login from '../views/login.vue';
import register from '../views/register.vue';
import user from '../views/user.vue';
import edit from '../views/edit.vue';
import myAttention from '../views/myAttention.vue';
import myFollow from '../views/myFollow.vue';
import myCollection from '../views/myCollection.vue';
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
  {
    path: '/edit',
    name: 'edit',
    component: edit,
  },
  {
    path: '/myFollow',
    name: 'myFollow',
    component: myFollow,
  },
  {
    path: '/myCollection',
    name: 'myCollection',
    component: myCollection,
  },
  {
    path: '/myAttention',
    name: 'myAttention',
    component: myAttention,
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// 全局前置导航守卫(拦截未登录的用户,所有的路由跳转都经过导航守卫)
router.beforeEach((to, from, next) => {
  const authrityPage = ['/user', '/edit']; //需求加权限token的页面
  const token = localStorage.getItem('token');
  if (authrityPage.includes(to.path) && !token) {
    router.push('/login');
  } else {
    next();
  }
});

export default router;
