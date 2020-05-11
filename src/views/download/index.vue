<template>
  <el-container>
    <Header>
      <template v-slot:left>
        <!-- <h1>Here might be a page title</h1> -->
      </template>
      <template v-slot:right>
        <!-- <h1>Here might be a page title</h1> -->
      </template>
    </Header>
    <el-main>
      <div class="download">
        <div class="item">
          <div class="left">
            <img :src="$ico.qq" alt="" />
          </div>
          <div class="right">
            <p class="title">斗罗大陆 第001集_1080P在线观看平台_腾讯视频</p>
            <div style="width: 100%">
              <div class="desc">
                <div>
                  <span>4.3GB</span>
                  <span style="margin-left: 10px">已下载: 0.4%</span>
                </div>
                <span>已暂停</span>
              </div>
              <div class="progress">
                <el-progress
                  :show-text="false"
                  :percentage="percentage"
                  :stroke-width="4"
                  color="#409EFF"
                ></el-progress>
              </div>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="left">
            <img :src="$ico.qq" alt="" />
          </div>
          <div class="right">
            <p class="title">斗罗大陆 第001集_1080P在线观看平台_腾讯视频</p>
            <div style="width: 100%">
              <div class="desc">
                <div>
                  <span>4.3GB</span>
                  <span style="margin-left: 10px">已下载: 0.4%</span>
                </div>
                <span>已暂停</span>
              </div>
              <div class="progress">
                <el-progress
                  :show-text="false"
                  :percentage="percentage"
                  :stroke-width="4"
                  color="#409EFF"
                ></el-progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
export default {
  components: {
    Header
  },
  data() {
    return {
      percentage: 60
    };
  },
  mounted() {
    // console.log(this.$ico.qq);
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  margin-top: 60px;
  padding: 30px 150px !important;

  .item {
    &:not(:first-child) {
      margin-top: 20px;
    }
    display: flex;
    height: 90px;
    background-color: #f0f0f0;
    align-items: center;

    /deep/ .el-progress-bar__outer {
      background-color: #dbdbdb;
    }
    .left {
      width: 90px;
      height: 70px;
      border-right: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
      }
    }
    .right {
      height: 70px;
      padding: 5px 40px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .title,
    .desc,
    .progress {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .el-progress {
        flex: 1;
      }
    }

    .title {
      font-size: 14px;
      color: #303133;
    }

    .progress {
      margin-top: 8px;
    }

    .desc {
      color: #606266;
      font-size: 12px;
    }
  }
}
</style>
