import './css/index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

// background color for whole site here 
document.body.style = 'background-image: url(images/bp-wallpaper.gif); background-size: 1440px 874px;';
ReactDOM.render(<App/>,document.getElementById('root'));