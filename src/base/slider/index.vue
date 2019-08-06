<template>
  <!--  幻灯片组件-->
  <swiper :options="swiperOption" :key="keyId">
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>
<!--配置基础的轮播组件-->
<script>
  // 导入vue-awesome-swiper插件
  import {swiper} from 'vue-awesome-swiper';
  // 配置基础swiper参数
  export default {
    name: 'SzhSlider',
    components: {
      swiper
    },
    props: {
      direction: {
        type: String,
        default: 'horizontal', // 默认水平滚动方向
        validator(value) {
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1;
        }
      },
      interval: {
        type: Number,
        default: 3000, // 默认自动滚动间距
        validator(value) {
          return value >= 0;
        }
      },
      loop: {
        type: Boolean,
        default: true // 默认自动循环滚动
      },
      pagination: {
        type: Boolean,
        default: true // 默认开启分页器
      },
      data: { // 获取到的data对象数组
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        keyId: Math.random()
      };
    },
    watch: {
      data(newData) {
        if (newData.length === 0) {
          return;
        }
        this.keyId = Math.random();
        this.loop = this.swiperOption.loop === 1 ? false : this.loop;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.swiperOption = {
          watchOverflow: true,
          direction: this.direction,
          autoplay: this.interval ? {
            delay: this.interval,
            disableOnInteraction: false
          } : false,
          slidesPerView: 1,
          loop: this.data.length === 1 ? false : this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
