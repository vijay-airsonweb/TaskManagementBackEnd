const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(task);
});

const getTasks = catchAsync(async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: 'User not authenticated' });
  }
  const filter = { userId: req.user.id }; 
  if (req.query.title) filter.title = req.query.title;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
  const result = await taskService.queryTasks(filter);
  res.send(result);
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
  const result = await taskService.updateTaskById(req.params.taskId, req.body);
  res.status(httpStatus.OK).send(result);
});

const deleteTask = catchAsync(async (req, res) => {
  const result = await taskService.deleteTaskById(req.params.taskId);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};