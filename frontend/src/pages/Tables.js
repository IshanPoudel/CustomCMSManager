import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tables = () => {
  const { db_name, table_name } = useParams();

  const [records, setRecords] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [primaryKeyColumns, setPrimaryKeyColumns] = useState([]);
  const [columnDataType, setColumnDataType] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setColumnDataType(responseData.column_type);
      } else {
        setColumnNames(responseData.column_names);
        setPrimaryKeyColumns(responseData.primary_ids);
        setColumnDataType(responseData.column_type);
        setRecords([]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewRowData({});
    setErrorMessages({});
    setIsSuccess(false);
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const saveChanges = async () => {
    const url = 'http://localhost:8000/insert_into_table';
  
    const columns = [];
    const values = [];
  
    Object.entries(newRowData).forEach(([columnName, value]) => {
      if (!primaryKeyColumns.includes(columnName)) {
        columns.push(columnName);
        values.push(`'${value}'`);
      }
    });
  
    const query = `INSERT INTO ${table_name} (${columns.join(', ')}) VALUES (${values.join(', ')});`;
  
    const data = {
      database_name: db_name,
      table_name: table_name,
      values: newRowData, // Include the values object in the data
      query_to_run: query,
    };
  
    const isEmpty = Object.values(newRowData).some((value) => value === '');
    if (isEmpty) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }
  
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        const responseData = await response.json();
        console.log(responseData);
    
        if (responseData.success) {
          setIsSuccess(true);
          setNewRowData({}); // Reset the newRowData state
        } else {
          setErrorMessage(responseData.message);
        }
    
        closeModal();
        fetchTables();
      } catch (error) {
        console.log('Error:', error);
        setErrorMessage('An error occurred while saving the row.');
      }
  };
  

  const getColumnDataType = (columnName) => {
    const column = columnDataType.find((col) => col.COLUMN_NAME === columnName);
    return column ? column.DATA_TYPE : '';
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-bold mb-4">{table_name}</h2>
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={openModal}
          >
            Add Row
          </button>
        </div>
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              {columnNames.map((columnName) => (
                <th
                  key={columnName}
                  className="border px-4 py-2 bg-gray-200 font-medium text-gray-700"
                >
                  {columnName}{' '}
                  {primaryKeyColumns.includes(columnName) && (
                    <span className="text-yellow-500">*</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {columnNames.map((columnName) => (
                  <td
                    key={columnName}
                    className="border px-4 py-2 text-gray-800"
                  >
                    {record[columnName]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500 mb-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a9 9 0 100 18A9 9 0 0010 1zm4.293 6.293a1 1 0 00-1.32-.083l-.094.083-4 4a1 1 0 001.32 1.497l.094-.083L11 10.414l3.293 3.293a1 1 0 001.32-1.497l-.094-.083-4-4a1 1 0 00-.083-1.32l.083-.094a1 1 0 011.32-.083l.094.083L11 8.586l3.293-3.293a1 1 0 00-.083-1.32l-.094-.083z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-green-500 font-semibold">
                  Row added successfully!
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">Add Row</h2>
                {columnNames.map((columnName) => {
                  if (!primaryKeyColumns.includes(columnName)) {
                    return (
                      <div className="mb-4" key={columnName}>
                        <label className="text-gray-700 font-medium">
                          {columnName}{' '}
                          {primaryKeyColumns.includes(columnName) && (
                            <span className="text-yellow-500">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name={columnName}
                          className="border px-4 py-2 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
                          value={newRowData[columnName] || ''}
                          onChange={handleInputChange}
                        />
                        {errorMessages[columnName] && (
                          <p className="text-red-500 mt-1">
                            {errorMessages[columnName]}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
                {errorMessage && (
                  <p className="text-red-500 mt-1">{errorMessage}</p>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={saveChanges}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
