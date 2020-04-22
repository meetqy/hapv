import Vue from "vue";
import Vuex from "vuex";
import playLog from "./play_log";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playLog,
  },
});
