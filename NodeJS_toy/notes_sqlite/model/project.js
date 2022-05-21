/**
 *
 * The POJO class for project data model.
 *
 * @author jingjiejiang
 * @history May 21, 2022
 *
 */
function Project(id, name) {
  this.id = id;
  this.name = name;

  this.toString = () => `${this.id} project id: ${this.name}`;

  return this;
}

module.exports = Project;
