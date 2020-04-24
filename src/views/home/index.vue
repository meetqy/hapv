<template>
  <el-container>
    <Header>
      <template v-slot:left>
        <!-- <el-link type="primary" @click="drawer = true">历史记录</el-link> -->
        <el-button @click="drawer = !drawer" size="mini">播放记录</el-button>
        <el-button
          icon="el-icon-caret-left"
          @click="goTo(-1)"
          :disabled="isShowBtn(-1)"
          circle
          size="mini"
        >
        </el-button>
        <el-button
          @click="goTo(1)"
          :disabled="isShowBtn(1)"
          icon="el-icon-caret-right"
          circle
          size="mini"
        >
        </el-button>
        <el-button
          @click="webview.reload()"
          icon="el-icon-refresh-right"
          circle
          size="mini"
        >
        </el-button>
      </template>
      <template v-slot:right>
        <el-select size="mini" v-model="platformValue" placeholder="选择平台">
          <el-option
            v-for="(val, key) in platform"
            :key="key"
            :label="val.name"
            :value="key"
          >
          </el-option>
        </el-select>

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
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="20%"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-main>
      <webview :src="nowsite" id="webview"></webview>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
import platform from "../../config/platform";
export default {
  data() {
    return {
      drawer: false,
      isCheckPageBtn: false,
      webview: ""
    };
  },

  mounted() {
    // 监听后端发送的消息
    this.$ipc.on("home", (event, data) => {
      // console.log(data);
      this[data.method](data.data);
    });

    this.webview = document.getElementById("webview");
    this.webview.addEventListener("did-navigate", (status, newURL) => {
      if (this.isCheckPageBtn) return (this.isCheckPageBtn = false);
      // console.log(webview.getURL(), "webview");
      this.$store.commit("base/setNowsite", {
        id: this.platformValue,
        nowsite: this.webview.getURL()
      });
    });
  },

  components: {
    Header
  },

  watch: {
    video_config(val) {
      console.log(val);
      this.$ipc.send("hapv", {
        method: "video/config",
        data: val
      });
    }
  },

  computed: {
    // 当前webview地址
    nowsite() {
      let platform = this.platform && this.platform[this.platformValue];
      return platform ? platform.nowsite : "";
    },

    // 发送给后台的信息
    video_config() {
      return {
        ...this.platform[this.platformValue],
        analysis: this.analysisValue
      };
    },

    base() {
      return this.$store.state.base;
    },

    // config() {
    //   return this.base.config;
    // },

    platform() {
      return this.base.config.platform;
    },

    analysis() {
      return this.base.config.analysis;
    },

    platformValue: {
      get() {
        return this.base.platform;
      },
      set(val) {
        this.$store.commit("base/setPlatform", val);
      }
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
    s_navigate(data) {
      this.$store.commit("base/setNowsite", {
        id: this.platformValue,
        nowsite: data
      });
    },

    goTo(num) {
      this.isCheckPageBtn = true;
      this.$store.commit("base/setNowsiteToBtn", {
        id: this.platformValue,
        num
      });
    },

    isShowBtn(num) {
      let item = this.platform[this.platformValue];
      if (!item) return false;
      let { nowsite, historysite } = item;
      if (num === -1) {
        return historysite.indexOf(nowsite) <= 0;
      } else {
        return historysite.indexOf(nowsite) >= historysite.length - 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  margin-left: 20px;
}
.el-aside {
  position: relative;
  border-right: 1px solid #eee;
}
.el-drawer__wrapper {
  padding-top: 60px;
}

.el-main {
  webview {
    width: 100%;
    height: 100%;
  }
}
</style>
