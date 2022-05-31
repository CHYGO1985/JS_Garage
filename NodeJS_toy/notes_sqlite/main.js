/**
 *
 * Test project and tasks data access class.
 *
 * @author jingjiejiang
 * @history May 15, 2022
 *
 */
const AppDao = require('./dao/dao');
const ProjRepo = require('./dao/projectRepository');
const TaskRepo = require('./dao/taskRepository');

async function main() {
  const dao = new AppDao('./model/database.sqlite3');
  const blogProjectData = { name: 'Write Node.js - SQLite Tutorial' };
  const projRepo = new ProjRepo(dao);
  const taskRepo = new TaskRepo(dao);
  let projectId;

  projRepo.createProjTable()
    .then(async () => taskRepo.createTaskTable())
    .then(async () => projRepo.createProj(blogProjectData.name))
    .then(async (data) => {
      projectId = data.id;
      const tasks = [
        {
          name: 'Outline',
          description: 'High level overview of sections',
          isComplete: 1,
          projectId,
        },
        {
          name: 'Write',
          description: 'Write article contents and code examples',
          isComplete: 0,
          projectId,
        },
      ];
      return Promise.all(tasks.map(async (task) => {
        const {
          // eslint-disable-next-line no-shadow
          name, description, isComplete, projectId,
        } = task;
        return taskRepo.createTask(name, description, isComplete, projectId);
      }));
    })
    .then(async () => projRepo.getProjById(projectId))
    .then(async (project) => {
      console.log('\nRetreived project from database');
      console.log(`project id = ${project.id}`);
      console.log(`project name = ${project.name}`);
      return taskRepo.getAllTasks(project.id);
    })
    .then(async (tasks) => {
      console.log('\nRetrieved project tasks from database');
      return new Promise((resolve) => {
        tasks.forEach((task) => {
          console.log(`task id = ${task.id}`);
          console.log(`task name = ${task.name}`);
          console.log(`task description = ${task.description}`);
          console.log(`task isComplete = ${task.isComplete}`);
          console.log(`task projectId = ${task.projectId}`);
        });
        resolve('success');
      });
    })
    .catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
    });
}

main();
