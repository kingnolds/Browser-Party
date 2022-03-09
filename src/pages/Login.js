import React, { useState } from 'react';
import {useParams} from "react-router-dom"


export default function Login() {

    const params = useParams();
    return (
      <div>
        <h1>Login</h1>
      </div>
    );
  }