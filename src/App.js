import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'
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
