import React, { useState, useContext, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

export default function Input() {
  const [ResultsQD, setResultsQD] = useState<number>();
  const [ResultsQ, setResultsQ] = useState<number>();
  const [ResultsDP, setResultsDP] = useState<number>();
  const [a, setA] = useState<any>();
  const [Slope, setSlope] = useState(0);

  useEffect(() => {
    if (ResultsDP !== undefined) {
      let a = (
        <div className="Results">
          <label>QD: {ResultsQD}</label>
          <label>Dp: {ResultsDP}</label>
          <label>Q: {ResultsQ}</label>
        </div>
      );
      setA(a);
    }
  }, [ResultsDP, ResultsQD, ResultsQ]);

  const Calculate = (event: any) => {
    event.preventDefault();
    let tar = event.target;
    let dp = Number(tar.dp.value);
    let kf = Number(tar.kf.value);
    let Pend = Number(tar.Pend.value);
    let Qlat = Number(tar.Qlat.value);
    let Dlat = Number(tar.Dlat.value);
    let kd = Number(tar.kd.value);
    let sp = Number(tar.sp.value);
    let Length = Number(tar.Length.value);
    let k = Number(tar.k.value);
    let Slope = Number(tar.Slope.value);
    let x = Number(tar.x.value);
    let p = Number(tar.p.value);

    let Q1: number = kf * Math.pow(Pend, 0.5);
    let Q: number = 0;
    let Qd: number = 0;

    for (let i = 0; i < Length; i += sp) {
      Qd = k * Math.pow(p, x);
      Q = Q1 + Q + Qd;
      dp = dp + Phw(Qlat, Dlat, sp) + Pd(Qlat, Dlat, kd) + Ps(Slope, sp);
    }
    console.log('Qd: ' + Qd);
    console.log('Q: ' + Q);
    console.log('dp: ' + dp);
    setResultsQ(Q);
    setResultsDP(dp);
    setResultsQD(Qd);

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
      return Slope * sp;
    }
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
        <input name="Pend" id="Pend" placeholder="Pressure in the end"></input>
        <input name="Qlat" id="Qlat" placeholder="Qlat"></input>
        <input name="Dlat" id="Dlat" placeholder="Dlat"></input>
        <input name="kd" id="kd" placeholder="kd"></input>
        <input name="sp" id="sp" placeholder="sp"></input>
        <input name="pc" id="pc" placeholder="Pressure by meter"></input>
        <input name="k" id="k" placeholder="Coefficent of the dripper"></input>
        <input name="Length" id="Length" placeholder="Pipe - Length"></input>
        <input name="x" id="x" placeholder="exponent of the dripper"></input>
        <input name="p" id="p" placeholder="Pressure(bar)"></input>
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
          <label>{Slope}%</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {a}
    </div>
  );
}
