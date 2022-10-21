// 此组件用于封装所有的localStorage相关的操作
const TOKEN_KEY = 'token-geek-pc-hz21' //由于在当前这个组件中已经把所有的token相关操作都封装到一起了，所以这里的TOKEN_KEY在需要变更时就只在这里变更一次即可，而且key想弄多复杂都可以，随心所欲，想改就改

/**
 * 保存token
 * @param {*} token 
 * @returns 
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * 获取token
 * @returns token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * 移除token
 * @returns 
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * 判断是否有token
 * @returns 
 */
export const hasToken = () => !!getToken()
