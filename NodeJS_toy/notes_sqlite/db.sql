CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT);

CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        description TEXT,
        isComplete INTEGER DEFAULT 0,
        projectId INTEGER,
        CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
          REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE);

-- projects          
INSERT INTO projects (name) VALUES ('jjj');

UPDATE projects SET name = 'jjjchygo' WHERE id = 1;

DELETE FROM projects WHERE id = 2;

select * from projects;

SELECT * FROM projects WHERE id = 1;

-- tasks
INSERT INTO tasks (name, description, isComplete, projectId) VALUES ('Test task', 'test', 1, 2);

UPDATE tasks SET name = 'Test task', description = 'test update', isComplete = 1, projectId = 1 WHERE id = 2;

DELETE FROM tasks WHERE id = 1;

select * from tasks;

SELECT * FROM tasks WHERE id = 2;
