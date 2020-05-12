<template>
  <embed :style="sty" v-if="isSvg(src)" :src="src" type="image/svg+xml" />
  <img :style="sty" v-else :src="src" alt="" />
</template>

<script>
export default {
  name: "ha-img",
  props: {
    src: String,
    sty: {
      type: String,
      default: "width: 36px;height:36px"
    }
  },
  methods: {
    isSvg: url => /\.svg$/.test(url)
  }
};
</script>
