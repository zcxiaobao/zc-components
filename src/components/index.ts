import { App } from "vue";
import menu from "./Menu";

const components = [menu];

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c);
    });
  },
};
