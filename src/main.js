import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ipcRenderer } from "electron";
import moment from "moment";
import "./plugins/element.js";
import HaHeader from "./components/ha-header.vue";
import HaImg from "./components/ha-img.vue";

Vue.prototype.$ipc = ipcRenderer;
Vue.prototype.$moment = moment;
Vue.component("ha-header", HaHeader);
Vue.component("ha-img", HaImg);

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
