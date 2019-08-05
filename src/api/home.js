// 导入axios插件\jsonp解析参数文件\config文件
import axios from 'axios';
import {SUCCEED_CODE, SETTIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions} from 'api/config';
import jsonp from '../assets/js/jsonp';
// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let randomIndex;
  while (i--) { // 检查数组交换
    if (i !== (randomIndex = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
  }
  return arr;
};
// 获取轮播图片数据
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {timeout: SETTIMEOUT}).then(res => {
    if (res.data.code === SUCCEED_CODE) {
      let randomSliders = res.data.slider;
      // console.log(typeof (randomSliders)); //  =>是个对象,长度为10
      const oneSlider = shuffle([randomSliders[Math.floor(Math.random() * randomSliders.length)]]);
      randomSliders = randomSliders.filter(() => Math.random() >= 0.5); // 随机取
      if (randomSliders.length === 0) {
        randomSliders = oneSlider;
      }
      // 此处已经获得服务端数据,返回res.data下的slider
      // return res.data.slider;
      console.log(randomSliders);
      return randomSliders;
    }
    throw new Error('数据错误');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
    return [
      {
        linkUrl: 'https://www.imooc.com',
        picUrl: require('assets/img/404.png')
      }
    ];
  }).then(data => {
    return new Promise(resolve => {
      setTimeout(() => { // 测试用延迟方法
        resolve(data);
      }, 1000);
    });
  });
};
// 通过jsonp获取热卖数据
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };

  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res;
    }
  });
};
