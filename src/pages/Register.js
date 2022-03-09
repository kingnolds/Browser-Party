import React, { useState } from 'react';
import {useParams} from "react-router-dom"

export default function Register(props) {

    const params = useParams();
    return (
      <div>
          <div className='container'>
              <div className='card'>
                <form>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>
          </div>

      </div>
    );
  }
