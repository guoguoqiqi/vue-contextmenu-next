import { App } from "vue";
import { createContextMenu } from "./src/utils/contextmenu";

export default {
  install: (app: App) => {
    app.config.globalProperties.$contextmenu = createContextMenu;
  },
};

export const $contextmenu = createContextMenu;
