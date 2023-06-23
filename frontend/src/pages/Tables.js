import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tables = () => {
  const { db_name, table_name } = useParams();

  // Has the actual records
  const [records, setRecords] = useState([]);
  // Has columnNames
  const [columnNames, setColumnNames] = useState([]);
  // Has primaryKeyColumns
  const [primaryKeyColumns, setPrimaryKeyColumns] = useState([]);
  // Track changes in each record
  const [recordChanges, setRecordChanges] = useState({});

  const fetchTables = async () => {
    const url = 'http://localhost:8000/select_from_table';
    const data = {
      database_name: db_name,
      table_name: table_name,
      query_to_run: `SELECT * FROM ${table_name};`,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData.result);
      console.log(responseData);

      if (responseData.result.length > 0) {
        setRecords(responseData.result);
        setColumnNames(responseData.column_names);
        setPrimaryKeyColumns(responseData.primary_ids);
      } else {
        setColumnNames(responseData.column_names);
        setPrimaryKeyColumns(responseData.primary_ids);
        setRecords([]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

// Handle column value changes
const handleColumnValueChange = (recordIndex, columnName, event) => {
  const updatedRecords = [...records];
  updatedRecords[recordIndex][columnName] = event.target.value;
  setRecords(updatedRecords);

  const updatedRecordChanges = { ...recordChanges };
  updatedRecordChanges[recordIndex] = true;
  setRecordChanges(updatedRecordChanges);
};


  

  const renderTable = () => {
    if (records.length === 0) {
      return (
        <table className="min-w-full bg-white border border-gray-300">
          {/* Table headers */}
          <thead>
            <tr>
              <th
                className="px-6 py-3 bg-gray-100 border-b border-gray-300 font-semibold text-gray-700"
                colSpan={columnNames.length}
              >
                The table is empty.
              </th>
            </tr>
          </thead>
        </table>
      );
    }
  
    // Filter out deleted records
    const filteredRecords = records.filter((record) => !record.isDeleted);
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          {/* Table headers */}
          <thead>
            <tr>
              {columnNames.map((columnName) => (
                <th
                  key={columnName}
                  className="px-6 py-3 bg-gray-100 border-b border-gray-300 font-semibold text-gray-700"
                >
                  {columnName}
                </th>
              ))}
              <th className="px-6 py-3 bg-gray-100 border-b border-gray-300"></th>
            </tr>
          </thead>
  
          {/* Table body */}
          <tbody>
            {filteredRecords.map((record, recordIndex) => (
              <tr key={recordIndex}>
                {columnNames.map((columnName) => (
                  <td
                    key={columnName}
                    className={`px-6 py-4 whitespace-nowrap ${
                      primaryKeyColumns.includes(columnName) ? 'font-semibold' : ''
                    }`}
                  >
                    {primaryKeyColumns.includes(columnName) ? (
                      record[columnName]
                    ) : (
                      <input
                        type="text"
                        className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        value={record[columnName] || ''}
                        onChange={(event) => handleColumnValueChange(recordIndex, columnName, event)}
                      />
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Tables</h1>
        <p className="text-lg mb-2">Database Name: {db_name}</p>
        <p className="text-lg mb-2">Table Name: {table_name}</p>
        {renderTable()}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
          
        >
          Add Row
        </button>
        <button
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded focus:outline-none"
          
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Tables;
