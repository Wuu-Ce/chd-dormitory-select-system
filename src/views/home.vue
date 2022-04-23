<template>
  <el-container class="container">
    <el-header class="header"><v-header /></el-header>
    <el-container class="main-container">
      <el-aside><v-nav /></el-aside>
      <el-main class="main-container"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import nav from '@/components/nav/nav.vue'
import header from '@/components/header/header.vue'

export default defineComponent({
  name: 'home',
  components: {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    'v-nav': nav,
    'v-header': header
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .header {
    height: auto;
  }
  .el-aside {
    width: auto;
  }
  .main-container {
    height: 100%;
    flex-grow: 100;
    flex-shrink: 10;
    padding: 0;
  }
}
</style>
