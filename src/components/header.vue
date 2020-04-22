<template>
  <el-header>
    <div class="left">
      <slot name="left"></slot>
    </div>
    <nav class="center">
      <el-link
        :underline="false"
        href="#/"
        :type="path == '/' ? 'primary' : 'default'"
      >
        <p><i class="el-icon-video-play"></i></p>
        <p>首页</p>
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
</template>

<script>
export default {
  data() {
    return {
      path: "/", // 当前路由
    };
  },
  mounted() {
    this.path = this.$route.path;
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  z-index: 99999;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  padding-left: 85px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
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
</style>
