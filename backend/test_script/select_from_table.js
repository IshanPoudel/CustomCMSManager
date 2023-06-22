// Given the individual table and the db_name , enumerate it . 

// Add different views to it .

//Return the result. 

//You can change the query to return different views. 

//Need to make sure the correct user has access to the database. 
//When you create the database. 

//Can be both select and insert
//For insert the same query can be used.

const fetch = require("node-fetch");

const url ='http://localhost:8000/select_from_table';
const data = {
    database_name: 'Ecommerce Project',
    table_name: 'Auctions',
    query_to_run: "SELECT * from Auctions;",
  };
  
// 
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
