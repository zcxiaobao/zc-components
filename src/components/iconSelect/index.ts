import { App } from "vue";
import iconSelect from "./src/index.vue";
export default {
  install(app: App) {
    app.component("zc-icon-select", iconSelect);
  },
};
