import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

export default function CreateTask() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = () => {
        const task = {
            name,
            description,
            dueDate
        }
        
        axios.post('http://localhost:5000/tasks/add', task)
            .then(res => console.log(res.data));
        
        clearState();
        window.location.reload();
    }

    const clearState = () => {
        setName('');
        setDescription('');
        setDueDate(new Date());
    }

    return (
        <div>
            <Nav.Link data-testid="create-task-button" onClick={handleShow}>
                Create
            </Nav.Link>

            <Modal
                show={show}
                data-testid="create-task-modal"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <label>Task Name</label>
                        <input type="text" className="form-control" id="taskName" placeholder="Enter task name" onChange={ ({ target })=> setName(target.value)}/>
                        
                        <br></br>

                        <label>Task Due Date</label>
                        <input type="date" className="form-control" id="taskDate" placeholder="Enter task due date" onChange={ ({target}) => setDueDate(target.value)}/>
                        
                        <br></br>

                        <label>Task Description</label>
                        <textarea className="form-control" id="task-description" onChange={ ({ target }) => setDescription(target.value)}/>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={submit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}