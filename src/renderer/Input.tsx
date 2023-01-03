import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

export default function Input() {
  const [dp, setDP] = useState();
  const [kf, setKF] = useState();
  const [Pend, setPend] = useState();
  const [Qlat, setQlat] = useState();
  const [Dlat, setDlat] = useState();
  const [kd, setKD] = useState();
  const [Slope, setSlope] = useState(0);
  const [sp, setSP] = useState();
  const [Length, setLength] = useState();

  const Calculate = (event: any) => {
    event.preventDefault();
    console.log('Worked');
  };

  const handleRangeChange = (event: any) => {
    const rangeValue = event.target.value;
    setSlope(rangeValue);
  };

  return (
    <div>
      <nav>
        <Link to={'/'}>Select</Link>
        <Link to={'/Input'}>Input</Link>
      </nav>
      <h1>Input the Data</h1>
      <form className="Form" onSubmit={Calculate}>
        <input name="dp" id="dp" placeholder="dp"></input>
        <input name="kf" id="kf" placeholder="kf"></input>
        <input name="Pend" id="Pend" placeholder="Pend"></input>
        <input name="Qlat" id="Qlat" placeholder="Qlat"></input>
        <input name="Dlat" id="Dlat" placeholder="Dlat"></input>
        <input name="kd" id="kd" placeholder="kd"></input>
        <input name="sp" id="sp" placeholder="sp"></input>
        <input name="Length" id="Length" placeholder="Pipe - Length"></input>
        <div className="Range">
          <input
            name="Slope"
            id="Slope"
            placeholder="slope"
            step={0.5}
            max={3}
            min={-3}
            type="range"
            onChange={handleRangeChange}
          ></input>
          <label>{Slope}</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
