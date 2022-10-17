import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input } from 'antd'
import './index.scss'
import logo from 'assets/logo.png' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <Card className="login-container">
          <img src={logo} alt="" className='login-logo' /> {/*react里的图片src必须像这样显示导入*/}
          <Form size="large"
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
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = (values) => {
    console.log(values)
  }
}
