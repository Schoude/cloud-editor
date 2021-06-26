import { ROUTE_NAMES } from './routing-info';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/edit',
    name: ROUTE_NAMES.EDIT,
    component: () => import('../pages/Edit.vue'),
  },
  {
    path: '/merge',
    name: ROUTE_NAMES.MERGE,
    component: () => import('../pages/Merge.vue'),
  },
  {
    path: '/diff',
    name: ROUTE_NAMES.DIFF,
    component: () => import('../pages/Diff.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
