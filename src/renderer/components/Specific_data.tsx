import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function Specific_data(prop: any) {
  const [Display, setDisplay] = useState<any>();
  const [id, setId] = useState<number>();
  const [checked, setChecked] = useState<number>(-1);
  const [DripperData, setDripperData] = useState<any>();
  const [SData, setSData] = useState<any>();

  useEffect(() => {
    setId(prop.id);
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Get_Specified_Data?id=${id}`)
      .then((res) => {
        setDripperData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (SData !== undefined) {
      console.log(SData);
      console.log(prop);
      prop.onDataChange(SData);
    }
  }, [SData]);

  const handleChange = (data: any) => {
    console.log(data);
    console.log(prop.onDataChange(data));
  };

  useEffect(() => {
    if (DripperData !== undefined) {
      let count = -1;
      const a = DripperData.map((data: any) => {
        count++;
        return (
          <tr key={count}>
            <th>
              <input
                type="radio"
                checked={checked === data.Data_id}
                onChange={() => {
                  setChecked(data.Data_id);
                  handleChange(data);
                }}
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
      setDisplay(a);
    }
  }, [DripperData, checked]);

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
