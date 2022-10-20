import { Router, Route, Link, Switch } from 'react-router-dom' //注意：这里导入的既不是BrowserRouter也不是HashRouter，而是直接导入了更底层的Router，详见2-6-12以及https://v5.reactrouter.com/web/api/Router
import AuthRoute from 'components/AuthRoute' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import Home from 'pages/Layout' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import Login from 'pages/Login' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import history from 'utils/history'

function App() {
  return (
    <Router history={history}> {/*背景知识：<HashRouter>就等价于<Router history={createHashHistory()}>，<BrowserRouter>就等价于<Router history={createBrowserHistory()}>。<Router>相当于是更底层的实现方式，使用<Router>虽然需要手动传history比较麻烦，但是好处是通过使用<Router>才有机会手动拿到history，这样进而才可以在非组件中拿到history对象，进而在非组件中也能实现页面跳转，这也是这么折腾一圈的主要目的。而<HashRouter>和<BrowserRouter>虽然被官方封装得使用起来很简便，但是却把history封装到里面了，这样也就无法单独拿到history对象了，也就无法实现在非组件中的页面跳转了。详见2-6-12*/}
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        <Switch>
          <AuthRoute path="/home" component={Home}></AuthRoute>
          <Route path="/login" component={Login}></Route>
          {/* <Route
            path="/login"
            render={(props) => { //关于Route的render函数的用法请见2-4-19以及https://v5.reactrouter.com/web/api/Route/render-func
              return <Login {...props} />
            }}
          ></Route> */}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
