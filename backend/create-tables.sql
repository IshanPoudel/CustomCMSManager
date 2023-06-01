-- Master tables when starting the application for the first time.
DROP DATABASE IF EXISTS main_database;
CREATE DATABASE main_database;
USE main_database;

-- users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- projects table
CREATE TABLE projects (
  project_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  project_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- databases table
CREATE TABLE databases_table (
  database_id INT AUTO_INCREMENT PRIMARY KEY,
  database_name VARCHAR(255) NOT NULL
);

-- project_database table
CREATE TABLE project_database (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  database_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects (project_id),
  FOREIGN KEY (database_id) REFERENCES databases_table (database_id)
);



-- api_generator table
CREATE TABLE api_generator (
  api_id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  database_id INT NOT NULL,
  canned_query TEXT,
  generated_api_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects (project_id),
  FOREIGN KEY (database_id) REFERENCES project_database (id)
);