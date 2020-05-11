import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ipcRenderer } from "electron";
import moment from "moment";
import "./plugins/element.js";

Vue.prototype.$ipc = ipcRenderer;
Vue.prototype.$moment = moment;

Vue.prototype.$ico = {
  qq: require("@/assets/ico/qq.ico"),
  iqiyi: require("@/assets/ico/iqiyi.png"),
  le: require("@/assets/ico/le.png"),
  mgtv: require("@/assets/ico/mgtv.svg"),
  youku: require("@/assets/ico/youku.png")
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
