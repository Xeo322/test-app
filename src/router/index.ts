import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import isAuntificated from "@/utils/isAuthenticated";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!isAuntificated() && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
