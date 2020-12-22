<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  props:{},
  data() {
    return{
      message:"",
      isShow:false
    }
  },
  methods:{
    show(message,duration = 1500){
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
      this.isShow = false;
      this.message = '';
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: relative;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, .7);
  color: #fff;
  z-index: 9999;
}
</style>
