import { App } from "vue";
import menu from "./Menu";
import iconSelect from "./iconSelect";

const components = [menu, iconSelect];

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c);
    });
  },
};
