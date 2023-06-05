//See all tables in a database;

const fetch = require("node-fetch");

const url ='http://localhost:8000/get_tables';
const data = {
    
    database_name : 'Manga Sales'


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
