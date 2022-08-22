import React from 'react';
import ReactDOM from 'react-dom';
import Score from '../Score';
import TestRenderer from 'react-test-renderer';
import { render, cleanup  } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Score scoreText="0"/>, div);
});

it('renders score correctly', () => {
    const {getByTestId} = render(<Score scoreText="55"/>);
    expect(getByTestId('score')).toHaveTextContent('55');
});

it('matches snapshot', () => {
    const tree = TestRenderer.create(<Score scoreText={'55'}/>).toJSON();
    expect(tree).toMatchSnapshot();
});



