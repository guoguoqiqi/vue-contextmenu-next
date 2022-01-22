import { App } from "vue";
import * as Icons from "@element-plus/icons-vue";

export default {
  install(app: App) {
    for (const key in Icons) {
      app.component(getIconName(key), Icons[key as keyof typeof Icons]);
    }
  },
};

function getIconName(iconName: string) {
  return iconName.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
}
