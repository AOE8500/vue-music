<template>
  <div id="app">
    <head-nav></head-nav>
    <my-tab></my-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-player></my-player>
  </div>
</template>

<script>
import headNav from './components/MyHeader/MyHeader.vue'  
import MyTab from '@/components/MyTab/MyTab'
import MyPlayer from '@/components/MyPlayer/MyPlayer'
export default { 
  name: 'app',
  components:{  //组件
    headNav,
    MyTab,
    MyPlayer
  	
  }
}
</script>

<style lang="scss" scoped>
</style>

