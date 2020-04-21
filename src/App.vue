<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="control">
          <i
            title="首页"
            class="el-icon-s-home control-active"
            @click="videoUrl = ''"
          ></i>
          <i title="刷新" class="el-icon-refresh-right control-active"></i>
        </div>
        <div class="opt">
          <div class="platform">
            <el-select
              v-model="platformValue"
              placeholder="选择平台"
              size="mini"
              @change="changePlatform"
            >
              <el-option
                v-for="(item, index) in platform"
                :key="item.site"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
          </div>
          <div class="line">
            <el-select
              v-model="analysisValue"
              placeholder="选择线路"
              size="mini"
            >
              <el-option
                v-for="(item, index) in analysis"
                :key="item"
                :label="'线路' + (index + 1)"
                :value="index"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-header>
      <el-main>
        <iframe v-if="videoUrl" :src="videoUrl" frameborder="0"></iframe>
        <!-- 首页 -->
        <iframe
          v-else
          :src="platform[platformValue].site"
          frameborder="0"
        ></iframe>
      </el-main>
    </el-container>
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

<style lang="scss" scoped>
.el-container {
  height: 100%;
  min-height: 100vh;
  padding: 0;
}

.el-header {
  z-index: 99999;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  padding-left: 85px;
  height: 40px !important;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #e3e7ea;
  color: #909399;
  display: flex;
  align-items: center;
  // justify-content: space-between;

  .opt {
    margin-left: 40px;
    display: flex;
    .line {
      margin-left: 20px;
    }
  }

  .control {
    // width: 366px;
    // text-align: left;
    i {
      display: inline-flex;
      align-items: center;
      width: 40px;
      height: 40px;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .control-active {
    color: #409eff;
  }
}

.el-main {
  margin-top: 40px;
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
