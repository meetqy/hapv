<template>
  <embed :style="style" v-if="isSvg(src)" :src="src" type="image/svg+xml" />
  <img :style="style" v-else :src="src" alt="" />
</template>

<script>
export default {
  name: "ha-img",
  props: {
    src: String,
    style: {
      type: String,
      default: "width: 36px;height:36px"
    }
  },
  methods: {
    isSvg: url => /\.svg$/.test(url)
  }
};
</script>
