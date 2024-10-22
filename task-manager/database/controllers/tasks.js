const Task = require("../../database/models/Task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const task = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOneAndDelete(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
