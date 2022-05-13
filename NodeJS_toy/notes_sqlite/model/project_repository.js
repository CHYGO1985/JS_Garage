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

  createProjTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`;
    return this.dao.run(sql);
  }

  createProj(name) {
    return this.dao.run(
      'INSERT INTO projects (name) VALUES (?)',
      [name],
    );
  }
}

module.exports = ProjectRepository;
