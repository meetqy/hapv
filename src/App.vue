<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import config from "./config/index";
export default {
  name: "app",
  mounted() {
    this.initStore();
    this.$ipc.on("err", (event, data) => {
      this.$message({
        type: "error",
        message: data,
        offset: 80
      });
    });
  },
  methods: {
    initStore() {
      this.$store.commit("base/init", {
        analysis: config.analysis,
        platform: config.platform
      });
    }
  }
};
</script>

<style lang="scss">
@import url("./assets/css/reset.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  > section {
    height: 100%;
  }
  overflow: hidden;
}
.el-main {
  margin-top: 60px;
  padding: 0 !important;
  overflow: hidden !important;
}
</style>
