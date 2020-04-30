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
          nowsite: "https://v.qq.com", // 当前iframe地址，切换平台或者初始化操作是，nowsite=site
          historysite: [], // 历史地址 10个
        },
        */
      }
    }
  },

  mutations: {
    /**
     * 初始化
     * @param {*} param1 config配置文件中的数据
     */
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

      this.commit("base/saveLocal");
    },

    // 初始化平台
    initConfigPlatform(state, data) {
      let { cache } = data;
      let { platform } = state.config;
      // 初始化 config.platform 数据
      if (cache) {
        // 本地缓存有数据
        data.platform.forEach(val => {
          // config读取的数据
          let tempJson = {
            ...val,
            nowsite: val.site,
            historysite: [val.site]
          };

          // console.log(cache.config.platform[val.site]);
          platform[val.site] = {
            ...tempJson,
            ...cache.config.platform[val.site]
          };
        });
      } else {
        data.platform.forEach(val => {
          platform[val.site] = {
            ...val,
            nowsite: val.site,
            historysite: [val.site]
          };
        });
      }

      // 初始化平台
      state.platform = cache ? cache.platform : data.platform[0].site;
      Vue.set(state.config, "platform", platform);

      this.commit("base/saveLocal");
    },

    saveLocal(state) {
      localStorage.setItem("base", JSON.stringify(state));
    },

    setPlatform(state, val) {
      state.platform = val;
      this.commit("base/saveLocal");
    },

    setAnalysis(state, val) {
      state.analysis = val;
      this.commit("base/saveLocal");
    },

    /**
     * 通过按钮控制页面，加入历史记录
     * @param {*} state
     * @param {*} {id, num} num: 后退 -1,前进 1
     */
    setNowsiteToBtn(state, { id, num }) {
      // if (num != 1 || num != -1) return;

      let { platform } = state.config;
      let temp = platform[id];
      let nowsiteIndex = temp.historysite.indexOf(temp.nowsite) + num;

      let historysiteLen = temp.historysite.length;
      if (nowsiteIndex < 0) nowsiteIndex = 0;
      if (nowsiteIndex >= historysiteLen - 1) nowsiteIndex = historysiteLen - 1;

      temp.nowsite = temp.historysite[nowsiteIndex];
      platform[id] = temp;
      state.config.platform = {
        ...platform
      };
      this.commit("base/saveLocal");
    },

    /**
     * config.platform中的nowsite
     * 修改之后影响页面跳转
     */
    setNowsite(state, { id, nowsite }) {
      let { platform, analysis } = state.config;
      let temp = platform[id];
      let { historysite } = temp;

      // 新增历史记录
      let nowsiteIndex = historysite.indexOf(nowsite);
      if (nowsiteIndex > -1) {
        historysite.splice(nowsiteIndex, 1);
      }
      historysite.push(nowsite);

      platform[id] = {
        ...temp,
        nowsite,
        historysite
      };
      state.config.platform = {
        ...platform
      };

      this.commit("base/saveLocal");
    }
  },
  actions: {}
};

export default base;
