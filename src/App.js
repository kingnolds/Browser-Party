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
          if (data.err) {
            console.log(data.err)
            localStorage.removeItem("token")
          } else {
            setUserId(data.id);
            setUsername(data.username);
            console.log(`49- ${username}`)
            setToken(token);
          }
        })
        .catch(err => {
          console.log("bad token")
          console.log(err);
        });
    }
  }, );

  const registerSubmit = async (e) => {
    e.preventDefault()
    console.log("Register Submit Activated")
    API.createUser(registerInfo.username, registerInfo.password)
    .then((data)=> {
        console.log(registerInfo.username, registerInfo.password)
        setLoginInfo({
          username: `${registerInfo.username}`,
          password: registerInfo.password
        })
        logMeIn(e, registerInfo.username, registerInfo.password)
    }).catch((err)=>{
        console.log(err)
    })
};

  const logMeIn = (e, username, password) => {
    console.log("LOGGING IN!")
    e.preventDefault()
    loggedIn = true;
    API.login(username, password)
      .then(data => {
        setUserId(data.user.id);
        setUsername(data.user.username);
        setToken(data.token);
        localStorage.setItem("token", data.token);
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
    setLoginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    })
  }

  const handleInputChangeRegister = e=>{
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]:e.target.value
    })
  }


  return (
    <>
      <Router>
        <Navbar username={username} logMeOut={logMeOut}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login loggedIn={loggedIn} logMeOut={logMeOut} logMeIn={logMeIn} username={username} loginInfo={loginInfo}  handleInputChange={handleInputChange}/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/play" element={<Play username={username}/>}/>
        <Route path="/register" element={<Register username={username} password={password} registerInfo={registerInfo}  handleInputChangeRegister={handleInputChangeRegister} registerSubmit={registerSubmit}/>}/>
        </Routes>
        </Router>
    </>
  );
};
export default App;