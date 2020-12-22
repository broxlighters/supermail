import { debounce } from "common/utils";
import { POP, NEW, SELL } from "./const";

import BackTop from "components/content/backtop/BackTop.vue";

export const detailItemImageLoadMixin = {
  // data() {return{}},
  // methods:{},
  // computed:{},
  // components:{},
  //都可以混入
  mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //传入的的变量为函数（不加括号，不执行），而不是变量的返回值（加括号，执行）
    this.$bus.$on("detailItemImageLoad", () => {
      //使用$bus.$on，接收时间总线发送过来的事件
      refresh();
      /**在图片加载完成后，进行刷新
       *重新计算 better-scroll，
       *当 DOM 结构发生变化的时
       *候务必要调用确保滚动的效果正常。
       */
    });
  }
};
export const homeItemImageLoadMixin = {
  mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
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
  }
};
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackUp: false
    };
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackUp(position) {
      this.isShowBackUp = -position.y > 1000;
    }
  }
};

export const tabControlMixin = {
  data: function() {
    return {
      currentType: POP,
      currentType: POP,
      tabOffsetTop: 0,
      savePopY: 0,
      saveNewY: 0,
      saveSellY: 0,
      lastClick: POP,
      isShowBackUp: false,
      isTabFixed: false
    };
  },
  methods: {
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = POP;
          //tabcontrol切换被选中项
          switch (this.lastClick) {
            // 根据上一个被选中项保存滚动位置
            case NEW:
              this.saveNewY = this.$refs.scroll.getScrollY();
              break;
            case SELL:
              this.saveSellY = this.$refs.scroll.getScrollY();
              break;
          }
          this.$refs.scroll.scrollTo(0, this.savePopY, 0);
          this.$refs.scroll.refresh();
          // 根据保存的滚动位置进行跳转
          this.lastClick = POP;
          // 并将选择项保存到上一次被选中
          break;
        case 1:
          this.currentType = NEW;
          switch (this.lastClick) {
            case POP:
              this.savePopY = this.$refs.scroll.getScrollY();
              break;
            case SELL:
              this.saveSellY = this.$refs.scroll.getScrollY();
              break;
          }
          this.$refs.scroll.scrollTo(0, this.saveNewY, 0);
          this.$refs.scroll.refresh();
          this.lastClick = NEW;
          break;
        case 2:
          this.currentType = SELL;
          switch (this.lastClick) {
            case POP:
              this.savePopY = this.$refs.scroll.getScrollY();
              break;
            case NEW:
              this.saveNewY = this.$refs.scroll.getScrollY();
              break;
          }
          this.$refs.scroll.scrollTo(0, this.saveSellY, 0);
          this.$refs.scroll.refresh();
          this.lastClick = SELL;
          break;
      }
      this.$refs.tabContral.currentIndex = index;
      this.$refs.tabContralHidden.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackUp = -position.y > 1000;
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //接收事件swiperImageLoad，让tabContral到页面顶端的值赋给变量tabOffsetTop
      this.tabOffsetTop = this.$refs.tabContral.$el.offsetTop;
      console.log(this.tabOffsetTop);
      //-------------------------------------------------------------
      // 初始化goodsList位置，数值刚好与tabOffsetTop相同
      this.savePopY = -this.tabOffsetTop;
      this.saveNewY = -this.tabOffsetTop;
      this.saveSellY = -this.tabOffsetTop;
    },
    tabContentDetailLoad() {
      //接收事件tabContentDetailLoad，让tabContral到页面顶端的值赋给变量tabOffsetTop
      this.tabOffsetTop = this.$refs.tabContral.$el.offsetTop;
      console.log(this.tabOffsetTop);
      //-------------------------------------------------------------
      // 初始化goodsList位置，数值刚好与tabOffsetTop相同
      this.savePopY = -this.tabOffsetTop;
      this.saveNewY = -this.tabOffsetTop;
      this.saveSellY = -this.tabOffsetTop;
    }
  }
};
