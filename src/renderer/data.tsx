import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.scss';
import axios from 'axios';

export default function Data() {
  useEffect(() => {
    axios
      .get('http://localhost:3000/Drippers')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <nav>
        <Link to={'/'}>Select</Link>
        <Link to={'/Input'}>Input</Link>
        <Link to={'/Data'}>Data</Link>
      </nav>
    </div>
  );
}
