<template>
  <el-row>
    <el-col :span="24">
      <div id="container"></div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

// 在2021年12月02日以后申请的 key 需要配合您的安全密钥一起使用。
window._AMapSecurityConfig = {
  securityJsCode: 'd5a6eaa80dc673d652ba5d96ff15b7da',
}

let map: any = null

onMounted(() => {
  AMapLoader.load({
    key: '25a7b96aed246c0c703e3886b67825ae', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      'AMap.Scale',
      'AMap.ControlBar',
      'AMap.Geolocation',
      'AMap.MapType',
    ], //插件列表
  })
    .then(AMap => {
      map = new AMap.Map('container', {
        // 设置地图容器ID
        viewMode: '3D', // 是否为3D地图模式
        zoom: 10, // 初始化地图级别
        mapStyle: 'amap://styles/dark', //设置地图的显示样式
      })
      const Scale = new AMap.Scale()
      map.addControl(Scale)
      const ControlBar = new AMap.ControlBar()
      map.addControl(ControlBar)
      const Geolocation = new AMap.Geolocation()
      map.addControl(Geolocation)
      const MapType = new AMap.MapType()
      map.addControl(MapType)
    })
    .catch(e => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 500px;
}
</style>
