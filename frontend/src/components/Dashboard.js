import React from 'react';
import {navigate, useNavigate} from 'react-router-dom';

const Dashboard = (props) => {

  const navigate = useNavigate();

  const handleViewProject = (projectId)=>
  {
    navigate(`/project/${projectId}`);

  }


  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-black title-font mb-8">Dashboard</h1>
      {props.projects_to_send.length === 0 ? (
        <p>You don't have any projects yet!</p>
      ) : (
        <ul>
          {props.projects_to_send.map((project) => (
            <li key={project.project_id} className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-2 text-black-700">{project.project_name}</h2>
                <p className="text-gray-700">{project.project_description}</p>
              </div>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={()=>handleViewProject(project.project_id)} >
                View Project
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
