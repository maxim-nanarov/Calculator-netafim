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
import Hello from './CalculationsPages/Select';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Specific_data from './components/Specific_data';
import Dripper_Pipes from './components/Dripper_Pipes';
import Driper from './components/Dripper';
import DriperS from './components/DripperS';
import Pipes from './components/Pipes';
import path from 'path';
import MainData from './MainData';
import FindingLengthV1 from './CalculationsPages/LengthV1';
import FindingLengthV2 from './CalculationsPages/LengthV2';
import PendWithPin from './CalculationsPages/FindingPendWithPin';

const Home = () => {
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
              <Link to={'/LengthV1'}>Find Length v1</Link>
              <Link to={'/LengthV2'}>Find Length v2</Link>
              <Link to={'/FidingPendWithPin'}>Find Pend With Pin</Link>
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
          <Route path="/LengthV1" element={<FindingLengthV1 />} />
          <Route path="/LengthV2" element={<FindingLengthV2 />} />
          <Route path="/FidingPendWithPin" element={<PendWithPin />} />
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
