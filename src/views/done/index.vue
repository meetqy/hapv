<template>
  <el-container>
    <Header>
      <template v-slot:left>
        <h1>Here might be a page title</h1>
      </template>
      <template v-slot:right>
        <h1>Here might be a page title</h1>
      </template>
    </Header>
    <el-main>
      done
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header";
export default {
  components: {
    Header,
  },
};
</script>

<style></style>
