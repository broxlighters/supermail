<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null,
    }
  },
  methods:{
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
    scrollTo(x,y,time = 300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
      //判断this.scroll = new BScroll 对象是否被创建
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      //刷新DOM
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  created() {},
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll (this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    });
    //2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      //判断是否监听滚动位置
      this.scroll.on('scroll',(position) => {
      this.$emit('scrollPosition',position)
    });
    }
    //3.监听上拉事件
    if (this.pullUpLoad) {
      /*判断scroll是否需要上拉加载*/
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
  }
}
</script>

<style scoped>

</style>
