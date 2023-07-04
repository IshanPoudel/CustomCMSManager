// #Given the username and id delete project 
const fetch = require("node-fetch");
// delete based on the userID and projectID.
const url = 'http://localhost:8000/delete_database';
const data = {
    userID: 1 , 
    projectID: 37,
    dbID:2,

}

// const userID = payload.userID;
// const projectID = payload.projectID;
// const dbID = payload.dbID;

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

  