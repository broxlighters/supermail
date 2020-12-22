<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control-hidden"
      ref="tabContralHidden"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
      ></tab-control>
    <scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @scrollPosition="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control
      class="tab-control"
      ref="tabContral"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" ref="GoodsList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackUp"/>
  </div>
</template>

<script>
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop.vue'
//私有组件
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView'
import HomeFeatureView from './childComponents/HomeFeatureView'
//网络请求&其他工具
import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {tabControlMixin} from "common/mixins";
import { debounce } from "common/utils";


export default {
  name:'Home',
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,

  },
  data(){
    return{
      result:null,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /**
     * 网络请求
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      //设置page常量，在 第一次 获取到数据后，使得页数增加一，因为是常量，下一次使用此刚发时不会重复声明
      getHomeGoods(type,page).then(res => {//传入一个参数，获取到类型
      // console.log(res);
      this.goods[type].list.push(...res.data.list);//...是将数组结构，让后再逐个push进data中的数据
      this.goods[type].page += 1;//在获取到数据之后，page加一

      //完成上拉加载
      this.$refs.scroll.finishPullUp()
    })
    }
  },
  created() {
    //1.请求多个数据(此处添加this是使用的methods中的方法)
    this.getHomeMultidata()
    //2.请求商品数据(此处添加this是使用的methods中的方法)
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    //传入的的变量为函数（不加括号，不执行），而不是变量的返回值（加括号，执行）
    this.$bus.$on("homeItemImageLoad", () => {
      //使用$bus.$on，接收时间总线发送过来的事件
      refresh();
      /**在图片加载完成后，进行刷新
       *重新计算 better-scroll，
       *当 DOM 结构发生变化的时
       *候务必要调用确保滚动的效果正常。
       */
    });
  },
  activated() {
    switch (this.lastClick) {
      case 'pop':
        this.$refs.scroll.scrollTo(0,this.savePopY)
        this.$refs.scroll.refresh()
        break;
      case 'new':
        this.$refs.scroll.scrollTo(0,this.saveNewY)
        this.$refs.scroll.refresh()
        break;
      case 'sell':
        this.$refs.scroll.scrollTo(0,this.saveSellY)
        this.$refs.scroll.refresh()
        break;
    }
  },
  deactivated() {
    switch (this.lastClick) {
        case 'pop':
          this.savePopY = this.$refs.scroll.getScrollY()
          break;
        case 'new':
          this.saveNewY = this.$refs.scroll.getScrollY()
          break;
        case 'sell':
          this.saveSellY = this.$refs.scroll.getScrollY()
          break;
      }
  },
  mixins: [tabControlMixin],
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 原生滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99; */
  }
  .tab-control-hidden{
    position: relative;
    z-index: 9;
  }

  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }

</style>
