import React from 'react';
// import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";

export default function Profile({ loginInfo, username }) {
  const [friends, setFriends] = useState([])
  const [wins, setWins] = useState(0)
  const [friendSearch, setFriendSearch] = useState('')
  useEffect(() => {
    // console.log(loginInfo)
    // console.log(loginInfo.username)
    // console.log(username)
    API.getSingleUser(username).then(data => {
      // console.log(data)
      setFriends(data.user?.friends)
      setWins(data.user?.wins)
    })
  })

  let navigate = useNavigate();

  const loginChange = () => {
    let path = `/login`;
    navigate(path);
  }

  const handleFriendSearch = function (e) {
    const friendName = e.target.value
    setFriendSearch(e.target.value)
  }
  const handleAddFriend = function (e) {
    const friendName = friendSearch
    API.addFriend(username, friendSearch).then((data) => {
      console.log(data)
      setFriendSearch('')
    })
  }

  const handleRemoveFriend = async function (e) {
    const name = e.target.getAttribute("name")
    console.log(name)
    // setFriends(friends.filter(friend => friend !== name));
    await API.removeFriend(username, name).then(data => {
      console.log(data)
      // friends.filter((friend) => friend !== name)
    })
  }

  const styles = {
    logo: {
      margin: '10vh auto 5px auto',
    },
    component: {
      width: '500px',
      margin: '0 auto',
      padding: '28px'
    },
    username: {
      fontWeight: 'bolder',
      color: 'white',
      textAlign: 'center',
      textShadow: '2px 2px #685f80',
      marginBottom: '20px'
    },
    screen: {
      padding: '30px 30px 30px 75px',
      fontSize: '16px'
    }
  }

  return (
    <div>
      <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
      {username ? (
        <div style={styles.component} className="component">
          <div className="computer-screen" style={styles.screen}>
            <p>Hello, {username}</p>
            <p>You have {wins} wins.</p>
            <p>Friends list:</p>
            <ul>
              {friends?.map((friend, index) => (
                <li key={index}>{friend}  <Button style={{margin: '5px 0 12px 0'}} name={friend} variant="outline-danger" onClick={handleRemoveFriend}>Remove Friend</Button></li>
              ))}
            </ul>
            <p>Add a Friend:</p>
            <input style={{width: '250px', color: '#3eff48', background: 'none', border: '2px solid #3eff48', borderRadius: '3px'}} type="text" value={friendSearch} onChange={handleFriendSearch} name="username" />
            <br></br>
            <br></br>
            <Button style={{color: '#27262e', background: '#3eff48', border: 'none'}} value={friendSearch} onClick={handleAddFriend}>Add Friend</Button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ width: '440px', height: '100px', margin: '0 auto', padding: '20px', fontSize: '25px' }} className="component">
            You must login first!
            <button style={{ marginLeft: '40px' }} className="button" type="submit" onClick={loginChange}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}