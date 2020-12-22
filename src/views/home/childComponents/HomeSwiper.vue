<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
        <!-- 动态监听轮播图加载完成 -->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default() {
        return{}
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if (!this.isLoad) {//设置变量，不让imageLoad多次发送事件
        this.$emit('swiperImageLoad')
        //发送自定义事件swiperImageLoad
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>
