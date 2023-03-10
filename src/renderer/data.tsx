import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import DripperS from './components/DripperS';
import Pipes_Table from './components/Pipes';
import Dripper_Table from './components/Dripper';
import Dripper_Pipe from './components/Dripper_Pipes';

export default function Data() {
  //this component holds all the data
  //and helps the user to handle the current
  //drippers and pipes storage according to the
  //news products we have
  const [Dripper_Pipes, setDripper_Pipes] = useState<any>();
  const [Pipes, setPipes] = useState<any>();

  //this variable will help with the
  //display of the information to the
  //browser page.
  let a: any;

  useEffect(() => {
    axios
      .get('http://localhost:3000/Dripper_Pipes')
      .then((res) => {
        setDripper_Pipes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('http://localhost:3000/Pipes')
      .then((res) => {
        setPipes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="DataContainer">
        <div className="Table-Container">
          <div className="Table-Container-two">
            <Dripper_Table></Dripper_Table>
            <Pipes_Table></Pipes_Table>
          </div>
          <div className="Table-Container-two">
            <DripperS></DripperS>
            <Dripper_Pipe></Dripper_Pipe>
          </div>
        </div>
      </div>
    </>
  );
}
