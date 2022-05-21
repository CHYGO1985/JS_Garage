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
const ProjectRepository = require('../../model/projectRepository');

describe('projectRepository', () => {
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
  describe('.createProj(name)', () => {
    it('should add a new project to the db', async () => {
      const stub = sinon.stub(ProjectRepository.prototype, 'createProj').returns(stubProjValues[0]);
      const projectRepository = new ProjectRepository();
      const proj = projectRepository.createProj(stubProjValues[0].name);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
      expect(proj.id).to.equal(stubProjValues[0].id);
      expect(proj.name).to.equal(stubProjValues[0].name);
    });
  });
  describe('.updateProj(project)', () => {

  });
  describe('.deleteProj(id)', () => {

  });
  describe('.getAllProj()', () => {

  });
});
