import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dripper_Table() {
  const [Drippers, setDrippers] = useState<any>();
  const [Dripper_Display, setDripper_Display] = useState<any>();
  const [isAdding, setIsAdding] = useState<boolean>();
  const [AddDisplay, setAddDisplay] = useState<any>();
  const [Updater, setUpdater] = useState<number>(0);
  const [DeleteIndex, setDeleteIndex] = useState<number>();
  const [Edit, setEdit] = useState<any>();
  const [EditDisplay, setEditDisplay] = useState<any>();

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
    axios
      .get('http://localhost:3000/Drippers')
      .then((res) => {
        setDrippers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Updater]);

  useEffect(() => {
    let a: any;
    if (Drippers !== undefined) {
      let count = -1;
      a = Drippers.map((row: any) => {
        count++;
        if (DeleteIndex === row.id) return <></>;
        if (Edit !== undefined) {
          if (Edit.id === row.id) return EditDisplay;
        }
        return (
          <tr key={count}>
            <th>{row.id}</th>
            <th>{row.Dripper_Type}</th>
            <th>
              <Button
                onClick={() => {
                  setEdit(row);
                }}
              >
                Edit
              </Button>
            </th>
            <th>
              {' '}
              <Button
                onClick={() => {
                  Delete(row.id);
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
  }, [Drippers, DeleteIndex, EditDisplay]);

  useEffect(() => {
    if (Edit === undefined) {
      setEditDisplay(<></>);
    } else {
      let helper = Edit;
      setEditDisplay(
        <tr key="EditRow">
          <th>{Edit.id}</th>
          <th>
            <input
              placeholder="Dripper's name"
              defaultValue={Edit.Dripper_Type}
              onChange={(e) => {
                helper.Dripper_Type = e.target.value;
              }}
            ></input>
          </th>
          <th>
            <Button
              onClick={() => {
                Update(helper);
              }}
            >
              Update
            </Button>
          </th>
          <th>
            {' '}
            <Button
              onClick={() => {
                Delete(helper.id);
              }}
            >
              Delete
            </Button>
          </th>
        </tr>
      );
    }
  }, [Edit]);

  useEffect(() => {
    if (!isAdding) {
      setAddDisplay(<></>);
    } else {
      setAddDisplay(
        <div>
          <form
            id="AddForm"
            className="Adding-Dripper-Pipes-from"
            onSubmit={Insert}
          >
            <input
              placeholder="Name of the Dripper"
              name="Name"
              id="Name"
            ></input>
            <Button
              onClick={() => {
                setIsAdding(!isAdding);
              }}
            >
              Cancle
            </Button>
            <Button form="AddForm" type="submit" value="Submit">
              Insert
            </Button>
          </form>
        </div>
      );
    }
  }, [isAdding]);

  function Insert(e: any) {
    e.preventDefault();
    let formData: any = new FormData(e.target);
    formData = Object.fromEntries(formData);
    console.log(formData);
    axios
      .post('http://localhost:3000/Insert_Into_Dripper', { formData })
      .then((res) => {
        console.log('Success! ');
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

  function Delete(Index: number) {
    axios
      .post('http://localhost:3000/Delete_from_Dripper', { Index })
      .then((res) => {
        console.log(res);
        setDeleteIndex(Index);
        let num = Updater;
        num = num + 1;
        setUpdater(num);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Update(Edited: any) {
    console.log(Edited);
    axios
      .post('http://localhost:3000/Update_Dripper', { Edited })
      .then((res) => {
        console.log('Success! ');
        console.log(res);
        setEdit(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Drippers</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>Type</th>
            <th>Edit Button</th>
            <th>
              <Button
                onClick={() => {
                  setIsAdding(!isAdding);
                }}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{Dripper_Display}</tbody>
      </Table>
      {AddDisplay}
    </div>
  );
}
