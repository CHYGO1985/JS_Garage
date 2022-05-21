/* eslint-env mocha */
/**
 *
 * Unit test for projectRepository class.
 *
 * @author jingjiejiang
 * @history May 21, 2022
 *
 */
const sinon = require('sinon');
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');
const Project = require('../../model/project');
const ProjectRepository = require('../../model/projectRepository');

describe('projectRepository', () => {
  const sandbox = sinon.createSandbox();
  const stubProjValues = [
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
    },
  ];
  afterEach(() => {
    sandbox.restore();
  });
  describe('.createProj(name)', () => {
    it('should add a new project to the db', async () => {
      const stub = sandbox.stub(ProjectRepository.prototype, 'createProj').returns(stubProjValues[0]);
      const projectRepository = new ProjectRepository();
      const proj = projectRepository.createProj(stubProjValues[0].name);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
      expect(proj.id).to.equal(stubProjValues[0].id);
      expect(proj.name).to.equal(stubProjValues[0].name);
    });
  });
  describe('.updateProj(project)', () => {
    it('should upate the project in the db', async () => {
      const stubCreateProj = sandbox.stub(ProjectRepository.prototype, 'createProj').returns(stubProjValues[0]);
      const projectRepository = new ProjectRepository();
      const createdProj = projectRepository.createProj(stubProjValues[0].name);
      let updateProj = new Project(createdProj.id, stubProjValues[1].name);
      const stubUpdateProj = sandbox.stub(ProjectRepository.prototype, 'updateProj').returns(updateProj);
      updateProj = projectRepository.updateProj(updateProj);
      // eslint-disable-next-line no-unused-expressions
      expect(stubCreateProj.calledOnce).to.be.true;
      // eslint-disable-next-line no-unused-expressions
      expect(stubUpdateProj.calledOnce).to.be.true;
      expect(updateProj.id).to.equal(createdProj.id);
      expect(updateProj.name).to.equal(stubProjValues[1].name);
    });
  });
  describe('.deleteProj(id)', () => {

  });
  describe('.getAllProj()', () => {

  });
});
