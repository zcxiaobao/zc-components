import { App } from "vue";
import menu from "./Menu";
import iconSelect from "./iconSelect";
import dialog from "./zcDialog";
import select from "./zcSelect";

const components = [menu, iconSelect, dialog, select];

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c);
    });
  },
};
