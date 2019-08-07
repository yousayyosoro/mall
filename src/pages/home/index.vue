<template>
  <div class="home">
    <header class="g-header-container">

      <home-header></home-header>
    </header>
    <!--    滚动条组件 监听recommends根据返回的数据定义滚动参数 自定义事件下拉刷新-->
    <szh-scroll :watchedData="recommends"
                @pull-down="pullToRefresh"
                @pull-up="pullToLoadMore"
                @scroll-end="scrollEnd"
                ref="scroll"
    >
      <!--      幻灯片组件 传递slider注册参数-->
      <home-slider ref="slider"></home-slider>
      <!--      顶部导航组件-->
      <home-nav></home-nav>
      <!--      热卖推荐-->
      <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
    </szh-scroll>
    <!--    返回顶部组件-->
    <div class="g-backtop-container">
      <szh-backtop :visible="isBacktopVisible" @backtop="backToTop"></szh-backtop>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import SzhScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import SzhBacktop from 'base/backtop';

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      SzhScroll,
      HomeNav,
      HomeRecommend,
      SzhBacktop
    },
    data() {
      return {
        recommends: [],
        // 是否可以返回顶部
        isBacktopVisible: false
      };
    },
    // created() {
    //   this.isBacktopVisible = true;
    // },
    methods: {
      updateScroll() {
      },
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        this.$refs.slider.update().then(end);
        // setTimeout(() => {
        //   end();
        // }, 1000);
      },
      pullToLoadMore(end) {
        // console.log(this.$refs.recommend);
        this.$refs.recommend.update().then(end).catch(err => {
          if (err) {
            console.log(err);
          }
          end();
        });
      },
      // 滚动条最终位置相关事件
      scrollEnd(translate, scroll) {
        // 滚过屏高度*0.4开始显示回到顶部按钮
        this.isBacktopVisible = translate < 0 && -translate > scroll.height * 0.4;
      },
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }

  /*.g-backtop-container {*/
  /*  width: 45px;*/
  /*  height: 45px;*/
  /*}*/
</style>
