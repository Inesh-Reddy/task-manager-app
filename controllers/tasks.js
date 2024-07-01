// const express = require('express');
const Task = require('../models/taskschema');
const taskValidation = require('../models/zodSchema');

const getAllTasks = async (req, res) => {
    const allTasks = await Task.find();
    res.json({
        msg: allTasks
    })
}

const createTask = async (req, res) => {
    try {
      const validationResult = await taskValidation.safeParse(req.body);
      
      if (validationResult.success) {
        const value = validationResult.data;
        console.log('Validation successful:', value);
        const newTask = await Task.create(value);
        res.status(201).json({ message: 'Task created successfully!', task: newTask });
      } else {
        const error = validationResult.error;
        console.log('Validation error:', error);
        return res.status(400).json({ message: 'Validation failed', errors: error.format() });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getSingleTask = async (req, res) => {
    const {id:task} = req.params;
    const singleTask = await Task.findById({_id: task});
    res.json({
        msg: singleTask
    })
}

const updateTask = async (req, res) => {
    const {id:task} = req.params;
    const updatingTaks = await Task.findByIdAndUpdate({_id: task}, {completed:false});
    const updatedTask = await Task.findById({_id:task});
    res.json({
        msg: updatedTask
    })
}

const deleteTask = async (req, res) => {
    const {id:task} = req.params;
    const deteledTask = await Task.findOneAndDelete({_id:task});
    res.json({
        msg: "deleted Task"
    })
}


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}