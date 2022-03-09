import React, { useState } from 'react';
import {useParams} from "react-router-dom"

export default function Home() {

  const params = useParams();
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }