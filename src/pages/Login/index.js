import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import styles from './index.module.scss' //css modules相关知识点
import logo from 'assets/glogo.svg' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import { login } from 'api/user'
import { setToken } from 'utils/storage'
export default class Login extends Component {
  state = {
    //加载状态
    loading: false,
  }
  render() {
    return (
      <div className={styles.login}>
        <Card className="login-container">
          <img src={logo} alt="" className='login-logo' /> {/*react里的图片src必须像这样显示导入*/}
          <Form
            size="large"
            validateTrigger={['onChange', 'onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile" //必须加name属性，否则rules校验规则无法生效
              rules={[
                {
                  required: true,
                  message: '手机号不能为空',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                },
              ]}
            >
              <Input placeholder="请输入你的手机号" autoComplete='off' />
            </Form.Item>

            <Form.Item name="code" rules={[
              {
                required: true,
                message: '验证码不能为空'
              },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误'
              },
            ]}>
              <Input placeholder="请输入验证码" autoComplete='off'></Input>
            </Form.Item>

            <Form.Item
              valuePropName='checked'
              name="agree"
              rules={[
                {
                  //自定义校验规则
                  validator: (rule, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('请阅读并同意用户协议'))
                },
              ]}
            >
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={this.state.loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = async ({ mobile, code }) => {
    this.setState({
      loading: true //让登录按钮进入加载状态
    })
    try {
      const res = await login(mobile, code)
      //登录成功之后保存token、跳转页面
      message.success('登录成功', 1, () => {
        //localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        //this.props.history.push('/home') //跳转到首页
        const { state } = this.props.location //关于state的起源请见AuthRoute文件夹下的index.js
        if (state) { //如果state存在
          this.props.history.push(state.from) //就跳转到state.from里的地址(即:跳转到登录前的页面)
        } else {
          this.props.history.push('/home') //否则就跳转到首页
        }
      })
    } catch (error) {
      message.warning(error.response.data.message, 1, () => {
        this.setState({
          loading: false //让登录按钮退出加载状态
        })
      })

    }
  }
}
