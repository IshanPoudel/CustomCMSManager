import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tables = () => {
  const { db_name, table_name } = useParams();

  const [records, setRecords] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [primaryKeyColumns, setPrimaryKeyColumns] = useState([]);
  const [columnDataType, setColumnDataType] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRow, setSelectedRow] = useState({});

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

  const openDeleteModal = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedRow({});
    setIsDeleteModalOpen(false);
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

  const deleteRow = async () => {
    // Check if there are primary key columns
    if (primaryKeyColumns.length === 0) {
      console.log('No primary key columns found.');
      return;
    }
  
    // Retrieve the primary key values from the selected row
    const primaryKeyValues = primaryKeyColumns.map((column) => selectedRow[column]);
  
    // Generate the SQL query for deletion based on the primary key values
    const tableName = table_name;
    const primaryKeys = primaryKeyColumns.join(' AND ');
    const deleteQuery = `DELETE FROM ${tableName} WHERE ${primaryKeys} = '${primaryKeyValues.join("' AND ")}';`;
  
    // Log the SQL query for debugging
    console.log('Delete Query:', deleteQuery);
  
    const apiUrl = 'http://localhost:8000/delete_from_table'; // Replace with your actual API endpoint
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteQuery }),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Handle the response from the API
      if (responseData.success) {
        // Row deleted successfully
        closeDeleteModal();
        fetchTables(); // Refresh the table data after deletion
      } else {
        // Error occurred while deleting the row
        console.log(responseData.message);
        // TODO: Handle the error response as needed
      }
    } catch (error) {
      console.log('Error:', error);
      // TODO: Handle the error as needed
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
              <th
                className="border px-4 py-2 bg-gray-200 font-medium text-gray-700"
                style={{ minWidth: '80px' }}
              >
                Actions
              </th>
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
                <td className="border px-4 py-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => openDeleteModal(record)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-4 max-w-md z-10">
            <h3 className="text-xl font-bold mb-4">Add Row</h3>
            <div className="space-y-4">
              {columnNames.map((columnName) => (
                !primaryKeyColumns.includes(columnName) && (
                  <div key={columnName}>
                    <label
                      htmlFor={columnName}
                      className="block font-medium text-gray-700"
                    >
                      {columnName}{' '}
                      {primaryKeyColumns.includes(columnName) && (
                        <span className="text-yellow-500">*</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id={columnName}
                      name={columnName}
                      className="border border-gray-300 px-3 py-2 rounded w-full"
                      value={newRowData[columnName] || ''}
                      onChange={handleInputChange}
                    />
                    {errorMessages[columnName] && (
                      <p className="text-red-500">{errorMessages[columnName]}</p>
                    )}
                  </div>
                )
              ))}
            </div>

            <div className="mt-4">
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {isSuccess && (
                <p className="text-green-500">Row added successfully.</p>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={saveChanges}
              >
                Save
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-4 max-w-md z-10">
            <h3 className="text-xl font-bold mb-4">Delete Row</h3>
            <p className="mb-4">Are you sure you want to delete this row?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={deleteRow}
              >
                Delete
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
