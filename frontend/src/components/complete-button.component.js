import React from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export default function CompleteButton(task) {
    const { description, dueDate, name, _id } = task.task;

    const formatData = () => {
        return {
            name,
            description,
            dueDate,
            complete: true
        }
    }

    const handleSubmit = () => {
        const taskData = formatData();

        axios.patch(`http://localhost:5000/tasks/update/${_id}`, taskData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        window.location.reload();
    }

    return (
        <div>
            <Button variant="secondary" onClick={handleSubmit}>Mark as Complete</Button>
        </div>
    );
}