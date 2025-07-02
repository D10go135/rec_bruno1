const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.getAll();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { titulo, descricao } = req.body;
  const id = await Task.create({ titulo, descricao });
  res.status(201).json({ id, titulo, descricao, status: 'pendente' });
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;
  await Task.update(id, { titulo, descricao, status });
  res.sendStatus(204);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.remove(id);
  res.sendStatus(204);
};
