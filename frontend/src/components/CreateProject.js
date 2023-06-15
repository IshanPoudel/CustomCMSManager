import React, { useState } from 'react';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateProject = () => {
    const url = 'http://localhost:8000/create_project';
    const data = {
      userID: '3',
      projectName: projectName,
      projectDescription: projectDescription,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response', data);
        setSuccessMessage('Project successfully created!');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  return (
    <div>
      <h2>Create Project</h2>
      <div>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="projectDescription">Project Description:</label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleCreateProject}>Create Project</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default CreateProject;
