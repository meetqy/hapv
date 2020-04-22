import Vue from "vue";
import Vuex from "vuex";
import play_log from "./play_log";
import base from "./base";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    play_log,
    base
  }
});
