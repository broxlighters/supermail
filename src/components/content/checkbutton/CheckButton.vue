<template>
  <div class="check-button" :class="{check:isCheck}">
  <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    isCheck:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 1px solid #aaa;
}

.check{
  border-color: red;
  background-color: red;
}
</style>
