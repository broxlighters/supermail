<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
        class="title-item"
        :class="{active:currentIndex === index}"
        @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name:'DetailNavBar',
  components: { NavBar },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods:{
    titleClick(index){
      //navbar的切换
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      //返回上一页
      this.$router.back()
    }
  },

}
</script>

<style scoped>
.nav-bar img{
  margin-top: 12px;
  margin-left: 10px;
}
.title{
  display: flex;
  padding: 0 10px;
}
.title .title-item{
  flex: 1;
  font-size: 15px;
}
.active{
  color: var(--color-high-text);
}
</style>
