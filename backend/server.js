// This assumes the user is already logged in. Once prototyped , add functionality for logging in.

const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const mysql = require('mysql');






let connection=''
// Connect to mysql

// Reading from a file is the same as fetching from an api , you need to handle both cases. 

const startServer = async()=>
{
    try
    {
        // Try reading in the data from the config file. 
        const jsonData = await fs.promises.readFile('server_config.json' , {encoding:'utf-8'} );
        // If succesfully read. 
        
        
        // Start the server. 
        port = JSON.parse(jsonData).port



        app.listen(port , ()=>
        {
            console.log(`Server is running on Port ${port}`);
        })

        // Initiate mysql connection. 

        await connectToSql();

        
        


    }
    catch(err)
    {
        console.log(err)
        process.exit()

    }
}

const connectToSql = async()=>
{
    try
    {
        // Try reading in the data from the config file. 
        const jsonData = await fs.promises.readFile('api_keys.json' , {encoding:'utf-8'} );
        // If succesfully read. 
        
        // Start the server. 
        masterUser = JSON.parse(jsonData).master_user

        

        db_endpoint = masterUser.db_endpoint
        username = masterUser.username
        password_user = masterUser.password
        port_num = masterUser.port

         // Initiate mysql connection. 

        connection = mysql.createConnection({
            host: db_endpoint , 
            user : username , 
            password: password_user ,
            port: port_num
             
            
        });

        // console.log(db_endpoint)

        connection.connect((error)=>
        {
            if (error)
            {
                console.error("Error connecting to the database" + error.stack)
                return;
            }

            console.log('Connected to the master_database ');
        })
    

    }
    catch(err)
    {
        console.log(err)
        console.log("COuld not connect to database. ")

    }
}


startServer().then(()=>
{
  app.get("/" , (rew , res)=>
  {
    res.send('Hello World');
  })

});

// At this point , our app should be listening. 

//LIsten for and send request to login
//Listen for and send request to chekcback in
//Program for canned queries. 






