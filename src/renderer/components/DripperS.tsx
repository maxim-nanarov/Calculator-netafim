import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DripperS() {
  const [DripperData, setDripperData] = useState<any>();
  const [Dripper_Data_Display, setDripper_Data_Display] = useState<any>();
  const [Edit, setEdit] = useState<any>();
  const [DeleteIndex, setDelete] = useState<any>();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [AddingDisplay, setAddingDisplay] = useState<any>();
  const [EditDisplay, setEditDisplay] = useState<any>();
  const [Updater, setUpdater] = useState<number>(0);
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
    axios
      .get('http://localhost:3000/DData')
      .then((res) => {
        setDripperData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Updater]);
  //Display
  useEffect(() => {
    let count = -1;
    if (DripperData !== undefined) {
      let a = DripperData.map((data: any) => {
        count++;
        if (EditDisplay !== undefined && Edit.Data_id === data.Data_id)
          return EditDisplay;

        return (
          <tr key={count}>
            <th>{data.Data_id}</th>
            <th>{data.Dripper_id}</th>
            <th>{data.flow_rate}</th>
            <th>{data.Exponent}</th>
            <th>{data.Pressure}</th>
            <th>{data.k}</th>
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
                  console.log(data.Data_id);
                  setDelete(data.Data_id);
                  Delete();
                }}
              >
                DELETE
              </Button>
            </th>
          </tr>
        );
      });
      if (isAdding) {
      }
      setDripper_Data_Display(a);
    }
  }, [DripperData, EditDisplay, isAdding, Updater]);

  useEffect(() => {
    if (isAdding) {
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
              placeholder="flow rate"
              id="Flow_Rate"
              name="Flow_Rate"
            ></input>
            <input
              placeholder="Coefficency"
              id="Coefficency"
              name="Coefficency"
            ></input>
            <input placeholder="Pressure" id="Pressure" name="Pressure"></input>
            <input placeholder="Exponent" id="Exponent" name="Exponent"></input>
            <div>
              <Button
                onClick={() => {
                  setIsAdding(!isAdding);
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
    } else {
      setAddingDisplay(<></>);
    }
  }, [isAdding, Updater]);

  useEffect(() => {
    if (Edit === undefined) return undefined;
    let helper = Edit;
    setEditDisplay(
      <tr>
        <th>{Edit.Data_id}</th>
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
            defaultValue={Edit.flow_rate}
            placeholder={Edit.flow_rate}
            onChange={(e) => {
              helper.flow_rate = e.target.value;
            }}
          ></input>
        </th>
        <th>
          <input
            defaultValue={Edit.Exponent}
            placeholder={Edit.Exponent}
            onChange={(e) => {
              helper.Exponent = e.target.value;
            }}
          ></input>
        </th>
        <th>
          <input
            defaultValue={Edit.Pressure}
            placeholder={Edit.Pressure}
            onChange={(e) => {
              helper.Pressure = e.target.value;
            }}
          ></input>
        </th>
        <th>
          <input
            defaultValue={Edit.k}
            placeholder={Edit.k}
            onChange={(e) => {
              helper.k = e.target.value;
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
              alert('DELETE: ' + Edit.Data_id);
            }}
          >
            DELETE
          </Button>
        </th>
      </tr>
    );
  }, [Edit]);

  function Submit() {
    //Edit function
    axios
      .post('http://localhost:3000/Update_Drippers_Data', {
        data: { Edit },
      })
      .then((res) => {
        setEdit(-1);
        let num: number = Updater;
        num = num + 1;
        setUpdater(num);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Delete() {
    console.log(DeleteIndex);
    axios
      .post('http://localhost:3000/Delete_From_Dripper_Data', {
        id: DeleteIndex,
      })
      .then((res) => {
        let num = Updater;
        num = num + 1;
        setUpdater(num);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Insert(e: any) {
    e.preventDefault();
    let formData: any = new FormData(e.target);
    formData = Object.fromEntries(formData);
    axios
      .post('http://localhost:3000/Insert_Into_Dripper_Data', {
        data: { formData },
      })
      .then((res) => {
        let num = Updater;
        num = num + 1;
        setUpdater(num);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Drippers Data</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Data Id</th>
            <th>dripper id</th>
            <th>flow rate (Q L/H)</th>
            <th>Exponent (X)</th>
            <th>Pressure (Meter) </th>
            <th>Coefficency (K)</th>
            <th></th>
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
        <tbody>{Dripper_Data_Display}</tbody>
      </Table>
      {AddingDisplay}
    </div>
  );
}
