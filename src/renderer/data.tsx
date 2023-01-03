import { Link } from 'react-router-dom';
import React from 'react';
import './App.scss';

export default function Data() {
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
