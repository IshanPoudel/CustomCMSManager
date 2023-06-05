const fetch = require('node-fetch');


// Need to find a way to authenticate from the project_id and user_id
// Maybe need to do API calls at once and maintain ACID principles. 

//Get userID once you log in.

const url ='http://localhost:8000/create_project';
const data = {
    userID:'3' , 
    projectName : 'Nike Shoe Sale Price' , 
    projectDescription: 'Added distinct shoe sale price' 

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

