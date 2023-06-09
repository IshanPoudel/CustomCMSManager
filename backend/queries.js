// queries.js
//Add abilities to preprocess the strings .

const bcrypt = require('bcrypt')
const saltRounds = 10

const createNewUser = (username , email , password)=>
{

  
    const query= 'INSERT INTO users(username , email , password) VALUES (? , ? , ?)';
    const params = [username , email , password];
    return {query , params}

  
    
  
}

const checkUserExistence = (username, email) => {
  
    const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?;';
    const params = [username, email ];
    return { query, params };
  };
  
  const loginUser = (usernameOrEmail, password) => {

    //Server side check to see if encryption service failed. 

    const query = 'SELECT id FROM users WHERE username = ?  AND password = ?;';
    const params = [usernameOrEmail, password];
    return { query, params };
  };
  
  const createProject = (userId, projectName, projectDescription) => {
    const query = 'INSERT INTO projects (user_id, project_name, project_description) VALUES (?, ?, ?);';
    const params = [userId, projectName, projectDescription];
    return { query, params };
  };
  
  const createProjectDatabase = (projectId, databaseId) => {
    const query = 'INSERT INTO project_database (project_id, database_id) VALUES (?, ?);';
    const params = [projectId, databaseId];
    return { query, params };
  };
  
  const createDatabase = (databaseName) => {
    console.log(databaseName)
    const query = 'INSERT INTO databases_table (database_name) VALUES (?);';
    const params = [databaseName];
    
    return { query, params };
  };


  const initializeDatabase=(databaseName)=>
  {
    const query = `CREATE DATABASE \`${databaseName}\``;

    

    return query; 
  }
  
  const createAPI = (api_name , api_description, query , response_type , on_error_response , on_success_response , generated_url) => {
    const sql_query = 'INSERT INTO api (api_name, api_description, query, response_type, on_error_response, on_success_response , generated_url ) VALUES (?, ?, ?, ?,? , ?,?);';

    const params = [api_name , api_description, query , response_type , on_error_response , on_success_response , generated_url];
    console.log(sql_query , params)
    return { query: sql_query, params };
  };

  const addAPItoProject = (projectId , databaseId , apiId)=>
  {
    const query = 'INSERT INTO api_list (api_id , project_id , database_id) VALUES (? , ? , ? );';
    const params = [apiId , projectId , databaseId]
    return {query , params};
  }

  const getDatabases = (projectId, userId) => {
    // For the user and the project, get all the databases
  
    const query = `
      SELECT  db.database_id ,db.database_name 
      FROM databases_table AS db
      JOIN project_database AS p_db ON p_db.database_id = db.database_id
      JOIN projects AS p ON p.project_id = p_db.project_id
      WHERE p_db.project_id = ${projectId}
      AND p.user_id = ${userId};
    `;
  
    return query;
  };

  const deleteProject = (userId , projectId)=>
  {
    const query =`DELETE FROM projects where user_id = ${userId} and project_id = ${projectId}`;
    return query;
  }

  const deleteDatabase = (userId , projectId , dbID)=>
  {
    const query_for_checking = `select * FROM project_database where project_id = ${projectId} and database_id = ${dbID}`;
    const query_for_getting_db_name =`SELECT database_name from databases_table where database_id = ${dbID}`;
    const query_for_delete =`DELETE FROM databases_table where  database_id = ${dbID}`;

    return {query_for_checking , query_for_getting_db_name , query_for_delete};
  }


  const getProjects = (userId)=>
  {
    const query = `SELECT project_id , project_name , project_description FROM projects WHERE user_id=${userId};`
    return query;
  }





  const getTables = (databaseName)=>
  {
    const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = ${databaseName};`
    return query;
  }


  // need a query to return all projects for a user. 
  // For each project , need to return all databases. 
  //Need to have api for creating each of the database  
  // Need to think about separating it into two different databases. 
  //I can have another database and direct queries there. 
  //Need to call the database and go back to using main database or have a different route that I can use . 
  //Once the db is added , I also need to create the database. Needs to be a transaction. 
  //Get inside the database and create the tables.

  
  module.exports = {
    createNewUser,
    checkUserExistence,
    loginUser,
    createProject,
    createProjectDatabase,
    createDatabase,
    initializeDatabase,
    getDatabases,
    getProjects,
    createAPI,
    addAPItoProject,
    deleteProject,
    deleteDatabase
  };
  