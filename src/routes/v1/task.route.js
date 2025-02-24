const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTasks'), validate(taskValidation.createTask), taskController.createTask)
  .get(auth('getTasks'), validate(taskValidation.getTasks), taskController.getTasks);

router
  .route('/:taskId')
  .get(auth('getTasks'), validate(taskValidation.getTask), taskController.getTask)
  .put(auth('manageTasks'), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth('manageTasks'), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management and retrieval
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     description: Users can create tasks for themselves.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskName
 *               - userId
 *             properties:
 *               taskName:
 *                 type: string
 *               taskDescription:
 *                 type: string
 *               userId:
 *                 type: string
 *                 format: objectId
 *               taskStatus:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *             example:
 *               taskName: Complete API integration
 *               taskDescription: Integrate the API with the frontend
 *               userId: 60d0fe4f5311236168a109ca
 *               taskStatus: Pending
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks with optional filters.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: taskName
 *         schema:
 *           type: string
 *       - in: query
 *         name: taskStatus
 *         schema:
 *           type: string
 *           enum: [Pending, In Progress, Completed]
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a task
 *     description: Retrieve a specific task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a task
 *     description: Update task details.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskName:
 *                 type: string
 *               taskDescription:
 *                 type: string
 *               taskStatus:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       "200":
 *         description: Task deleted
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */