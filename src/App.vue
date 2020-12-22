<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <mian-tab-bar/>
  </div>
</template>

<script>
  import MianTabBar from './components/content/mainTabbar/MianTabBar'

  export default {
    name:'app',
    components:{
        MianTabBar
    },
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
