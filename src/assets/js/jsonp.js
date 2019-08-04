import jsonp from 'jsonp';
// 解析获取的jsonp参数
const parseParam = param => {
  let params = [];
  for (const key in param) {
    params.push([key, param[key]]);
  }
  return params.map(value => value.join('=')).join('&');
};
// 回调一个拼接好url,data,option的promise
export default (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);

  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
