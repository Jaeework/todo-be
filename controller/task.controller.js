const Task = require('../model/Task');

const taskController = {};

// POST
taskController.createTask = async (req, res) => {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });

    try {
        await newTask.save();
        res.status(200).json({ status: "ok", data: newTask});
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
}

// GET
taskController.getTask = async(req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: "ok", data: taskList });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
}

// UPDATE
taskController.updateTask = async(req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select("-__v");

        res.status(200).json({ status: "ok", data: updatedTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
}

// DELETE
taskController.deleteTask = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        res.status(200).json({ status: "ok", data: updatedTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
}

module.exports = taskController;
