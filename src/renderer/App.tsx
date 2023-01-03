import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './App.scss';
import { useState } from 'react';
import Input from './Input';

const Calculate = (event: any) => {
  event.preventDefault();
};

const Hello = () => {
  return (
    <div>
      <nav>
        <Link to={'/'}>Select</Link>
        <Link to={'/Input'}>Input</Link>
      </nav>
      <h1>Select the Data</h1>
      <div className="InputClass">
        <form className="Form" onSubmit={Calculate}>
          <select name="Dripper" id="Dripper"></select>
          <select name="Flow" id="Flow" placeholder="Flow"></select>
          <select name="Dripper_Line" id="Dripper_Line"></select>
          <select name="kd" id="kd"></select>
          <select name="k" id="k"></select>
          <select name="t" id="t" placeholder="t"></select>
          <input name="Length" id="Length."></input>
          <input name="Slope" id="Slope" type="range"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/Input" element={<Input />} />
      </Routes>
    </Router>
  );
}
