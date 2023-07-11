import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateAPIForm from '../components/CreateAPIForm';
import { useLocation } from 'react-router-dom';

const Tables = () => {
  const { projectID ,db_name ,  } = useParams();

  const location = useLocation();

  const receivedProps = location.state;

  console.log(receivedProps.database_id)

  console.log(projectID)
  console.log(db_name)

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null); // Track the selected table
  const [tableData, setTableData] = useState([]); // Store the data for the selected table
  const [tableHeader , setTableHeader] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const fetchTables = async () => {
    const url = 'https://18.224.15.185:8000/get_tables';
    const data = {
      database_name: db_name
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      setTables(responseData.message);
    } catch (error) {
      console.log('Error in data', error);
    }
  };

  const fetchTableData = async (table_name) => {
    setIsLoading(true);

    const url = 'https://18.224.15.185:8000/select_from_table';
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
        setTableData(responseData.result);
        setTableHeader(responseData.column_names)
      } else {
        setTableData([]);
        setTableHeader(responseData.column_names)
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableClick = (table_name) => {
    // Check if the clicked table is already selected
    if (selectedTable === table_name) {
      setSelectedTable(null); // Deselect the table
    } else {
      setSelectedTable(table_name); // Select the table
      fetchTableData(table_name); // Fetch the table data
    }
  };

  useEffect(() => {
    fetchTables();
  }, [db_name]);

  return (


    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Database Name: {db_name}</h1>

        <CreateAPIForm message= {[db_name , projectID , receivedProps.database_id] }></CreateAPIForm>

        {tables.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Tables:</h2>
            {tables.map((table, index) => {
                const tableName = table['Tables_in_' + db_name];
                return (
                    <div
                    key={index}
                    className={`flex items-center mb-2 bg-white p-4 rounded-md shadow ${
                        selectedTable === tableName ? 'bg-blue-200' : ''
                    }`}
                    onClick={() => handleTableClick(tableName)}
                    >
                    <div className="mr-2">{tableName}</div>
                    {selectedTable === tableName && (
                        <>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
                            onClick={(event) => handleTableClick(tableName, db_name, event)}
                        >
                            {isLoading ? 'Loading...' : 'View Data'}
                        </button>
                        {isLoading ? (
                            <p>Loading data...</p>
                        ) : (
                            <div className="mt-4">
                            <h2 className="text-2xl font-bold mb-2">Table Data: {selectedTable}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border">
                                <thead>
                                    <tr className="bg-gray-200">
                                    {tableData.length > 0 &&
                                        tableHeader.map((columnName, index) => (
                                        <th
                                            key={index}
                                            className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-bold text-gray-700"
                                        >
                                            {columnName}
                                        </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.length > 0 &&
                                    tableData.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                        {tableHeader.map((columnName, index) => (
                                            <td
                                            key={index}
                                            className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm"
                                            >
                                            {row[columnName]}
                                            </td>
                                        ))}
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>
                        )}
                        </>
                    )}
                    </div>
                );
                })}

          </div>
        )}

       
      </div>
    </div>
  );
};

export default Tables;
