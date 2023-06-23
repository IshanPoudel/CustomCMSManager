import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tables = () => {
  const { db_name, table_name } = useParams();

  const [records, setRecords] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [primaryKeyColumns, setPrimaryKeyColumns] = useState([]);
  const [recordChanges, setRecordChanges] = useState({});
  const [generatedQueries, setGeneratedQueries] = useState([]);

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

  const handleColumnValueChange = (recordIndex, columnName, event) => {
    const updatedRecords = [...records];
    updatedRecords[recordIndex][columnName] = event.target.value;
    setRecords(updatedRecords);

    const updatedRecordChanges = { ...recordChanges };
    updatedRecordChanges[recordIndex] = true;
    setRecordChanges(updatedRecordChanges);
  };

  const handleAddRow = () => {
    const newRow = {};
    columnNames.forEach((columnName) => {
      newRow[columnName] = '';
    });

    const updatedRecords = [...records];
    updatedRecords.push(newRow);
    setRecords(updatedRecords);

    const updatedRecordChanges = { ...recordChanges };
    updatedRecordChanges[updatedRecords.length - 1] = true;
    setRecordChanges(updatedRecordChanges);
  };

  const handleDeleteRow = (recordIndex) => {
    const updatedRecords = [...records];
    updatedRecords[recordIndex].isDeleted = true;
    setRecords(updatedRecords);

    const updatedRecordChanges = { ...recordChanges };
    updatedRecordChanges[recordIndex] = true;
    setRecordChanges(updatedRecordChanges);
  };

  const handleSaveChanges = () => {
    const modifiedRecords = [];
    const deletedRecords = [];
    const addedRecords = [];

    records.forEach((record, recordIndex) => {
      if (recordChanges[recordIndex]) {
        if (record.isDeleted) {
          deletedRecords.push(record);
        } else if (record.isNew) {
          addedRecords.push(record);
        } else {
          modifiedRecords.push(record);
        }
      }
    });

    const generatedQueries = [];

    modifiedRecords.forEach((record) => {
      const primaryKeyValues = [];
      primaryKeyColumns.forEach((columnName) => {
        primaryKeyValues.push(`${columnName}='${record[columnName]}'`);
      });
      const setValues = [];
      columnNames.forEach((columnName) => {
        if (!primaryKeyColumns.includes(columnName)) {
          setValues.push(`${columnName}='${record[columnName]}'`);
        }
      });
      const query = `UPDATE ${table_name} SET ${setValues.join(',')} WHERE ${primaryKeyValues.join(' AND ')};`;
      generatedQueries.push(query);
    });

    deletedRecords.forEach((record) => {
      const primaryKeyValues = [];
      primaryKeyColumns.forEach((columnName) => {
        primaryKeyValues.push(`${columnName}='${record[columnName]}'`);
      });
      const query = `DELETE FROM ${table_name} WHERE ${primaryKeyValues.join(' AND ')};`;
      generatedQueries.push(query);
    });

    addedRecords.forEach((record) => {
      const columns = [];
      const values = [];
      columnNames.forEach((columnName) => {
        if (!primaryKeyColumns.includes(columnName)) {
          columns.push(columnName);
          values.push(`'${record[columnName]}'`);
        }
      });
      const query = `INSERT INTO ${table_name} (${columns.join(',')}) VALUES (${values.join(',')});`;
      generatedQueries.push(query);
    });

    setGeneratedQueries(generatedQueries);
  };

  const renderTable = () => {
    if (records.length === 0) {
      return (
        <table className="min-w-full bg-white border border-gray-300">
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

    const filteredRecords = records.filter((record) => !record.isDeleted);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
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
          <tbody>
            {filteredRecords.map((record, recordIndex) => {
              const actualIndex = records.findIndex((r) => r === record);
              return (
                <tr key={actualIndex}>
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
                          onChange={(event) => handleColumnValueChange(actualIndex, columnName, event)}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => handleDeleteRow(actualIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
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
          onClick={handleAddRow}
        >
          Add Row
        </button>
        <button
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded focus:outline-none"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        {generatedQueries.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Generated Queries:</h2>
            <ul className="list-disc pl-8">
              {generatedQueries.map((query, index) => (
                <li key={index}>{query}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;
