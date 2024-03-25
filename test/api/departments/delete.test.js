const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {

  before(()=> {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: '#Department #1' });
    testDepOne.save();
  
    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: '#Department #2' });
    testDepTwo.save();
  })
  
  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const deletedDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedDepartment).to.be.null;
  });

});