
import React from 'react';
import CreateTask from '../create-task.component';
import { render, waitFor, fireEvent } from '@testing-library/react';

describe('Create task component', () => {
    let component;

    beforeEach(async (done) => {
        await waitFor(() => (component = render(<CreateTask />)));
        done();
    });

    test('Expect CreateTask component to render when Create Task button is clicked', async () => {
        const { getByTestId } = component;
        const button = getByTestId('create-task-button');
        
        await fireEvent.click(button);
        
        getByTestId('create-task-modal');
    });
})