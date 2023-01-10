import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dripper_Pipe() {
  const [Dripper_Pipes, setDripper_Pipe] = useState<any>(); //the table but as an array of objects
  const [Dripper_Pipes_Display, setDripper_Pipe_Display] = useState<any>(); // the display of the previous object
  const [Edit, setEdit] = useState<any>(); // an Dripper_type object
  const [EditDisplay, setEditDisplay] = useState<any>(); //the display for the previous object
  // const [Add, setAdd] = useState()<any>();
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
        if (EditDisplay !== undefined && Edit.id === data.id) {
          return EditDisplay;
        }
        return (
          <tr key={count}>
            <th>{data.id}</th>
            <th>{data.Dripper_id}</th>
            <th>{data.Pipe_Model}</th>
            <th>
              <Button
                onClick={() => {
                  setEdit(data);
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
  }, [Dripper_Pipes, EditDisplay]);
  //Edit
  useEffect(() => {
    if (Edit === undefined) return undefined;
    let helper = Edit;
    setEditDisplay(
      <tr>
        <th>{Edit.id}</th>
        <th>
          <input
            defaultValue={Edit.Dripper_id} // ToDo: will need to find if the dripper exist in order to continue
            placeholder={Edit.Dripper_id}
            onChange={(e) => {
              helper.Dripper_id = e.target.value;
            }}
          ></input>
        </th>
        <th>
          <input
            defaultValue={Edit.Pipe_Model}
            placeholder={Edit.Pipe_Model}
            onChange={(e) => {
              helper.Pipe_Model = e.target.value;
            }}
          ></input>
        </th>
        <th>
          <Button
            onClick={() => {
              setEdit(helper);
              Submit();
            }}
          >
            Submit
          </Button>
        </th>
        <th>
          <Button
            onClick={() => {
              alert('DELETE: ' + Edit.id);
            }}
          >
            DELETE
          </Button>
        </th>
      </tr>
    );
  }, [Edit]);

  function Submit() {
    // Update to the Dripper_Pipes Table
    console.log(Edit);
    axios
      .post('http://localhost:3000/Update_Dripper_Pipes', {
        id: Edit.id,
        Dripper_id: Edit.Dripper_id,
        Pipe_Model: Edit.Pipe_Model,
      })
      .then((res) => {
        setEdit(-1);
        console.log('Success! ' + res);
      })
      .catch((err) => {
        console.log('failed! ' + err);
      });
  }

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
