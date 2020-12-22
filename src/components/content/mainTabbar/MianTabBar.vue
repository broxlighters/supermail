<template>
  <tab-bar>
    <tab-bar-item path="/home">
    <!-- activeColor='red'设置活跃字体颜色 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-act" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">主页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-act" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-act" src="~assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-act" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的主页</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name:'MainTabBar',
    components:{
      TabBar,
      TabBarItem
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    /* font-weight: 400; */
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top:3px;
    margin-bottom: 2px;
  }
</style>
