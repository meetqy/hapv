import Vue from "vue";

const base = {
  namespaced: true,
  state: {
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
    // 初始化
    init(state, { analysis, platform }) {
      let cache = localStorage.getItem("base")
        ? JSON.parse(localStorage.getItem("base"))
        : "";

      this.commit("base/initConfigAnalysis", {
        cache,
        analysis
      });
      this.commit("base/initConfigPlatform", {
        cache,
        platform
      });
    },

    // 初始化线路
    initConfigAnalysis(state, data) {
      let { cache } = data;
      let { analysis } = state.config;
      data.analysis.forEach((val, index) => {
        analysis[val] = {
          name: "线路" + (index + 1)
        };
      });

      state.analysis = cache ? cache.analysis : data.analysis[0];
      Vue.set(state.config, "analysis", analysis);

      this.commit("base/save");
    },

    // 初始化平台
    initConfigPlatform(state, data) {
      let { cache } = data;
      let { platform } = state.config;
      data.platform.forEach(val => {
        platform[val.site] = {
          ...val,
          nowsite: val.site
        };
      });

      state.platform = cache ? cache.platform : data.platform[0].site;
      Vue.set(state.config, "platform", platform);

      this.commit("base/save");
    },

    save(state) {
      localStorage.setItem("base", JSON.stringify(state));
    },

    setPlatform(state, val) {
      state.platform = val;
      this.commit("base/save");
    },

    setAnalysis(state, val) {
      state.analysis = val;
      this.commit("base/save");
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
