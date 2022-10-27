import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css'; //这里的min必不可少，否则打包的时候会报错。详见https://blog.51cto.com/xiaowangkkk/5375676
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd'
//导入中文包
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

ReactDOM.render(
  <ConfigProvider locale={locale}> {/*全局国际化*/}
    <App />
  </ConfigProvider>,
  document.getElementById('root'));

