<template>
  <div class="szh-navbar">
    <div class="szh-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="szh-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="szh-navbar-right"><!--v-if="$slots.right"-->
      <slot name="right"></slot>
    </div>
    <h1 class="szh-navbar-title" v-if="title" >
      <span class="szh-navbar-text" v-text="title"></span>
    </h1>
  </div>
</template>
// 基础导航组件配置
<script>

  export default {

    name: 'MeNavbar',
    props: {
      title: {
        type: String,
        default: ''
      }
    }

  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .szh-navbar {
    @include flex-bettwen();
    height: 50px;
    background-color: #fff;

    &-left {
      margin-left: 10px;
    }

    &-center {
      flex: 1;
      margin: 0 10px;
    }

    &-right {
      margin-right: 10px;
    }
    &-title{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
      @include flex-center();
      text-align: center;
    }
    &-text{
      @include ellipsis();
      width: 100%;
      font-size: 18px;
      line-height: 1.5;

    }
  }
</style>
