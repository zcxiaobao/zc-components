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
      {
        path: "/dialog",
        component: () => import("../views/dialog/index.vue"),
        redirect: "/dialog/drag",
        children: [
          {
            path: "drag",
            component: () => import("../views/dialog/dragDialog/index.vue"),
          },
          {
            path: "scroll",
            component: () => import("../views/dialog/scrollDialog/index.vue"),
          },
        ],
      },
      {
        path: "select",
        component: () => import("../views/select/index.vue"),
        children: [
          {
            path: "multiple",
            component: import("../views/select/multipleSelect/index.vue"),
          },
          {
            path: "loadmore",
            component: import("../views/select/loadmoreSelect/index.vue"),
          },
          {
            path: "virtual",
            component: import("../views/select/virtualSelect/index.vue"),
          },
        ],
      },
      {
        path: "detail",
        component: () => import("../views/detail/index.vue"),
      },
      {
        path: "/directive",
        component: () => import("../views/directive/index.vue"),
        redirect: "/directive/drag",
        children: [
          {
            path: "drag",
            component: () => import("../views/directive/vDrag/index.vue"),
          },
          {
            path: "debounce",
            component: () => import("../views/directive/vDebounce/index.vue"),
          },
          {
            path: "throttle",
            component: () => import("../views/directive/vThrottle/index.vue"),
          },
          {
            path: "copy",
            component: () => import("../views/directive/vCopy/index.vue"),
          },
          {
            path: "longpress",
            component: () => import("../views/directive/vLongpress/index.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
