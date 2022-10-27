import React, { Component } from 'react'
//这里是使用了css modules，css modules会自动对样式文件中的所有选择器重命名
import styles from './index.module.scss' //css modules相关知识点
import { Layout, Menu, message, Popconfirm } from 'antd';
import { LogoutOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons';
import { Link, Route, Switch } from 'react-router-dom';
import { removeToken } from 'utils/storage';
import { getUserProfile } from 'api/user';
//import Home from 'pages/Home' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
//import ArticleList from 'pages/ArticleList'; //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
//import ArticlePublish from 'pages/ArticlePublish'; //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
const Home = React.lazy(() => import('pages/Home')) //这里改进了组件的导入方式，使用了懒加载的方式加载Home组件，这样打包之后再运行项目的时候可以实现按需加载，而不是在加载首屏的时候就把所有组件全加载出来，进而提升首屏的加载速度。详见2-11-8以及文档https://zh-hans.reactjs.org/docs/code-splitting.html
const ArticleList = React.lazy(() => import('pages/ArticleList')) //这里改进了组件的导入方式，使用了懒加载的方式加载ArticleList组件，这样打包之后再运行项目的时候可以实现按需加载，而不是在加载首屏的时候就把所有组件全加载出来，进而提升首屏的加载速度。详见2-11-8以及文档https://zh-hans.reactjs.org/docs/code-splitting.html
const ArticlePublish = React.lazy(() => import('pages/ArticlePublish')) //这里改进了组件的导入方式，使用了懒加载的方式加载ArticlePublish组件，这样打包之后再运行项目的时候可以实现按需加载，而不是在加载首屏的时候就把所有组件全加载出来，进而提升首屏的加载速度。详见2-11-8以及文档https://zh-hans.reactjs.org/docs/code-splitting.html

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
    selectedKey: this.props.location.pathname //用于记录当前的url，进而让侧边栏的高亮能实时跟进，详见2-10-7
  }
  render() {
    const items = [ //侧边栏里的数据 //这段是老子自己写的，这是老子根据ant-design文档写出的最新主流写法，黑马视频里不是这么写的，视频里的那种写法已被ant-design文档标记为过时且会在控制台警告已过时。详见文档https://ant.design/components/menu-cn/
      { label: <Link to="/home">数据概览</Link>, key: '/home', icon: <HomeOutlined /> },
      { label: <Link to="/home/list">内容管理</Link>, key: '/home/list', icon: <DiffOutlined /> },
      { label: <Link to="/home/publish">发布文章</Link>, key: '/home/publish', icon: <EditOutlined /> },
    ]
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
                selectedKeys={[this.state.selectedKey]} //实现了刷新之后仍然是当前项高亮 //如果默认高亮不会变，就使用defaultSelectedKeys；如果默认高亮会变化，就得使用selectedKeys。详见2-10-7以及ant-design的Menu组件的文档
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={items} ////这行是老子自己写的，这是老子根据ant-design文档写出的最新主流写法，黑马视频里不是这么写的，视频里的那种写法已被ant-design文档标记为过时且会在控制台警告已过时。详见文档https://ant.design/components/menu-cn/
              />
            </Sider>
            <Layout style={{ padding: '24px', overflow: 'auto' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route> {/*路径和当前整个大组件的路径一样，都是/home，这样就实现了一进来就默认停到Home组件*/} {/*加了exact就是精确匹配，这样当后续匹配到/home/......的路径时，也不会被当前的这个/home截胡*/}
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route exact path="/home/publish" component={ArticlePublish} key='add'></Route> {/*此路由对应发布新文章*/}
                  <Route path="/home/publish/:id" component={ArticlePublish} key='edit'></Route> {/*此路由对应修改文章，注意：易发现，此路由和上方的“发布新文章”路由渲染的是同一个组件，路径长得也像，因为这俩功能的页面长得一模一样，没必要专门再写一个，所以就共用同一个组件了，而且此路由在路径里将文章id作为了可变参数，而上方的“发布新文章”路由的路径里则没有这项可变参数，所以通过文章id这个可变参数就可以轻易区分究竟是“发布新文章”的路由还是“修改文章”的路由了。而且在“发布新文章”的路由里也加了exact，这样即使这俩路由的路径长得像，也能根据格式精准匹配了。而且注意，这里给这俩加了不同的key，这样即使是在这俩路由间直接切换，也能正常实现组件的销毁和创建，否则就会出现bug，详见2-10-02和2-10-NO5*/}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  //当路由变化了之后，即使不刷新页面，组件也会更新，当更新完之后就会触发componentDidUpdate()这个钩子函数 //背景问题描述 ： 因为当前组件里定义的这几个路由渲染的组件都是被包在Layout组件里作为子组件的，它们并没有被写到App.js里的总路由中，那么当以不刷新页面的方式在这几个子组件路由间切换时，那都是子组件间的小打小闹，都无法导致父组件(即:Layout组件)的重新加载，进而也就无法通过componentDidMount()拿到组件切换之后的新路径pathname，拿不到新路径pathname，侧边栏的高亮进而也无法跟进。但是，当子组件路由在不刷新页面的前提下发生变化之后，虽然父组件不会重新加载，但是父组件会触发更新，那么当更新结束之后就能触发componentDidUpdate()，所以进而就能通过componentDidUpdate()设法捕获到变化后的路径，进而让侧边栏的高亮实时跟进。这部分不好讲，详见2-10-7以及react文档
  componentDidUpdate(prevProps) { //用于拿到当前路径pathname //prevProps是上一次的props，详见2-10-7以及react文档 
    let pathname = this.props.location.pathname //当前的路径pathname
    if (this.props.location.pathname !== prevProps.location.pathname) { //如果当前的路径pathname发生过变化(即:是从其他页面切换过来的)才进入循环，否则不进入。 注意：这个条件判断至关重要，否则会陷入“数据变化->重新渲染->数据变化->重新渲染......”的死循环。
      if (pathname.startsWith('/home/publish')) { //由当前组件里定义的路由可知，如果是编辑文章，那么url里就有id，如果是发布新文章，那么url里就没有id。由于当编辑文章时，pathname是/home/publish/:id，侧边栏里的按钮们没有与之匹配的路由，此时要将pathname里的可变参数去掉，让它只剩个/home/publish，这样就能匹配到侧边栏里“发布文章”的那个路由了，进而后续就能设法实现当编辑文章时，侧边栏里的“发布文章”项高亮
        pathname = '/home/publish'
      }
      this.setState({
        selectedKey: pathname, //将变化了的pathname(即:当前的pathname)记录下来
      })
    }
  }//注意：这里的这个需求除了使用componentDidUpdate()以外，其实还有更简便的方法，那就是在render()里解决，因为在执行componentDidUpdate()之前一定会执行render()。详见2-11-8

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
