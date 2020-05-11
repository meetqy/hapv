<template>
  <embed v-if="isSvg($ico[enName])" :src="$ico[enName]" type="image/svg+xml" />
  <img v-else :src="$ico[enName]" alt="" />
</template>

<script>
export default {
  props: {
    enName: String
  },
  methods: {
    isSvg: url => /\.svg$/.test(url)
  }
};
</script>

<style lang="scss" scoped>
embed,
img {
  width: 36px;
  height: 36px;
}
</style>
