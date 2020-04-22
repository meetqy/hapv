<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import config from "./config/index";
export default {
  name: "app",
  data() {
    return {
      platformValue: 0,
      analysisValue: 0,
      platform: config.platform,
      analysis: config.analysis,
      videoUrl: "",
    };
  },
  mounted() {
    let { platform, platformValue, analysis, analysisValue } = this;
    this.$ipc.on("hapv", (event, arg) => {
      let method = arg.method.replace("/", "_");
      this[method](arg);
      // this.src = arg;
    });

    this.$ipc.send("hapv", {
      method: "video/config",
      data: {
        ...platform[platformValue],
        analysis: analysis[analysisValue],
      },
    });
  },
  methods: {
    open_page({ data }) {
      this.videoUrl = data;
    },

    goback() {
      this.videoUrl = "";
      // if(this.videoUrl) {
      //   this.
      // }
    },

    changePlatform(index) {
      this.$ipc.send("hapv", {
        name: "video/config",
        data: this.platform[index],
      });
    },
  },
};
</script>

<style>
@import url("./assets/css/reset.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-main {
  margin-top: 60px;
}
</style>
