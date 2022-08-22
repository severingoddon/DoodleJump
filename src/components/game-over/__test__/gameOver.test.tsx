import React from 'react';
import ReactDOM from 'react-dom';
import GameOver from '../GameOver';
import { render, cleanup  } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

afterEach(cleanup);

it('renders gameOver correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GameOver/>, div);
});

it('renders final score correctly', () => {
    const {getByTestId} = render(<GameOver score="1200"/>);
    expect(getByTestId('finalscore')).toHaveTextContent('1200');
});

it('matches snapshot', () => {
    const tree = TestRenderer.create(<GameOver score="1200"/>).toJSON();
    expect(tree).toMatchSnapshot();
});


