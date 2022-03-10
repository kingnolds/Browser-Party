import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import API from "./utils/api"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Play from "./pages/Play";
import Login from "./pages/Login";
import Whack from './pages/WhackAMole';

import Navbar from "./components/Navbar";
import Register from './pages/Register';
const socket = io("http://localhost:4000");

function App() {

  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  const [loginInfo, setLoginInfo] = useState({
    email:"",
    password:""
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getTokenData(token)
        .then(data => {
          console.log(data);
          setUserId(data.id);
          setUserEmail(data.email);
          setToken(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const logMeIn = (e) => {
    e.preventDefault()
    API.login(loginInfo.email,loginInfo.password)
      .then(data => {
        console.log(data);
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }).catch(err=>{
        console.log(err);
      });
  };

  const logMeOut = ()=>{
    localStorage.removeItem("token");
    setUserId(0);
    setUserEmail("");
    setToken("");
  }

  const handleInputChange = e=>{
    console.log(e.target.name,e.target.value)
    setLoginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    })
  }

  return (
    <>
      <Router>
        <Navbar logMeOut={logMeOut} logMeIn={logMeIn} userEmail={userEmail} loginInfo={loginInfo} handleInputChange={handleInputChange}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/play" element={<Play/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/game/:roomId" element={<Whack/>}/>
        </Routes>
        </Router>
    </>
  );
};

export default App;