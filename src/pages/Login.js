import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom"

const styles = {
  card:
  {
    borderStyle: 'none',
    borderRadius: '10px',
    background: '#EEEEEE',
    width: '300px',
    margin: '25vh auto',
    padding: '28px'
  },
  button:
  {
    marginTop: '25px',
    fontSize: '20px'
  }
}

export default function Login(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (

      <div>
        <div style={styles.card} className='container'>
          <div>
            {props.username ? (
              <div>
                <h2>You are now logged in, {props.loginInfo.username}</h2>
                <Link to="/">Home</Link>
                <button onClick={props.logMeOut}>LogOut</button>
              </div>
            ) : (
              <form>
                  <h1>Login</h1>
                <input type="text" value={props.loginInfo.username} onChange={props.handleInputChange} name="username" placeholder="Username" />
                <input type="password" value={props.loginInfo.password} onChange={props.handleInputChange} name="password" placeholder="Password" />
                <button onClick={(e) => {props.logMeIn(e, props.loginInfo.username, props.loginInfo.password)}}>Login</button>
              </form>
            )}
              </div>
          </div>
      </div>
      
    );
  }
