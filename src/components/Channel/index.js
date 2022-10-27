//此组件表示频道列表功能
import React, { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'
const { Option } = Select

export default class Channel extends Component {
  state = {
    channels: [], //频道列表数据
  }
  componentDidMount() {
    this.getChnnelList()
  }
  async getChnnelList() { //获取所有的频道列表数据
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }
  render() {
    return (
      <Select
        style={{ width: 200 }}
        placeholder="请选择文章频道"
        value={this.props.value} //通过props能接收到Form组件传来的value和onChange，进而实现当前这个组件的双向绑定，即：可控。详见2-9-09和https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
        onChange={this.props.onChange} //通过props能接收到Form.Item组件传来的value和onChange，进而实现当前这个组件的双向绑定，即：可控。详见2-9-09和https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
      >
        {
          this.state.channels.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))
        }
      </Select>
    )
  }
}
