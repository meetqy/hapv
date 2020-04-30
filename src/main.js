import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ipcRenderer } from "electron";
import moment from "moment";
import "./plugins/element.js";
import VideoPlayer from 'vue-video-player'

Vue.prototype.$ipc = ipcRenderer;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
