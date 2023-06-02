const fetch = require('node-fetch');


// Need to find a way to authenticate from the project_id and user_id
// Maybe need to do API calls at once and maintain ACID principles. 

const url ='http://localhost:8000/create/database';
const data = {
    databaseName:'Images_for_get_new'

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
            console.error('Error' , error)
        });