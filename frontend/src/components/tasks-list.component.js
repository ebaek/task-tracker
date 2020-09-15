import React, { useState, useEffect } from 'react';
import CompleteButton from './complete-button.component';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

export default function TasksList() {
    const [taskList, setTaskList] = useState([]);
    const [searchType, setSearchType] = useState('');

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

        const sameYear = date.getFullYear() === now.getFullYear();
        const sameMonth = date.getMonth() === now.getMonth();
        const dueTodayOrTom = date.getDate() === now.getDate() || date.getDate() == now.getDate() + 1
        
        if (sameYear &&  sameMonth && dueTodayOrTom) {
            return 'warning';
        } else if (date < now) {
            return 'danger';
        } else {
            return 'light';
        };
    };

    const formatCard = (task, dueStatus, i) => {
        const { complete, dueDate, description, name, _id } = task;

        return (
            <Card key={i} border={dueStatus} style={{ margin: '1rem' }}>
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
                        <CompleteButton task={task} />
                    }
                </Card.Body>
            </Card>
        )
    }

    const completeFilter = () => {
        return taskList.filter( task => task.complete === true);
    };

    const dueFilter = (searchType) => {
        return taskList.filter( task => {
            const { dueDate, complete } = task;
            const dueStatus = calculateDueStatus(dueDate, complete);
            return searchType === dueStatus;
        })
    };

    const formatTasks = (searchType) => {
        let list = []

        if (searchType === '') {
            list = taskList
        } else if (searchType === 'complete') {
            list = completeFilter()
        } else if (searchType === 'warning' || searchType === 'danger') {
            list = dueFilter(searchType);
        }

        return list.map( (task, i) => {
            const { dueDate, complete } = task;
            const dueStatus = calculateDueStatus(dueDate, complete);

            return formatCard(task, dueStatus, i)
        });
    }

    return (
        <div className="container">
            <div style={{ margin: '1rem' }}>
                <Button variant="outline-secondary" onClick={() => setSearchType('')}>All</Button>{' '}
                <Button variant="outline-success" onClick={() => setSearchType('complete')}>Completed</Button>{' '}
                <Button variant="outline-warning" onClick={() => setSearchType('warning')}>Due Soon</Button>{' '}
                <Button variant="outline-danger" onClick={() => setSearchType('danger')}>Overdue</Button>{' '}
            </div>

            {formatTasks(searchType)}
        </div>
    )

}