
const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const empl = await Department.findOne().skip(rand);
    if(!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const empl = await Department.findById(req.params.id);
    if(!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { name } = req.body;
  try {
    const empl = await Department.findById(req.params.id);
    if(empl) {
      await Department.updateOne({ _id: req.params.id }, { $set: { name } });
      res.json({ message: 'OK', modifiedDepartment: empl});
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const empl = await Department.findById(req.params.id);
    
    if(empl) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deletedDepartment: empl });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};