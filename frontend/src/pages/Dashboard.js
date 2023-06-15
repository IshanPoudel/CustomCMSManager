import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const Dashboard = () => {

  const userState = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [projects , setProjects ] = useState([]);

 
  
  const fetchProjects = async () => {
    const url = 'http://localhost:8000/get_projects';
    const data = {
      userID: 3
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
      setProjects(responseData.message);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  
  useEffect(() => {
    fetchProjects();
  }, []);


  


  //Given the userId , you need to access projects. 


  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-black title-font mb-8"> Dashboard</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
            <div>
                {console.log(project.name)}
              <h2 className="text-3xl font-semibold mb-2 text-black-700">{project.project_name}</h2>
              <p className="text-gray-700">{project.project_description}</p>
            </div>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
              View Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;



  




   

   



 


  //Set projects , start with getting all projects. 


  



  
    


