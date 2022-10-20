import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'

export default class AuthRoute extends Component { //此组件用于拦截未登录用户，即:实现"鉴权"功能
  render() {
    const { component: Component, ...rest } = this.props //这个this.props就是调用AuthRoute组件时传来的属性们，比如path属性、component属性等
    return (
      <Route
        {...rest}
        render={(routeProps) => { //这个routeProps和上方的this.props不是同一个东西，这个routeProps是Route组件默认传来的经典老三样属性(即:history,location,match)以及{...rest}传进来的属性 //关于Route的render函数的用法请见2-4-19以及https://v5.reactrouter.com/web/api/Route/render-func
          if (hasToken()) { //如果登录了，就正常渲染页面
            return <Component {...routeProps} />
          } else { //如果未登录，就跳转到登录页面(比如你当前未登录就直接通过地址栏输入链接访问http://localhost:3000/home/publish这种需要登录才能看的页面，就会进入这个分支)
            return <Redirect
              to={{ //用对象表示Route的to属性的具体用法请见2-6-10以及https://v5.reactrouter.com/web/api/Redirect/to-object
                pathname: '/login',
                state: {
                  from: routeProps.location.pathname,//这里就把当前页面的地址放进props里传给Login组件了，这样在Login组件里通过进一步的操作就能实现当你一会儿登录成功后可以直接重返当前这个页面而不是无脑地重返首页
                }
              }}
            ></Redirect>
            //props.history.push('/login')
          }
        }}
      ></Route>
    )
  }
}
