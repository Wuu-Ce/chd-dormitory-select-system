<template>
  <el-scrollbar view-style="height:100%">
    <div class="canvas-container">
      <canvas id="canvas" />
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue'
import { ElScrollbar } from 'element-plus'

export default defineComponent({
  name: 'my',
  props: {},
  components: {
    ElScrollbar
  },
  setup() {
    // 创建canvas动画
    const oninitCanvas = () => {
      nextTick(() => {
        const canvas: any = document.getElementById('canvas')
        const height: number = canvas.offsetHeight
        const width: number = canvas.offsetWidth
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        const lines: string[] = [
          'rgba(248, 248, 248, .4)',
          'rgba(248, 248, 248, .5)',
          'rgba(248, 248, 248, .6)'
        ]
        const boHeight: number = height / 15
        const posHeight: number = height / 1.2 // 波浪高度
        const canvasAny: any = { width, height }
        const requestAnimFrame = (function () {
          // 波浪自执行函数
          return function (callback: any) {
            setTimeout(callback, 100 / 5)
          }
        })()
        let step: number = 0
        // 动起来
        const loop = function () {
          ctx.clearRect(0, 0, canvasAny.width, canvasAny.height)
          step++
          // 画三个不同颜色的矩阵
          for (let j = lines.length - 1; j >= 0; j--) {
            // 每个矩阵的角度都不同，每个之间相差100度
            const angle: number = ((step + j * 100) * Math.PI) / 180
            const deltaHeight: number = Math.sin(angle) * boHeight
            const deltaHeightRight: number = Math.cos(angle) * boHeight
            ctx.fillStyle = lines[j]
            ctx.beginPath() // 开始绘制
            ctx.moveTo(0, posHeight + deltaHeight)
            ctx.bezierCurveTo(
              canvasAny.width / 2,
              posHeight + deltaHeight - boHeight,
              canvasAny.width / 2,
              posHeight + deltaHeightRight - boHeight,
              canvasAny.width,
              posHeight + deltaHeightRight
            )
            ctx.lineTo(canvasAny.width, canvasAny.height)
            ctx.lineTo(0, canvasAny.height)
            ctx.lineTo(0, posHeight + deltaHeight)
            ctx.fill() // 上色
            ctx.closePath() // 结束绘制
          }
          requestAnimFrame(loop) // 启动函数
        }
        loop()
      })
    }
    onMounted(() => {
      oninitCanvas()
    })
  }
})
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
}
#canvas {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #833ce7;
}
</style>
