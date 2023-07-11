import React, { useState } from 'react';

const CreateProject = (props) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateProject = async (event) => {
    event.preventDefault();

    // Make the API call to add the database
    const url = 'http://18.224.15.185:8000/create_project';
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

      // Display success message
      if (responseData.message === 'Project created succesfully') {
        setSuccessMessage('Project Successfully created');
        // Clear the form
        setProjectName('');
        setProjectDescription('');
        props.onProjectCreated();
      } else {
        setSuccessMessage('');
        setErrorMessage(responseData.error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const isButtonDisabled = projectName === '' || projectDescription === '';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gray-200 p-4 mb-4">
        <h2 className="text-3xl font-bold">Create Project</h2>
      </div>
      <div className="mb-4">
        <label htmlFor="projectName" className="text-xl">
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
        <label htmlFor="projectDescription" className="text-xl">
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
        className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-600"
        disabled={isButtonDisabled}
      >
        Create Project
      </button>
      {successMessage && <p className="text-black mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red mt-4">{errorMessage}</p>}
    </div>
  );
};

export default CreateProject;
