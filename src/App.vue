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
    this.$store.commit("base/initConfigAnalysis", config.analysis);
    this.$store.commit("base/initConfigPlatform", config.platform);
  },
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
