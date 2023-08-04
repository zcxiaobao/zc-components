import { App } from "vue";
import menu from "./src/index.vue";
import infinityMenu from "./src/menu";
export default {
  install(app: App) {
    app.component("zc-menu", menu);
    app.component("zc-infinity-menu", infinityMenu);
  },
};
