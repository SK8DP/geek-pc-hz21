import request from 'utils/request'
//当前组件用于将用户相关的网络请求封装成接口以实现逻辑复用

/**
 * 登录请求，用于用户登录
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({ //文档：https://axios-http.com/zh/docs/api_intro
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}
