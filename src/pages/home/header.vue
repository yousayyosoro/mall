<template>
    <transition name="header-fade">
  <me-navbar class="header" title="搜索框" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <!--    <i class="iconfont icon-scan" slot="center"></i>-->
    <!--    <div slot="center">搜索框</div>-->
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
    </transition>

</template>

<script>
  import MeNavbar from 'base/navbar';

  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar
    },
    data() {
      return {
        visible: true
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      }
    }

  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  /*头部css样式配置*/
  .header {
    &.szh-navbar {
      background-color: transparent;
      transition: background-color 0.5s;
      /*background-color: $header-bgc-translucent;*/
    }

    &.header-transtion {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
    &.header-fade-enter-active {
      transition: opacity 0.4s ;
    }

    &.header-fade-leave-active {
      transition: opacity 0.4s ;
    }

    &.header-fade-enter, &.header-fade-leave-to {
      opacity: 0 ;
    }
  }
</style>
