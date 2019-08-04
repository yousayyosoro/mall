<template>
  <div class="szh-loading" :class="{'szh-loading-inline': inline}">
    <span class="szh-loading-indicator" v-if="indicator==='on'">
      <slot><img src="./loading.gif" alt="loading"></slot>
    </span>
    <span class="szh-loading-text" v-if="loadingText">{{loadingText}}</span>
  </div>
</template>
// 加载中的基础组件参数配置
<script>
  export default {
    name: 'SzhLoading',
    props: {
      indicator: {
        type: String,
        default: 'on',
        validator(value) {
          return ['on', 'off'].indexOf(value) > -1;
        }
      },
      text: {
        type: String,
        default: '加载中...' // 加载显示的文字
      },
      inline: {
        type: Boolean,
        default: false // 是否水平排列
      }
    },
    methods: {
      // 获取下拉时改变的文字
      setText(text) {
        this.loadingText = text;
        // console.log(this.loadingText);
      }
    },
    data() {
      return {
        loadingText: this.text
      };
    },
    watch: {
      text(text) {
        this.loadingText = text;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  /*loading基本样式配置*/
  .szh-loading {
    overflow: hidden;
    width: 100%;
    height: 100%;
    @include flex-center(column);

    &.szh-loading-inline {
      flex-direction: row;
    }
  }

  .szh-loading-indicator ~ .szh-loading-text {
    /*margin-top: 6px;*/
    margin-left: 6px;
  }
</style>
