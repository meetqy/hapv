<template>
  <el-container>
    <Header :visible="showHeader" @change="changeStatus">
      <template v-slot:left>
        <!-- <el-link type="primary" @click="drawer = true">历史记录</el-link> -->
        <!-- <el-button @click="drawer = !drawer" size="mini">播放记录</el-button> -->
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

        <div style="margin-left: 20px" v-if="playBtn">
          <el-button size="mini" type="primary">立即播放</el-button>
        </div>

        <!-- <el-select
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
        </el-select> -->
      </template>
    </Header>

    <!-- <el-drawer
      direction="ltr"
      title="播放记录"
      :visible.sync="drawer"
      :with-header="false"
      size="32%"
      class="drawer"
    >
      <div class="drawer-body" v-if="playLog.length">
        <p v-for="item in playLog" :key="item.url">
          <span style="color:#909399">{{ replaceTime(item.visitDate) }}</span>
          <el-link
            :underline="false"
            @click="setPlatformValue(item.platformSite)"
          >
            <span
              class="platform"
              :style="{ color: platform[item.platformSite].themeColor }"
            >
              {{ platform[item.platformSite].name }}
            </span>
          </el-link>
          <el-link :underline="false" :href="item.url" target="_blank">
            <span :title="item.title">{{ showPlayLogTitle(item.title) }}</span>
          </el-link>
        </p>
      </div>

      <div v-else class="not-play-log">
        <div>
          <i class="el-icon-tableware" style="font-size: 100px"></i>
          <span style="margin-top: 40px">你饿不饿啊</span>
        </div>
      </div>
    </el-drawer> -->

    <el-main :style="{ 'margin-top': showHeader ? '60px' : 0 }">
      <div id="loading" v-if="pageLoading">
        <embed :src="loadingSVG" style="background: transparent" />
      </div>
      <webview :src="nowsite" id="webview"></webview>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
import platform from "../../config/platform";
import loadingSVG from "../../assets/loading-1.svg";
export default {
  data() {
    return {
      showHeader: true,
      drawer: false, // 播放记录
      isCheckPageBtn: false, // 解决前进后退和监听页面加载完成冲突问题。如果是前进后退页面，页面监听不加入历史记录
      webview: "", // webview实例
      pageLoading: true,
      playBtn: false,
      loadingSVG
    };
  },

  mounted() {
    // 监听后端发送的消息
    this.$ipc.on("home", (event, data) => {
      console.log(data);
      this[data.method](data.data);
    });

    this.webview = document.getElementById("webview");

    // 加载完成触发. 这个包含当前文档的导航和副框架的文档加载，但是不包含异步资源加载.
    this.webview.addEventListener("load-commit", e => {
      setTimeout(() => {
        this.pageLoading = false;
      }, 1000);
    });

    // 当页内导航发生时触发.当业内导航发生时，page url改变了，但是不会跳出 page
    this.webview.addEventListener("will-navigate", e => {
      this.navigateTo(e.url);
    });

    // 在 guest page 试图打开一个新的浏览器窗口时触发.
    this.webview.addEventListener("new-window", e => {
      this.navigateTo(e.url);
    });
  },

  components: {
    Header
  },

  watch: {
    // 页面发生改变
    nowsite(val) {
      if (this.isVideoPage(val)) {
        this.playBtn = true;
      }
      this.pageLoading = true;
    }
  },

  computed: {
    // 当前webview地址
    nowsite() {
      let platform = this.platform && this.platform[this.platformValue];
      return platform ? platform.nowsite : "";
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

    playLog() {
      return this.$store.state.play_log.data;
    },

    platformValue: {
      get() {
        return this.base.platform;
      },
      set(val) {
        this.pageLoading = true;
        this.$store.commit("base/setPlatform", val);
      }
    },

    analysisValue: {
      get() {
        return this.base.analysis;
      },
      set(val) {
        this.webview.reload();
        this.$store.commit("base/setAnalysis", val);
      }
    }
  },

  methods: {
    // 是否是播放界面
    isVideoPage(src) {
      let tempPlatform = Object.keys(this.platform).filter(key => {
        if (src.match(this.platform[key].rule)) {
          return this.platform[key];
        }
      });

      return tempPlatform.length ? true : false;
    },

    // 是否显示header
    changeStatus(data) {
      this.showHeader = data;
    },

    // 保存播放记录
    s_play_log({ url, title, platformSite }) {
      this.$store.commit("play_log/add", {
        url,
        title,
        platformSite
      });
    },

    // 跳转页面
    navigateTo(url) {
      let result = url;
      // 如果是播放界面直接跳转到解析界面
      // if (this.isVideoPage(url)) {
      //   result = this.analysisValue + url;
      // }

      if (!this.isCheckPageBtn) {
        this.$store.commit("base/setNowsite", {
          id: this.platformValue,
          nowsite: result
        });
        this.isCheckPageBtn = false;
      }
    },

    // 设置选中平台
    setPlatformValue(val) {
      this.$store.commit("base/setPlatform", val);
    },

    // 播放记录标题
    showPlayLogTitle(val) {
      val = val.replace(/\s|\n/g, "");
      return val.length > 15 ? val.substring(0, 12) + "..." : val;
    },

    // 替换 pm 为上午
    replaceTime(val) {
      if (val.indexOf("am") > -1) return val.replace("am", "上午");
      if (val.indexOf("pm") > -1) return val.replace("pm", "下午");
    },

    // 前进后退
    goTo(num) {
      this.isCheckPageBtn = true;
      this.$store.commit("base/setNowsiteToBtn", {
        id: this.platformValue,
        num
      });
    },

    // 判断前进后退按钮是否可用
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

.drawer-body {
  padding: 20px;
  p {
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

.el-main {
  webview {
    width: calc(100% + 17px);
    height: 100%;
  }

  #loading {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
