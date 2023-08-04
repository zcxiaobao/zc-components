import { App } from "vue";
import menu from "./src/index.vue";

export default {
  install(app: App) {
    app.component("zc-menu", menu);
  },
};
