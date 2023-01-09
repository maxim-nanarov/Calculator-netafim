import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dripper_Pipe() {
  const [Dripper_Pipes, setDripper_Pipe] = useState<any>();
  const [Dripper_Pipes_Display, setDripper_Pipe_Display] = useState<any>();
  let a: any;

  useEffect(() => {
    axios
      .get('http://localhost:3000/Dripper_Pipes')
      .then((res) => {
        setDripper_Pipe(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let count = -1;
    console.log(Dripper_Pipes);
    if (Dripper_Pipes !== undefined) {
      let a = Dripper_Pipes.map((data: any) => {
        count++;
        return (
          <tr key={count}>
            <th>{data.id}</th>
            <th>{data.Dripper_id}</th>
            <th>{data.Pipe_Model}</th>
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
      setDripper_Pipe_Display(a);
    }
  }, [Dripper_Pipes]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>Dripper Id</th>
          <th>Pipe Model</th>
          <th>Edit</th>
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
      <tbody>{Dripper_Pipes_Display}</tbody>
    </Table>
  );
}
