const Employee = require('../employees.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
      
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: testDepOne._id });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Doe', department: testDepTwo._id });
      await testEmpTwo.save();

    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      const expectedName = 'John';
      expect(employee.firstName).to.be.equal('John');
    });

    it('should populate the department with "populate" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' }).populate('department');
      expect(employee.department.name).to.be.equal('Department #1');
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe('Creating data', () => {
      
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
    });

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Jack', lastName: 'Doe', department: 'Marketing' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Jack' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'Jack' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = 'Jack';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Jack' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Jack' }});
      const employees = await Employee.find({ firstName: 'Jack' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Jane', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removeEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

});