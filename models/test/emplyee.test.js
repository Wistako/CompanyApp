const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  after(() => {
    mongoose.models = {};
  });

  it('should not throw an error if args are okay', () => {
    const cases = ['John', 'Jane'];
    const department = 'Marketing';
    for(let firstName of cases) {
      for(let lastName of cases) {
        const emp = new Employee({ firstName, lastName, department });
        
        emp.validateSync(err => {
          expect(err).to.not.exist;
        });
      }
    }
  });

  it('should throw an error if no "firstName" arg', async () => {
    const emp = new Employee({lastName: 'Doe', department: 'Marketing'});
    
    emp.validateSync(err => {
      expect(err.errors.firstName).to.exist;
    });
  });

  it('should throw an error if no "lastName" arg', async () => {
    const emp = new Employee({firstName: 'John', department: 'Marketing'});
    
    emp.validateSync(err => {
      expect(err.errors.lastName).to.exist;
    });
  });

  it('should throw an error if no "department" arg', async () => {
    const emp = new Employee({firstName: 'John', lastName: 'Doe'});
    
    emp.validateSync(err => {
      expect(err.errors.department).to.exist;
    });
  });


});