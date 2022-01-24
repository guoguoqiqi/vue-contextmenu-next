import { App } from "vue";
import * as EleIcons from "@element-plus/icons-vue";
import * as AtdIcons from '@ant-design/icons-vue';

export default {
  install(app: App) {
    const Icons = Object.assign({}, EleIcons, AtdIcons)
    for (const key in Icons) {
      app.component(key, Icons[key as keyof typeof Icons]);
    }
  },
};
