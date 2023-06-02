// queries.js

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
    const query = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?;';
    const params = [usernameOrEmail, usernameOrEmail, password];
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
    const query = 'INSERT INTO databases_table (database_name) VALUES (?);';
    const params = [databaseName];
    console.log("i got called from createDatabase")
    console.log(query , params)
    return { query, params };
  };
  
  const createAPI = (projectId, databaseId, cannedQuery, generatedApiUrl) => {
    const query = 'INSERT INTO api_generator (project_id, database_id, canned_query, generated_api_url) VALUES (?, ?, ?, ?);';
    const params = [projectId, databaseId, cannedQuery, generatedApiUrl];
    return { query, params };
  };
  
  module.exports = {
    createNewUser,
    checkUserExistence,
    loginUser,
    createProject,
    createProjectDatabase,
    createDatabase,
    createAPI,
  };
  