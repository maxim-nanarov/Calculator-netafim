import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DripperS() {
  const [DripperData, setDripperData] = useState<any>();
  const [Dripper_Data_Display, setDripper_Data_Display] = useState<any>();
  let a: any;

  useEffect(() => {
    axios
      .get('http://localhost:3000/DData')
      .then((res) => {
        setDripperData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let count = -1;
    console.log('DripperData');
    console.log(DripperData);
    if (DripperData !== undefined) {
      let a = DripperData.map((data: any) => {
        count++;
        return (
          <tr key={count}>
            <th>{data.Dripper_id}</th>
            <th>{data.Exponent}</th>
            <th>{data.Pressure}</th>
            <th>{data.flow_rate}</th>
            <th>{data.k}</th>
            <th>
              <Button
                onClick={() => {
                  alert('Edit: ' + data.id);
                }}
              >
                Edit
              </Button>
            </th>
            <th>
              <Button
                onClick={() => {
                  alert('DELETE: ' + data.id);
                }}
              >
                DELETE
              </Button>
            </th>
          </tr>
        );
      });
      setDripper_Data_Display(a);
    }
  }, [DripperData]);

  return (
    <div>
      <h1>Drippers Data</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>Exponent</th>
            <th>Pressure</th>
            <th>flow rate</th>
            <th>Coefficent</th>
            <th>
              <Button
                onClick={() => {
                  alert('Add');
                }}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{Dripper_Data_Display}</tbody>
      </Table>
    </div>
  );
}
