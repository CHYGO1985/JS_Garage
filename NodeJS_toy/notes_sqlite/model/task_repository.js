/**
 *
 * The db operates for tasks.
 *
 * @author jingjiejiang
 * @history May 13, 2022
 *
 */
class TaskRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTaskTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        decription TEXT,
        isComplete INTEGER DEFAULT 0,
        projectId INTEGER,
        CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
          REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return this.dao.run(sql);
  }
}

module.exports = TaskRepository;
