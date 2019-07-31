import axios from 'axios';

// 获取轮播图片数据
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider').then(res => {
    if (res.data.code === 0) {
      return res.data.slider;
    };
  });
};
