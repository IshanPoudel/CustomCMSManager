const fetch = require("node-fetch");

const url ='http://localhost:8000/get_databases';
const data = {
    projectID: 4 , 
    userID: 3


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
