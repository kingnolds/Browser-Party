const BASEURL="http://localhost:3001"

const API = {
    getTokenData: (token)=>{
        return fetch(`${BASEURL}/api/users/gettokendata`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
            .then(res => res.json())
    },
    login: (username,password)=>{
       return fetch(`${BASEURL}/api/users/login`, {
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