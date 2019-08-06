<template>
  <div id="app" class="g-container">
<!--    公共组件-主视图容器-->
    <div class="g-view-container">
      <router-view></router-view>
    </div>
    <!--    公共组件-底部切换导航栏-->
    <div class="g-footer-container">
      <c-tabbar></c-tabbar>
    </div>
  </div>
</template>

<script>
  import CTabbar from 'components/tabbar';
  export default {
    name: 'App',
    components: {
      CTabbar
    }
  };
</script>

<style>

</style>
