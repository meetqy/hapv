<template>
  <div class="header-box">
    <el-header v-if="status">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <nav class="center">
        <el-link
          :underline="false"
          href="#/"
          :type="path == '/' ? 'primary' : 'default'"
        >
          <p><i class="el-icon-s-home"></i></p>
          <p>首页</p>
        </el-link>
        <el-link
          :underline="false"
          href="#/play"
          :type="path == '/play' ? 'primary' : 'default'"
        >
          <p><i class="el-icon-video-play"></i></p>
          <p>正在播放</p>
        </el-link>
        <el-link
          href="#/download"
          :underline="false"
          :type="path == '/download' ? 'primary' : 'default'"
        >
          <p><i class="el-icon-download"></i></p>
          <p>正在下载</p>
        </el-link>
        <el-link
          :underline="false"
          href="#/done"
          :type="path == '/done' ? 'primary' : 'default'"
        >
          <p><i class="el-icon-circle-check"></i></p>
          <p>已完成</p>
        </el-link>
      </nav>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </el-header>
    <el-header v-else class="transparent"></el-header>
  </div>
</template>

<script>
export default {
  name: "ha-header",
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      path: "/", // 当前路由
      status: true
    };
  },
  watch: {
    visible(val) {
      this.status = val;
    }
  },
  mounted() {
    this.path = this.$route.path;
    this.$ipc.on("header", (e, res) => {
      this.change_status(res.data);
    });
  },
  methods: {
    // 全屏状态
    change_status(args) {
      this.$emit("change", !args);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  -webkit-app-region: drag;
  -webkit-user-select: none;
}

.el-header {
  padding-left: 85px;
  background-color: #e3e7ea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .center {
    width: 40%;
    display: flex;
    justify-content: center;
    margin-left: -85px;
  }

  .el-link {
    margin-right: 20px;
    i {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }

  .left,
  .right {
    width: 30%;
    display: flex;
  }

  .right {
    justify-content: flex-end;
  }
}

.transparent {
  background-color: transparent;
}
</style>
