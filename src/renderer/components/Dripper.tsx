import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dripper_Table() {
  const [Drippers, setDrippers] = useState<any>();
  const [Dripper_Display, setDripper_Display] = useState<any>();

  useEffect(() => {
    axios
      .get('http://localhost:3000/Drippers')
      .then((res) => {
        setDrippers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let a: any;
    if (Drippers !== undefined) {
      let count = -1;
      a = Drippers.map((row: any) => {
        count++;
        return (
          <tr key={count}>
            <th>{row.id}</th>
            <th>{row.Dripper_Type}</th>
            <th>
              <Button
                onClick={() => {
                  alert(row.id);
                }}
              >
                Edit
              </Button>
            </th>
            <th>
              {' '}
              <Button
                onClick={() => {
                  alert(row.id);
                }}
              >
                Delete
              </Button>
            </th>
          </tr>
        );
      });
      setDripper_Display(a);
    } else {
      console.log(
        'Drippers is null, or something that just the life cycle beeing weird'
      );
    }
  }, [Drippers]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>Type</th>
          <th>Edit Button</th>
          <th>
            <Button
              onClick={() => {
                alert('Add Button');
              }}
            >
              Add
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>{Dripper_Display}</tbody>
    </Table>
  );
}
