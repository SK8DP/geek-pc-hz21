import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
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

