<template>
  <div class="nav-container">
    <h2 class="title" @click="collapse">Nav</h2>
    <el-menu
      router
      class="menu"
      :default-active="activePathFunc($route.path)"
      :collapse="isCollapse"
    >
      <el-menu-item
        class="menu-item"
        v-for="(item, index) in paths"
        :key="index"
        :index="item.index"
        :route="`${item.path}`"
      >
        <el-icon><map-location /></el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMenu, ElIcon } from 'element-plus'
import { MapLocation } from '@element-plus/icons-vue'
import { isObject } from '@/utils/util'

interface Path {
  index: string
  name: string
  path: string
}
const paths: Array<Path> = [
  { index: '1', name: 'test', path: '/home/test' },
  { index: '2', name: 'dormitory', path: '/home/dormitoryMap' },
  { index: '3', name: 'fengMap', path: '/home/fengMap' }
]

const isCollapse = ref(false)
function activePathFunc(path: String) {
  const item: Path | undefined = paths.find((i) => {
    return i.path === path
  })
  if (isObject(item)) {
    return item.index
  }
  return '1'
}
function collapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #8cc5ff;
  min-height: 400px;
  .title {
    margin: 0;
    padding: 10px 0 10px 0;
    text-align: center;
  }
  .menu {
    flex: 10 10 auto;
  }
}
</style>
