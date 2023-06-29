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

  

  connection.query('USE main_database;')

  const query_to_run = 'SELECT * FROM api;'

  connection.query(query_to_run , (error , result)=>{
    if (error)
    {
        console.log('Error executing query1: ' + error);
        return;


    }

    console.log('api');
    console.log(result)

    for (const row of result)
    {

      const {
        generated_url , 
        query , 
        response_type , 
        on_success_response , 
        on_error_response
      } = row;

        //Print
        // app[response_type.toLowerCase()](`/`)

      console.log(generated_url)
      console.log(JSON.parse(on_success_response))
      console.log(JSON.parse(on_error_response))
      //Get database_name

      const query_for_db = 'select dbt.database_name from databases_table as dbt JOIN api_list as ap ON ap.database_id = dbt.database_id WHERE ap.api_id = 1;'

      // connection.query(query_for_db , (error , db_name)=>
      // {
      //   if(error)
      //   {
      //     console.log('Cant resolve dataabse name here');
      //     return;
      //   }


      // })

      

      

      app[response_type.toLowerCase()](`/${generated_url}` , (req , res)=>
      {
        connection.query('USE Final;')
        connection.query(query , (error , queryResults)=>
        {
          if (error)
          {
            console.error('Failed to execute query' , error);
            const on_error_response = JSON.parse(on_error_response);
            res.status(500).json(errorResponse);
            return
          }

          const successResponse = JSON.parse(on_success_response);
          const preparedResponse = successResponse.map(({ key, value }) => {
            if (value === '$result') {
              return { key, value: queryResults };
            }
            return { key, value };
          });

          console.log(preparedResponse)
  
          res.json(preparedResponse);
        })
      })
    }


    
  });
    

});








// At this point , our app should be listening. 

//LIsten for and send request to login
//Listen for and send request to chekcback in
//Program for canned queries. 






