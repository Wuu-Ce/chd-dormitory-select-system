<template>
  <el-scrollbar class="scroll-container">
    <div class="control-container">
      <el-button class="el-button--primary">test</el-button>
    </div>
    <div id="map">
      <canvas id="canvas" />
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ElScrollbar } from 'element-plus'
import { fabric } from 'fabric'

export default defineComponent({
  name: 'dormitorySelect',
  components: {},
  props: { ElScrollbar },
  setup() {
    let canvas: any
    let canvasW: number
    let canvasH: number
    let panning: boolean = false

    const initDraw = () => {
      const elCanvas: any = document.getElementById('canvas')
      canvasW = elCanvas.offsetWidth
      canvasH = elCanvas.offsetHeight
      canvas = new fabric.Canvas('canvas', {
        width: canvasW,
        height: canvasH,
        isDrawingMode: false,
        selection: false,
        moveCursor: 'move',
        backgroundColor: '#fff0ec'
      })

      // 鼠标按下事件
      canvas.on('mouse:down', () => {
        panning = true
        canvas.selection = false
      })
      // 鼠标抬起事件
      canvas.on('mouse:up', () => {
        panning = false
        canvas.seletcion = true
      })
      // 移动画布事件
      canvas.on('mouse:move', (e: any) => {
        if (panning && e && e.e) {
          const delta = new fabric.Point(e.e.movementX, e.e.movementY)
          canvas.relativePan(delta)
        }
      })
      // 缩放
      // viewportTransform[]:
      // index(0):x方向缩放
      // index(1):对角线拉伸（左上到右下）
      // index(2):对角线平移（上下错开）
      // index(3):y方向缩放
      // index(4):x轴偏移
      // index(5):y轴偏移

      canvas.on('mouse:wheel', (opt: any) => {
        const delta = opt.e.deltaY
        let zoom = canvas.getZoom()
        zoom *= 0.999 ** delta
        if (zoom > 5) zoom = 5
        if (zoom < 0.3) zoom = 0.3
        // 以鼠标为中心缩放
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
        opt.e.preventDefault()
        opt.e.stopPropagation()
        // 限制画布范围
        // console.log(canvas.viewportTransform)
        // const vpt: any = canvas.viewportTransform
        // if (zoom < 400 / 1000) {
        //   vpt[4] = 200 - (1000 * zoom) / 2
        //   vpt[5] = 200 - (1000 * zoom) / 2
        // } else {
        //   if (vpt[4] >= 0) {
        //     vpt[4] = 0
        //   } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
        //     vpt[4] = canvas.getWidth() - 1000 * zoom
        //   }
        //   if (vpt[5] >= 0) {
        //     vpt[5] = 0
        //   } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
        //     vpt[5] = canvas.getHeight() - 1000 * zoom
        //   }
        // }
      })

      const clientW: any = ref(document.body.clientWidth)
      window.onresize = () => {
        clientW.value = document.body.clientWidth
        canvasW = document.getElementById('canvas-container')!.offsetWidth
        canvasH = document.getElementById('canvas-container')!.offsetHeight
        elCanvas.style.width = `${canvasW.toString()}px`
        elCanvas.style.height = `${canvasH.toString()}px`
        canvas.set({ width: canvasW, height: canvasH })
        console.log(canvas.width, canvasW, document.getElementById('canvas')!.offsetWidth)
      }

      // 窗口边界定位
      const circle1 = new fabric.Circle({
        radius: 10,
        left: -10,
        top: -10,
        fill: '#7cd9d9',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle1)

      const circle2 = new fabric.Circle({
        radius: 10,
        left: canvasW - 10,
        top: -10,
        fill: '#7cd9d9',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle2)

      const circle3 = new fabric.Circle({
        radius: 10,
        left: -10,
        top: canvasH - 10,
        fill: '#7cd9d9',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle3)

      const circle4 = new fabric.Circle({
        radius: 10,
        left: canvasW - 10,
        top: canvasH - 10,
        fill: '#7cd9d9',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle4)

      const circle5 = new fabric.Circle({
        radius: 10,
        left: canvasW / 2 - 10,
        top: canvasH / 2 - 10,
        fill: '#7cd9d9',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle5)

      // 画布边界定位
      const circle6 = new fabric.Circle({
        radius: 10,
        left: 1990,
        top: -10,
        fill: '#b165de',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle6)
      const circle7 = new fabric.Circle({
        radius: 10,
        left: -10,
        top: 990,
        fill: '#b165de',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle7)
      const circle8 = new fabric.Circle({
        radius: 10,
        left: 1990,
        top: 990,
        fill: '#b165de',
        strokeWidth: 2,
        stroke: '#ee9999',
        hoverCursor: 'default',
        selectable: false
      })
      canvas.add(circle8)

      // 矩形
      const rect = new fabric.Rect({
        top: 350, // 距离画布上边的距离
        left: 400, // 距离画布左侧的距离，单位是像素
        width: 100, // 矩形的宽度
        height: 70, // 矩形的高度
        fill: 'red', // 填充的颜色
        stroke: 'orange', // 边框原色
        strokeWidth: 5, // 边框大小
        rx: 8, // 圆角半径
        ry: 4 // 圆角半径
      })
      canvas.add(rect)
      rect.on('selected', () => {
        console.log(rect)
      })

      // 自定义路径
      const path = new fabric.Path(
        'M 50 0 L 50 400 L 0 400 L 0 800 L 200 800 L 200 400 L 250 400 L 250 0 z  '
      )
      path.set({
        selectable: false,
        backgroundColor: '#f6dada',
        selectionBackgroundColor: '#827b9c',
        fill: 'rgba(151,206,210,0.71)',
        hoverCursor: 'default'
      })
      const room1 = new fabric.Rect({
        top: 5, // 距离画布上边的距离
        left: 55, // 距离画布左侧的距离，单位是像素
        width: 80, // 矩形的宽度
        height: 40, // 矩形的高度
        fill: 'red', // 填充的颜色
        stroke: 'orange', // 边框原色
        strokeWidth: 2, // 边框大小
        rx: 4, // 圆角半径
        ry: 2, // 圆角半径
        hoverCursor: 'pointer',
        moveCursor: 'pointer',
        selectable: true
        // visible: false
      })
      const dormitory1: any = new fabric.Group([path, room1], {
        left: 100,
        top: 10,

        hoverCursor: 'pointer',
        selectable: true
      })
      canvas.add(dormitory1)
      console.log(dormitory1)
      dormitory1.on('selected', () => {
        console.log(rect)
      })
    }

    onMounted(initDraw)

    return {
      panning
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  width: 100%;
}
#map {
  width: 100%;
  height: 100%;
  #canvas {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
}

.control-container {
  position: absolute;
  top: 30vh;
  left: 0;
  z-index: 100;
}
</style>
