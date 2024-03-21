const express = require('express');
const router = express.Router();
const DepartmentControler = require('../controllers/departments.controller');

router.get('/departments', DepartmentControler.getAll);

router.get('/departments/random', DepartmentControler.getRandom);

router.get('/departments/:id', DepartmentControler.getOne);

router.post('/departments', DepartmentControler.addNew);

router.put('/departments/:id', DepartmentControler.changeOne);

router.delete('/departments/:id', DepartmentControler.deleteOne);

module.exports = router;
