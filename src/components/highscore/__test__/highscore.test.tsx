import React from 'react';
import ReactDOM from 'react-dom';
import {Highscore} from '../Highscore';
import {render, cleanup, waitFor, screen, act} from '@testing-library/react';

afterEach(cleanup);

it('renders highscore correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Highscore/>, div);
});

it('should render _Loading..._ when api doesnt respond', async () => {
    render(<Highscore/>);
    await waitFor(() => {
        screen.getByText('Loading...');
    });
});



