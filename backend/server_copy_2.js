// This assumes the user is already logged in. Once prototyped , add functionality for logging in.

const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const mysql = require('mysql');
const queries = require('./queries.js')

const inidvidual_db_routes = require('./routes/individual_db_transactions.js');
const { error, Console } = require("console");
const jwt = require ('jsonwebtoken');
const { json } = require("body-parser");
const crypto = require('crypto');


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

        //Running this on something else. 
        //Enviromnet variables are dynamic
        //Cloud service provider will give us process.env.myname
        

        const PORT = process.env.PORT || port



        app.listen(PORT , ()=>
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

const createDynamicAPIs = async () => {

  console.log("I got called")
  connection.query('USE main_database;');

  const query_to_run = 'SELECT * FROM api;';

  connection.query(query_to_run, (error, result) => {
    if (error) {
      console.log('Error executing query1: ' + error);
      return;
    }

    for (const row of result) {
      const {
        api_id,
        generated_url,
        query,
        response_type,
        on_success_response,
        on_error_response
      } = row;

      console.log(generated_url);
      console.log(api_id)

      app[response_type.toLowerCase()](`/${generated_url}`, (req, res) => {
        console.log('This dynamic api got called');
        console.log(`/${generated_url}`)



        const query_for_db = `SELECT dbt.database_name FROM databases_table AS dbt JOIN api_list AS ap ON ap.database_id = dbt.database_id WHERE ap.api_id = ${api_id};`;
        connection.query('USE main_database;')
        connection.query(query_for_db, (error, db_name) => {
          if (error) {
            console.log('Can\'t resolve db_name while initializing API');
            console.log(error);
            return;
          }
          
          console.log(db_name)
          console.log(db_name[0].database_name);

          const name_of_db = db_name[0].database_name;

          connection.query(`USE ${name_of_db};`)

          connection.query(query, (error, queryResults) => {
            if (error) {
              console.error('Failed to execute query', error);
              const errorResponse = JSON.parse(on_error_response);
            
              const response_to_send = errorResponse.reduce((acc, { key, value }) => {
                
                acc[key] = value;
                
                return acc;
              }, {});
            
              res.status(500).json(response_to_send);
              return;
            }
            

            const successResponse = JSON.parse(on_success_response);

            const response_to_send = successResponse.reduce((acc, { key, value }) => {
              if (value === '$result') {
                acc['result'] = queryResults;
              } else {
                acc[key] = value;
              }
              return acc;
            }, {});

            console.log(response_to_send)

            const preparedResponse = successResponse.map(({ key, value }) => {
              if (value === '$result') {
                return { key, value: queryResults };
              }
              return { key, value };
            });

            // res.json(preparedResponse);
            res.json(response_to_send)
          });
        });
      });
    }
  });
};



startServer().then(()=>
{
  //Added cors for api calls from different locations
  app.use(cors());
  app.use(express.json());

  createDynamicAPIs();

    //_______________________MASTER TRANSACTIONS__________________________--

  // Add a database to a project. Given a project add databases to it.


  app.post('/delete_api' , (req,res)=>
  {

    

    console.log('/delete_api')
    console.log(req.body)

    const payLoad = req.body;

    console.log(payLoad);

    const userID = payLoad.userID;
    const projectID = payLoad.projectID;
    const apiID = payLoad.apiID;

    //Check if that exists. 

    connection.query(`USE main_database`);

    const query_for_validation = `select * from api_list ap JOIN projects p ON p.project_id = ap.project_id WHERE api_id = ${apiID} AND p.project_id=${projectID} and user_id=7;`

    connection.query(query_for_validation , (error , result)=>
    {
      if (error)
      {
        console.log('Something wrong with server');
        console.log(error)
        res.status(500).json({error:error})
      }
      else
      {
        console.log(result)

        //Check if result is empty. 

        if (result === null)
        {
          res.status(500).json({error: 'Invalid authentication'});
        }
        else
        {
          //Can delete
          connection.query(`delete from api where api_id =${apiID};` , (error , result)=>
          {
            if (error)
            {
              res.status(500).json({error: error})
              return;
            }
            
          })

         
          res.status(201).json({message: 'Succesfully deleted'});
          return;
            
        }
      }
    })


  })


 

  

  
    

});








// At this point , our app should be listening. 

//LIsten for and send request to login
//Listen for and send request to chekcback in
//Program for canned queries. 






