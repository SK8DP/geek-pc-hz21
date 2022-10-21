import React, { Component } from 'react'
//这里是使用了css modules，css modules会自动对样式文件中的所有选择器重命名
import styles from './index.module.scss' //css modules相关知识点
import { Layout, Menu, message, Popconfirm } from 'antd';
import { LogoutOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons';
import { Link, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import ArticleList from 'pages/ArticleList'; //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import ArticlePublish from 'pages/ArticlePublish'; //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import { removeToken } from 'utils/storage';
import { getUserProfile } from 'api/user';

const { Header, Content, Sider } = Layout;
// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });
export default class LayoutComponent extends Component {
  state = {
    profile: {},
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
            <div className='profile'>
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              {/* <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={items2}
              /> */}
              <Menu
                mode="inline"
                defaultSelectedKeys={[this.props.location.pathname]} //实现了刷新之后仍然是当前项高亮
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}><Link to="/home">数据概览</Link></Menu.Item>
                <Menu.Item key="/home/list" icon={<DiffOutlined />}><Link to="/home/list">内容管理</Link></Menu.Item>
                <Menu.Item key="/home/publish" icon={<EditOutlined />}><Link to="/home/publish">发布文章</Link></Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px', overflow: 'auto' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route> {/*路径和当前整个大组件的路径一样，都是/home，这样就实现了一进来就默认停到Home组件*/} {/*加了exact就是精确匹配，这样当后续匹配到/home/......的路径时，也不会被当前的这个/home截胡*/}
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route path="/home/publish" component={ArticlePublish}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  async componentDidMount() {
    const res = await getUserProfile()//发请求，获取用户个人资料
    this.setState({
      profile: res.data,
    })
  }

  onConfirm = () => { //退出系统
    //localStorage.removeItem('token') //移除token
    removeToken() //移除token
    this.props.history.push('/login') //跳转到登录页
    message.success('退出成功') 
  }
}
