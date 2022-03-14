// LOCAL
const BASEURL="http://localhost:3001" 

//DEPLOYED
// const BASEURL="https://browser-party-backend.herokuapp.com" 

const API = {
    getTokenData: (token)=>{
        return fetch(`${BASEURL}/gettokendata`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`
            }
          })
            .then(res => res.json())
    },
    
    login: (username,password)=>{
      return fetch(`${BASEURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password:password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
    },

    createUser: (username,password)=>{
      return fetch(`${BASEURL}/api/users`, {
     method: "POST",
     body: JSON.stringify({
       username: username,
       password:password
     }),
     headers: {
       "Content-Type": "application/json"
     }
   })
     .then(res => res.json())
    },
     
    getUsers:()=>{
        return fetch(`${BASEURL}/api/users`)
        .then(res => res.json())
    },
    
}

export default API;