import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export default function TasksList() {
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:5000/tasks/')
            .then(res => setTaskList(res.data))
            .catch(err => console.log(err));
    };

    // returns urgency status of the task 
    const calculateDueStatus = (date) => {
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
        return taskList.map( ({complete, dueDate, description, name}, i) => 
            <Card key={i} bg={calculateDueStatus(dueDate)}>
                <Card.Header as="h5">{dueDate}</Card.Header>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text> {description} </Card.Text>

                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }

    return (
        <div className="container">
            {formatTasks()}
        </div>
    )

}