import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// const originalPush = VueRouter.prototype.push;

// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

const routes = [
  {
    path: '/',
    name: 'todo',
    component: () => import('@/views/ToDoList.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/DetailView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
