import { Router, Route, Switch, Redirect } from 'react-router-dom' //注意：这里导入的既不是BrowserRouter也不是HashRouter，而是直接导入了更底层的Router，详见2-6-12以及https://v5.reactrouter.com/web/api/Router
import React, { Suspense } from 'react'
import AuthRoute from 'components/AuthRoute' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import history from 'utils/history' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
//import Layout from 'pages/Layout' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component  //注意：原版视频中，这里导入之后本来是重命名成了Home，但我觉得这个名字太傻逼太有误导性了，所以就改成了Layout
//import Login from 'pages/Login' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
const Login = React.lazy(() => import('pages/Login')) //这里改进了组件导入方式，使用了懒加载的方式加载Login组件，这样打包之后再运行项目的时候可以实现按需加载，而不是在加载首屏的时候就把所有组件全加载出来，进而提升首屏的加载速度。详见2-11-8以及文档https://zh-hans.reactjs.org/docs/code-splitting.html
const Layout = React.lazy(() => import('pages/Layout')) //这里改进了组件导入方式，使用了懒加载的方式加载Layout组件，这样打包之后再运行项目的时候可以实现按需加载，而不是在加载首屏的时候就把所有组件全加载出来，进而提升首屏的加载速度。详见2-11-8以及文档https://zh-hans.reactjs.org/docs/code-splitting.html

function App() {
  return (
    <Router history={history}> {/*背景知识：<HashRouter>就等价于<Router history={createHashHistory()}>，<BrowserRouter>就等价于<Router history={createBrowserHistory()}>。<Router>相当于是更底层的实现方式，使用<Router>虽然需要手动传history比较麻烦，但是好处是通过使用<Router>才有机会手动拿到history，这样进而才可以在非组件中拿到history对象，进而在非组件中也能实现页面跳转，这也是这么折腾一圈的主要目的。而<HashRouter>和<BrowserRouter>虽然被官方封装得使用起来很简便，但是却把history封装到里面了，这样也就无法单独拿到history对象了，也就无法实现在非组件中的页面跳转了。详见2-6-12、2-6-13*/}
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/*配置路由规则*/}
        <Suspense fallback={<div>loading...</div>}>{/*因为本项目在导入组件的时候使用了懒加载，所以必须把通过懒加载导入的组件用Suspense包一下，其中，fallback表示“兜底”，在通过懒加载技术按需加载组件的时候，在加载成功之前，就会暂时先显示你在fallback里指定的内容。详见2-11-8和文档https://zh-hans.reactjs.org/docs/code-splitting.html*/}
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect> {/*这样项目启动完一进来就默认前往/home*/}{/*千万注意，这行必须写到Switch里，即:必须被Switch包着，否则就要错乱。详见2-8-03以及https://v5.reactrouter.com/web/api/Redirect/from-string*/}
            <AuthRoute path="/home" component={Layout}></AuthRoute>
            <Route path="/login" component={Login}></Route>
            {/* <Route
            path="/login"
            render={(props) => { //关于Route的render函数的用法请见2-4-19以及https://v5.reactrouter.com/web/api/Route/render-func
              return <Login {...props} />
            }}
          ></Route> */}
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App;
