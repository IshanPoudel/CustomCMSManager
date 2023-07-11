import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import CreateDatabases from '../components/CreateDatabases';
import { useNavigate} from 'react-router-dom';
// import { DisplayAPI } from '../components/DisplayAPI';

const Projects = () => {
  const { id } = useParams();
  const userState = useSelector((store) => store.user);
  const [databases, setDatabases] = useState([]);
  const navigate =useNavigate();

  const fetchDatabases = async () => {
    const url = 'https://18.224.15.185:8000/get_databases';
    const data = {
      projectID: id,
      userID: userState.userId,
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
      console.log('This are all the databases');
      console.log('Response:', responseData);

      setDatabases(responseData.message)
    }catch(error)
    {
      console.log('Error in data')
    }
  
     
  };

  const handleDeleteDatabase = async(db_id)=>
  {
    const url = 'https://18.224.15.185:8000/delete_database';
    const data = {
        userID: userState.userId , 
        projectID: id,
        dbID:db_id,

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
      
      console.log('Response:', responseData);

      if (responseData.message==='Succesful')
      {
        fetchDatabases();
      }

      

      
    }catch(error)
    {
      console.log('Error in data')
    }



  }
  

  useEffect(() => {
    fetchDatabases();
  }, [id, userState.userId]);

  const onDatabaseChange = ()=>
  {
    
    fetchDatabases();
  }


  

  

  const handleViewTables = (databaseName, projectId , database_id ) => {
    // Add your logic to handle the "View Tables" button click for the specified database
    console.log('View tables for:', databaseName, 'in project:', projectId);
    navigate(`/database/${databaseName}/${projectId}` , {state: {database_id: database_id}});
  };


  return (
    <div>
      <div>Project ID: {id}</div>
      <div>User ID: {userState.userId}</div>
      {databases.length === 0 ? (
        <div>No databases</div>
      ) : (
        databases.map((database) => (
          <div key={database.database_name} className="border-2 border-gray-200 rounded-lg p-4 mb-4">
            <div
              className="cursor-pointer text-lg font-semibold mb-2 hover:text-blue-500"
              
            >
              {database.database_name}
            </div>
            <button
              className="bg-green-500 text-white rounded-lg px-4 py-2"
              onClick={() => handleViewTables(database.database_name , id , database.database_id)}
            >
              View Tables
            </button>
            <button 
            className='bg-red-500 text-white rounded-lg px-4 py-2'
            onClick={()=>handleDeleteDatabase(database.database_id)}>
              Delete Database
            </button>
            
          </div>
        ))
      )}
      <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
        <CreateDatabases payload={[parseInt(id), userState.userId , onDatabaseChange ]} />
        {/* <DisplayAPI payload={[id]}/> */}
      </div>
    </div>
  );
};

export default Projects;
