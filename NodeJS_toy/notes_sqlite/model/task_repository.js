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

  async createTaskTable() {
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

  async createTask(name, decription, isComplete, projectId) {
    return this.dao.run(
      `INSERT INTO tasks (name, description, isComplete, projectId) 
      VALUES (?, ?, ?, ?)`,
      [name, decription, isComplete, projectId],
    );
  }

  async updateTask(task) {
    const {
      id, name, description, isComplete, projectId,
    } = task;
    return this.dao.run(
      'UPDATE tasks SET name = ?, description = ?, isComplete = ?, projectId = ? WHERE id = ?',
      [name, description, isComplete, projectId, id],
    );
  }

  async deleteTask(id) {
    return this.dao.run(
      'DELETE FROM tasks WHERE id = ?',
      [id],
    );
  }
}

module.exports = TaskRepository;
