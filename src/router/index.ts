import { createRouter, createWebHistory } from "vue-router";
import { RouteNames } from "@/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.Login,
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/dashboard",
      name: RouteNames.Dashboard,
      component: () => import("@/views/Dashboard.vue"),
    },
  ],
});

export default router;
