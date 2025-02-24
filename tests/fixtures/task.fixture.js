const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const Task = require('../../src/models/task.model');



const taskOne = {
    _id: mongoose.Types.ObjectId(),
    taskName: faker.name.findName(),
    taskDescription: faker.taskDescription().toLowerCase(),
    userId : '67b6c5800e51071d68045a9c',
    taskStatus : 'Pending',
  };


  module.exports = {
    taskOne,
  };
  