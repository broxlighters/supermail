<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll" :probeType='3' @scrollPosition="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="detailParamInfo"/>
      <detail-comment-info :commentInfo="commentInfo" ref="detailCommentInfo"/>
      <goods-list :goods="recommends" ref="detailRecommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackUp"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
//公共组件
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
//私有组件
import DetailNavBar from './childcomponents/DetailNavBar.vue'
import DetailSwiper from './childcomponents/DetailSwiper.vue'
import DetailBaseInfo from './childcomponents/DetailBaseInfo.vue'
import DetailShopInfo from './childcomponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childcomponents/DetailGoodsInfo.vue'
import DetailParamInfo from './childcomponents/DetailParamInfo.vue'
import DetailCommentInfo from './childcomponents/DetailCommentInfo.vue'
import DetailBottomBar from './childcomponents/DetailBottomBar.vue'
//网络请求&其他工具
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import { debounce } from "common/utils";
import {backTopMixin} from 'common/mixins'
import {mapActions} from 'vuex'

export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, DetailGoodsInfo, DetailParamInfo, Scroll, DetailCommentInfo, GoodsList, DetailBottomBar, },
  name:'Detail',
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shopInfo:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[0,null,null,null,Infinity],
      getThemeTopY:null,
      currentIndex:0,
    }
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      // 0.判断BackTop是否显示
      this.listenShowBackUp(position)
      // 1.获取y值
      const positionY = -position.y
      /**
       * 2.positionY和themeTopYs对比
       * positionY 在 0 和 themeTopYs[1] 之间，index = 0
       * positionY 大于等于 themeTopYs[1] 小于 themeTopYs[2] ，index = 1
       * positionY 大于等于 themeTopYs[2] 小于 themeTopYs[3] ，index = 2
       * positionY 大于等于 themeTopYs[3] 之后，index = 3
       * *positionY 大于等于 themeTopYs[2] 小于 Infinity ，index = 3
       */
      const length = this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        //[0,null,null,null,Infinity]
        //为了for循环不取到themeTopYs中的最后一个 Infinity，所以length-1
        //for循环：遍历数组，选择themeTopYs中所有的元素
        if (this.currentIndex !== i && (i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          /**
           * 1>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
           * this.currentIndex !== i && ((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i]))
           * 成立条件：this.currentIndex = i
           * 1)
           * this.currentIndex !== i &&
           * 当条件成立时，则不需要在进行if判断，防止赋值过于频繁
           * 2)
           * ((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
           *  当 i 在 0 到 2 之间时：判断positionY 大于等于 themeTopYs[i] 同时 小于 themeTopYs[i+1]
           * 3)
           * (i === length-1 && positionY >= this.themeTopYs[i]))
           *  当 i 大于 2 时：判断 positionY 大于等于 themeTopYs[i]
           * 2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
           * this.currentIndex !== i && (i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
           * 1)
           * this.currentIndex !== i &&
           * 当条件成立时，则不需要在进行if判断，防止赋值过于频繁
           * 2)
           *  当 i 在 0 到 2 之间时：判断positionY 大于等于 themeTopYs[i] 同时 小于 themeTopYs[i+1]
           *  当 i 大于 2 时：判断positionY 大于等于 themeTopYs[i] 同时 小于 Infinity
           */
          // console.log(i);
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      //1.获取要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // product.count = 0
      //2.将商品添加到购物车里
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // this.show=true,
        // this.message=res,
        // setTimeout(() => {
        //   this.show=false;
        //   this.message='';
        // },1500)
        this.$toast.show(res,2000)
      })
      //3.添加到购物车成功(要在vuex的action添到state中的cartlist里)

    }
  },
  mixins:[backTopMixin],
  created(){
    //0.获取iid
    this.iid= this.$route.query.iid
    //1.请求详情数据
    getDetail(this.iid).then(res => {
      //0.获取res.result数据
      const data =res.result
      //1.获取轮播图数据
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取商家信息
      this.shopInfo = new Shop(data.shopInfo)
      //4.获取详情信息
      this.detailInfo = data.detailInfo
      //5.获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取评论信息
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0]
      }
      // 此处只是获取了数据，但是DOM还没有加载
      // this.themeTopYs[1] = -this.$refs.detailParamInfo.$el.offsetTop
      // this.themeTopYs[2] = -this.$refs.detailCommentInfo.$el.offsetTop
      // this.themeTopYs[3] = -this.$refs.detailRecommends.$el.offsetTop
      // console.log(this.themeTopYs);

      // this.$nextTick(() => {
      //   // DOM渲染完成后执行，但是图片还买有加载完成
      //   this.themeTopYs[1] = -this.$refs.detailParamInfo.$el.offsetTop
      //   this.themeTopYs[2] = -this.$refs.detailCommentInfo.$el.offsetTop
      //   this.themeTopYs[3] = -this.$refs.detailRecommends.$el.offsetTop
      //   console.log(this.themeTopYs);
      // })
    })
    //2.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    // 3.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs[1] = this.$refs.detailParamInfo.$el.offsetTop
      this.themeTopYs[2] = this.$refs.detailCommentInfo.$el.offsetTop
      this.themeTopYs[3] = this.$refs.detailRecommends.$el.offsetTop
      if (!this.themeTopYs[2]) {
        // 没有评论信息则让 this.themeTopYs[2] 比 this.themeTopYs[3] 小 1
        this.themeTopYs[2] = this.themeTopYs[3] - 1
      }
      //-----------------------------------------------------------------------
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.detailRecommends.$el.offsetTop)
      // this.themeTopYs.push(Infinity)
    },100)
  },
  mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    //传入的的变量为函数（不加括号，不执行），而不是变量的返回值（加括号，执行）
    this.$bus.$on("detailItemImageLoad", () => {
      // console.log('--detail--');
      //使用$bus.$on，接收时间总线发送过来的事件
      refresh();
      /**在图片加载完成后，进行刷新
       *重新计算 better-scroll，
       *当 DOM 结构发生变化的时
       *候务必要调用确保滚动的效果正常。
       */
    });
  },
  // updated(){
  //   this.themeTopYs[1] = -this.$refs.detailParamInfo.$el.offsetTop
  //   this.themeTopYs[2] = -this.$refs.detailCommentInfo.$el.offsetTop
  //   this.themeTopYs[3] = -this.$refs.detailRecommends.$el.offsetTop
  //   console.log(this.themeTopYs);
  // }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.content{
  height: calc(100% - 44px - 58px);
}
</style>
