const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    dueDate: { type: Date, required: true},
    complete: { type: Boolean, default: false},
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;