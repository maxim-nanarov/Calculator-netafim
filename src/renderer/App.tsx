import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './App.scss';
import Input from './Input';
import Data from './data';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Specific_data from './components/Specific_data';

const Hello = () => {
  const [kf, setkf] = useState<number>(0);
  const [Dripper, setDripper] = useState<Array<object>>();
  const [DripperData, setDripperData] = useState<any>();
  const [ResultsQ, setResultsQ] = useState<Number>();
  const [DripperSelect, setDripperSelect] = useState<JSX.Element[]>();
  const [SDripper, setSDripper] = useState<number>();
  const [SDripperDisplay, setSDripperDisplay] = useState<any>();
  const [Pipes, setPipes] = useState<Array<object>>();
  const [PipesSelect, setPipesSelect] = useState<JSX.Element[]>();
  const [SPipe, setSPipe] = useState<any>();
  const [Length, setLength] = useState<number>(0);
  const [Slope, setSlope] = useState(0);
  const [SP, setSP] = useState(0.15);
  const [dp, setDP] = useState(0);
  const [ResultsDp, setResultsDp] = useState<number>();
  const [a, setA] = useState<any>();
  const [kd, setKD] = useState<any>();

  //In here the functions help with the display
  //* of the slope of the line
  //* and seperation from each dripper
  const handleRangeChange = (event: any) => {
    const rangeValue = event.target.value;
    setSlope(rangeValue);
  };
  const handleRangeSpaceChange = (event: any) => {
    const rangeValue = event.target.value;
    setSP(rangeValue);
  };

  //these function get the necsecery information from the database
  useEffect(() => {
    axios
      .get('http://localhost:3000/Drippers')
      .then((res) => {
        setDripper(res.data.data);
        setSDripper(Number(res.data.data[0].id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //when the user chooses the dripper and the pipe
  //this functions get's the kd
  useEffect(() => {
    if (SDripper !== undefined && SPipe !== undefined) {
      console.log('Starting the search for the kd');
      console.log(SDripper, SPipe.Models);
      axios
        .get(
          `http://localhost:3000/Get_Kd_DripperId_PipeModel?Dripper_id=${SDripper}&Model=${SPipe.Models}`
        )
        .then((res) => {
          console.log(res.data.data[0].kd);
          setKD(res.data.data[0].kd);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [SDripper, SPipe]);

  //gets the relevent dripper data for the user to choose:
  //get's the specifc pipes for the chosen dripper
  useEffect(() => {
    if (SDripper !== undefined) {
      axios
        .get(`http://localhost:3000/Get_Relevent_Pipes?id=${SDripper}`)
        .then((res) => {
          console.log(SDripper);
          console.log(res.data.data);
          setPipes(res.data.data);
          setSPipe(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
      setSDripperDisplay(
        <Specific_data
          onDataChange={getChildData}
          id={SDripper}
        ></Specific_data>
      );
    }
  }, [SDripper]);
  //takes the pipes table and display it in the select menu
  //according to the dripper selection
  useEffect(() => {
    if (Pipes !== undefined && Pipes.length > 0) {
      let count = -1;
      let a = Pipes.map((data: any) => {
        count++;
        return (
          <option
            key={count}
            value={data}
            onChange={(event) => {
              setSPipe(data);
            }}
          >
            {data.Models}
          </option>
        );
      });
      setPipesSelect(a);
    } else {
      setPipesSelect(undefined);
    }
  }, [Pipes, SPipe]);
  //takes the dripper table and display it in the select menu
  useEffect(() => {
    if (Dripper !== undefined) {
      let count = -1;
      let Helper = Dripper.map((data: any) => {
        count++;
        return (
          <option
            key={count}
            value={Number(data.id)}
            onChange={(event) => setSDripper(Number(data.id))}
          >
            {data.Dripper_Type}
          </option>
        );
      });

      // setSDripper(Dripper[0].data.id);
      setDripperSelect(Helper);
    }
  }, [Dripper]);

  useEffect(() => {
    if (ResultsQ !== undefined) {
      setA(
        <div className="Results">
          <label>Q: {ResultsQ} L/H</label>
          <label>Dp: {ResultsDp}</label>
        </div>
      );
    }
  }, [ResultsQ, ResultsDp]);

  const Calculate = (event: any) => {
    if (kf === undefined) {
      setkf(0);
    }

    let sp = SP;
    let kd = SPipe.kd;
    let k = DripperData.k; //V
    let x = DripperData.Exponent; //V
    let Pc = DripperData.Pressure; //V
    let Dlat: number; //V
    Dlat = SPipe.Diameter;
    let Q1 = 0;
    let Dp = dp;
    if (Dp < Pc) {
      Q1 = kf * Math.pow(Dp, 0.5);
    } else {
      Q1 = kf * Math.pow(Pc, 0.5);
    }

    let Qd: number = 0;
    let leng = Length / sp;
    for (let i = 0; i <= leng; i++) {
      if (Dp < Pc) {
        Qd = k * Math.pow(Dp, x); //Is there a need for QD beeing inside the loop?
      } else {
        Qd = k * Math.pow(Pc, x);
      }
      Q1 += Qd;
      Dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, kd) + Ps(Slope, sp); // Am I doing the pressure right?
    }
    setResultsQ(Q1);
    setResultsDp(Dp);

    function Phw(Qlat: number, Dlat: number, sp: number) {
      let Q = Math.pow(Qlat, 1.76);
      let D = Math.pow(Dlat, -4.76);
      return 0.4364 * Q * D * sp;
    }
    //the tube
    function Pd(Qlat: number, Dlat: number, kd: number) {
      let Q = Math.pow(Qlat, 2);
      let D = Math.pow(Dlat, -4);
      return 6.367 * Math.pow(10, -3) * Q * D * kd;
    }
    //slope and length
    function Ps(Slope: number, Length: number) {
      return Slope * Length;
    }
  };

  const getChildData = (dataFromChild: any) => {
    console.log('This is the parent component');
    console.log(dataFromChild);
    setDripperData(dataFromChild);
  };

  return (
    <div>
      <nav>
        <Link to={'/'}>Select</Link>
        <Link to={'/Input'}>Input</Link>
        <Link to={'/Data'}>Data</Link>
      </nav>
      <div className="Calculator">
        <div className="container">
          <h1>Select The Data</h1>
          <select
            name="Dripper"
            id="Dripper"
            value={SDripper}
            onChange={(event) => {
              setSDripper(Number(event.target.value));
            }}
          >
            {DripperSelect}
          </select>
          {SDripperDisplay}
          <select
            name="Pipe"
            id="Pipe"
            value={SPipe}
            onChange={(event) => {
              setSPipe(Number(event.target.value));
            }}
          >
            {PipesSelect}
          </select>
          <input
            type="number"
            placeholder="End Pressure(dp)"
            onChange={(event) => {
              setDP(Number(event.target.value));
            }}
          ></input>
          <input
            type="number"
            placeholder="Length"
            onChange={(event) => {
              setLength(Number(event.target.value));
            }}
          ></input>
          <input
            type="number"
            placeholder="The coefficency of the dripper in the end of the line"
            onChange={(event) => {
              setkf(Number(event.target.value));
            }}
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
          <button onClick={Calculate}>Submit</button>
        </div>
        <div>{a}</div>
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
        <Route path="/Data" element={<Data />} />
      </Routes>
    </Router>
  );
}
