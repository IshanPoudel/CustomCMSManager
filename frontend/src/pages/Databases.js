import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateTables from '../components/CreateTables';
import { useNavigate } from 'react-router-dom';

const Databases = () => {
  const { name , projectID } = useParams();

  console.log(name)
  console.log(projectID)

  const userState = useSelector((store) => store.user);

  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  const fetchTables = async () => {
    const url = 'http://localhost:8000/get_tables';
    const data = {
      database_name: name
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

  const handleViewData = (table_name, db_name, event) => {
    event.preventDefault();
    console.log('About to navigate to .');
    navigate(`/viewTable/${db_name}/${table_name}`, { replace: true });
  };

  const handleCreateAPI = () => {
    navigate(`/createAPI/${projectID}/${name}/`); // Replace '/createAPI' with the actual path of your CreateAPI page
  };

  useEffect(() => {
    fetchTables();
  }, [userState.userId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="createTables">
          <h1 className="text-3xl font-bold mb-4">Database Name: {name}</h1>
          <CreateTables params={[name, userState.userId]} />
        </div>

        {tables.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Tables:</h2>
            {tables.map((table, index) => (
              <div
                key={index}
                className="flex items-center mb-2 bg-white p-4 rounded-md shadow"
              >
                <div className="mr-2">{table[Object.keys(table)[0]]}</div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={(event) =>
                    handleViewData(table[Object.keys(table)[0]], name, event)
                  }
                >
                  View Data
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleCreateAPI}
        >
          Create API
        </button>
      </div>
    </div>
  );
};

export default Databases;
