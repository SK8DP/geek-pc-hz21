import axios from 'axios'

// 使用自定义配置创建axios的实例 //文档：https://axios-http.com/zh/docs/instance
const instance = axios.create({
  // 基础路径
  baseURL: 'http://geek.itheima.net/v1_0/',
  // 超时时间
  timeout: 5000,
})

//配置拦截器 //下面这段大部分摘抄自https://axios-http.com/zh/docs/interceptors
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
},
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data //这里改动了一下，我们这里让它只把axios响应回来的对象的data字段的值返回，这样返回值就更简洁，省去返回了一堆axios默认添加的没用的字段
},
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance //将配置好的axios实例导出
