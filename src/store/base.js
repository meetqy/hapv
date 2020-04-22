import Vue from "vue";

const base = {
  namespaced: true,
  state: {
    platform: "", // 默认视频平台 key
    analysis: "", // 默认线路   value
    config: {
      analysis: [], // 所有线路
      platform: {
        // 所有平台
        /*
        site: {
          site: "https://v.qq.com",
          name: "腾讯视频",
          rule: "https://v.qq.com/x/cover/",
        },
        */
      },
    },
  },

  mutations: {
    // 初始化线路
    initConfigAnalysis(state, data) {
      state.config.analysis = data;
      state.analysis = data[0];
    },

    // 初始化平台
    initConfigPlatform(state, data) {
      let { platform } = state.config;
      data.forEach((val) => {
        platform[val.site] = {
          ...val,
        };
      });

      Vue.set(state.config, "platform", platform);
      state.platform = data[0].site;
    },

    setPlatform(state, val) {
      state.platform = val;
    },
  },
  actions: {},
};

export default base;
