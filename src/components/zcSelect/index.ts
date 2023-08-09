import { App } from "vue";
import select from "./src/index.vue";
export default {
  install(app: App) {
    app.component("zc-select", select);
  },
};
