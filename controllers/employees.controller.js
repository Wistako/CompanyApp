const Employee = require('../models/employees.model.js');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const empl = await Employee.findOne().populate('department').skip(rand);
    if(!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id).populate('department');
    if(!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const empl = await Employee.findById(req.params.id);
    if(empl) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName, lastName, department } });
      res.json({ message: 'OK', modifiedEmployee: empl});
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const empl = await Employee.findById(req.params.id).populate('department');
    
    if(empl) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deletedEmployee: empl });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};