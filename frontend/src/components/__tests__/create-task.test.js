
import React from 'react';
import CreateTask from '../create-task.component';
import { render, fireEvent } from '@testing-library/react';

describe('Create task component', () => {

    test('Expect CreateTask component to render when Create Task button is clicked', async () => {
        const { getByTestId } = render(<CreateTask/>);
        const button = getByTestId('create-task-button');
        fireEvent.click(button);
        await getByTestId('create-task-modal');
    });

    test('Expect CreateTask component to contain name, date, and description input forms', async () => {
        const { getByTestId } = render(<CreateTask/>);
        const button = getByTestId('create-task-button');
        fireEvent.click(button);
        await getByTestId('task-name');
        await getByTestId('task-date');
        await getByTestId('task-description');
    });

})