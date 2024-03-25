const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  
  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({});
    
    dep.validateSync(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
      
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" is shorter than 5 characters and longer than 20 characters', () => {
    const cases = ['abc', 'abcd', 'abcdefghijklmnoprstuwxyzq'];
    for(let name of cases) {
      const dep = new Department({ name });
      
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if "name" is okay', () => {
    const cases = ['Management', 'Marketing'];
    for(let name of cases) {
      const dep = new Department({ name });
      
      dep.validateSync(err => {
        expect(err).to.not.exist;
      });
    }
  });


});