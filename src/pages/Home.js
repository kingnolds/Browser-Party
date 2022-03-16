import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home(props) {

  let navigate = useNavigate();
  const loginChange = () => {
    let path = `/login`;
    navigate(path);
  }
  const registerChange = () => {
    let path = `/register`;
    navigate(path);
  }

  const styles = {
    logo: {
      margin: '20vh auto 5px auto',
    },
    component:
    {
      width: '370px',
      margin: '0 auto',
      padding: '5px 35px 35px 35px',
    },
    h1:
    {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '0.8'
    },
    button:
    {
      marginTop: '28px',
      padding: '5px 17px'
    },
  }

  return (
    <div>
        <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
      <div style={styles.component} className="component">
        {props.username ? (
          <div style={{paddingTop: '30px'}}>
            <h4>Your friends are waiting for you! Press play up top!</h4>
          </div>
        ) : (
          <div className='text-center'>
          <div className="row">
            <div className="col">
              <div>
                <button style={styles.button} className="button" type="submit" onClick={loginChange}>Login</button>
              </div>
              <div>
                <button style={styles.button} className="button" type="submit" onClick={registerChange}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}