const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get( (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
    const { name, description } = req.body;
    const dueDate = Date.parse(req.body.dueDate);

    const newTask = new Task({
        name,
        description,
        dueDate,
    });

    newTask.save()
        .then( () => res.json('New task added'))
        .catch( err => res.status(400).json('Error ' + err));

});

router.route('/:id').get( (req, res) => {
    Task.findById(req.params.id)
        .then( task => {
            res.json(task)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then( () => {
            res.json('Task deleted')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
    Task.findById(req.params.id)
        .then( task => {
            const { name, description, dueDate, complete } = req.body;

            task.name = name;
            task.description = description;
            task.dueDate = Date.parse(dueDate);
            task.complete = complete.toString();

            task.save()
                .then(() => res.json('Task updated'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;