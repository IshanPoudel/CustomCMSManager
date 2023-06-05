const fetch = require('node-fetch');


const url ='http://localhost:8000/check_user_login';
const data = {
    username: 'Ishan',
    password: 'passord'

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

