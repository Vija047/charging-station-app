import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/LoginForm.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/RegisterForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (
    isAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
