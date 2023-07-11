import React, { useState } from 'react';

const CreateAPIForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [apiName, setApiName] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const [responseType, setResponseType] = useState('');
  const [onErrorResponse, setOnErrorResponse] = useState([{ key: '', value: '' }]);
  const [onSuccessResponse, setOnSuccessResponse] = useState([{ key: '', value: '' }]);
  const [syntaxError, setSyntaxError] = useState(false);

  const [APISuccessMessage , setAPISuccessMessage] = useState(null);

 
  

  

  console.log(props.message[0])
  const db = props.message[0]
  const projectID = parseInt(props.message[1])
  const db_id = parseInt(props.message[2])

  console.log(db , projectID , db_id)
  
  

  const databaseName = db;
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform syntax checks on the SQL query and validate other inputs
    if (sqlQuery === '') {
      setSyntaxError(true);
      return;
    }

    console.log(databaseName , sqlQuery , apiName , apiDescription , JSON.stringify(responseType) , JSON.stringify(onErrorResponse) , onSuccessResponse);


    

    // Send the API creation request to the server
    
    const url ='https://18.224.15.185:8000/add_api';
    const data = {
        api_name : apiName,
        api_description: apiDescription,
        query : sqlQuery,
        response_type : responseType,
        on_error_response: JSON.stringify(onErrorResponse),
        on_success_response: JSON.stringify(onSuccessResponse),
        project_id : projectID,
        database_id : db_id

    };

    fetch(url , 
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
          .then(response=>response.json())
          .then(data=>{
            console.log('Response' , data);
            if (data.api_id != null)
            {
              setAPISuccessMessage("Succesfully created API")
            }
            // setAPISuccessMessage(JSON.stringify(data));

            setTimeout(() => {
              setAPISuccessMessage(null);
            }, 3000);
          })
          .catch(error=>
            {
                console.log('Error' , error)
            });



    // Reset the form fields
    setSqlQuery('');
    setApiName('');
    setApiDescription('');
    setResponseType('');
    setOnErrorResponse([{ key: '', value: '' }]);
    setOnSuccessResponse([{ key: '', value: '' }]);
    setSyntaxError(false);
    setAPISuccessMessage(null)
  };

  const addKeyValuePair = () => {
    setOnSuccessResponse([...onSuccessResponse, { key: '', value: '' }]);
  };

  const removeKeyValuePair = (index) => {
    const updatedResponse = [...onSuccessResponse];
    updatedResponse.splice(index, 1);
    setOnSuccessResponse(updatedResponse);
  };

  const handleKeyChange = (index, key) => {
    const updatedResponse = [...onSuccessResponse];
    updatedResponse[index].key = key;
    setOnSuccessResponse(updatedResponse);
  };

  const handleValueChange = (index, value) => {
    const updatedResponse = [...onSuccessResponse];
    updatedResponse[index].value = value;
    setOnSuccessResponse(updatedResponse);
  };

  const addErrorKeyValuePair = () => {
    setOnErrorResponse([...onErrorResponse, { key: '', value: '' }]);
  };

  const removeErrorKeyValuePair = (index) => {
    const updatedResponse = [...onErrorResponse];
    updatedResponse.splice(index, 1);
    setOnErrorResponse(updatedResponse);
  };

  const handleErrorKeyChange = (index, key) => {
    const updatedResponse = [...onErrorResponse];
    updatedResponse[index].key = key;
    setOnErrorResponse(updatedResponse);
  };

  const handleErrorValueChange = (index, value) => {
    const updatedResponse = [...onErrorResponse];
    updatedResponse[index].value = value;
    setOnErrorResponse(updatedResponse);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create API</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="max-w-md mt-4 bg-gray-100 p-4 rounded-md">
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded-md">
              <label htmlFor="databaseName" className="block font-medium mb-1">
                Database Name:
              </label>
              <input
                type="text"
                id="databaseName"
                value={databaseName}
                readOnly
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className={`bg-gray-200 p-2 rounded-md ${syntaxError ? 'border-red-500' : 'border-gray-300'}`}>
              <label htmlFor="sqlQuery" className="block font-medium mb-1">
                SQL Query:
              </label>
              <textarea
                id="sqlQuery"
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="border px-3 py-2 rounded-md w-full resize-none bg-transparent"
              />
            </div>
            {syntaxError && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid SQL query.</p>
            )}
          </div>
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded-md">
              <label htmlFor="apiName" className="block font-medium mb-1">
                API Name:
              </label>
              <input
                type="text"
                id="apiName"
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded-md">
              <label htmlFor="apiDescription" className="block font-medium mb-1">
                API Description:
              </label>
              <textarea
                id="apiDescription"
                value={apiDescription}
                onChange={(e) => setApiDescription(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full resize-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded-md">
              <label htmlFor="responseType" className="block font-medium mb-1">
                Response Type:
              </label>
              <select
                id="responseType"
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              >
                <option value="">Select response type</option>
                <option value="POST">POST</option>
                <option value="GET">GET</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded-md">
              <label htmlFor="onErrorResponse" className="block font-medium mb-1">
                On Error Response:
              </label>
              {onErrorResponse.map((response, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    value={response.key}
                    onChange={(e) => handleErrorKeyChange(index, e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md w-1/2 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={response.value}
                    onChange={(e) => handleErrorValueChange(index, e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md w-1/2"
                  />
                  <button
                    type="button"
                    onClick={() => removeErrorKeyValuePair(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addErrorKeyValuePair}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Add Key-Value Pair
              </button>
              <p className="text-sm text-gray-500 mt-1">
                Use JSON syntax to specify the error response structure.
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded-md">
              <label htmlFor="onSuccessResponse" className="block font-medium mb-1">
                On Success Response:
              </label>
              {onSuccessResponse.map((response, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    value={response.key}
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md w-1/2 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={response.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md w-1/2"
                  />
                  <button
                    type="button"
                    onClick={() => removeKeyValuePair(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyValuePair}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Add Key-Value Pair
              </button>
              <p className="text-sm text-gray-500 mt-1">
                Use JSON syntax to specify the success response structure.
                Use the special keyword "$result" to include the result of the SQL query.
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            
            Create API
          </button>
          {APISuccessMessage && (
          <label className="text-green-500 block mt-2">
            {APISuccessMessage}
          </label>
        )}
          
        </form>
      )}
    </div>
  );
};

export default CreateAPIForm;
