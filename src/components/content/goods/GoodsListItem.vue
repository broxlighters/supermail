<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" :key="showImage" @load="imgLoad" alt="">
    <!-- 监听图片加载 使用@load监听加载，加载完成后使用imgLoad方法 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imgLoad() {
      // 向 事件总线发 送自定义事件
      if (this.$route.path.indexOf('home')) {
        // 判断路由所在页面，如果是在home
        this.$bus.$emit('homeItemImageLoad')
      } else if (this.$route.path.indexOf('detail')) {
        // 判断路由所在页面，如果是在detail
        // this.$bus.$emit('homeItemImageLoad')
        this.$bus.$emit('detailItemImageLoad')
        //则发送detailItemImageLoad
      } else if (this.$route.path.indexOf('category')){
        this.$bus.$emit('categoryItemImageLoad')
      }
    },
    itemClick() {
      // this.$router.push('/detail/' + this.goodsItem.iid)
      this.$router.push({
        path:'/detail',
        query:{
          iid:this.goodsItem.iid
        }
      })
    }
  },
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 49%;
    background-color: #fff;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
