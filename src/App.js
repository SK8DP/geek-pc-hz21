import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from 'pages/Layout' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import Login from 'pages/Login' //因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
