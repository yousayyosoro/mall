<template>
  <div class="home">
    <header class="g-header-container">

      <home-header></home-header>
    </header>
<!--    滚动条组件-->
    <szh-scroll :watchedData="recommends" @pull-down="pullToRefresh">
<!--      幻灯片组件-->
      <home-slider ref="slider"></home-slider>
<!--      顶部导航组件-->
      <home-nav></home-nav>
      <home-recommend @loaded="getRecommends"></home-recommend>
    </szh-scroll>
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
