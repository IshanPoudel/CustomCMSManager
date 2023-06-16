import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateTables from '../components/CreateTables';

const Databases = () => {
  const { name } = useParams();
  const userState = useSelector((store) => store.user);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Database Name: {name}</h1>
        <CreateTables params= {[name , userState.userId] } />
      </div>
    </div>
  );
};

export default Databases;
