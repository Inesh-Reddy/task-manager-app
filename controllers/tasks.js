const express = require('express');
const Task = require('../models/taskschema');

const getAllTasks = async (req, res) => {
    const allTasks = await Task.find();
    res.json({
        msg: allTasks
    })
}
const createTask = async (req, res) => {
    const task = req.body;
    const newTask = await Task.create(task);
    res.json({
        msg: newTask
    })
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