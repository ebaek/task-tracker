
import React from 'react';
import CompleteButton from '../complete-button.component';
import { render } from '@testing-library/react';

describe('CompleteButton component', () => {
    const exampleTask = {
        task: {
            task: {
                _id: 1231231312,
                name: '',
                description: '',
            }
        }
    }
    test('Expect CompleteButton component to render', async () => {
        const { getByTestId } = await render(<CompleteButton task={exampleTask}/>);
        getByTestId('complete-button');
    });

});
