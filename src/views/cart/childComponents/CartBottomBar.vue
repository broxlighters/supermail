<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button :isCheck="isSelectAll" @click.native="selectAll" class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      总计:￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      <span>结算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton.vue'

import { mapGetters } from 'vuex'
export default {
  components: { CheckButton },
  name:'CartBottomBar',
  methods:{
    selectAll() {
      if (this.isSelectAll) {//全部选中
        this.cartList.forEach(item => {
          item.checked = false
        });
      } else{//全部不选中 || 不全部选中
        this.cartList.forEach(item => {
          item.checked = true
        });
      }
    },
    calcClick() {
      let selectKey = false
      for (const item of this.cartList) {
        if (item.checked) {
          selectKey = true
          break
        }
      }
      if (selectKey) {
        // 如果一个商品也没有选择（!this.isSelectAll），则弹出toast
        this.$toast.show('余额不足')
      }else{
        this.$toast.show('请选择商品')
      }
    }
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
        // 过滤未选择的商品，只留下已选商品
      }).reduce((preValue,item) => {
        return item.price * item.count + preValue
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {return item.checked}).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length === 0) {
        // 如果cartlist里没有商品，则返回false
        return false
      } else {
        // find查找cartlist中没有选择的商品，找到后取反
        return !this.cartList.find(item => !item.checked)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;

  height: 49px;
  /* line-height: 40px; */

  background-color: #eee;
}
.check-all{
  display: flex;
  width: 60px;
  align-items: center;
}
.check-button{
  margin: 0 5px;
  width: 18px;
  height: 18px;
  /* line-height: 20px; */
}
.price{
  margin-left: 20px;
  line-height: 49px;
  flex: 1;
}
.calculate{
  width: 90px;
  height: 35px;
  margin: 7px 5px ;
  border-radius: 50px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>
