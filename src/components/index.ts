import { App } from "vue";
import menu from "./Menu";
import iconSelect from "./iconSelect";
import dialog from "./zcDialog";
import select from "./zcSelect";
import virualSelect from "./zcVituralSelect";

const components = [menu, iconSelect, dialog, select, virualSelect];

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c);
    });
  },
};
