//当前组件用于封装和文章相关的请求的接口
import request from 'utils/request'

/**
 * 获取文章列表数据
 */
export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'get',
    params,
  })
}

/**
 * 删除文章接口
 * @param {*} id 
 * @returns 
 */
export const delArticle = (id) => {
  return request.delete(`/mp/articles/${id}`)
}

/**
 * 添加文章
 * @param {*} data 
 * @returns 
 */
export const addArticle = (data, draft = false) => { //draft表示是否存为草稿，详见接口文档http://geek.itheima.net/api-pc.html#u53d1u8868u6587u7ae00a3ca20id3du53d1u8868u6587u7ae03e203ca3e
  return request({
    url: `/mp/articles?draft=${draft}`,
    method: 'post',
    data,
  })
}

/**
 * 获取文章详情信息
 * @param {*} id 
 * @returns 
 */
export const getArticleById = (id) => {
  return request.get(`/mp/articles/${id}`) //详见接口文档http://geek.itheima.net/api-pc.html#u83b7u53d6u6587u7ae0u8be6u60c50a3ca20id3du83b7u53d6u6587u7ae0u8be6u60c53e203ca3e
}

/**
 * 此接口用于修改文章
 * @param {*} data 
 * @param {*} draft 
 * @returns 
 */
export const updateArticle = (data, draft) => { //draft表示是否存为草稿，详见接口文档http://geek.itheima.net/api-pc.html#u7f16u8f91u6587u7ae00a3ca20id3du7f16u8f91u6587u7ae03e203ca3e
  return request({
    url: `/mp/articles/${data.id}?draft=${draft}`,
    method: 'PUT',
    data,
  })
}
