const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTask = {
  body: Joi.object().keys({
    taskName: Joi.string().required().trim(),
    taskDescription: Joi.string().trim().allow(''), // Allow empty string
    userId: Joi.string().required().custom(objectId), // Ensure valid MongoDB ObjectId
    taskStatus: Joi.string().valid('Pending', 'In Progress', 'Completed').default('Pending'),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    taskName: Joi.string(),
    taskStatus: Joi.string().valid('Pending', 'In Progress', 'Completed'),
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required().custom(objectId),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      taskName: Joi.string().trim(),
      taskDescription: Joi.string().trim().allow(''),
      taskStatus: Joi.string().valid('Pending', 'In Progress', 'Completed'),
      userId: Joi.string().custom(objectId),
    })
    .min(1), // Ensure at least one field is updated
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
