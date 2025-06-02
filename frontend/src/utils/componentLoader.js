import { defineAsyncComponent } from "vue";

export const loadComponent = (componentPath) => {
  return defineAsyncComponent({
    loader: () => import(`../components/${componentPath}.vue`),
    loadingComponent: () => import("../components/LoadingSpinner.vue"),
    errorComponent: () => import("../components/ErrorComponent.vue"),
    delay: 200,
    timeout: 3000,
  });
};

export const componentMap = {
  Dashboard: "DashboardView",
  Login: "LoginForm",
  Register: "RegisterForm",
  StationForm: "StationForm",
  StationCard: "StationCard",
  MapView: "MapView",
};
