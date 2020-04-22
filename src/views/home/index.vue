<template>
  <el-container>
    <Header>
      <template v-slot:left>
        <!-- <el-link type="primary" @click="drawer = true">历史记录</el-link> -->
        <el-button @click="drawer = !drawer" size="mini">播放记录</el-button>
      </template>
      <template v-slot:right>
        <el-select size="mini" v-model="platformValue" placeholder="选择平台">
          <el-option
            v-for="(val, key) in config.platform"
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
            v-for="(val, key) in config.analysis"
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
      <iframe :src="nowsite" frameborder="0"></iframe>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      drawer: false
    };
  },

  mounted() {
    // 监听后端发送的消息
    this.$ipc.on("home", (event, data) => {
      this[data.method](data.data);
    });
  },

  components: {
    Header
  },

  watch: {
    video_config(val) {
      this.$ipc.send("hapv", {
        method: "video/config",
        data: val
      });
    }
  },

  computed: {
    // 当前iframe地址
    nowsite() {
      let platform =
        this.config.platform && this.config.platform[this.platformValue];
      return platform ? platform.nowsite : "";
    },

    // 发送给后台的信息
    video_config() {
      return {
        ...this.config.platform[this.platformValue],
        analysis: this.analysisValue
      };
    },

    base() {
      return this.$store.state.base;
    },

    config() {
      return this.base.config;
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
    navigate(data) {
      this.$store.commit("base/setNowsite", {
        id: this.platformValue,
        nowsite: data
      });
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
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
