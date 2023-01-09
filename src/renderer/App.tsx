import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './App.scss';
import Input from './Input';
import Data from './data';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Calculate = (event: any) => {
  event.preventDefault();
};

const Hello = () => {
  const [Dripper, setDripper] = useState<Array<object>>();
  const [DripperData, setDripperData] = useState<Array<Object>>();
  const [ResultsQ, setResultsQ] = useState<Number>();
  const [DripperSelect, setDripperSelect] = useState<JSX.Element[]>();
  const [SDripper, setSDripper] = useState<number>();
  const [Pipes, setPipes] = useState<Array<object>>();
  const [PipesSelect, setPipesSelect] = useState<JSX.Element[]>();
  const [SPipe, setSPipe] = useState<number>();
  const [Length, setLength] = useState<number>(0);
  const [Slope, setSlope] = useState(0);
  const [SP, setSP] = useState(0.15);
  const [dp, setDP] = useState(0);
  const [a, setA] = useState<any>();
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

    axios
      .get('http://localhost:3000/DData')
      .then((res) => {
        setDripperData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //get's the specifc pipes for the chosen dripper
  useEffect(() => {
    if (SDripper !== undefined) {
      axios
        .get(`http://localhost:3000/Get_Relevent_Pipes?id=${SDripper}`)
        .then((res) => {
          setPipes(res.data.data);
          setSPipe(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
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
            value={data.id}
            onChange={(event) => setSDripper(data.id)}
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
      let a = (
        <div className="Results">
          <label>Q: {ResultsQ} L/H</label>
        </div>
      );
      setA(a);
    }
  }, [ResultsQ]);

  const Calculate = (event: any) => {
    let sp = SP;

    //the error is unnecessary
    let k = DripperData![SDripper!].k; //V
    let x = DripperData![SDripper!].Exponent; //V
    let Dlat: number; //V
    Dlat = SPipe.Diameter;

    // if (Pipes !== undefined) {
    //   Pipes.forEach((Data: any) => {
    //     if (SPipe === Data.Model) {
    //       console.log('The Condition for finding the Dlat has happend');
    //       Dlat = Data.Diameter;
    //     }
    //   });
    // } else {
    //   Dlat = 0;
    // }
    let Dp = dp;

    let Q1: number = k * Math.pow(dp, 0.5);
    let Qd: number = 0;

    for (let i = 0; i < Length; i = i + sp) {
      Qd = k * Math.pow(Dp, x);
      Q1 += Qd;
      console.log(Qd);
      Dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, k) + Ps(Slope, Length);
    }
    console.log(Dp);
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

    function Ps(Slope: number, Length: number) {
      return Slope * Length;
    }
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
        {a}
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
