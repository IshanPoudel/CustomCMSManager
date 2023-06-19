// This assumes the user is already logged in. Once prototyped , add functionality for logging in.

const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const mysql = require('mysql');
const queries = require('./queries.js')

const inidvidual_db_routes = require('./routes/individual_db_transactions.js');
const { error } = require("console");
const jwt = require ('jsonwebtoken');
const { json } = require("body-parser");


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
        
        
        
        
        jwt_access_token_secret = masterUser.access_token_secret
        jwt_refresh_token_secret = masterUser.refresh_token_secret

        

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
        console.log("Could not connect to database. ")

    }
}


startServer().then(()=>
{
  //Added cors for api calls from different locations
  app.use(cors());
  app.use(express.json());

  app.get("/" , (req , res)=>
  {
    res.send('Hello World');
  })


  //_______________________MASTER TRANSACTIONS__________________________--

  // Add a database to a project. Given a project add databases to it.
  app.post("/add_db_to_a_project" , (req , res)=>
  {
    //Get parameters from the api project_id and database name


    //Use main_database //Add databse to databases_table , add db_id to projects table , create the database. 
    const payLoad = req.body;

    console.log(payLoad)

    const projectID = payLoad.projectID;
    const database_name=payLoad.database_name;

    console.log('This is the params I got')
    console.log(projectID , database_name);

    connection.query('USE main_database;');

    connection.beginTransaction((err)=>
    {
        if (err)
        {
            console.log("Encountered an error");
            return;


        }
        
        //Start the queries. 

        //1. Insert into db
        const query_and_param = queries.createDatabase(database_name);

        const query_sql = query_and_param.query;
        const params = query_and_param.params;
        
        

        console.log(query_sql , params);

        connection.query(query_sql , params , (error, result1)=>
        {
            if (error)
            {
                console.log('Error executing query1: ' + error);
                connection.rollback(()=>
                {
                    console.error('Transaction rolled back');
                    res.status(500).json({ error: "Failed to create user" });



                });
                return;
            }

            //Get the result back form the query. 
            //Get the database_id back
            console.log(result1)
            const database_id = result1.insertId;

            console.log("This is the database id I got after the first query")
            console.log(database_id)

            //Insert into project id
            const second_query_and_param = queries.createProjectDatabase(projectID , database_id);
            const second_query = second_query_and_param.query;
            const second_params= second_query_and_param.params;


            //Execute second query
            connection.query(second_query , second_params , (error , result2)=>
            {
                if (error)
                {
                    console.error("Error executing second query ")
                    console.log(error)
                    connection.rollback(()=>
                    {
                        connection.rollback(()=>
                        {
                            console.error('Transaction rolled back');
                            res.status(500).json({ error: "Failed to create user" });

                        });
                        
                    })
                    return;

                }

                

                connection.query(queries.initializeDatabase(database_name) , (error , result3)=>
                {
                    if (error)
                    {
                        console.error("Error executing second query ")
                        console.log(error)
                        connection.rollback(()=>
                        {
                            res.status(500).json({ error: "Failed to create database" });


                        })
                        return;

                    }

                    console.log("Database succesfully initialized.")

                    connection.commit((commitError)=>
                    {
                        if (commitError)
                        {
                            console.error('Error comitting the transaction')
                            connection.rollback(()=>
                            {
                                console.log('Transaction rolled back')
                                res.status(500).json({error:'Failed to create user'});
    
                            });
                        }
                        return;
                    })
    
                     // Commit the transaction
            
    
                    res.status(200).json("Transaction completed succesfully");
    
               
                });
                

                //No error, Final.

               


            })
            
    
        });




    })

    

  



  })


 
  //Create a new user. 
  app.post("/add_new_user" , (req, res)=>
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

    query_and_param =  queries.createNewUser(username ,email , password)

    console.log(query_and_param)
    const query_sql = query_and_param.query;
    const params = query_and_param.params;

    console.log(query_sql , params)

    

    // // Check if password failed.
    // if (params[2]==='')
    // {
    //     res.status(500).json({error:'Failed to create account. Try again'})
    // }

    connection.query('USE main_database;');

    connection.query(query_sql , params , (error , result)=>
    {
        if (error)
        {
            console.error("Error creating userName"+ error)
            // Message sent upon variable
            res.status(500).json({error: "Failed to create user: Stack trace: " + error });
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

    connection.query('USE main_database;');

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
        res.status(201).json({message:"Project created succesfully" , id: result.insertId});
    });






  })


  //Generate api and add to api_generator
  app.post('/add_api' , (req , res)=>
  {

    console.log("I got called")

    

    //Get params. 
    const payLoad = req.body;

    const api_name = payLoad.api_name;
    const api_description = payLoad.api_description;
    const query_to_add = payLoad.query;
    const response_type = payLoad.response_type;
    const on_error_response = payLoad.on_error_response;
    const on_success_response = payLoad.on_success_response;
    const project_id = payLoad.project_id;
    const database_id = payLoad.database_id;

    //Need a way to generate a url
    const generated_url = `${api_name}/${project_id}/${database_id}`

    //Begin transaction. 

    connection.query('USE main_database;');

    connection.beginTransaction((err)=>
    {
        if (err)
        {
            console.log("I encountered an error");
        }


        //First query . Add to api

        const query_and_param = queries.createAPI(api_name , api_description , query_to_add , response_type , 
            on_error_response , on_success_response , generated_url );
        const first_query = query_and_param.query;
        const first_param = query_and_param.params;

        connection.query(first_query , first_param , (error , result1)=>
        {
            if (error)
            {
                console.error("Error executing query " + first_query );
                connection.rollback(()=>
                {
                    console.error('Transaction rolled back');
                    res.status(500).json({ error: "Failed to create api" });



                });
                
                return;

            }

            //Get the result back from the second query
            //Get api_id bacl
            console.log('First query added');
            const api_id = result1.insertId;


            //Get the second query and param
            const second_query_and_param =  queries.addAPItoProject( project_id , database_id , api_id);
            const second_query = second_query_and_param.query;
            const second_param = second_query_and_param.params;

            //Start conection
            console.log(second_query , second_param);

            connection.query(second_query ,second_param , (error , result2)=>
            {
                if (error)
                {
                    console.error("Error executing second query " + error)
                    connection.rollback(()=>
                    {
                        console.error('Transaction rolled back');
                        res.status(500).json({ error: "Failed to create api" });



                    });
                    return;

                }

                //No error. Commit

                connection.commit((commitError)=>
                {
                    if (commitError)
                    {
                        console.error('Error comitting the transaction')
                        connection.rollback(()=>
                        {
                            console.log('Transaction rolled back')
                            res.status(500).json({error:'Failed to create user'});

                        });
                    }
                    
                    
                });

                //Send succes message.

                res.status(200).json({api_id:api_id});






            })



            
        })

        






        

    }
    )


  })


  app.post('/check_user_login' , (req , res)=>
  {
    // run sql query and see if there is a 
    const payLoad = req.body;

    const username = payLoad.username;
    const password = payLoad.password;

    query_and_param = queries.loginUser(username , password);
    first_query = query_and_param.query;
    first_param = query_and_param.params;

    console.log(first_query , first_param)

    // if (first_param[1]==='')
    // {
    //     res.status(500).json({error:'Failed to create user'})
    //     return;
    // }

    connection.query('USE main_database;');

    connection.query(first_query , first_param ,  (error , result)=>
    {
        if (error)
        {
            console.log('Could not perform login. ');
            res.status(500).json({error:"Failed to login user"});
            return;

        }

        if (result === null || result.length===0)
        {
            console.log("Password or email wrong.")
            res.status(401).json({error:"Failed to login.Incorrect username or password." , user_id: '-1'});
            return;
        }
        else
        {

            const user = {name:username }
            const accessToken = jwt.sign(user , jwt_access_token_secret )
            console.log("User succesfully logged in. ")
            res.status(200).json({message: 'User succesfully authenticated.' , user_id: result , accessToken : accessToken , username:username});

        }
    })
  });
   
  //Get all the databases for a user and a project. 

  app.post('/get_databases' , (req, res)=>
  {
    const payLoad = req.body;

    const user_id = payLoad.userID;
    const project_id = payLoad.projectID;

    console.log('this is the request I got')
    console.log(req.body)

    query_to_run = queries.getDatabases(project_id , user_id);
    connection.query('USE main_database;')
    connection.query(query_to_run , (error , result)=>
    {
        if (error)
        {
            console.log('Server error'+error);
            res.status(201).json({error: 'Could not connect to server'});
        }

        // If not error , send the results back  

        res.status(500).json({message: result})
       console.log('Sent ' , result )
    
    })

  });

  app.post('/get_projects' , (req,res)=>
  {

    const payLoad = req.body;
    const user_id = payLoad.userID


    const query_to_run = queries.getProjects(user_id);

    connection.query('USE main_database;')

    connection.query(query_to_run , (error , result)=>
    {
        if (error)
        {
            console.log('Error fetching projects '+ error);
            res.status(201).json({error: "Error fetching project"});

        }

        // #Send project_id_back. 
        res.status(500).json({message: result});
        console.log('Projects sent succesfully');

    })


  });


  app.post('/get_tables' , (req, res)=>
  {

    console.log('this is the req');
    console.log(req.body)
    const payLoad = req.body;
    const database_name = payLoad.database_name;

    

    connection.query( `USE \`${database_name}\` `);
    

    const query_and_run  = 'SHOW TABLES;'

    connection.query(query_and_run , (error, result)=>
    {
        if (error)
        {
            res.status(201).json({message:error})
            return;
        }

        res.status(500).json({message: result});
        console.log(result)

    });


  })

  app.post('/create_table' ,(req,res)=>
  {
    const payLoad = req.body;
    const database_name = payLoad.database_name;
    const query_to_run = payLoad.query_to_run;

    

    connection.query( `USE \`${database_name}\` `);

    

    connection.query(query_to_run , (error, result_to_send)=>
    {
        if (error)
        {
            res.status(201).json({message:error})
            return;
        }

        res.status(500).json({message: 'Succesfully created table' , result:result_to_send});

    });


    
  })

  app.post('/run_queries_on_table' , (req , res)=>
  {
    const payLoad = req.body;
    const database_name = payLoad.database_name;
    const query_to_run = payLoad.query_to_run;

    

    connection.query( `USE \`${database_name}\` `);

    

    connection.query(query_to_run , (error, result_to_send)=>
    {
        if (error)
        {
            res.status(201).json({message:error})
            return;
        }

        res.status(500).json({message: 'Succesfully ran the query' , result:result_to_send});

    });

  })


  

});



// At this point , our app should be listening. 

//LIsten for and send request to login
//Listen for and send request to chekcback in
//Program for canned queries. 






