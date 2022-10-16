import React, { Component } from 'react'
import { Button, DatePicker } from 'antd'
export default class Login extends Component {
  render() {
    return (
      <div>
        登录组件 <Button type="primary">我是一个按钮</Button> <DatePicker />
      </div>
    )
  }
}
