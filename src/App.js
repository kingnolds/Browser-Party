import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import API from "./utils/api"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Play from "./pages/Play";
import Login from "./pages/Login";
import Scoreboard from "./components/Scoreboard"
import Whack from './components/games/WhackAMole';
import Manatee from './components/games/MemoryBoard';

import Navbar from "./components/Navbar";
import Register from './pages/Register';
const socket = io("http://localhost:4000");

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  var loggedIn = false;

  // const myTimeout = setTimeout(nextPage, 5000);

  const [loginInfo, setLoginInfo] = useState({
    username:"",
    password:""
  })

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: ""
  })

  // let navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getTokenData(token)
      .then(data => {
          console.log(data);
          setUserId(data.id);
          setUsername(data.username);
          setToken(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const registerSubmit = (e) => {
    e.preventDefault()
    console.log("Register Submit Activated")
    API.createUser(registerInfo.username, registerInfo.password)
    .then((data)=> {
        console.log(data)
        // console.log(data.PromiseResult.username)
        // console.log(data.PromiseResult.password)
        // await delay(5000)
        window.location.replace('/login');
    }).catch((err)=>{
        console.log(err)
    })
};

  const logMeIn = (e) => {
    console.log("LOGGING IN!")
    e.preventDefault()
    loggedIn = true;
    console.log(loggedIn);

    API.login(loginInfo.username,loginInfo.password)
      .then(data => {
        console.log(data);
        setUserId(data.user.id);
        setUsername(data.user.username);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        // window.location.replace('/');
        // console.log("change window")
      }).catch(err=>{
        console.log(err);
      });
  };

  const logMeOut = ()=>{
    console.log("Logging out")
    loggedIn = false;
    localStorage.removeItem("token");
    setUserId(0);
    setUsername("");
    setToken("");
    window.location.replace('/');
  }

  const handleInputChange = e=>{
    console.log(e.target.name,e.target.value)
    setLoginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    })
  }

  const handleInputChangeRegister = e=>{
    console.log(e.target.name,e.target.value)
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]:e.target.value
    })
  }


  return (
    <>
      <Router>
        <Navbar logMeOut={logMeOut} logMeIn={logMeIn} username={username} password={password} loginInfo={loginInfo} handleInputChange={handleInputChange} registerSubmit={registerSubmit}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login loggedIn={loggedIn} logMeOut={logMeOut} logMeIn={logMeIn} username={username} loginInfo={loginInfo}  handleInputChange={handleInputChange}/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/play" element={<Play/>}/>
        <Route path="/register" element={<Register username={username} password={password} registerInfo={registerInfo}  handleInputChangeRegister={handleInputChangeRegister} registerSubmit={registerSubmit}/>}/>
        </Routes>
        </Router>
    </>
  );
};

export default App;