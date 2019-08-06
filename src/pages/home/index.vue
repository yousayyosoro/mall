<template>
  <div class="home">
    <header class="g-header-container">

      <home-header></home-header>
    </header>
    <!--    滚动条组件 监听recommends根据返回的数据定义滚动参数 自定义事件下拉刷新-->
    <szh-scroll :watchedData="recommends"
                @pull-down="pullToRefresh"
                @pull-up="pullToLoadMore"
    >
      <!--      幻灯片组件 传递slider注册参数-->
      <home-slider ref="slider"></home-slider>
      <!--      顶部导航组件-->
      <home-nav></home-nav>
      <!--      热卖推荐-->
      <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
    </szh-scroll>
    <!--    返回顶部组件-->
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import SzhScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';

  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      SzhScroll,
      HomeNav,
      HomeRecommend
    },
    data() {
      return {
        recommends: []
      };
    },
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
</style>
