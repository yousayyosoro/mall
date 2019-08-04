<template>
  <div class="slider-wrapper">
    <szh-loading v-if="!sliders.length"></szh-loading>
    <szh-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <swiper-slide
        v-for="(item, index) in sliders"
        :key="index"
      >
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="" class="slider-link">
        </a>
      </swiper-slide>
    </szh-slider>
  </div>
</template>

<script>
  import SzhSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config';
  import {getHomeSlider} from 'api/home';
  import SzhLoading from 'base/loading';

  export default {
    name: 'HomeSlider',
    components: {
      SzhSlider,
      swiperSlide,
      SzhLoading
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: [
          // {
          //   'linkUrl': 'https://www.imooc.com',
          //   'picUrl': require('./1.jpg')
          // },
          // {
          //   'linkUrl': 'https://www.imooc.com',
          //   'picUrl': require('./2.jpg')
          // },
          // {
          //   'linkUrl': 'https://www.imooc.com',
          //   'picUrl': require('./3.jpg')
          // },
          // {
          //   'linkUrl': 'https://www.imooc.com',
          //   'picUrl': require('./4.jpg')
          // }
        ]
      };
    },
    created() {
      this.getSlider();
    },
    methods: {
      update() {
        return this.getSlider();
      },
      getSlider() {
        return getHomeSlider().then(data => {
          this.sliders = data;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slider-wrapper {
    height: 183px;
  }

  .slider-link {
    display: block;
  }

  .slider-link {
    width: 100%;
    height: 100%;
  }
</style>
