<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop',
}
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 10px;
  bottom: 55px;
  z-index: 9999;
}
.back-top img{
  height: 50px;
}
</style>
