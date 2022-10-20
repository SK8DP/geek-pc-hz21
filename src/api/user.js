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

/**
 * 获取用户信息。详见文档http://geek.itheima.net/api-pc.html#u83b7u53d6u7528u6237u4e2au4ebau8d44u65990a3ca20id3du83b7u53d6u7528u6237u4e2au4ebau8d44u65993e203ca3e
 * @returns
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/user/profile',
  })
}
