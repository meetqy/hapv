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
      <iframe src="https://v.qq.com" frameborder="0"></iframe>
    </el-main>
    <!-- <el-container>
      <el-aside width="200px">aside</el-aside>
      <el-main> asd</el-main>
    </el-container> -->
  </el-container>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      base: {},
      config: {},
      drawer: false
    };
  },
  mounted() {
    this.base = this.$store.state.base;
    this.config = this.base.config;
    // console.log(.config.analysis);
  },
  components: {
    Header
  },
  computed: {
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
