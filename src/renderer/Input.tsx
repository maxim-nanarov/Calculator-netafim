import { copyFileSync } from 'fs';
import React, { useState, useContext, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

export default function Input() {
  const [ResultsQ, setResultsQ] = useState<number>();
  const [a, setA] = useState<any>();
  const [Slope, setSlope] = useState(0);
  const [SP, setSP] = useState(0.15);

  useEffect(() => {
    if (ResultsQ !== undefined) {
      let a = (
        <div className="Results">
          <label>Q: {ResultsQ} L/H</label>
        </div>
      );
      setA(a);
    }
  }, [ResultsQ]);

  const Calculate = (event: any) => {
    event.preventDefault();
    let tar = event.target;
    let dp = +tar.dp.value;
    let Dlat = +tar.Dlat.value;
    let k = +tar.k.value;
    let Length = +tar.Length.value;
    let x = +tar.x.value;
    let Slope = +tar.Slope.value;
    let sp = +tar.SP.value;

    console.log('DP: ' + dp);
    console.log('Dlat: ' + Dlat);
    console.log('k: ' + k);
    console.log('x: ' + x);
    console.log('Slope: ' + Slope);
    console.log('sp: ' + sp);
    console.log('Length: ' + Length);

    let Q1: number = k * Math.pow(dp, 0.5);
    let Qd: number = 0;

    for (let i = 0; i < Length; i = i + sp) {
      console.log('Math.Pow dp^x' + Math.pow(dp, x));
      Qd = k * Math.pow(dp, x);
      Q1 += Qd;
      dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, k) + Ps(Slope, sp);
      console.log(dp);
    }
    console.log('Q: ' + Math.floor(Q1));
    console.log('dp: ' + dp);
    setResultsQ(Math.floor(Q1));

    function Phw(Qlat: number, Dlat: number, sp: number) {
      let Q = Math.pow(Qlat, 1.76);
      let D = Math.pow(Dlat, -4.76);
      return 0.4364 * Q * D * sp;
    }

    function Pd(Qlat: number, Dlat: number, kd: number) {
      let Q = Math.pow(Qlat, 2);
      let D = Math.pow(Dlat, -4);
      return 6.367 * Math.pow(10, -3) * Q * D * kd;
    }

    function Ps(Slope: number, sp: number) {
      console.log('Slope: ' + Slope);
      console.log('SP: ' + sp);
      console.log('Slope*SP = ' + Slope * sp);
      return Slope * sp;
    }
  };

  const handleRangeChange = (event: any) => {
    const rangeValue = event.target.value;
    setSlope(rangeValue);
  };
  const handleRangeSpaceChange = (event: any) => {
    const rangeValue = event.target.value;
    setSP(rangeValue);
  };

  return (
    <>
      <nav>
        <Link to={'/'}>Select</Link>
        <Link to={'/Input'}>Input</Link>
        <Link to={'/Data'}>Data</Link>
      </nav>
      <div className="Calculator">
        <h1>Put The Data</h1>
        <form className="Form" onSubmit={Calculate}>
          <input name="dp" id="dp" placeholder="dp"></input>
          <input name="Dlat" id="Dlat" placeholder="Dlat"></input>
          <input
            name="k"
            id="k"
            placeholder="Coefficent of the dripper"
          ></input>
          <input name="Length" id="Length" placeholder="Pipe - Length"></input>
          <input name="x" id="x" placeholder="exponent of the dripper"></input>
          <div className="Range">
            <input
              name="Slope"
              id="Slope"
              placeholder="slope"
              step={0.5}
              max={10}
              min={-10}
              type="range"
              onChange={handleRangeChange}
            ></input>
            <label>{Slope}%</label>
          </div>
          <div className="Range">
            <input
              name="SP"
              id="SP"
              placeholder="Space Between the Drippers"
              step={0.05}
              max={1}
              min={0.15}
              defaultValue={SP}
              type="range"
              onChange={handleRangeSpaceChange}
            ></input>
            <label>{SP}m</label>
          </div>
          <button type="submit">Submit</button>
        </form>
        {a}
      </div>
    </>
  );
}
