<template>
  <el-container>
    <el-header>
      <v-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <v-nav />
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <v-footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import nav from '@/components/nav/nav.vue'
import header from '@/components/header/header.vue'
import footer from '@/components/footer/footer.vue'

export default defineComponent({
  name: 'home',
  components: {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    'v-nav': nav,
    'v-header': header,
    'v-footer': footer
  }
})
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
