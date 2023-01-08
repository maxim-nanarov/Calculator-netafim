import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';

export default function Data() {
  const [Dripper_Display, setDripper_Display] = useState();
  const [Drippers, setDrippers] = useState<any>();
  const [Drippers_data, setDripper_data] = useState<any>();
  const [Dripper_Pipes, setDripper_Pipes] = useState<any>();
  const [Pipes, setPipes] = useState<any>();

  const [Delete, setDelete] = useState<number>();
  const [Edit, setEdit] = useState<number>();

  //this variable will help with the
  //display of the information to the
  //browser page.
  let a: any;

  useEffect(() => {
    axios
      .get('http://localhost:3000/Drippers')
      .then((res) => {
        setDrippers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('http://localhost:3000/DData')
      .then((res) => {
        setDripper_data(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

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

  useEffect(() => {
    console.log('the same ' + typeof Drippers);
    console.log(Drippers !== undefined);
    if (Drippers !== undefined) {
      let count = -1;
      a = Drippers.map((row: any) => {
        count++;
        return (
          <tr key={count}>
            <th>{row.id}</th>
            <th>{row.Dripper_Type}</th>
            <th>Edit</th>
            <th> - </th>
          </tr>
        );
      });
      setDripper_Display(a);
    } else {
      console.log(Drippers);
    }
  }, [Drippers]);

  return (
    <div>
      <nav>
        <Link to={'/'}>Select</Link>
        <Link to={'/Input'}>Input</Link>
        <Link to={'/Data'}>Data</Link>
      </nav>
      <div className="Table-Container">
        <table>
          <tr>
            <th>id</th>
            <th>Type</th>
            <th>Edit Button</th>
            <th> + </th>
          </tr>
          {Dripper_Display}
        </table>
      </div>
    </div>
  );
}
