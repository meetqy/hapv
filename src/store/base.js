import Vue from "vue";

const base = {
  namespaced: true,
  state: {
    cache: localStorage.getItem("base")
      ? JSON.parse(localStorage.getItem("base"))
      : "",
    platform: "", // 默认视频平台 key
    analysis: "", // 默认线路   value
    config: {
      analysis: {
        // 所有线路
        /*
        url: {
          name: 线路n
        }
        */
      },
      platform: {
        // 所有平台
        /*
        site: {
          site: "https://v.qq.com",
          name: "腾讯视频",
          rule: "https://v.qq.com/x/cover/",
          nowsite: "https://v.qq.com" // 当前iframe地址，切换平台或者初始化操作是，nowsite=site
        },
        */
      }
    }
  },

  mutations: {
    // 初始化线路
    initConfigAnalysis(state, data) {
      let { cache } = state;
      let { analysis } = state.config;
      data.forEach((val, index) => {
        analysis[val] = {
          name: "线路" + (index + 1)
        };
      });

      Vue.set(state.config, "analysis", analysis);
      state.analysis = cache ? cache.analysis : data[0];
    },

    // 初始化平台
    initConfigPlatform(state, data) {
      let { cache } = state;
      let { platform } = state.config;
      data.forEach(val => {
        platform[val.site] = {
          ...val,
          nowsite: val.site
        };
      });

      Vue.set(state.config, "platform", platform);
      state.platform = cache ? cache.platform : data[0].site;
    },

    setPlatform(state, val) {
      state.platform = val;
      localStorage.setItem("base", JSON.stringify(state));
    },

    setAnalysis(state, val) {
      state.analysis = val;
      localStorage.setItem("base", JSON.stringify(state));
    },

    /**
     * config.platform中的nowsite
     * 修改之后影响页面跳转
     */
    setNowsite(state, { id, nowsite }) {
      let { platform } = state.config;
      let temp = platform[id];
      platform[id] = {
        ...temp,
        nowsite
      };
      state.config.platform = {
        ...platform
      };
    }
  },
  actions: {}
};

export default base;
