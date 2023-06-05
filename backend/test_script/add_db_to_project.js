// Whenver I am adding to a database to a prokect
// From the client, I need to call with the database_name and the project Id .
//You also need to check if the username had access to the project - Security feature to be implemented later. 

const fetch = require("node-fetch");

const url ='http://localhost:8000/add_db_to_a_project';
const data = {
    projectID: 4 , 
    database_name : 'Regular inventory'


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
