// queries.js
//Add abilities to preprocess the strings .

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
    createAPI,
    addAPItoProject
  };
  