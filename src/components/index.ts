import { App } from "vue";
import menu from "./Menu";
import iconSelect from "./iconSelect";
import dialog from "./zcDialog";

const components = [menu, iconSelect, dialog];

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c);
    });
  },
};
