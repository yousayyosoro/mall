<template>
  <!--  滚动条 默认需要配置swiperOption 获取注册信息-->
  <swiper :options="swiperOption" ref="swiper">
    <!--      下拉刷新
参数:text文本 inline 横向显示 获取组件注册信息-->
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <szh-loading :text="pullDownText" inline ref="pullDownLoading"></szh-loading>
    </div>
    <swiper-slide>
      <!--      滚动条内容插槽-->
      <slot></slot>
    </swiper-slide>
    <!--    上拉刷新 参数:text文本 inline 横向显示 获取组件注册信息-->
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <szh-loading :text="pullUpText" inline ref="pullUpLoading"></szh-loading>
    </div>
    <!--    滚动条-->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>
<!-- 基础滚动条配置-->
<script>
  // 导入vue-awesome-swiper插件
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import SzhLoading from 'base/loading';
  import {
    // eslint-disable-next-line no-unused-vars
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    // eslint-disable-next-line no-unused-vars
    PULL_DOWN_TEXT_ING,
    // eslint-disable-next-line no-unused-vars
    PULL_DOWN_TEXT_END,
    // eslint-disable-next-line no-unused-vars
    PULL_UP_HEIGHT,
    // eslint-disable-next-line no-unused-vars
    PULL_UP_TEXT_INIT,
    // eslint-disable-next-line no-unused-vars
    PULL_UP_TEXT_START,
    // eslint-disable-next-line no-unused-vars
    PULL_UP_TEXT_ING,
    // eslint-disable-next-line no-unused-vars
    PULL_UP_TEXT_END
  } from './config';

  export default {
    name: 'SzhScrool',
    components: {
      swiper,
      swiperSlide,
      SzhLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      watchedData: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: true
      },
      pullUp: {
        type: Boolean,
        default: true
      }
    },
    // 滚动和swiperOption相关配置
    data() {
      return {
        swiperEnd: 0,
        pulling: false, // 是否正在拖动
        pullDownText: '再拉,再拉就刷给你看',
        pullUpText: '正在加载',
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          // 用于获取监听scroll滑动参数
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd // 下滑事件监听参数获取
          }
        }
      };
    },
    watch: {
      watchedData() {
        this.update();
      }
    },
    methods: {
      // 调用swiper实例下的update刷新滚动条
      update() {
        this.$refs.swiper && this.$refs.swiper.swiper.update();
      },
      // 获取swiper组件数据下的swiper属性,设置变更文字的条件
      scroll() {
        const swiper = this.$refs.swiper.swiper;
        // console.log(swiper.translate);

        if (this.pulling) {
          return;
        }
        ;
        if (swiper.translate > 0) { // 下拉
          if (!this.pullDown) {
            return;
          }
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
          ;
        } else if (swiper.isEnd) { // 上拉
          if (!this.pullUp) {
            return;
          }
          ;
          // console.log(Math.abs(swiper.translate));
          // console.log(swiper.height);
          // console.log(swiper);
          // console.log(parseInt(swiper.$warpperEl.css('height')));
          // console.log(Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT);
          // console.log(swiper.height);
          // console.log(parseInt(swiper.$wrapperEl.css('height')));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));
          // console.log(isPullUp);
          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
        ;
      },
      scrollEnd() {
      },
      // 获取swiper组件数据下的swiper属性,下拉后回弹前变更文字
      touchEnd() {
        const swiper = this.$refs.swiper.swiper;
        if (this.pulling) {
          return;
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          if (!this.pullDown) {
            return;
          }

          this.pulling = true; // 是否正在拖动
          swiper.allowTouchMove = false; // 是否允许触摸
          swiper.setTransition(swiper.params.speed); // 获取swiper自定义的速度
          swiper.setTranslate(PULL_DOWN_HEIGHT); // 设置下拉高度
          swiper.params.virtualTranslate = true; // 定住不回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING); // 设置下滑后显示的文字
          this.$emit('pull-down', this.pullDownEnd); // 触发父元素pull-down事件
        } else if (swiper.isEnd) {
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

          if (isPullUp) {
            if (!this.pullUp) {
              return;
            }
            this.pulling = true;
            swiper.allowTouchMove = false; // 是否允许触摸
            swiper.setTransition(swiper.params.speed); // 获取swiper自定义的速度
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height)); // 设置下拉高度
            swiper.params.virtualTranslate = true; // 定住不回弹
            this.$refs.pullDownLoading.setText(PULL_UP_TEXT_ING); // 设置下滑后显示的文字
            this.$emit('pull-up', this.pullUpEnd); // 触发父元素pull-down事件
            ;
          }
          ;
        }
        ;
      },
      // 获取swiper组件数据下的swiper属性,下拉后回弹后变更文字
      pullDownEnd() {
        this.pulling = false; // 是否正在拉
        const swiper = this.$refs.swiper.swiper;
        swiper.allowTouchMove = true; // 是否禁止触摸
        swiper.setTransition(swiper.params.speed); // 获取swiper自定义的速度
        swiper.params.virtualTranslate = false; // 定住不回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END); // 触发下滑后显示的文字
        swiper.setTranslate(0); // 回到最低位置
      },
      pullUpEnd() {
        this.pulling = false; // 是否正在拉
        const swiper = this.$refs.swiper.swiper;
        swiper.allowTouchMove = true; // 是否允许触摸
        swiper.setTransition(swiper.params.speed); // 获取swiper自定义的速度
        swiper.params.virtualTranslate = false; // 定住不回弹
        // this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END); // 触发下滑后显示的文字
        // swiper.setTranslate(0);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  /*设置可滚动的高度*/
  .swiper-slide {
    height: auto;
  }

  .mine {
    &-scroll-pull-down {
      position: absolute;
      left: 0;
      bottom: 100%;
      width: 100%;
      height: 80px;
    }

    &-scroll-pull-up {
      position: absolute;
      left: 0;
      top: 100%;
      width: 100%;
      height: 20px;
    }

  }
</style>
