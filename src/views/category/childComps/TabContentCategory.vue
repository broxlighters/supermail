<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" @load="imageLoad" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return []
        }
      }
    },
    data(){
    return {
      isLoad:false
    }
    },
    methods:{
    imageLoad(){
      if (!this.isLoad) {//设置变量，不让imageLoad多次发送事件
        this.$emit('tabContentDetailLoad')
        //发送自定义事件tabContentDetailLoad
        this.isLoad = true
      }
    }
  }
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
