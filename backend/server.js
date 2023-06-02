// This assumes the user is already logged in. Once prototyped , add functionality for logging in.

const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const mysql = require('mysql');
const queries = require('./queries.js')




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
            connection.query('USE main_database;');
        })
    

    }
    catch(err)
    {
        console.log(err)
        console.log("Could not connect to database. ")

    }
}


startServer().then(()=>
{
  app.use(express.json());

  app.get("/" , (req , res)=>
  {
    res.send('Hello World');
  })


  //Create a database for a project.
  app.post("/create/database" , (req,res)=>
  {

    //TODO: Add functionality for db sanitization.

    // Need to also login the project_id and user_id.
    console.log("I got called");
    const databaseName = req.body.databaseName;

    console.log("The request was")
    console.log(databaseName)

    query_and_param = queries.createDatabase(databaseName)

    console.log(query_and_param);
    const query_sql = query_and_param.query;
    const params = query_and_param.params;

    connection.query(query_sql , params , (error , result)=>
    {
        if (error)
        {
            console.error("Error inserting in the database "+ error)
            // Message sent upon variable
            res.status(500).json({error: "Failed to create user"});
            return;
        }
        
        //Message sent when not created succesfully.
        res.status(201).json({message:"Database created succesfully"});
    });

    //Once db is created , you need to add db to project. 
    //Need to send db_id as a repsonse message.

  })

  //Create a new user. 
  app.post("/create/newuser" , (req, res)=>
  {
    console.log("New user got called");


    //Get the required headers. 
    const payload = req.body;

    const username= payload.username ;
    const email = payload.email;
    const password = payload.password;

    console.log(username)
    console.log(email) 
    console.log(password)

    //Add additional checks here





    //Load query form queries.js

    query_and_param = queries.createNewUser(username ,email , password)
    const query_sql = query_and_param.query;
    const params = query_and_param.params;

    connection.query(query_sql , params , (error , result)=>
    {
        if (error)
        {
            console.error("Error creating userName"+ error)
            // Message sent upon variable
            res.status(500).json({error: "Failed to create user"});
            return;
        }
        
        //Message sent when not created succesfully.
        res.status(201).json({message:"User created succesfully"});
    });





  })
  

//   Create a new project
  app.post('/create_project' , (req , res)=>
  {
    console.log('I got called')
    const payload = req.body;
    
    //  Make sure to get userID from somewhere.
    const userID= payload.userID ;
    const projectName = payload.projectName;
    const projectDescription = payload.projectDescription;
    

    query_and_param = queries.createProject(userID , projectName , projectDescription)

    const query_sql = query_and_param.query;
    const params = query_and_param.params;

    connection.query(query_sql , params , (error , result)=>
    {
        if (error)
        {
            console.error("Error creating project"+ error)
            // Message sent upon variable
            res.status(500).json({error: "Failed to create projectr"});
            return;
        }
        
        //Message sent when not created succesfully.
        res.status(201).json({message:"Project created succesfully"});
    });






  })

  //Add db to project. //Given the projectId and databaseId you can add things to there. 
  app.post('/add_db_to_project' , (req, res)=>
  {
    const payload = req.body;

    const projectID = payload.projectID 
    const databaseId = payload.databaseId

    query_and_param = queries.createProjectDatabase(projectID , databaseId)

    const query_sql = query_and_param.query;
    const params = query_and_param.params;

    connection.query(query_sql , params , (error , result)=>
    {
        if (error)
        {
            console.error("Error adding database to the project"+ error)
            // Message sent upon variable
            res.status(500).json({error: "Failed to add database to the project"});
            return;
        }
        
        //Message sent when not created succesfully.
        res.status(201).json({message:"Succesfully added database to the project"});
    });








  });
  

  //Generate api project.
  app.post('/generate_api' , (req , res)=>
  {
    // We won't have everything in the request form , we would need to add generatedURL ourselves. 

    // api_name , api_description, query , response_type , on_error_response , on_success_response
    //get project_id , database_id , canned_query
    const payload = req.body;

    const api_name = payload.api_name;
    const api_description = payload.api_description;
    const query = payload.query;
    const response_type = payload.response_type;
    const on_error_response = payload.on_error_response;
    const on_success_response = payload.on_success_response;
    

    //Find a way to generate a const API URL 
    const api_url = 'localhost/add_user_id/project_id/db_id'
   

    query_and_param = queries.createAPI(api_name , api_description , query , response_type , on_error_response , on_success_response , api_url);

    const query_sql = query_and_param.query;
    const params = query_and_param.params;

    console.log(query_sql , params)

    connection.query(query_sql , params , (error , result)=>
    {
        if (error)
        {
            console.error("Error generating API"+ error)
            // Message sent upon variable
            res.status(500).json({error: "Failed to generate API"});
            return;
        }
        
        //Message sent when not created succesfully.
        res.status(201).json({message:"Succesfully generated API"});
    });

    //Once you generate api , you need to add it to the api_database , use transactionl later on . 
    //Also need to store the api_id that you get after the table has been created.
    



  }) 


  



});

// At this point , our app should be listening. 

//LIsten for and send request to login
//Listen for and send request to chekcback in
//Program for canned queries. 






