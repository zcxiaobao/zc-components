import { createWebHashHistory, RouteRecordRaw, createRouter } from "vue-router";
import Container from "../components/container/src/index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Container,
    children: [
      { path: "menu", component: () => import("../views/menu/index.vue") },
      {
        path: "icon-select",
        component: () => import("../views/icon-select/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
