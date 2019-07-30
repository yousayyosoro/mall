<template>
  <szh-slider>
    <swiper-slide
      v-for="(item, index) in sliders"
      :key="index"
    >
      <a :href="item.linkUrl">
        <img :src="item.picUrl" alt="">
      </a>
    </swiper-slide>
  </szh-slider>
</template>

<script>
  import SzhSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';

  export default {
    name: 'HomeSlider',
    components: {
      SzhSlider,
      swiperSlide
    },
    data() {
      return {
        sliders: [
          {
            'linkUrl': 'https://www.imooc.com',
            'picUrl': require('./1.jpg')
          },
          {
            'linkUrl': 'https://www.imooc.com',
            'picUrl': require('./2.jpg')
          },
          {
            'linkUrl': 'https://www.imooc.com',
            'picUrl': require('./3.jpg')
          },
          {
            'linkUrl': 'https://www.imooc.com',
            'picUrl': require('./4.jpg')
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
