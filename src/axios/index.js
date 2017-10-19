import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui';

//表示发出请求后超过[5]秒没有相应 视为请求超时
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://182.254.146.100:8899';
// axios.defaults.baseURL = 'http://182.254.146.100:8899';

//POST传参序列化

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  Toast("错误的传参");
  return Promise.reject(error);
});

//code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.status != '200') {
    Toast('请求失败');
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  Toast("网络异常");
  return Promise.reject(error);
});
export default axios;
