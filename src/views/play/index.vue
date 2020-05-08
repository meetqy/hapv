<template>
  <el-container>
    <Header>
      <template v-slot:left> </template>
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
    <el-main>
      <webview :src="nowsite"></webview>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {};
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
    // 保存播放记录
    s_play_log({ url, title, platformSite }) {
      this.$store.commit("play_log/add", {
        url,
        title,
        platformSite
      });
    }
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
</style>
