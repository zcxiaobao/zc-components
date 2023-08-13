import { App } from "vue";
import detail from "./src/index.vue";
export default {
  install(app: App) {
    app.component("zc-detail", detail);
  },
};
