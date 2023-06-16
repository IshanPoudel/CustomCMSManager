import React, { useState } from 'react';

const CreateDatabases = (props) => {
  const [databaseName, setDatabaseName] = useState('');
  const [databaseDescription, setDatabaseDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const id = props.payload[0];
  console.log(props);

  console.log('The projectID is');
  console.log(id);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log('I called the API');

    // Make the API call to add the database
    const url = 'http://localhost:8000/add_db_to_a_project';
    const data = {
      projectID: props.payload[0],
      database_name: databaseName,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log( responseData);

      // Display success message
      if (responseData === 'Transaction completed succesfully') {
        setSuccessMessage('Database added successfully');
        // Clear the form
        setDatabaseName('');
        setErrorMessage('');
      } else {
        setErrorMessage(responseData);
        setSuccessMessage('');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Database</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="databaseName" className="block font-bold mb-1">
              Database Name:
            </label>
            <input
              type="text"
              id="databaseName"
              value={databaseName}
              onChange={(event) => setDatabaseName(event.target.value)}
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
        {errorMessage && <div className="my-4 text-red-500">{errorMessage.error}</div>}
      </div>
    </div>
  );
};

export default CreateDatabases;
