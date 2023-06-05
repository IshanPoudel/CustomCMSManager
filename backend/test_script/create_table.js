// Given a db name , create a table. 
//For now just send the query
//In client side add visualization for easy making of the tables. 


//Check is user_id has access to the database.
const fetch = require("node-fetch");

const url ='http://localhost:8000/create_table';
const data = {

    userId: 1,
    
    database_name : 'Paintings to Ship',
    
    query_to_run : 'CREATE TABLE Auctions(name TEXT, price TEXT , location TEXT  );'


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
