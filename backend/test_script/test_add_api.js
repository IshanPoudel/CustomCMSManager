const fetch = require('node-fetch');


// Need to find a way to authenticate from the project_id and user_id
// Maybe need to do API calls at once and maintain ACID principles. 

//Generate api , need to supply generated_url form elsewhere. 

const url ='http://localhost:8000/generate_api';

   
const data = {
   api_name: 'Test',
   api_description: 'Test api' ,
   query : 'SELECT * FROM table_2',
   response_type: 'GET',
   on_error_response: 'Cannot get api' ,
   on_success_response: 'Yes can get api'
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

