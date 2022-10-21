//当前组件用于封装和文章相关的接口
import request from 'utils/request'


export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'get',
    params,
  })
}
