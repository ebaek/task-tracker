import React, { useState, useEffect } from 'react';
import CompleteButton from './complete-button.component';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

export default function TasksList() {
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        fetchTasks();
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date = new Date(date);
        return date.toLocaleDateString("en-US", options);
    }

    const fetchTasks = () => {
        axios.get('http://localhost:5000/tasks/')
            .then(res => setTaskList(res.data))
            .catch(err => console.log(err));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        window.location.reload();
    }

    // returns urgency status of the task 
    const calculateDueStatus = (date, complete) => {
        if (complete) return 'success';

        date = new Date(date)
        const now = new Date();

        const difference = Math.round(date.getDate()-now.getDate());
        
        // late 
        if (difference < 0) {
            return 'danger'
        // due soon
        } else if (difference <= 1) {
            return 'warning'
        } else {
            return 'light'
        }
    }

    const formatTasks = () => {
        return taskList.map( (task, i) => {
            const { complete, dueDate, description, name, _id } = task;
            return (
                <Card key={i} border={calculateDueStatus(dueDate, complete)} style={{ margin: '1rem' }}>

                    <Card.Header as="h5">
                        {formatDate(dueDate)}
                        <button type="button" className="close" aria-label="Close" onClick={() => deleteTask(_id)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text> {description} </Card.Text>

                        {!complete &&
                            <CompleteButton task={task}/>
                        }
                    </Card.Body>
                </Card>
                )
            })
    }

    return (
        <div className="container">
            {formatTasks()}
        </div>
    )

}