/**
 *
 * The POJO class for task data model.
 *
 * @author jingjiejiang
 * @history May 21, 2022
 *
 */
function Task(id, name, description, isComplete, projectId) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.isComplete = isComplete;
  this.projectId = projectId;

  this.toString = () => `${this.id} task ${name} of project ${this.projectId} is
   for ${description} is ${isComplete ? 'completed' : 'incomplete'}`;

  return this;
}

module.exports = Task;
