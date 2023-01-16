import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function Specific_data(prop: any) {
  const [Display, setDisplay] = useState<any>();
  const [id, setId] = useState<number>();
  const [checked, setChecked] = useState(false);
  const [DripperData, setDripperData] = useState<any>();
  useEffect(() => {
    setId(prop.id);
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Get_Specified_Data?id=${id}`)
      .then((res) => {
        console.log(prop.id);
        console.log(res.data.data);
        setDripperData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    let a = <></>;
    if (DripperData !== undefined) {
      let count = -1;
      a = DripperData.map((data: any) => {
        count++;
        console.log('Data');
        console.log(data);
        return (
          <tr>
            <th>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                value={data}
              ></input>
            </th>
            <th>{data.Dripper_id}</th>
            <th>{data.flow_rate}</th>
            <th>{data.Exponent}</th>
            <th>{data.Pressure}</th>
            <th>{data.k}</th>
          </tr>
        );
      });
    }
    setDisplay(a);
  }, [DripperData]);

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setChecked(event.target.checked); // update state when checkbox value changes
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>choose</th>
          <th>dripper id</th>
          <th>flow rate (Q L/H)</th>
          <th>Exponent (X)</th>
          <th>Pressure (Meter) </th>
          <th>Coefficency (K)</th>
        </tr>
      </thead>
      <tbody>{Display}</tbody>
    </Table>
  );
}
