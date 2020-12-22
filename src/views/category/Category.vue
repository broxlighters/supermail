<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"@selectItem="selectItem"></tab-menu>
      <scroll id="tab-content"
      :data="[categoryData]"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="contentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @tabContentDetailLoad="tabContentDetailLoad"/>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" ref="tabContral" class="tab-control"/>
          <tab-content-detail
          :categoryDetail="showCategoryDetail"
          />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import Scroll from 'components/common/scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import { debounce } from "common/utils";
  import {POP, SELL, NEW} from "common/const";
  import {tabControlMixin} from "common/mixins";

  export default {
		name: "Category",
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
		  return {
		    categories: [],
        categoryData: {
        },
        currentIndex: -1,
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
	      if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      }
    },
    mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    //传入的的变量为函数（不加括号，不执行），而不是变量的返回值（加括号，执行）
    this.$bus.$on("categoryItemImageLoad", () => {
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
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
    /* font-weight: 700; */
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }

  .tab-control-hidden {
    position: relative;
    z-index: 9;
    left: 100px;
    width: 275px;
  }

</style>
