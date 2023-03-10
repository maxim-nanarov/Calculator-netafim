import { Link, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

export default function MainData() {
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
        <nav className="MainData">
          <Link to={'/MainData/Dripper_Pipes'}>Dripper And Pipes</Link>
          <Link to={'/MainData/Dripper'}>Drippers</Link>
          <Link to={'/MainData/DripperS'}>Drippers Data</Link>
          <Link to={'/MainData/Pipes'}>Pipes</Link>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
