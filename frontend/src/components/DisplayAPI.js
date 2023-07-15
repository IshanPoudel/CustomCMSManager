import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DisplayAPI = ({ projectID }) => {

  //get userID from redux



  const userState = useSelector((store) => store.user);

  const [apiData, setApiData] = useState([]);
  const [showOthers, setShowOthers] = useState(false);


  const fetchAPIData = async () => {
    try {
      const response = await fetch('https://rapiddb.link/get_apis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectID: projectID }),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      setApiData(responseData.message);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    

    fetchAPIData();
  }, []);

  const toggleShowOthers = () => {
    setShowOthers(!showOthers);
  };

  const renderJson = (jsonString) => {
    try {
      const parsedJson = JSON.parse(jsonString);
      return (
        <pre className="p-2 bg-gray-100 rounded overflow-auto text-gray-800">{JSON.stringify(parsedJson, null, 2)}</pre>
      );
    } catch (error) {
      console.log('Invalid JSON:', error.message);
      return <p>{jsonString}</p>;
    }
  };

  // const handleDelete = async(apiID) =>
  // {

  //   const url = 'https://rapiddb.link/delete_api';
  //   const data = {
  //     userID: userState.userId ,
  //     projectID: projectID , 
  //     apiID: apiID
  //   }

  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     });

  //     const responseData = await response.json();
  //     console.log('Response:', responseData);

      
  //   } catch (error) {
      
  //     console.log('Error in data', error);
  //   }




  // }

  const handleDelete = async (apiID) => {
    const url = 'https://rapiddb.link/delete_api';
    const data = {
    userID: userState.userId ,
    projectID: projectID , 
    apiID: apiID,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      console.log(responseData);

      //Fetch tables agasin'
      fetchAPIData();
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API List:</h1>
      {apiData.length > 0 ? (
        <ul className="space-y-4">
          {apiData.map((api) => (
            <li key={api.api_id} className="border rounded p-4">
              <div className="bg-gray-100 p-2 mb-2 rounded">
                <h3 className="text-xl font-bold text-gray-900">{api.generated_url}</h3>
              </div>
              {!showOthers && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={toggleShowOthers}
                >
                  Show Others
                </button>
                
                
              )}
              {showOthers && (
                <div>
                  <div className="mb-4">
                    <label className="font-bold">Description:</label>
                    <p className="mb-2 font-bold">{api.api_description}</p>
                  </div>
                  <div className="mb-4">
                    <label className="font-bold">Generated URL:</label>
                    
                    <p className="mb-2">{'https://rapiddb.link/' +api.generated_url}</p>
                  </div>
                  <div className="mb-4">
                    <label className="font-bold">Response Type:</label>
                    <p className="mb-2">{api.response_type}</p>
                  </div>
                  <div className="mb-4">
                    <label className="font-bold">On Error:</label>
                    {renderJson(api.on_error_response)}
                  </div>
                  <div className="mb-4">
                    <label className="font-bold">On Success:</label>
                    {renderJson(api.on_success_response)}
                  </div>
                  <button onClick={()=>handleDelete(api.api_id)}>
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={toggleShowOthers}
                  >
                    Hide Others
                  </button>

                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading API data...</p>
      )}
    </div>
  );
};

export default DisplayAPI;
