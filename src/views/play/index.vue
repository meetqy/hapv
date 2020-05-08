<template>
  <el-container>
    <Header>
      <template v-slot:left>
        <el-button @click="drawer = !drawer" size="mini">播放记录</el-button>
      </template>
      <template v-slot:right>
        <el-select
          class="line"
          size="mini"
          v-model="analysisValue"
          placeholder="选择线路"
        >
          <el-option
            v-for="(val, key) in analysis"
            :key="key"
            :label="val.name"
            :value="key"
          >
          </el-option>
        </el-select>
      </template>
    </Header>

    <el-drawer
      direction="ltr"
      title="播放记录"
      :visible.sync="drawer"
      :with-header="false"
      size="32%"
      class="drawer"
    >
      <div class="drawer-body" v-if="playLog.length">
        <p
          v-for="(item, index) in playLog"
          :key="item.url"
          :class="{ active: index === 0 }"
          @click="handleTitleClick(item)"
        >
          <span style="color:#909399">{{ replaceTime(item.visitDate) }}</span>
          <el-link :underline="false">
            <span
              class="platform"
              :style="{ color: platform[item.platformSite].themeColor }"
            >
              {{ platform[item.platformSite].name }}
            </span>
          </el-link>

          <el-button class="title" type="text">{{
            showPlayLogTitle(item.title)
          }}</el-button>
        </p>
      </div>

      <div v-else class="not-play-log">
        <div>
          <i class="el-icon-tableware" style="font-size: 100px"></i>
        </div>
      </div>
    </el-drawer>

    <el-main>
      <webview :src="nowsite" v-if="nowsite"></webview>
      <div v-else class="not-play">
        <i class="el-icon-tableware" style="font-size: 300px"></i>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      drawer: false // 播放记录
    };
  },
  components: {
    Header
  },

  mounted() {
    let { query } = this.$route;
    if (query && Object.keys(query).length) {
      this.s_play_log(query);
    }
  },

  computed: {
    nowsite() {
      if (this.playLog.length) {
        return this.analysisValue + this.playLog[0].url;
      } else {
        return "";
      }
    },

    base() {
      return this.$store.state.base;
    },

    playLog() {
      return this.$store.state.play_log.data;
    },

    analysis() {
      return this.base.config.analysis;
    },

    platform() {
      return this.base.config.platform;
    },

    analysisValue: {
      get() {
        return this.base.analysis;
      },
      set(val) {
        this.$store.commit("base/setAnalysis", val);
      }
    }
  },

  methods: {
    // 播放
    handleTitleClick(item) {
      this.s_play_log(item);
    },

    // 保存播放记录
    s_play_log({ url, title, platformSite }) {
      this.$store.commit("play_log/add", {
        url,
        title,
        platformSite
      });
    },

    // 替换 pm 为上午
    replaceTime(val) {
      if (val.indexOf("am") > -1) return val.replace("am", "上午");
      if (val.indexOf("pm") > -1) return val.replace("pm", "下午");
    },

    // 播放记录标题
    showPlayLogTitle(val) {
      val = val.replace(/\s|\n/g, "");
      return val.length > 15 ? val.substring(0, 12) + "..." : val;
    }

    // play(url) {

    // }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  webview {
    width: calc(100% + 17px);
    height: 100%;
  }
}

.el-container {
  /deep/ .el-drawer.ltr {
    height: calc(100% - 60px);
    margin-top: 60px;
  }
}

.not-play-log {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    margin-top: -175px;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 40px;
    color: #c0c4cc;
  }
}

.not-play {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  i {
    margin: auto;
    color: #c0c4cc;
  }
}

.drawer-body {
  .active {
    &:hover {
      border-color: transparent;
    }

    &::after {
      content: "◍";
      color: #409eff;
      position: absolute;
      left: 10px;
      top: 14px;
    }
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  padding: 20px 0;
  p {
    position: relative;
    transition: all 400ms ease-in-out;
    border-bottom: 1px solid transparent;
    &:hover {
      border-color: #dcdfe6;
    }
    padding-left: 30px;
    > span {
      display: inline-flex;
      width: 80px;
    }
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    height: 44px;
    // border-bottom: 1px solid #dcdfe6;
    width: 100%;
    font-size: 14px;
    display: inline-flex;
    .platform {
      padding-left: 15px;
      // margin-left: 30px;
      display: inline-block;
      text-align: left;
      width: 100px;
    }
  }
  .title {
    color: #606266;
  }
}
</style>
