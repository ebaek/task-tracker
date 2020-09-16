
import React from 'react';
import TasksList from '../tasks-list.component';
import { render } from '@testing-library/react';

describe('TasksList component', () => {

    test('Expect TasksList wrapper component to render', () => {
        const { getByTestId } = render(<TasksList />);
        getByTestId('tasks-list-wrapper');
    });
});
