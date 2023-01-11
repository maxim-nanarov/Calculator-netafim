import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Pipes_Table() {
  const [Pipes, setPipes] = useState<any>();
  const [Pipes_Display, setPipes_Display] = useState<any>();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [AddDisplay, setAddDsiplay] = useState<any>();
  const [Updater, setUpdater] = useState<number>(0);
  const [DeletedIndex, setDeletedIndex] = useState<number>();
  const [Edit, setEdit] = useState<any>();
  const [EditDisplay, setEditDisplay] = useState<any>();
  //two display functions.
  //the one below (the without any parameters in the array)
  //is activating only when the page is loading the first
  //time
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
  //in here it will load everytime the updater will be changed.
  useEffect(() => {
    axios
      .get('http://localhost:3000/Pipes')
      .then((res) => {
        setPipes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Updater]);

  let a: any;
  useEffect(() => {
    if (Pipes !== undefined) {
      let count = -1;
      a = Pipes.map((row: any) => {
        if (DeletedIndex === row.Models) {
          return <></>;
        }
        count++;
        // if eddingdisplay !== undefined

        if (EditDisplay !== undefined && Edit.Models === row.Models) {
          return EditDisplay;
        }
        return (
          <tr key={count}>
            <th>{row.Models}</th>
            <th>{row.Diameter}</th>
            <th>{row.Pressure}</th>
            <th>{row.kd}</th>
            <th>
              <Button
                onClick={() => {
                  setEdit(row);
                }}
              >
                EDIT
              </Button>
            </th>
            <th>
              <Button
                onClick={() => {
                  Delete(row.Models);
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

    if (isAdding) {
      setAddDsiplay(
        <div>
          <form
            id="AddForm"
            className="Adding-Dripper-Pipes-from"
            onSubmit={Insert}
          >
            <input placeholder="Model" name="Model" id="Model"></input>
            <input placeholder="Diameter" name="Diameter" id="Diameter"></input>
            <input placeholder="Pressure" name="Pressure" id="Pressure"></input>
            <input placeholder="Coefficency" name="kd" id="kd"></input>
            <Button form="AddForm" type="submit" value="Submit">
              INSERT
            </Button>
          </form>
        </div>
      );
    } else {
      setAddDsiplay(<></>);
    }
  }, [Pipes, isAdding, DeletedIndex, EditDisplay]);

  useEffect(() => {
    if (Edit === undefined) setEditDisplay(<></>);

    if (Edit !== undefined) {
      let helper = Edit;
      console.log(helper);

      setEditDisplay(
        <tr key="EditRow">
          <th>{helper.Models}</th>
          <th>
            <input
              placeholder="Diameter"
              defaultValue={helper.Diameter}
              onChange={(e) => {
                helper.Diameter = e.target.value;
              }}
            ></input>
          </th>
          <th>
            <input
              placeholder="Pressure"
              defaultValue={helper.Pressure}
              onChange={(e) => {
                helper.Pressure = e.target.value;
              }}
            ></input>
          </th>
          <th>
            <input
              placeholder="Coefficent"
              defaultValue={helper.kd}
              onChange={(e) => {
                helper.kd = e.target.value;
              }}
            ></input>
          </th>
          <th>
            <Button
              onClick={() => {
                Update(helper);
              }}
            >
              EDIT
            </Button>
          </th>
          <th>
            <Button
              onClick={() => {
                Delete(helper.Models);
              }}
            >
              DELETE
            </Button>
          </th>
        </tr>
      );
    }
  }, [Edit]);

  function Insert(e: any) {
    //the insert function
    e.preventDefault();
    let formData: any = new FormData(e.target);
    formData = Object.fromEntries(formData);
    console.log(formData);
    axios
      .post('http://localhost:3000/Insert_Into_Pipes', { data: { formData } })
      .then((res) => {
        console.log(res);
        setIsAdding(!isAdding);
        let num = Updater;
        num = num + 1;
        setUpdater(num);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Delete(Model: number) {
    console.log(Model);
    axios
      .post('http://localhost:3000/Delete_From_Pipes', { Model })
      .then((res) => {
        setDeletedIndex(Model);
        console.log(res);
        console.log('Worked');
      })
      .catch((err) => {
        console.log('Error: ');
        console.log(err);
      });
  }

  function Update(Edited: any) {}

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
                  setIsAdding(!isAdding);
                }}
              >
                ADD
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{Pipes_Display}</tbody>
      </Table>
      {AddDisplay}
    </div>
  );
}

export default Pipes_Table;
