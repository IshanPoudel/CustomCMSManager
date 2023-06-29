import React, { useEffect, useState } from 'react';

const DisplayAPI = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_apis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectID: 8 }),
        });

        if (response.ok) {
          const data = await response.json();
          setApiData(data);
        } else {
          throw new Error('Failed to fetch API data');
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchAPIData();
  }, []);

  return (
    <div>
      <h1>API List:</h1>
      {apiData.length > 0 ? (
        <ul>
          {apiData.map((api) => (
            <li key={api.api_id}>
              <h3>{api.api_name}</h3>
              <p>{api.api_description}</p>
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
