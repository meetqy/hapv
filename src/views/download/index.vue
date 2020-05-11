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
        <div
          class="item"
          :class="{ active: item == 1 }"
          v-for="item in arr"
          :key="item"
        >
          <div class="left">
            <!-- <embed
              v-if="isSvg($ico[item])"
              :src="$ico[item]"
              type="image/svg+xml"
            />
            <img v-else :src="$ico[item]" alt="" /> -->
            <img-ico :enName="item"></img-ico>
          </div>
          <div class="right">
            <p class="title">
              <span>斗罗大陆 第00{{ item }}集_1080P在线观看平台_腾讯视频</span>
              <i
                v-if="item % 2 == 0"
                style="font-size:18px"
                class="el-icon-download"
              ></i>
              <i v-else style="font-size:18px" class="el-icon-video-pause"></i>
            </p>
            <div style="width: 100%">
              <div class="desc">
                <div>
                  <span>4.3GB</span>
                  <span style="margin-left: 10px">已下载: 0.4%</span>
                </div>
                <span v-if="item % 2 == 0">已暂停</span>
                <span v-else>300k/s</span>
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
import imgIco from "@/components/img-ico";
export default {
  components: {
    Header,
    imgIco
  },
  data() {
    return {
      percentage: 60,
      arr: ["qq", "iqiyi", "le", "youku", "mgtv"]
    };
  },
  mounted() {
    // console.log(this.$ico.qq);
  },
  methods: {
    isSvg(url) {
      return /\.svg$/.test(url);
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
  background: #e8ebf3;
}
::-webkit-scrollbar-thumb {
  background: #909399;
  border-radius: 10px;
}

.el-main {
  margin-top: 60px;
  padding: 0 200px !important;
  overflow-y: scroll !important;

  .download {
    padding: 30px 0;
  }

  .active {
    background-color: rgb(217, 236, 255) !important;
  }

  .item {
    border-radius: 4px;
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
      img,
      embed {
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
