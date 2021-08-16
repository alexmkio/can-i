import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/App';
import { HashRouter } from 'react-router-dom';

const router = <HashRouter> <App /> </HashRouter>;

ReactDOM.render(router, document.getElementById('root'));