const express = require('express');
const router = express.Router();
const DepartmentControler = require('../controllers/employees.controller');

router.get('/employees', DepartmentControler.getAll);

router.get('/employees/random', DepartmentControler.getRandom);

router.get('/employees/:id', DepartmentControler.getOne);

router.post('/employees', DepartmentControler.addNew);

router.put('/employees/:id', DepartmentControler.changeOne);

router.delete('/employees/:id', DepartmentControler.deleteOne);

module.exports = router;
