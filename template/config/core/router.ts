import Vue from 'vue';
import Router from 'vue-router';
import HelloWorldView from '@/pages/hello-world';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hello-world',
      component: HelloWorldView,
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting. use this for code that doesn't need
    //   // to load with the initial app payload. this generates a separate
    //   // chunk (login.[hash].js) for this route which is lazy-loaded when
    //   // the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "login" */ '@/pages/login'),
    // },
  ],
});
