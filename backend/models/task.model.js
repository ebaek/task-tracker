const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    dueDate: { type: Date, required: true},
    complete: { type: Boolean, default: false},
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', schema);

module.exports = Task;
module.exports = schema;