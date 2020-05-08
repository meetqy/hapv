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

          <el-button
            class="title"
            @click="handleTitleClick(item)"
            type="text"
            >{{ showPlayLogTitle(item.title) }}</el-button
          >
        </p>
      </div>

      <div v-else class="not-play-log">
        <div>
          <i class="el-icon-tableware" style="font-size: 100px"></i>
          <span style="margin-top: 40px">你饿不饿啊</span>
        </div>
      </div>
    </el-drawer>

    <el-main>
      {{ this.$route.query }}
      <webview :src="nowsite"></webview>
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

.drawer-body {
  .active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  padding: 20px 0;
  p {
    padding: 0 20px;
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
