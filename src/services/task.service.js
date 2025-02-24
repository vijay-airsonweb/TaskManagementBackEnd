const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createTask = async (taskBody) => {
  const userExists = await User.findById(taskBody.userId);
  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  
  const task = await Task.create(taskBody);
  return { message: 'Task created successfully', task };
};


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryTasks = async (filter) => {
  const tasks = await Task.find(filter);
  return { message: 'Tasks fetched successfully', tasks };
};



/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTaskById = async (id) => {
  return await Task.findById(id);
};



/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  Object.assign(task, updateBody);
  await task.save();
  
  return { message: 'Task updated successfully', task };
};


/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  await task.remove();
  return { message: 'Task deleted successfully' }; // Removed task from response
};


module.exports = {
  createTask,
  queryTasks,
  updateTaskById,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
