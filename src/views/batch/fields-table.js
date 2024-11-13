import React from 'react';
import "./batch.scss";

const FieldsTable = ({ data }) => {
  return (
    <table border="1" className='field-table'>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className='field-table-tr'>{key}</td>
            <td className='field-table-tr'>{value}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

export default FieldsTable;
