
import React from 'react';
import Navbar from '../navbar.component';
import { render } from '@testing-library/react';

describe('Navbar component', () => {

    test('Expect Navbar wrapper component to render', async () => {
        const { getByTestId } = render(<Navbar />);
        getByTestId('navbar-wrapper');
    });

    test('Expect Navbar component to contain Home and Create links', async () => {
        const { getByText } = render(<Navbar />);
        getByText('Home');
        getByText('Create');
    });
});
