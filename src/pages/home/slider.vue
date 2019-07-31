<template>
  <div class="slider-wrapper">
    <szh-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-if="sliders.length"
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

  export default {
    name: 'HomeSlider',
    components: {
      SzhSlider,
      swiperSlide
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
      getSlider() {
        getHomeSlider().then(data => {
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
