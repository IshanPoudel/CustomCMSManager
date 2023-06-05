// Get all the databases for theuser. 

const fetch = require("node-fetch");


const url ='http://localhost:8000/get_databases';
const data = {
    projectID: 3 , 
    userID: 2


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
