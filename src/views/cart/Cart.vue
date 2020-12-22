<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  name:'Cart',
  components: { NavBar,CartList,CartBottomBar, },
  data(){
    return {}
  },
  computed:{
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
