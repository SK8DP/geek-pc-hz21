import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Radio, Button, DatePicker, Table, Tag, Space, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { delArticle, getArticles } from 'api/article'
import defaultImg from 'assets/defaultImage.png'
import Channel from 'components/Channel'

export default class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      render(data) { //通过render来自定义该列的渲染逻辑
        if (data.cover.type === 0) {
          //说明此条数据里没有图片
          return (
            <img
              src={defaultImg} //那就渲染默认图片
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        }
        //如果能运行至此，说明此条数据里有图片
        return (
          <img
            src={data.cover.images[0]}
            alt=""
            style={{ width: 200, height: 120, objectFit: 'cover' }}
          />
        )
      }
    },
    {
      title: '标题',
      dataIndex: 'title',//dataIndex字段的值的作用是Table组件到时候就会去dataSource里查找该值对应的字段的属性值作为此列的值
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(status) {
        const obj = ArticleStatus.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => { //注意：这里的render必须是箭头函数，否则里面的this会出问题，详见2-8-05
        return (
          <Space>
            <Button
              type="primary"
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => this.handleEdit(data.id)}
            />
            <Button
              type='primary'
              danger
              shape='circle'
              icon={<DeleteOutlined />}
              onClick={() => this.handleDelete(data.id)}
            />
          </Space>
        )
      }
    },

  ]
  // reqParams用于存放查询文章列表的所有的参数。详见接口文档：http://geek.itheima.net/api-pc.html#u83b7u53d6u6587u7ae0u5217u88680a3ca20id3du83b7u53d6u6587u7ae0u5217u88683e203ca3e
  reqParams = {
    page: 1, //这个数字是几，后端就会给你返回第几页对应的那per_page数据
    per_page: 10, //这个数字是几，后端就会给你返回几条数据
  }
  state = {
    articles: {},
  }
  render() {
    const { total_count, results, per_page, page } = this.state.articles
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          }
        > {/*负责筛选信息的表单部分*/}
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="频道" name="channel_id">
              <Channel></Channel>
            </Form.Item>

            <Form.Item label="日期" name="date">
              <DatePicker.RangePicker />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`根据筛选条件共查询到${total_count}条结果：`}> {/*文章展示部分*/}
          <Table
            columns={this.columns}
            dataSource={results}
            rowKey="id"
            pagination={{
              position: ['bottomCenter'],
              total: total_count, //总数据量
              pageSize: per_page, //每页显示的条数
              current: page, //默认显示第几页
              onChange: this.onChange
            }}
          />
        </Card>
      </div>
    )
  }

  //修改文章
  handleEdit = (id) => {
    this.props.history.push(`/home/publish/${id}`) //跳转页面并把文章id也放到url里作为可变参数，然后Layout组件里的路由会处理之
  }

  handleDelete = (id) => {
    //console.log('删除', id)
    //弹窗显示
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '你丫确定要删除这篇文章？',
      onOk: async () => {
        // 发送请求，删除文章
        await delArticle(id)
        this.getArticleList() //重新请求本页最新的文章数据进而重新渲染页面
        message.success('删除成功')
      },
    })
  }

  onChange = (page, pageSize) => { //当在页面中改变了当前页码或改变了每页显示条数，就会触发此函数
    //console.log(this.state.articles);
    this.reqParams.page = page //记录新的页码数
    this.reqParams.per_page = pageSize //记录新的每页显示条数
    this.getArticleList() //重新发请求，用新获取的页码数和每页显示条数来请求获取文章数据
  }

  async componentDidMount() {
    this.getArticleList()
  }

  async getArticleList() { //获取文章数据
    const res = await getArticles(this.reqParams)
    //console.log('fuck', res);
    this.setState({
      articles: res.data
    })
  }

  onFinish = ({ status, channel_id, date }) => {//当提交了本页面里的那个用于筛选的表单之后就会触发此函数 //参数就是表单提交的数据，我们这里是将数据里的每一项单独解构出来了
    //console.log(this.reqParams)
    if (status !== -1) {
      this.reqParams.status = status //将状态信息记录进查询参数中
    } else { //这里是涉及到了一些接口文档里的业务逻辑，懒得解释了，无需深究
      delete this.reqParams.status
    }
    if (channel_id !== undefined) {
      this.reqParams.channel_id = channel_id //将频道信息记录进查询参数中
    } else { //这里是涉及到了一些接口文档里的业务逻辑，懒得解释了，无需深究
      delete this.reqParams.channel_id
    }
    if (date) {
      this.reqParams.begin_pubdate = date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss') //将起始日期信息记录进查询参数中
      this.reqParams.end_pubdate = date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss') //将终止日期信息记录进查询参数中
    } else { //这里是涉及到了一些接口文档里的业务逻辑，懒得解释了，无需深究
      delete this.reqParams.begin_pubdate
      delete this.reqParams.end_pubdate
    }

    this.reqParams.page = 1 //将当前页码重新置为1  //这很好理解，你重新筛选了信息之后，当然是要默认从筛选结果第一页的数据开始展示了
    this.getArticleList() //重新发起请求
  }
}
