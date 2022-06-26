# Project introduction
A site for recording to-do list.

# Tech Stack
Web Framework: ExpressJS
Storage: SQLite3
Unit Test: Mocha + Chai + Sinon

# How to unit test for SQLite3? 
Mocha + Chai + Sinon

# Hoe to run the app?
run the following:
```bash
node main.js
```

Should able to see the following:
```properties
info: Connect to sqlite databse {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}
info: The sql 
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT) has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}
info: The sql 
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        isComplete INTEGER DEFAULT 0,
        projectId INTEGER,
        CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
          REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE) has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}
info: The sql INSERT INTO projects (name) VALUES (?) has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}
info: The sql INSERT INTO tasks (name, description, isComplete, projectId) 
      VALUES (?, ?, ?, ?) has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}
info: The sql INSERT INTO tasks (name, description, isComplete, projectId) 
      VALUES (?, ?, ?, ?) has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}
info: The sql SELECT * FROM projects WHERE id = ? has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}

Retreived project from database
project id = 9
project name = Write Node.js - SQLite Tutorial
info: The sql SELECT * FROM tasks WHERE projectId = ? has been succesfully executed. {"service":"quickpost","timestamp":"22Y-06-26 12:16:20"}

Retrieved project tasks from database
task id = 15
task name = Outline
task description = High level overview of sections
task isComplete = 1
task projectId = 9
task id = 16
task name = Write
task description = Write article contents and code examples
task isComplete = 0
task projectId = 9
```