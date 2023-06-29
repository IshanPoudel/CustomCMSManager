//Given the userId , you need to access projects. 

const fetch = require("node-fetch");

const url ='http://localhost:8000/get_apis';
const data = {
    projectID:8


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
