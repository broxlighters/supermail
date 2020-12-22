<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-act"></slot>
    <div :style="activeStyle">
      <!-- 动态绑定style属性 -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path: String,
    activeColor: {
      type:String,
      default:'#FF5777'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
      //判断当前活跃路由的路径 与 当前页面路径 是否相同
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
      //this.isActive判断路由是否处于活跃
      //如果活跃，则向动态绑定属性style返回设置好的颜色
      //若不活跃，则返回一个空对象（保持默认颜色）
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top:3px;
    margin-bottom: 2px;
  }
</style>
