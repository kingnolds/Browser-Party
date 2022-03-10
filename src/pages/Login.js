import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import API from "../utils/api"
const socket = io("http://localhost:4000");

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState(0)
  const [token, setToken] = useState('')

  const [loginInfo, setLoginInfo] = useState({
      email:"",
      password:""
  })

  const login = (e) => {
    e.preventDefault();
    API.login(username, password).then((data)=> {
      console.log(data)
  }).catch((err)=>{
      console.log(err)
  })
  }

  useEffect(()=>{
      const token = localStorage.getItem("token")
      if(token){
          fetch("http://localhost:4000/gettokendata",{
        headers:{
            "authorization":`Bearer ${token}`
        }
          }).then(res=>res.json()).then(data=>{
              console.log(data);
              setUserId(data.id);
              setUserEmail(data.email);
              setToken(token);
          }).catch(err=>{
              console.log(err);
          })
      }
  },[])

  const logMeIn = ()=>{
      fetch("http://localhost:4000/login", {
          method:"POST",
          body:JSON.stringify({
              email:"joe@joe.joe",
              password:"password"
          }),
          headers:{
              "Content-Type":"application/json"
          }
      }).then(res=>{
          return res.json()
      }).then(data=>{
          console.log(data);
          setUserId(data.user.id);
          setUserEmail(data.user.email);
          setToken(data.token);
          localStorage.setItem("token", data.token);
      })
  }

  const logMeOut = () => {
      localStorage.removeItem("token");
      setUserId(0);
      setUserEmail("");
      setToken("");
  }

  const handleInputChange = e => {
      setLoginInfo({
          ...loginInfo,
          [e.target.name]:e.target.value
      })
  }

  const params = useParams();
    return (
      <div>
          <div className='container'>
              <div className='card'>
              <form className="login-form">
                    <h1>Login</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value= {loginInfo.email} onChange={handleInputChange} name="email" className="form-control" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value= {loginInfo.password} onChange={handleInputChange} name="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onSubmit={logMeIn}>Login</button>
                    <button type="submit" className="btn btn-primary btn-block" onSubmit={logMeOut}>Logout</button>
                </form>
              </div>
          </div>


        {/* <div>
          {props.userEmail ? (
          <div>
            <h2>Welcome to the club, {props.userEmail}</h2>
            <button onClick={props.logMeOut}>LogOut</button>
          </div>
        ) : (
          <form onSubmit={props.logMeIn}>
            <input
              value={props.loginInfo.email}
              onChange={props.handleInputChange}
              name="email"
            />
            <input
              value={props.loginInfo.password}
              onChange={props.handleInputChange}
              name="password"
            />
            <button>Login</button>
            <button> Create Account</button>
          </form>
        )}
        </div> */}
      </div>
    );
  }