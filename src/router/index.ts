import { createRouter, createWebHistory } from "vue-router";
import { RouteNames } from "@/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.Login,
      component: () => import("@/components/Login.vue"),
    },
    {
      path: "/dashboard",
      name: RouteNames.Dashboard,
      component: () => import("@/components/Dashboard.vue"),
    },
  ],
});

export default router;
