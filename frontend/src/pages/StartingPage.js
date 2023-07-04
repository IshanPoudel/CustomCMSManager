import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../components/Dashboard';
import CreateProject from '../components/CreateProject';

const StartingPage = () => {
  const userState = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    console.log('I got called to send projects');
    const url = 'http://localhost:8000/get_projects';
    const data = {
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
      console.log('Response:', responseData);
      setProjects(responseData.message);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    fetchProjects();
  };

  return (
    <div>
      <div>Starting Page</div>
      <Dashboard projects_to_send={projects} />
      <CreateProject userId={userState.userId} onProjectCreated={handleProjectCreated} />
    </div>
  );
};

export default StartingPage;
