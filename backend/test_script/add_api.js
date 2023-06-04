//This adds an API and allows users to add it to the api_list table. 
//Need to keep track of  project_id and database_id.
//Also need to make sure that wrong users can't access it. 


//Payload.
//When calling from the client.
//For api 
// api_name 
// api_description
// query
// response_type
// on_error_response
// on_success_response


//Need user_id, project_id , database_id tp add to api_list. 
//Need to store user_id , project_id and database_id somewhere. 

// ------generated_Url - Need to create on server_side.


const { query, response } = require("express");
const fetch = require("node-fetch");

const url ='http://localhost:8000/add_api';
const data = {
    api_name : 'Second',
    api_description: 'Rudimentary API',
    query : 'SELECT * FROM table',
    response_type : 'GET',
    on_error_response: 'No query failed.',
    on_success_response: "Yes this is the response.",
    project_id : 1,
    database_id : 1


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
      })
      .catch(error=>
        {
            console.log('Error' , error)
        });

