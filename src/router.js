
import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import ArrivalForm from './pages/ArrivalForm.vue';
import Dashboard from './pages/Dashboard.vue';
import ArrivalDetail from './pages/ArrivalDetail.vue';
import { isLoggedIn } from './services/auth';

const routes = [
    {path: '/', component: ArrivalForm},
    {path: '/login', component: Login},
    {path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }},
    {path: '/arrivals/:id', component: ArrivalDetail, meta: { requiresAuth: true }},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.path === '/login' && isLoggedIn()) {
    next({ path: '/dashboard' });
  } else {
    next();
  }
});

export default router
