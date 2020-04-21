<template>
  <div id="app">
    <el-container>
      <el-header>header</el-header>
      <el-main>
        <iframe :src="src" frameborder="0"></iframe>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      src: "https://v.qq.com"
    };
  },
  mounted() {
    this.$ipc.on("hapiv", (event, arg) => {
      this.src = arg;
    });

    this.$ipc.send("hapiv", "connected");
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  min-height: 100vh;
  padding: 0;
}
.el-header {
  background: red;
}
.el-main {
  padding: 0;
  display: flex;
  iframe {
    flex: 1;
  }
}
</style>

<style>
@import url("./assets/css/reset.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
