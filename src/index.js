import './css/index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

// background color for whole site here 
document.body.style = 'height: 600px; background-image: url(images/bp-wallpaper.gif); background-size: 1673px 874px; background-position: 40% 5%';
ReactDOM.render(<App/>,document.getElementById('root'));