import { message } from 'antd';
import axios from 'axios'
import { hasToken, getToken, removeToken } from './storage';
import history from 'utils/history'

// 使用自定义配置创建axios的实例 //文档：https://axios-http.com/zh/docs/instance
const instance = axios.create({
  // 基础路径
  baseURL: 'http://geek.itheima.net/v1_0/',
  // 超时时间
  timeout: 5000,
})

//配置拦截器 //下面这段大部分摘抄自https://axios-http.com/zh/docs/interceptors
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
  // 在发送请求之前做些什么
    if (hasToken()) { //如果已登录
      config.headers.Authorization = `Bearer ${getToken()}` //就要添加请求头Authorization，值为token值并且前面要拼接上字符串Bearer(原因请见文档http://geek.itheima.net/api-pc.html#u83b7u53d6u7528u6237u4e2au4ebau8d44u65990a3ca20id3du83b7u53d6u7528u6237u4e2au4ebau8d44u65993e203ca3e)
    }
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
    if (error.response.status === 401) {//如果浏览过程中，token过期了 
      removeToken() //删除token
      message.warn('登录信息过期了', 1) //信息提示
      //window.location.href = '/login' //缺陷：虽然能实现页面跳转，但会导致页面刷新，失去之前缓存的数据
      history.push('/login') //跳转到登录页
    }
    return Promise.reject(error);
  });

export default instance //将配置好的axios实例导出
