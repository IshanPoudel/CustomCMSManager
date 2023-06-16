import React, { useState } from 'react';

const CreateProject = (props) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateProject = async (event) => {
    event.preventDefault();

    console.log('I called the create Project API');
    console.log(props);

    // Make the API call to add the database
    const url = 'http://localhost:8000/create_project';
    const data = {
      userID: props.userId,
      projectName: projectName,
      projectDescription: projectDescription,
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
      console.log('Response:', responseData);

      // Display success message
      if (responseData.message === 'Project created successfully') {
        setSuccessMessage('Project Successfully created');
        // Clear the form
        setProjectName('');
        setProjectDescription('');
      } else {
        setSuccessMessage('');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Project</h2>
      <div className="mb-4">
        <label htmlFor="projectName" className="text-black">
          Project Name:
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="projectDescription" className="text-black">
          Project Description:
        </label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        ></textarea>
      </div>
      <button
        onClick={handleCreateProject}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create Project
      </button>
      {successMessage && <p className="text-black mt-4">{successMessage}</p>}
    </div>
  );
};

export default CreateProject;
