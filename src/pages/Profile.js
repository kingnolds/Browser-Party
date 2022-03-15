import React from 'react';
// import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import Button from 'react-bootstrap/Button'

export default function Profile({ loginInfo, username }) {
  const [ friends, setFriends] = useState([])
  const [ wins, setWins] = useState(0)
  const [friendSearch, setFriendSearch] = useState('')
  useEffect(()=>{
    // console.log(loginInfo)
    // console.log(loginInfo.username)
    // console.log(username)
      API.getSingleUser(username).then(data=>{
        // console.log(data)
        setFriends(data.user?.friends)
        setWins(data.user?.wins)
      })
  })

  const handleFriendSearch = function(e) {
    const friendName = e.target.value
    setFriendSearch(e.target.value)
  }
  const handleAddFriend = function(e) {
    const friendName = friendSearch
    API.addFriend(username, friendSearch).then((data)=>{
      console.log(data)
      setFriendSearch('')
    })
  }

  const handleRemoveFriend = async function(e) {
    const name = e.target.getAttribute("name")
    console.log(name)
    // setFriends(friends.filter(friend => friend !== name));
    await API.removeFriend(username, name).then(data=>{
      console.log(data)
      // friends.filter((friend) => friend !== name)
    })
  }

  const styles = {
    logo: {
      margin: '10vh auto 0px auto',
    },
    component: {
      width: '500px',
      margin: '0 auto',
      padding: '28px'
    }
  }

  return (
    <div>
      <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
      <div style={styles.component} className="component">
        {loginInfo ? (
          <div>
            <h1>{loginInfo.username}</h1>
            <div>
              <div className="card-body">
                <h2>History: </h2>
                <ul>
                  <li key='wins'>You have {wins} Wins!</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="card-body">
                <h2>Friends:</h2>
                <ul>
                  {friends?.map((friend, index)=>(
                    <li key={index}>{friend}  <Button name={friend} variant="outline-danger" onClick={handleRemoveFriend}>Remove Friend</Button></li>
                  ))}
                </ul>
                <label>Add a Friend</label>
                <input type="text" value={friendSearch} onChange={handleFriendSearch} name="username"/><Button value={friendSearch} onClick={handleAddFriend}>Add Friend</Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            You must login first!
            <Link to="/login">Login</Link>
          </div>)}
      </div>
    </div>
  );
}