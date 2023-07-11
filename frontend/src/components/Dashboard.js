import React, { useEffect, useState } from 'react';
import { navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = ({ projects_to_send, onProjectDeleted }) => {
  const navigate = useNavigate();

  const userState = useSelector((store) => store.user);

  console.log(userState);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);

  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    const url = 'http://18.224.15.185:8000/delete_project';
    const data = {
      userID: userState.userId,
      projectID: projectId,
    };

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
      onProjectDeleted();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Do something with the projects_to_send data
    console.log('Dashboard -> Projects:', projects_to_send);
  }, [projects_to_send]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-black title-font mb-8">Dashboard</h1>
      {projects_to_send.length === 0 ? (
        <p>You don't have any projects yet!</p>
      ) : (
        <ul>
          {projects_to_send.map((project) => (
            <li
              key={project.project_id}
              className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-3xl font-semibold mb-2 text-black-700">{project.project_name}</h2>
                <p className="text-gray-700">{project.project_description}</p>
              </div>
              <div className="flex">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                  onClick={() => handleViewProject(project.project_id)}
                >
                  View Project
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => setShowDeleteConfirmation(project.project_id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-2"
                onClick={() => {
                  handleDeleteProject(showDeleteConfirmation);
                  setShowDeleteConfirmation(null);
                }}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowDeleteConfirmation(null)}
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

export default Dashboard;
