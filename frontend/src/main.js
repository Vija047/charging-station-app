import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/DashboardView.vue"),
    },
    {
      path: "/login",
      component: () => import("./components/LoginForm.vue"),
    },
    {
      path: "/register",
      component: () => import("./components/RegisterForm.vue"),
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
