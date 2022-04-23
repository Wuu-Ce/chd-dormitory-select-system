<template>
  <div class="fengmap">
    <div class="control-container"></div>
    <div id="map" class="canvas-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import fengmap from 'fengmap/build/fengmap.map.min.js' // 核心包
import 'fengmap/build/fengmap.plugin.min.js' // 控件

export default defineComponent({
  name: 'fengMap',
  props: {},
  // components: {
  //
  // },
  setup() {
    let map: any
    const initMap = () => {
      const options: object = {
        appName: 'dormitory',
        key: '3aea85413cde69b04a655f08a64f2433',
        mapID: '1436659200518074369',
        container: document.getElementById('map'),
        // mapURL: '../utils/fengMap/data/90872',
        // themeURL: '/src/utils/fengMap/data/theme/',
        themeID: '4009',
        mapZoom: 18
      }
      map = new fengmap.FMMap(options)
      map.on('loaded', () => {
        const scrollFloorCtlOpt: { [index: string]: any } = {
          position: fengmap.FMControlPosition.RIGHT_TOP,
          floorButtonCount: 5,
          offset: {
            x: -20,
            y: 20
          },
          viewModeControl: true,
          floorModeControl: true,
          needAllLayerBtn: true
        }
        const scrollFloorControl = new fengmap.FMToolbar(scrollFloorCtlOpt)
        scrollFloorControl.addTo(map)

        scrollFloorCtlOpt.positon = fengmap.FMControlPosition.LEFT_BOTTOM
        scrollFloorCtlOpt.offset = { x: -20, y: 360 }
        const zoomCtl = new fengmap.FMZoomControl(scrollFloorCtlOpt)
        zoomCtl.addTo(map)

        const compass = new fengmap.FMCompass()
        compass.addTo(map)
        compass.on('click', () => {
          map.setRotation({
            rotation: 0,
            animate: true,
            duration: 0.3,
            finish() {
              console.log('setRotation')
            }
          })
        })
      })
      // map.on('click', (event) => {
      //   console.log('clicked')
      //   console.log(event)
      //   event.targets.forEach((target, idx) => {
      //     if (target.wa === '6851115713923518464') {
      //       console.log(target)
      //       console.log(idx)
      //       map.pickFilterFunction = function pickFilterFunction(event1) {
      //         console.log(event1)
      //         return event1.type !== fengmap.FMType.MODEL
      //       }
      //     }
      //   })
      // })

      // 过滤不允许点击的地图元素，设置为true为允许点击，设置为false为不允许点击
      // map.pickFilterFunction = function pickFilterFunction(event) {
      //   return event.data.fid === '6851115713923518464' || event.data.fid === '6851115684173320192'
      // }
      map.on('click', (res: any) => {
        console.log(res)
      })
    }
    const getCenter = () => {
      console.log(map.getCenter())
    }

    onMounted(initMap)

    return { initMap, getCenter }
  }
})
</script>

<style scoped lang="scss">
.fengmap {
  position: relative;
  width: 100%;
  height: 100%;
  .canvas-container {
    width: 100%;
    height: 100%;
  }
}
//.canvas-containers
//  width: 100%
//  height: 100%
//
//.control-container
//  position: absolute
//  top: 50vh
//  left: 0
//  z-index: 100
</style>
