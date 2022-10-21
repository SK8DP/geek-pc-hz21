//当前组件用于获取并对外提供react路由里的history对象
import { createBrowserHistory } from 'history' //导入Router的时候就会依赖到这个history包，详见2-6-12以及https://v5.reactrouter.com/web/api/Router

const history = createBrowserHistory() //背景知识：<HashRouter>就等价于<Router history={createHashHistory()}>，<BrowserRouter>就等价于<Router history={createBrowserHistory()}>。<Router>相当于是更底层的实现方式，使用<Router>虽然需要手动传history比较麻烦，但是好处是通过使用<Router>才有机会手动拿到history，这样进而才可以在非组件中拿到history对象，进而在非组件中也能实现页面跳转，这也是这么折腾一圈的主要目的。而<HashRouter>和<BrowserRouter>虽然被官方封装得使用起来很简便，但是却把history封装到里面了，这样也就无法单独拿到history对象了，也就无法实现在非组件中的页面跳转了。详见2-6-12
export default history
