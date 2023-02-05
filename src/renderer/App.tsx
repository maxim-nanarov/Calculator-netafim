import {
  MemoryRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import './App.css';
import './App.scss';
import Input from './Input';
import Data from './data';
import Hello from './Select';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Specific_data from './components/Specific_data';
import Dripper_Pipes from './components/Dripper_Pipes';
import Driper from './components/Dripper';
import DriperS from './components/DripperS';
import Pipes from './components/Pipes';
import path from 'path';
import MainData from './MainData';

const Home = () => {
  //Spipe is going to be the data of the selected pipe
  //the SelectedModel will be this pipe's index for the
  //selection
  // const [kf, setkf] = useState<number>(0);
  // const [Dripper, setDripper] = useState<Array<object>>();
  // const [DripperData, setDripperData] = useState<any>();
  // const [ResultsQ, setResultsQ] = useState<number>();
  // const [DripperSelect, setDripperSelect] = useState<JSX.Element[]>();
  // const [SDripper, setSDripper] = useState<number>();
  // const [SDripperDisplay, setSDripperDisplay] = useState<any>();
  // const [Pipes, setPipes] = useState<Array<object>>();
  // const [PipesSelect, setPipesSelect] = useState<JSX.Element[]>();
  // const [SPipe, setSPipe] = useState<any>();
  // const [SelectedModel, setSelectedModel] = useState<any>();
  // const [Length, setLength] = useState<number>(0);
  // const [Slope, setSlope] = useState(0);
  // const [SP, setSP] = useState(0.15);
  // const [dp, setDP] = useState(0);
  // const [ResultsDp, setResultsDp] = useState<number>();
  // const [a, setA] = useState<any>();
  // const [kd, setKD] = useState<any>();

  // //In here the functions help with the display
  // //* of the slope of the line
  // //* and seperation from each dripper
  // const handleRangeChange = (event: any) => {
  //   const rangeValue = event.target.value;
  //   setSlope(rangeValue);
  // };
  // const handleRangeSpaceChange = (event: any) => {
  //   const rangeValue = event.target.value;
  //   setSP(rangeValue);
  // };

  // //these function get the necsecery information from the database
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/Drippers')
  //     .then((res) => {
  //       setDripper(res.data.data);
  //       setSDripper(Number(res.data.data[0].id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // //gets the relevent dripper data for the user to choose:
  // //get's the specifc pipes for the chosen dripper
  // useEffect(() => {
  //   if (SDripper !== undefined) {
  //     axios
  //       .get(`http://localhost:3000/Get_Relevent_Pipes?id=${SDripper}`)
  //       .then((res) => {
  //         setPipes(res.data.data);
  //         setSPipe(res.data.data[0]);
  //         setSelectedModel(res.data.data[0].Models);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     setSDripperDisplay(
  //       <Specific_data
  //         onDataChange={getChildData}
  //         id={SDripper}
  //       ></Specific_data>
  //     );
  //   }
  // }, [SDripper]);
  // //takes the pipes table and display it in the select menu
  // //according to the dripper selection
  // useEffect(() => {
  //   console.log(Pipes);
  //   if (Pipes !== undefined && Pipes.length > 0) {
  //     let count = -1;
  //     let a = Pipes.map((data: any) => {
  //       count++;
  //       return (
  //         <option
  //           key={count}
  //           value={data.Models}
  //           onChange={() => {
  //             setSelectedModel(data.Models);
  //             setSPipe(data);
  //           }}
  //         >
  //           {data.Models}
  //         </option>
  //       );
  //     });
  //     setPipesSelect(a);
  //   } else {
  //     setPipesSelect(undefined);
  //   }
  // }, [Pipes, SPipe]);
  // //takes the dripper table and display it in the select menu
  // useEffect(() => {
  //   if (Dripper !== undefined) {
  //     let count = -1;
  //     let Helper = Dripper.map((data: any) => {
  //       count++;
  //       return (
  //         <option
  //           key={count}
  //           value={Number(data.id)}
  //           onChange={(event) => setSDripper(Number(data.id))}
  //         >
  //           {data.Dripper_Type}
  //         </option>
  //       );
  //     });

  //     // setSDripper(Dripper[0].data.id);
  //     setDripperSelect(Helper);
  //   }
  // }, [Dripper]);
  // //the result "component"
  // useEffect(() => {
  //   if (ResultsQ !== undefined) {
  //     setA(
  //       <div className="Results">
  //         <label>Q: {ResultsQ} L/H</label>
  //         <label>Dp: {ResultsDp} Flow Rate</label>
  //       </div>
  //     );
  //   }
  // }, [ResultsQ, ResultsDp]);

  // //when the user chooses the dripper and the pipe
  // //this functions get's the kd
  // useEffect(() => {
  //   if (SPipe !== undefined && SDripper !== undefined) {
  //     axios
  //       .get(
  //         `http://localhost:3000/Get_Kd_DripperId_PipeModel?Dripper_id=${SDripper}&Model=${SelectedModel}`
  //       )
  //       .then((res) => {
  //         setKD(res.data.data[0].kd);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [SDripper, SPipe, SelectedModel]);

  // //the calculation function
  // const Calculate = (event: any) => {
  //   if (kf === undefined) {
  //     setkf(0);
  //   }

  //   if (kd === undefined || DripperData === undefined) {
  //     alert('Please choose the dripper and the pipe');
  //     return 'error';
  //   }

  //   console.log('Kd: ' + kd);
  //   let sp = SP;
  //   let k = DripperData.k; //V
  //   let x = DripperData.Exponent; //V
  //   let Pc = DripperData.Pressure; //V
  //   let Dlat: number; //V
  //   Dlat = SPipe.Diameter;
  //   let Q1 = 0;
  //   let Dp = dp;

  //   if (Dp < Pc) {
  //     Q1 = kf * Math.pow(Dp, 0.5);
  //   } else {
  //     Q1 = kf * Math.pow(Pc, 0.5);
  //   }

  //   let Qd: number = 0;
  //   let leng = Length / sp;
  //   for (let i = 0; i <= leng; i++) {
  //     if (Dp < Pc) {
  //       Qd = k * Math.pow(Dp, x); //Is there a need for QD beeing inside the loop?
  //     } else {
  //       Qd = k * Math.pow(Pc, x);
  //     }
  //     Q1 += Qd;
  //     Dp += Phw(Q1, Dlat, sp) + Pd(Q1, Dlat, kd) + Ps(Slope / 100, sp); // Am I doing the pressure right?
  //   }
  //   setResultsQ(Q1);
  //   setResultsDp(Dp);

  //   function Phw(Qlat: number, Dlat: number, sp: number) {
  //     let Q = Math.pow(Qlat, 1.76);
  //     let D = Math.pow(Dlat, -4.76);
  //     return 0.4364 * Q * D * sp;
  //   }
  //   //the tube
  //   function Pd(Qlat: number, Dlat: number, kd: number) {
  //     let Q = Math.pow(Qlat, 2);
  //     let D = Math.pow(Dlat, -4);
  //     console.log(6.367 * Math.pow(10, -3) * Q * D * kd);
  //     return 6.367 * Math.pow(10, -3) * Q * D * kd;
  //   }
  //   //slope and length
  //   function Ps(Slope: number, Length: number) {
  //     return Slope * Length;
  //   }
  // };

  // const getChildData = (dataFromChild: any) => {
  //   setDripperData(dataFromChild);
  // };

  return (
    <>
      <div>
        <div className="MainTitle">
          <h1>Calculator</h1>
        </div>
        <div className="TheRestOfTheSite">
          <div className="MainNav-Container">
            <nav className="MainNav">
              <Link to={'/'}>Select</Link>
              <Link to={'/Input'}>Input</Link>
              <Link to={'/MainData'}>Data</Link>
            </nav>
          </div>
          <div className="Outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Hello />} />
          <Route path="/Input" element={<Input />} />
          <Route path="/MainData" element={<MainData />}>
            <Route path="/MainData" element={<Data />} />
            <Route path="/MainData/Dripper_Pipes" element={<Dripper_Pipes />} />
            <Route path="/MainData/Dripper" element={<Driper />} />
            <Route path="/MainData/DripperS" element={<DriperS />} />
            <Route path="/MainData/Pipes" element={<Pipes />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
