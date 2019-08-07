<template>
  <transition name="szh-backtop-transition">
    <a href="javascript:;"
       class="szh-backtop"
       v-show="visible"
       @click="backToTop"
    ><i class="iconfont icon-backtop"></i></a>
  </transition>

</template>

<script>
  export default {
    name: 'SzhBacktop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backToTop() {
        this.$emit('backtop');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
/*返回顶部按钮样式配置*/
  .szh-backtop {
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    /*border: none;*/
    border-radius: 50%;
  }
  .iconfont {
    color: #fff;
    font-size: 38px;
  }
  /*过度动画参数配置*/
  .szh-backtop-transition {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
