//此组件用于封装和频道相关的接口
import request from 'utils/request'

/**
 * 获取频道数据
 * @returns 
 */
export function getChannels() {
  return request.get('/channels')
}
