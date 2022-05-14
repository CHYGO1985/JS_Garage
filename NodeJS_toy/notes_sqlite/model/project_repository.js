/**
 *
 * The db operates for projects.
 *
 * @author jingjiejiang
 * @history May 13, 2022
 *
 */
class ProjectRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createProjTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`;
    return this.dao.run(sql);
  }

  async createProj(name) {
    return this.dao.run(
      'INSERT INTO projects (name) VALUES (?)',
      [name],
    );
  }

  async updateProj(project) {
    const { id, name } = project;
    return this.dao.run(
      'UPDATE projects SET name = ? WHERE id = ?',
      [name, id],
    );
  }

  async deleteProj(id) {
    return this.dao.run(
      'DELETE FROM projects WHERE id = ?',
      [id],
    );
  }
}

module.exports = ProjectRepository;
