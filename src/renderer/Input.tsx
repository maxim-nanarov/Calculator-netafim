import e from 'cors';
import { copyFileSync } from 'fs';
import React, { useState, useContext, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

export default function Input() {
  const [ResultsQ, setResultsQ] = useState<number>();
  const [ResultsDp, setResultsDp] = useState<number>();
  const [a, setA] = useState<any>();
  const [Slope, setSlope] = useState(0);
  const [SP, setSP] = useState(0.15);

  useEffect(() => {
    if (ResultsQ !== undefined && ResultsDp !== undefined) {
      let a = (
        <div className="Results">
          <label>Q: {ResultsQ} L/H</label>
          <label>Dp: {ResultsDp}</label>
        </div>
      );
      setA(a);
    }
  }, [ResultsQ, ResultsDp]);

  function Calculate(e: any) {
    e.preventDefault();
    let formData: any = new FormData(e.target);
    formData = Object.fromEntries(formData);
    let k = formData.k;
    let kd = formData.kd;
    let kf = formData.kf;
    let x = formData.x;
    let Dlat = formData.Dlat;
    let Dp: number = Number(formData.dp);
    let pc = formData.pc;
    let Length = formData.Length;
    let sp = formData.sp;
    let slope = formData.Slope;
    console.log(formData);
    console.log('k: ' + k);
    console.log('kd: ' + kd);
    console.log('kf: ' + kf);
    console.log('x: ' + x);
    console.log('Dlat: ' + Dlat);
    console.log('Dp: ' + typeof Dp);
    console.log('pc: ' + pc);
    console.log('Length: ' + Length);
    console.log('sp: ' + sp);
    slope = slope / 100;
    console.log('Slope: ' + Slope);
    let Q1;
    if (Dp < pc) {
      Q1 = kf * Math.pow(Dp, 0.5);
    } else {
      Q1 = kf * Math.pow(pc, 0.5);
    }
    console.log(Q1);
    let Qd = 0;
    let leng = Length / sp;
    for (let i = 0; i <= leng; i++) {
      if (Dp < pc) {
        Qd = k * Math.pow(Dp, x);
      } else {
        Qd = k * Math.pow(pc, x);
      }
      Q1 += Qd;
      Dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, k) + Ps(Slope, sp); // Am I doing the pressure right?
      console.log(Dp);
      console.log(Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, k) + Ps(Slope, sp));
    }
    setResultsDp(Dp);
    setResultsQ(Q1);
    //the tube with the drippers
  }
  function Phw(Qlat: number, Dlat: number, sp: number): number {
    let Q = Math.pow(Qlat, 1.76);
    let D = Math.pow(Dlat, -4.76);
    let x = 0.4364 * Q * D * sp;
    return x;
  }
  //the tube
  function Pd(Qlat: number, Dlat: number, kd: number): number {
    let Q = Math.pow(Qlat, 2);
    let D = Math.pow(Dlat, -4);
    let x = 6.367 * Math.pow(10, -3) * Q * D * kd;
    return x;
  }
  //slope and length
  function Ps(Slope: number, Length: number): number {
    return Slope * Length;
  }

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
      <div className="MainTitle">
        <h1>Calculator</h1>
      </div>
      <div className="MainContainer">
        <nav>
          <Link to={'/'}>Select</Link>
          <Link to={'/Input'}>Input</Link>
          <Link to={'/Data'}>Data</Link>
        </nav>
        <div className="Calculator">
          <h1>Put The Data</h1>
          <form className="Form" onSubmit={Calculate}>
            <input
              name="dp"
              step="any"
              type="number"
              id="dp"
              placeholder="dp"
            ></input>
            <input
              name="Dlat"
              step="any"
              id="Dlat"
              type="number"
              placeholder="Dlat"
            ></input>
            <input
              type="number"
              name="k"
              id="k"
              step="any"
              placeholder="Coefficency of the dripper"
            ></input>
            <input
              name="kd"
              step="any"
              type="number"
              id="kd"
              placeholder="kd"
            ></input>
            <input
              name="Length"
              step="any"
              type="number"
              id="Length"
              placeholder="Pipe - Length"
            ></input>
            <input
              name="x"
              step="any"
              type="number"
              id="x"
              placeholder="exponent of the dripper"
            ></input>
            <input
              name="kf"
              step="any"
              type="number"
              id="kf"
              placeholder="kf"
            ></input>
            <input
              name="pc"
              step="any"
              type="number"
              id="pc"
              placeholder="pc"
            ></input>
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
                name="sp"
                id="sp"
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
      </div>
    </>
  );
}
