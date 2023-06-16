import React, { useState } from 'react';

const CreateTables = (props) => {

  console.log(props)
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '', primaryKey: false, size: '' }]);
  const [errors, setErrors] = useState([]);

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleColumnNameChange = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = event.target.value;
    setColumns(updatedColumns);
  };

  const handleColumnTypeChange = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].type = event.target.value;
    setColumns(updatedColumns);
  };

  const handlePrimaryKeyChange = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].primaryKey = event.target.checked;
    setColumns(updatedColumns);
  };

  const handleSizeChange = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].size = event.target.value;
    setColumns(updatedColumns);
  };

  const addColumn = () => {
    setColumns([...columns, { name: '', type: '', primaryKey: false, size: '' }]);
  };

  const removeColumn = (index) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  const validateForm = () => {
    let formIsValid = true;
    const errors = [];

    if (!tableName.trim()) {
      formIsValid = false;
      errors.push('Table name is required.');
    }

    for (let i = 0; i < columns.length; i++) {
      const { name, type } = columns[i];

      if (!name.trim() || !type.trim()) {
        formIsValid = false;
        errors.push('Column name and type are required for all columns.');
        break;
      }

      if (!/^(INT|VARCHAR|TEXT)$/i.test(type)) {
        formIsValid = false;
        errors.push(`Invalid column type '${type}'. Only 'INT', 'VARCHAR', and 'TEXT' are allowed.`);
        break;
      }

      if (type.toUpperCase() === 'VARCHAR' && !columns[i].size.trim()) {
        formIsValid = false;
        errors.push(`Size is required for 'VARCHAR' type.`);
        break;
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      let query = `CREATE TABLE \`${tableName}\` (`;
  
      for (let i = 0; i < columns.length; i++) {
        const { name, type, primaryKey, size } = columns[i];
        let columnDefinition = `\`${name}\` ${type}`;
  
        if (primaryKey) {
          columnDefinition += ' PRIMARY KEY';
        }
  
        if (type.toUpperCase() === 'VARCHAR') {
          columnDefinition += `(${size})`;
        }
  
        query += `${columnDefinition}, `;
      }
  
      query = query.slice(0, -2);
      query += ');';
  
      console.log(query);
  
      // TODO: Perform the API call or database operation to create the table

      // Call API and create the query. Once the query is created, clear the forms.
      const url ='http://localhost:8000/create_table';
      const data = {
        userId: 1,
        database_name: 'Inventory',
        query_to_run: query
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response', data);
        })
        .catch(error => {
          console.log('Error', error);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Create Table</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tableName" className="text-sm font-medium text-gray-700">
            Table Name:
          </label>
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={handleTableNameChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Columns:</h3>
          {errors.length > 0 && (
            <div className="mb-2">
              {errors.map((error, index) => (
                <div key={index} className="text-sm text-red-500">
                  {error}
                </div>
              ))}
            </div>
          )}
          {columns.map((column, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Column Name"
                value={column.name}
                onChange={(event) => handleColumnNameChange(event, index)}
                className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select
                value={column.type}
                onChange={(event) => handleColumnTypeChange(event, index)}
                className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="INT">INT</option>
                <option value="VARCHAR">VARCHAR</option>
                <option value="TEXT">TEXT</option>
              </select>
              {column.type.toUpperCase() === 'VARCHAR' && (
                <input
                  type="text"
                  placeholder="Size"
                  value={column.size}
                  onChange={(event) => handleSizeChange(event, index)}
                  className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={column.primaryKey}
                  onChange={(event) => handlePrimaryKeyChange(event, index)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-700">Primary Key</span>
              </label>
              <button
                type="button"
                onClick={() => removeColumn(index)}
                className="px-2 py-1 text-sm text-red-500"
              >
                Remove Column
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addColumn}
            className="px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            Add Column
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Table
        </button>
      </form>
    </div>
  );
};

export default CreateTables;
