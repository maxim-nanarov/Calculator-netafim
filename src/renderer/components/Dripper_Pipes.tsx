import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dripper_Pipe() {
  const [Dripper_Pipes, setDripper_Pipe] = useState<any>(); //the table but as an array of objects
  const [Dripper_Pipes_Display, setDripper_Pipe_Display] = useState<any>(); // the display of the previous object
  const [Edit, setEdit] = useState<any>(); // an Dripper_type object
  const [EditDisplay, setEditDisplay] = useState<any>(); //the display for the previous object
  const [DeleteIndex, setDeleteIndex] = useState<number>();
  const [IsAdding, setIsAdding] = useState<boolean>(false);
  const [AddingDisplay, setAddingDisplay] = useState<any>();
  const [Updater, setUpdater] = useState<number>(0);
  const [changer, setChanger] = useState<boolean>(false);
  //from here the states are going to be related to pagination:
  const [paginationCounter, setPaginationCounter] = useState<number>(0);
  const [paginationDisplay, setPaginationDisplay] = useState<
    Array<JSX.Element[]>
  >([]);
  const [paginationDisplayFilterd, setPaginationDisplayFilterd] = useState<
    Array<JSX.Element[]>
  >([]);
  const [paginationIndex, setPaginationIndex] = useState<number>(0);
  let a: any;

  useEffect(() => {
    axios
      .get('http://localhost:3000/Dripper_Pipes')
      .then((res) => {
        setDripper_Pipe(res.data.data);
        setPaginationCounter(res.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Updater]);
  //pagination display component
  useEffect(() => {
    let a: any = [];
    console.log(paginationCounter / 10);
    for (let i = 0; i <= Math.ceil(paginationCounter / 10); i++) {
      a.push(
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => {
              setPaginationIndex(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    setPaginationDisplay(a);
  }, [paginationCounter]);
  useEffect(() => {
    let a = paginationDisplay.map((data: any, Index: number) => {
      if (paginationIndex - 2 > Index || paginationIndex + 2 < Index) {
        return <></>;
      } else {
        return data;
      }
    });
    setPaginationDisplayFilterd(a);
  }, [paginationIndex, paginationDisplay]);
  //the display
  useEffect(() => {
    let count = -1;
    if (Dripper_Pipes !== undefined) {
      let a = Dripper_Pipes.map((data: any, Index: number) => {
        count++;
        //if the tr is selected to be edited
        if (EditDisplay !== undefined && Edit.id === data.id) {
          return EditDisplay;
        }
        //if the tr is selected to be delted
        if (DeleteIndex === data.id) {
          return (
            <tr key={count}>
              <th>Deleted</th>
            </tr>
          );
        }
        console.log(paginationIndex, Math.round(Index / 10));
        if (Math.ceil(Index / 10) !== paginationIndex) {
          return <></>;
        }
        return (
          <tr key={count}>
            <th>{data.id}</th>
            <th>{data.Dripper_id}</th>
            <th>{data.Pipe_Model}</th>
            <th>{data.kd}</th>
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
                  Delete(data.id);
                }}
              >
                DELETE
              </Button>
            </th>
          </tr>
        );
      });
      setAddingDisplay(null);
      if (IsAdding) {
        setAddingDisplay(
          <div className="Adding-Dripper-Pipes">
            <form
              id="AddForm"
              className="Adding-Dripper-Pipes-from"
              onSubmit={Insert}
            >
              <input
                placeholder="Dripper Id"
                id="Dripper_Id"
                name="Dripper_Id"
              ></input>

              <input
                placeholder="Pipe Model"
                id="Pipe_Model"
                name="Pipe_Model"
              ></input>
              <input
                placeholder="kd of the pipe and drippers"
                id="kd"
                name="kd"
              ></input>

              <div>
                <Button
                  onClick={() => {
                    setIsAdding(!IsAdding);
                  }}
                >
                  Cancle
                </Button>

                <Button form="AddForm" type="submit" value="Submit">
                  Add
                </Button>
              </div>
            </form>
          </div>
        );
      }
      setDripper_Pipe_Display(a);
    }
  }, [
    Dripper_Pipes,
    EditDisplay,
    DeleteIndex,
    IsAdding,
    Updater,
    changer,
    paginationIndex,
  ]);
  //Edit
  useEffect(() => {
    if (Edit === undefined) return undefined;
    let helper = Edit;
    setEditDisplay(
      <tr>
        <th>{Edit.id}</th>
        <th>
          <input
            defaultValue={Edit.Dripper_id}
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
          <input
            defaultValue={Edit.kd}
            placeholder={Edit.kd}
            onChange={(e) => {
              helper.kd = e.target.value;
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
  // the delete function
  function Delete(Delete: number) {
    axios
      .post('http://localhost:3000/Delete_From_Dripper_Pipes', {
        id: Delete,
      })
      .then((res) => {
        setDeleteIndex(Delete);
        console.log('Success! ' + res);
        let num = Updater;
        num = num + 1;
        setUpdater(num++);
      })
      .catch((err) => {
        console.log('failed! ' + err);
      });
  }
  // the edit function
  function Submit() {
    // Update to the Dripper_Pipes Table
    axios
      .post('http://localhost:3000/Update_Dripper_Pipes', {
        id: Edit.id,
        Dripper_id: Edit.Dripper_id,
        Pipe_Model: Edit.Pipe_Model,
        kd: Edit.kd,
      })
      .then((res) => {
        setEdit(-1);
        let num = Updater;
        setUpdater(num++);
        console.log('Success! ' + res);
      })
      .catch((err) => {
        console.log('failed! ' + err);
      });
  }
  //the insert function
  function Insert(e: any) {
    e.preventDefault();
    let formData: any = new FormData(e.target);
    formData = Object.fromEntries(formData);
    axios
      .post('http://localhost:3000/Insert_Into_Dripper_Pipes', {
        Dripper_Id: formData.Dripper_Id,
        Pipe_Model: formData.Pipe_Model,
        kd: formData.kd,
      })
      .then((res) => {
        console.log(res);
        let num = Updater;
        num = num + 1;
        setUpdater(num);
        setChanger(!changer);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h1>Dripper and Pipe</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>Dripper Id</th>
            <th>Pipe Model</th>
            <th>kd</th>
            <th>Edit</th>
            <th>
              <Button
                onClick={() => {
                  setIsAdding(!IsAdding);
                }}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{Dripper_Pipes_Display}</tbody>
      </Table>
      {AddingDisplay}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                setPaginationIndex(0);
              }}
            >
              Previous
            </a>
          </li>
          {paginationDisplayFilterd}
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                setPaginationIndex(Math.ceil(paginationCounter / 10));
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
