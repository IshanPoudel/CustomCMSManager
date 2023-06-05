// Given a db name , create a table. 
//For now just send the query
//In client side add visualization for easy making of the tables. 

const fetch = require("node-fetch");

const url ='http://localhost:8000/create_table';
const data = {
    
    database_name : 'Manga Sales',
    
    query_to_run : 'CREATE TABLE author(one_line TEXT);'


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
