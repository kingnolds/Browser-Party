const BASEURL = "http://localhost:3001"

const API = {
  getTokenData: (token) => {
    return fetch(`${BASEURL}/gettokendata`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
  },
  login: (username, password) => {
    return fetch(`${BASEURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
  },

  createUser: (username, password) => {
    return fetch(`${BASEURL}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res.json())
      }
      )
  },

  getSingleUser: (username) => {
    return fetch(`${BASEURL}/api/users/${username}`, )
    .then(res=> res.json())
  },

  getUsers: () => {
    return fetch(`${BASEURL}/api/users`)
    .then(res => res.json())
  },

  incrementWins: (username) => {
    return fetch(`${BASEURL}/api/users/${username}/win`, )
    .then(res=> res.json())
  },

  addFriend: (username, friend) => {
    return fetch(`${BASEURL}/api/users/${username}/friends/${friend}`, {
      method: "POST",
      body: JSON.stringify({ ok: true }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
  },
  removeFriend: (username, friend) => {
    return fetch(`${BASEURL}/api/users/${username}/friends/${friend}`, {
      method: "DELETE",
      // body: JSON.stringify({ ok: true }),
      // headers: {
      //   "Content-Type": "application/json"
      // }
    })
      .then(res => res.json())
  },
}

export default API;