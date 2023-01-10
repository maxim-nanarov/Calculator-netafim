import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Pipes_Table() {
  const [Pipes, setPipes] = useState<any>();
  const [Pipes_Display, setPipes_Display] = useState<any>();

  useEffect(() => {
    axios
      .get('http://localhost:3000/Pipes')
      .then((res) => {
        setPipes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let a: any;
  useEffect(() => {
    if (Pipes !== undefined) {
      let count = -1;
      a = Pipes.map((row: any) => {
        count++;
        return (
          <tr key={count}>
            <th>{row.Models}</th>
            <th>{row.Diameter}</th>
            <th>{row.Pressure}</th>
            <th>{row.kd}</th>
            <th>
              <Button
                onClick={() => {
                  alert('EDIT Button: ' + row.Models);
                }}
              >
                EDIT
              </Button>
            </th>
            <th>
              <Button
                onClick={() => {
                  alert('DELETE Button: ' + row.Models);
                }}
              >
                DELETE
              </Button>
            </th>
          </tr>
        );
      });
      setPipes_Display(a);
    }
  }, [Pipes]);

  return (
    <div>
      <h1>Pipes</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Model</th>
            <th>Diameter</th>
            <th>Pressure</th>
            <th>Coefficency</th>
            <th></th>
            <th>
              <Button
                onClick={() => {
                  alert('Add Button');
                }}
              >
                ADD
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{Pipes_Display}</tbody>
      </Table>
    </div>
  );
}

export default Pipes_Table;
